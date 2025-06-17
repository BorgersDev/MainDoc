import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import { Feather } from "@expo/vector-icons";
import {
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { Box } from "@/components/ui/box";
import DropdownComponent from "@components/DropdownComponent";
import * as DocumentPicker from "expo-document-picker";
import { AppError } from "@utils/AppError";
import { useToast } from "@/components/ui/toast";
import { ToastMessage } from "@components/ToastMessage";
import { api } from "@services/api";
import * as ImagePicker from "expo-image-picker";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";
import { set } from "@gluestack-style/react";

export const Upload = () => {
  const navigator = useNavigation<AppNavigationRoutesProps>();
  const toast = useToast();

  const [departamentos, setDepartamentos] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [tipoDocumento, setTipoDocumento] = useState([]);
  const [tipoDocumentoSelecionado, setTipoDocumentoSelecionado] =
    useState<any>(null);

  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [thereIsFile, setThereIsFile] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [valoresIndices, setValoresIndices] = useState<Record<number, string>>(
    {}
  );
  const [scannedImages, setScannedImages] = useState<any[]>([]);

  const [uploading, setUploading] = useState(false);
  const [uploadSteps, setUploadSteps] = useState<string[]>([]);
  const appendStep = (text: string) =>
    setUploadSteps((prev) => [...prev, text]);

  const hasScannedImages = scannedImages.length > 0;

  const isMedia =
    !hasScannedImages &&
    (selectedFile?.mimeType?.startsWith("video") ||
      selectedFile?.mimeType?.startsWith("audio"));

  const isImageOrPdf =
    !hasScannedImages &&
    (Array.isArray(selectedFile) ||
      selectedFile?.mimeType?.includes("image") ||
      selectedFile?.mimeType?.includes("pdf"));

  const openFileOptions = () => {
    Alert.alert("Selecionar arquivo", "Escolha a origem do documento", [
      { text: "Digitalizar", onPress: pickFromCamera },
      { text: "Fototeca", onPress: pickFromGallery },
      { text: "Arquivos", onPress: pickFromFiles },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const pickFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permissão negada",
        "É necessário permitir o uso da câmera para digitalizar documentos."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing:true
    });

    if (!result.canceled) {
      const image = result.assets[0];
      setScannedImages((prev) => [...prev, image]);
      setThereIsFile(true);
    }
  };

  const pickFromGallery = async () => {
    setShowLoading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsMultipleSelection: true,
    });

    if (result.canceled) {
      setShowLoading(false);
      return;
    }

    const assets = result.assets;
    // 1) se **todos** são imagens → Array de imagens
    const allImages = assets.every((a) => a.type === "image");
    if (allImages) {
      setScannedImages([]); // limpa câmera
      setSelectedFile(assets); // passamos o array inteiro
    } else {
      // 2) senão, pegue **só o primeiro** vídeo/áudio (ou whicever)
      const media = assets.find(
        (a) => a.type === "video" || a.type === "audio"
      )!;
      setScannedImages([]); // limpa câmera
      setSelectedFile(media); // passamos um único objeto
    }

    setThereIsFile(true);
    setShowLoading(false);
  };

  const pickFromFiles = async () => {
    setShowLoading(true);
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });
    if (result.canceled) {
      setShowLoading(false); 
    }
    if (!result.canceled) {
      setSelectedFile(result.assets[0]);
      setThereIsFile(true);
      setShowLoading(false);
    }
  };

  const createPdfFromImages = async (
    images: { uri: string; mimeType?: string }[]
  ) => {
    const pdfDoc = await PDFDocument.create();

    for (const img of images) {
      const base64 = await FileSystem.readAsStringAsync(img.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const buffer = Buffer.from(base64, "base64");

      let embeddedImage;
      if (
        img.mimeType?.includes("png") ||
        img.uri.toLowerCase().endsWith(".png")
      ) {
        embeddedImage = await pdfDoc.embedPng(buffer);
      } else {
        embeddedImage = await pdfDoc.embedJpg(buffer);
      }

      const page = pdfDoc.addPage([embeddedImage.width, embeddedImage.height]);
      page.drawImage(embeddedImage, {
        x: 0,
        y: 0,
        width: embeddedImage.width,
        height: embeddedImage.height,
      });
    }

    return await pdfDoc.save();
  };

  const getBase64FromBytes = (bytes: Uint8Array): string => {
    return Buffer.from(bytes).toString("base64");
  };

  const enviarArquivo = async () => {
    try {
      setUploading(true);
      setUploadSteps(["Iniciando envio do arquivo..."]);
      let fileBase64 = "",
        fileName = "upload_app.pdf",
        extensao = "",
        mimeType = "";

      appendStep("Verificando origem do arquivo...");
      let isVideo = false;
      let isAudio = false;
      if (!Array.isArray(selectedFile) && selectedFile) {
        isVideo = selectedFile.mimeType?.startsWith("video") ?? false;
        isAudio = selectedFile.mimeType?.startsWith("audio") ?? false;
      }
      if (scannedImages.length > 0) {
        appendStep("Criando PDF das imagens digitalizadas...");
        const pdfBytes = await createPdfFromImages(scannedImages);
        fileBase64 = getBase64FromBytes(pdfBytes);
        fileName = "documento_digitalizado.pdf";
        extensao = "pdf";
        mimeType = "application/pdf";
      } else if (Array.isArray(selectedFile)) {
        appendStep("Criando PDF das imagens da galeria...");
        const pdfBytes = await createPdfFromImages(selectedFile);
        fileBase64 = getBase64FromBytes(pdfBytes);
        fileName = "galeria_documento.pdf";
        extensao = "pdf";
        mimeType = "application/pdf";
      } else if (selectedFile) {
        appendStep("Lendo arquivo único...");
        const base64 = await FileSystem.readAsStringAsync(selectedFile.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const uint8Array = Buffer.from(base64, "base64");

        if (selectedFile.mimeType?.includes("image")) {
          appendStep("Convertendo imagem em PDF...");
          const pdfBytes = await createPdfFromImages([selectedFile]);
          fileBase64 = getBase64FromBytes(pdfBytes);
          extensao = "pdf";
          mimeType = "application/pdf";
        } else {
          fileBase64 = Buffer.from(uint8Array).toString("base64");
          mimeType = selectedFile.mimeType || "";
          extensao = mimeType.includes("pdf")
            ? "pdf"
            : mimeType.includes("video")
            ? "mp4"
            : "bin";
        }
        fileName = selectedFile.name || "arquivo";
      }

      appendStep("Montando payload...");
      const payload = {
        nome: fileName,
        arquivoAssinado: false,
        tipoDocumentoVO: { codigo: tipoDocumentoSelecionado.codigo },
        indiceArquivoVOs: tipoDocumentoSelecionado.listaIndice.map(
          (indice) => ({
            codigo: indice.codigo,
            nomeIndice: indice.nome,
            tipoIndice: indice.tipoIndice,
            descricao: indice.descricao || indice.nome,
            valor: valoresIndices[indice.codigo],
          })
        ),
        file_base64: fileBase64,
      };

      appendStep("Enviando para o servidor...");
      await api.post("/arquivo/upload", payload, {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Documento enviado com sucesso!"
            onClose={() => toast.close(id)}
          />
        ),
      });

      resetForm();
    } catch (error) {
      const title =
        error instanceof AppError
          ? error.message
          : "Erro ao enviar o documento";
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            action="error"
            id={id}
            title={title}
            onClose={() => toast.close(id)}
          />
        ),
      });
    } finally {
      setUploading(false);
      setUploadSteps([]);
    }
  };
  function getExtension(uri: string): string {
    const match = uri.match(/\.([^.\/]+)$/);
    return match ? match[1] : "";
  }

  const enviarVideoAudio = async () => {
    try {
      setUploading(true);
      setUploadSteps(["Iniciando envio de mídia..."]);

      // copia URI content:// sem extensão para cache
      let localUri = selectedFile.uri;
      const ext = getExtension(localUri);
      if (!localUri.startsWith("file://") || !ext) {
        const filename = selectedFile.name ?? `media.${ext || "bin"}`;
        const dest = `${FileSystem.cacheDirectory}${filename}`;
        await FileSystem.copyAsync({ from: localUri, to: dest });
        localUri = dest;
      }

      appendStep("Lendo arquivo de mídia...");
      const base64 = await FileSystem.readAsStringAsync(localUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const mimeType = selectedFile.mimeType ?? `application/${ext}`;
      const fileName = selectedFile.name ?? `media.${ext}`;

      appendStep("Montando payload de mídia...");
      const payload = {
        nome: fileName,
        arquivoAssinado: false,
        tipoDocumentoVO: { codigo: tipoDocumentoSelecionado.codigo },
        indiceArquivoVOs: (tipoDocumentoSelecionado.listaIndice || []).map(
          (indice: any) => ({
            codigo: indice.codigo,
            nomeIndice: indice.nome,
            tipoIndice: indice.tipoIndice,
            descricao: indice.descricao || indice.nome,
            valor: valoresIndices[indice.codigo],
          })
        ),
        file_base64: base64,
        mimeType,
      };

      appendStep("Enviando mídia para o servidor...");
      await api.post("/arquivo/upload", payload, {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Mídia enviada com sucesso!"
            onClose={() => toast.close(id)}
          />
        ),
      });

      resetForm(); // limpa states
    } catch (error) {
      console.error("Erro ao enviar mídia:", error);
      const title =
        error instanceof AppError ? error.message : "Erro ao enviar mídia";
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            action="error"
            id={id}
            title={title}
            onClose={() => toast.close(id)}
          />
        ),
      });
    } finally {
      setUploading(false);
      setUploadSteps([]);
    }
  };

  /** Reseta formulário */
  const resetForm = () => {
    setSelectedFile(null);
    setScannedImages([]);
    setValoresIndices({});
    setThereIsFile(false);
  };

  const todosIndicesPreenchidos = () => {
    if (!tipoDocumentoSelecionado?.listaIndice?.length) return false;

    return tipoDocumentoSelecionado.listaIndice.every((indice) =>
      valoresIndices[indice.codigo]?.trim()
    );
  };

  const fetchDepartamentos = async () => {
    try {
      const response = await api.get(`/departamento/listar`);
      setDepartamentos(response.data);
    } catch (error) {
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Não foi possível carregar os departamentos"
            onClose={() => toast.close(id)}
          />
        ),
      });
    }
  };

  const fetchTipoDocumento = async () => {
    if (!selectedDepartment) return;
    try {
      const response = await api.get(
        `/tipoDocumento/listar/${selectedDepartment}`
      );
      setTipoDocumento(response.data);
    } catch (error) {
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Não foi possível carregar os tipos de documento"
            onClose={() => toast.close(id)}
          />
        ),
      });
    }
  };

  const fetchIndicesPorTipoDocumento = async (tipoDocumentoId: number) => {
    try {
      const response = await api.get(`/tipoDocumento/obter/${tipoDocumentoId}`);
      setTipoDocumentoSelecionado(response.data);
    } catch (error) {
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Não foi possível carregar os índices do tipo de documento"
            onClose={() => toast.close(id)}
          />
        ),
      });
    }
  };

  useEffect(() => {
    fetchTipoDocumento();
  }, [selectedDepartment]);

  return (
    <>
        <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#E5E7EB" }} >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <VStack className="flex-1">
            {/* Header fixo */}
            <HStack className="pr-6 pt-2 justify-end mb-2">
              <TouchableOpacity onPress={() => navigator.goBack()}>
                <HStack className="gap-1">
                  <Feather name="x" size={24} color={"#9F9BA1"} />
                </HStack>
              </TouchableOpacity>
            </HStack>

            {/* Conteúdo scrollável */}
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <VStack className="flex-1 items-center gap-4 ">
                {/* Upload Box */}
                <Box className="mt-[5%] w-[90%] bg-gray-200 rounded-2xl p-4 shadow-md">
                  <VStack className="w-full gap-2">
                    <DropdownComponent
                      name="Departamento"
                      data={departamentos}
                      fetch={fetchDepartamentos}
                      onChange={(item) => {
                        setSelectedDepartment(item.codigo);
                        fetchTipoDocumento(item.codigo);
                      }}
                    />
                    <DropdownComponent
                      name="Tipo documento"
                      data={tipoDocumento}
                      fetch={fetchTipoDocumento}
                      onChange={(item) => {
                        fetchIndicesPorTipoDocumento(item.codigo);
                        setValoresIndices({});
                        setSelectedFile(null);
                        setScannedImages([]);
                      }}
                    />
                  </VStack>

                  {scannedImages.length === 0 ? (
                    <Button
                      className="mt-10 mb-4 mx-12 bg-blue-700 disabled:bg-gray-400"
                      onPress={openFileOptions}
                      title="Selecionar arquivo"
                      disabled={!tipoDocumentoSelecionado}
                    />
                  ) : (
                    <TouchableOpacity
                      className="justify-center items-center mt-9"
                      onPress={pickFromCamera}
                    >
                      <Feather
                        name="camera"
                        size={24}
                        color="#1e40af"
                        className="mt-4"
                      />
                    </TouchableOpacity>
                  )}
                </Box>

                {thereIsFile && (
                  <Box className="w-[90%] min-h-[150px] bg-gray-200 rounded-2xl shadow-md mt-4 p-4">
                    <VStack className="w-full items-center">
                      <Text className="text-gray-800 text-md font-semibold mb-4">
                        Pré-visualização
                      </Text>
                      <TouchableOpacity
                        className="items-center"
                        activeOpacity={0.8}
                        onPress={() => {
                          if (scannedImages.length > 0) {
                            navigator.navigate("VisualizarDocumento", {
                              images: scannedImages,
                              name: "",
                            });
                          } else if (Array.isArray(selectedFile)) {
                            navigator.navigate("VisualizarDocumento", {
                              images: selectedFile,
                              name: "",
                            });
                          } else if (
                            selectedFile?.mimeType?.includes("image")
                          ) {
                            navigator.navigate("VisualizarDocumento", {
                              images: [selectedFile],
                              name: "",
                            });
                          } else if (selectedFile?.mimeType?.includes("pdf")) {
                            navigator.navigate("VisualizarDocumento", {
                              url: selectedFile.uri,
                              name: selectedFile.name || "",
                            });
                          } else if (
                            selectedFile?.mimeType?.startsWith("video") ||
                            selectedFile?.mimeType?.startsWith("audio")
                          ) {
                            navigator.navigate("VisualizarDocumento", {
                              mediaUri: selectedFile.uri,
                              mimeType: selectedFile.mimeType!,
                              name: selectedFile.name || "",
                            });
                          }
                        }}
                      >
                        {/* Miniatura / ícone */}
                        {Array.isArray(selectedFile) ? (
                          <Image
                            source={{ uri: selectedFile[0].uri }}
                            style={{
                              width: 200,
                              height: 200,
                              resizeMode: "contain",
                            }}
                          />
                        ) : selectedFile?.mimeType?.includes("image") ? (
                          <Image
                            source={{ uri: selectedFile.uri }}
                            style={{
                              width: 200,
                              height: 200,
                              resizeMode: "contain",
                            }}
                          />
                        ) : selectedFile?.mimeType?.includes("pdf") ? (
                          <Text className="text-blue-600 underline"></Text>
                        ) : null}

                        {/* Texto correto para mídia vs documento */}
                        {selectedFile?.mimeType?.startsWith("video") ||
                        selectedFile?.mimeType?.startsWith("audio") ? (
                          <Text className="text-blue-600 text-md font-semibold mt-2">
                            Visualizar mídia
                          </Text>
                        ) : (
                          <Text className="text-blue-600 text-md font-semibold mt-2">
                            Visualizar Tudo
                          </Text>
                        )}
                      </TouchableOpacity>
                    </VStack>
                  </Box>
                )}
                {thereIsFile && (
                  <Box className="w-[90%] bg-gray-200 rounded-2xl shadow-md mt-4 p-4 mb-6">
                    {tipoDocumentoSelecionado?.listaIndice?.length > 0 && (
                      <VStack className="mt-4">
                        {tipoDocumentoSelecionado.listaIndice.map((indice) => (
                          <VStack key={indice.codigo} className="mb-2">
                            <Text className="text-gray-800 text-md font-semibold mb-1">
                              {indice.nome}:
                            </Text>
                            <Input
                              className="mb-5"
                              key={indice.codigo}
                              placeholder="Informe o valor"
                              keyboardType={
                                indice.tipoIndice === "VALOR"
                                  ? "numeric"
                                  : "default"
                              }
                              maxLength={30}
                              value={valoresIndices[indice.codigo] || ""}
                              onChangeText={(text) =>
                                setValoresIndices((prev) => ({
                                  ...prev,
                                  [indice.codigo]: text,
                                }))
                              }
                            />
                          </VStack>
                        ))}
                      </VStack>
                    )}

                    {tipoDocumentoSelecionado && (
                      <Button
                        className="mt-3 mx-12 bg-blue-700 disabled:bg-gray-400"
                        onPress={
                          // 1) se vier da câmera → enviarArquivo
                          hasScannedImages
                            ? enviarArquivo
                            : // 2) se for vídeo/áudio → enviarVideoAudio
                            isMedia
                            ? enviarVideoAudio
                            : // 3) se for imagem/PDF → enviarArquivo
                            isImageOrPdf
                            ? enviarArquivo
                            : // 4) senão, não faz nada
                              () => {}
                        }
                        title={
                          hasScannedImages || isImageOrPdf
                            ? "Enviar documento"
                            : isMedia
                            ? "Enviar mídia"
                            : "Enviar"
                        }
                        disabled={
                          // só habilita se for imagem/PDF ou se tiver índices preenchidos
                          hasScannedImages
                            ? !todosIndicesPreenchidos()
                            : isImageOrPdf
                            ? !todosIndicesPreenchidos()
                            : !isMedia
                        }
                      />
                    )}
                  </Box>
                )}
              </VStack>
              <VStack className="mb-80" />
            </ScrollView>
          </VStack>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <Modal transparent visible={uploading} animationType="fade">
        <Center className="flex-1 bg-black/50 px-6">
          <Box className="w-full p-6 bg-white rounded-2xl items-center">
            <ActivityIndicator size="large" color="#1e40af" />
            <VStack className="mt-4 w-full gap-1 items-center">
              {uploadSteps.map((step, i) => (
                <Text key={i} className="text-gray-600 text-sm text-center">
                  {step}
                </Text>
              ))}
            </VStack>
          </Box>
        </Center>
      </Modal>

      {showLoading && (
        <Box className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 justify-center items-center">
          <ActivityIndicator size="large" color="#FFFFFF" />
        </Box>
      )}
    </>
  );
};
