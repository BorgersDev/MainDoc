import { useEffect, useState } from "react";
import { SafeAreaView } from "@/components/ui/safe-area-view";
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
  const [valoresIndices, setValoresIndices] = useState<Record<number, string>>(
    {}
  );
  const [scannedImages, setScannedImages] = useState<any[]>([]);

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
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      const image = result.assets[0];
      setScannedImages((prev) => [...prev, image]);
      setThereIsFile(true);
    }
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsMultipleSelection: true,
      base64: true,
    });
    if (!result.canceled) {
      setSelectedFile(result.assets);
      setThereIsFile(true);
    }
  };

  const pickFromFiles = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });
    if (!result.canceled) {
      setSelectedFile(result.assets[0]);
      setThereIsFile(true);
    }
  };

  const createPdfFromImages = async (images: { uri: string; mimeType?: string }[]) => {
  const pdfDoc = await PDFDocument.create();

  for (const img of images) {
    const response = await fetch(img.uri);
    const buffer = await response.arrayBuffer();

    let embeddedImage;
    if (img.mimeType?.includes("png") || img.uri.toLowerCase().endsWith(".png")) {
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
    console.log("⏳ Iniciando envio do arquivo...");

    let fileBase64 = "";
    let fileName = "upload_app.pdf";
    let extensao = "";
    let mimeType = "";

    console.log("📦 Estado atual:", {
      scannedImages,
      selectedFile,
    });

    if (scannedImages.length > 0) {
      console.log("📸 Criando PDF das imagens digitalizadas...");
      try {
        const pdfBytes = await createPdfFromImages(scannedImages);
        fileBase64 = getBase64FromBytes(pdfBytes);
        fileName = "documento_digitalizado.pdf";
        extensao = "pdf";
        mimeType = "application/pdf";
      } catch (err) {
        console.error("❌ Erro ao criar PDF das imagens da câmera:", err);
        throw err;
      }
    } else if (Array.isArray(selectedFile)) {
      console.log("🖼️ Criando PDF das imagens da galeria...");
      try {
        const pdfBytes = await createPdfFromImages(selectedFile);
        fileBase64 = getBase64FromBytes(pdfBytes);
        fileName = "galeria_documento.pdf";
        extensao = "pdf";
        mimeType = "application/pdf";
      } catch (err) {
        console.error("❌ Erro ao criar PDF das imagens da galeria:", err);
        throw err;
      }
    } else if (selectedFile) {
      console.log("📁 Lendo arquivo único (pdf, imagem, vídeo, áudio...)");
      try {
        const response = await fetch(selectedFile.uri);
        const buffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(buffer);

        // Se for imagem, converte para PDF
        if (selectedFile.mimeType?.includes("image")) {
          console.log("🧾 Convertendo imagem única em PDF...");
          const pdfBytes = await createPdfFromImages([selectedFile]);
          fileBase64 = getBase64FromBytes(pdfBytes);
          extensao = "pdf";
          mimeType = "application/pdf";
        } else {
          fileBase64 = Buffer.from(uint8Array).toString("base64");
          mimeType = selectedFile.mimeType || "";
          if (mimeType.includes("pdf")) extensao = "pdf";
          else if (mimeType.includes("video")) extensao = "mp4";
          else if (mimeType.includes("audio")) extensao = "mp3";
          else extensao = "bin";
        }

        fileName = selectedFile.name || "arquivo";
      } catch (err) {
        console.error("❌ Erro ao ler o arquivo:", err);
        throw err;
      }
    }

    const payload = {
      nome: fileName,
      arquivoAssinado: false,
      tipoDocumentoVO: {
        codigo: tipoDocumentoSelecionado.codigo,
      },
      indiceArquivoVOs: tipoDocumentoSelecionado.listaIndice.map((indice) => ({
        codigo: indice.codigo,
        nomeIndice: indice.nome,
        tipoIndice: indice.tipoIndice,
        descricao: indice.descricao || indice.nome,
        valor: valoresIndices[indice.codigo],
      })),
      file_base64: fileBase64,
    };

    console.log("🧾 Enviando para /upload com headers:", api.defaults.headers.common);
    console.log("📤 Payload JSON:", JSON.stringify(payload, null, 2));


    const response = await api.post("/upload", payload, {
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
    console.log("✅ Resposta da API:", response.data);
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

    // Reset
    setSelectedFile(null);
    setScannedImages([]);
    setValoresIndices({});
    setThereIsFile(false);
  } catch (error) {
   console.log("❌ Erro ao enviar:", {
    responseData: error?.response?.data,
    status: error?.response?.status,
    headers: error?.response?.headers,
    message: error?.message,
  });

    toast.show({
      placement: "top",
      render: ({ id }) => (
        <ToastMessage
          action="error"
          id={id}
          title="Erro ao enviar o documento"
          onClose={() => toast.close(id)}
        />
      ),
    });
  }
};

  const todosIndicesPreenchidos = () => {
  if (!tipoDocumentoSelecionado?.listaIndice?.length) return false;

  return tipoDocumentoSelecionado.listaIndice.every(
    (indice) => valoresIndices[indice.codigo]?.trim()
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
    <SafeAreaView className="flex-1 bg-gray-200">
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
                    {/* Preview e redirecionamento */}
                    <Text className="text-gray-800  text-md font-semibold mb-4">
                      Pré-visualização
                    </Text>
                    <TouchableOpacity
                      className="items-center"
                      onPress={() => {
                        // Caso tenha imagens escaneadas (câmera)
                        if (scannedImages.length > 0) {
                          navigator.navigate("VisualizarDocumento", {
                            images: scannedImages,
                            name: "",
                          });
                        }
                        // Caso tenha múltiplos arquivos selecionados da galeria
                        else if (Array.isArray(selectedFile)) {
                          navigator.navigate("VisualizarDocumento", {
                            images: selectedFile,
                            name:"",
                          });
                        }
                        // Caso seja um único arquivo (imagem ou PDF)
                        else if (selectedFile?.mimeType?.includes("image")) {
                          navigator.navigate("VisualizarDocumento", {
                            images: [selectedFile],
                            name:"",
                          });
                        } else if (selectedFile?.mimeType?.includes("pdf")) {
                          navigator.navigate("VisualizarDocumento", {
                            url: selectedFile.uri,
                            name: selectedFile.name || "",
                          });
                        }
                      }}
                      activeOpacity={0.8}
                    >
                      {/* Renderização visual */}
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
                        <Text className="text-blue-600 underline">
                          Visualizar PDF
                        </Text>
                      ) : scannedImages.length > 0 ? (
                        <Image
                          source={{ uri: scannedImages[0].uri }}
                          style={{
                            width: 200,
                            height: 200,
                            resizeMode: "contain",
                          }}
                        />
                      ) : null}
                      <Text className="text-blue-600 text-md font-semibold mt-2 ">
                        Visualizar Tudo
                      </Text>
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
                          <Text className="text-gray-800 text-md font-semibold mb-1">{indice.nome}:</Text>
                          <Input
                            className="mb-5"
                            key={indice.codigo}
                            placeholder="Informe o valor"
                            keyboardType={
                              indice.tipoIndice === "VALOR"
                                ? "numeric"
                                : "default"
                            }
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
                    <Button className="mt-3 mx-12 bg-blue-700 disabled:bg-gray-400" onPress={enviarArquivo} title="Enviar documento" disabled={!todosIndicesPreenchidos()} />
                  )}
                </Box>
              )}
            </VStack>
              <VStack className="mb-80"/>
          </ScrollView>
        </VStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
