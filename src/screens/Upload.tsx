import { useEffect, useState } from "react";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { Box } from "@/components/ui/box";
import DropdownComponent from "@components/DropdownComponent";
import * as DocumentPicker from "expo-document-picker";
import { AppError } from "@utils/AppError";
import { useToast } from "@/components/ui/toast";
import { ToastMessage } from "@components/ToastMessage";
import { api } from "@services/api";import * as ImagePicker from "expo-image-picker";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

export const Upload = () => {
  const navigator = useNavigation<AppNavigationRoutesProps>();
  const toast = useToast();

  const [departamentos, setDepartamentos] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
  const [tipoDocumento, setTipoDocumento] = useState([]);
  const [tipoDocumentoSelecionado, setTipoDocumentoSelecionado] = useState<any>(null);

  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [thereIsFile, setThereIsFile] = useState(false);
  const [valoresIndices, setValoresIndices] = useState<Record<number, string>>({});
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
    Alert.alert("Permissão negada", "É necessário permitir o uso da câmera para digitalizar documentos.");
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
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
      mediaTypes: ['images', 'videos'],
      allowsMultipleSelection: true,
      base64: true,
    });
    if (!result.canceled) {
      setSelectedFile(result.assets);
      setThereIsFile(true);
    }
  };

  const pickFromFiles = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true });
    if (!result.canceled) {
      setSelectedFile(result.assets[0]);
      setThereIsFile(true);
    }
  };

  const createPdfFromImages = async (images: { uri: string }[]) => {
    const pdfDoc = await PDFDocument.create();
    for (const img of images) {
      const response = await fetch(img.uri);
      const buffer = await response.arrayBuffer();
      const image = await pdfDoc.embedJpg(buffer);
      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    }
    return await pdfDoc.save();
  };

  const getBase64FromBytes = (bytes: Uint8Array): string => {
    const binary = String.fromCharCode(...bytes);
    return btoa(binary);
  };

  const enviarPdf = async () => {
    const pdfBytes = await createPdfFromImages(scannedImages);
    const base64 = getBase64FromBytes(pdfBytes);

    await api.post("/upload", {
      tipoDocumento: tipoDocumentoSelecionado.codigo,
      arquivoBase64: base64,
      nomeArquivo: "documento.pdf",
      extensao: "pdf",
      valores: [...valoresIndices],
    });
  };

  const fetchDepartamentos = async () => {
    try {
      const response = await api.get(`/departamento/listar`);
      setDepartamentos(response.data);
    } catch (error) {
      toast.show({
        placement: "top",
        render: ({ id }) => <ToastMessage id={id} title="Não foi possível carregar os departamentos" onClose={() => toast.close(id)} />,
      });
    }
  };

  const fetchTipoDocumento = async () => {
    if (!selectedDepartment) return;
    try {
      const response = await api.get(`/tipoDocumento/listar/${selectedDepartment}`);
      setTipoDocumento(response.data);
    } catch (error) {
      toast.show({
        placement: "top",
        render: ({ id }) => <ToastMessage id={id} title="Não foi possível carregar os tipos de documento" onClose={() => toast.close(id)} />,
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
        render: ({ id }) => <ToastMessage id={id} title="Não foi possível carregar os índices do tipo de documento" onClose={() => toast.close(id)} />,
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
          <VStack className="flex-1 items-center gap-4">
            {/* Upload Box */}
            <Box className="mt-[5%] w-[90%] min-h-[40%] bg-gray-200 rounded-2xl p-4 shadow-md">
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

              {tipoDocumentoSelecionado && (
                <Button
                  className="mt-10 mx-12 bg-blue-700"
                  onPress={openFileOptions}
                  title="Selecionar arquivo"
                />
              )}
            </Box>

            {thereIsFile && (
  <Box className="w-[90%] min-h-[150px] bg-gray-200 rounded-2xl shadow-md mt-4 p-4">
    <VStack className="w-full items-center">
      {/* Preview e redirecionamento */}
      <Text className="text-gray-800  text-md font-semibold mb-4">Pré-visualização</Text>
      <TouchableOpacity
      className="items-center"
        onPress={() => {
          // Caso tenha imagens escaneadas (câmera)
          if (scannedImages.length > 0) {
            navigator.navigate("VisualizarDocumento", {
              images: scannedImages,
              name: "Pré-visualização",
            });
          }
          // Caso tenha múltiplos arquivos selecionados da galeria
          else if (Array.isArray(selectedFile)) {
            navigator.navigate("VisualizarDocumento", {
              images: selectedFile,
              name: "Pré-visualização",
            });
          }
          // Caso seja um único arquivo (imagem ou PDF)
          else if (selectedFile?.mimeType?.includes("image")) {
            navigator.navigate("VisualizarDocumento", {
              images: [selectedFile],
              name: "Pré-visualização",
            });
          } else if (selectedFile?.mimeType?.includes("pdf")) {
            navigator.navigate("VisualizarDocumento", {
              url: selectedFile.uri,
              name: selectedFile.name || "documento.pdf",
            });
          }
        }}
        activeOpacity={0.8}
      >
        {/* Renderização visual */}
        {Array.isArray(selectedFile) ? (
          <Image
            source={{ uri: selectedFile[0].uri }}
            style={{ width: 200, height: 200, resizeMode: "contain" }}
          />
        ) : selectedFile?.mimeType?.includes("image") ? (
          <Image
            source={{ uri: selectedFile.uri }}
            style={{ width: 200, height: 200, resizeMode: "contain" }}
          />
        ) : selectedFile?.mimeType?.includes("pdf") ? (
          <Text className="text-blue-600 underline">Visualizar PDF</Text>
        ) : scannedImages.length > 0 ? (
          <Image
            source={{ uri: scannedImages[0].uri }}
            style={{ width: 200, height: 200, resizeMode: "contain" }}
          />
        ) : null}
      <Text className="text-blue-600 text-md font-semibold mt-2 ">Visualizar Tudo</Text>
      </TouchableOpacity>
    </VStack>
  </Box>
)}
            {selectedFile && (
            <Box className="w-[90%] bg-gray-200 rounded-2xl shadow-md mt-4 p-4 mb-6">
              {thereIsFile && tipoDocumentoSelecionado?.listaIndice?.length > 0 && (
                <VStack className="mt-4">
                  {tipoDocumentoSelecionado.listaIndice.map((indice) => (
                    <Input
                      className="mb-5"
                      key={indice.codigo}
                      placeholder={indice.descricao || indice.nome}
                      keyboardType={
                        indice.tipoIndice === "VALOR" ? "numeric" : "default"
                      }
                      value={valoresIndices[indice.codigo] || ""}
                      onChangeText={(text) =>
                        setValoresIndices((prev) => ({
                          ...prev,
                          [indice.codigo]: text,
                        }))
                      }
                    />
                  ))}
                </VStack>
              )}

              {thereIsFile && tipoDocumentoSelecionado && (
                <Button onPress={enviarPdf} title="Enviar documento" />
              )}
            </Box>
            )}
          </VStack>
        </ScrollView>
      </VStack>
    </KeyboardAvoidingView>
  </SafeAreaView>
);
};