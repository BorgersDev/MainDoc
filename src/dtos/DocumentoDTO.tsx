export type DocumentoDTO = {
  codigo: number;
  nome: string;
  nomeRepositorio: string;
  extensao: string;
  tamanhoKB: number;
  tamanhoMB: number;
  paginas: number;
  apresentarPreview: boolean;

  arquivoAssinado: boolean;
  arquivoExcluido: boolean;
  convertidoOCR: boolean;

  tipoDocumentoVO: {
    codigo: number;
    nome: string;
    tipoExtensao: string;
  };
};
