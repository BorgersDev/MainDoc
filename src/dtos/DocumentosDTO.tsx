export type DocumentoDTO = {
  codigo: number;
  nome: string;
  nomeRepositorio: string;
  extensao: string;
  apresentarPreview: boolean;

  arquivoAssinado: boolean;
  arquivoConvertidoPdfa: boolean;
  arquivoExcluido: boolean;
  convertidoOCR: boolean;
  conformidadePdfa: string;
  registradoBlockchain: boolean;
  privadoBlockchain: boolean;

  dataAssinatura: string;
  dataConversaoPdfa: string;
  dataRegistroBlockchain: string;

  paginas: number;
  tamanhoKB: number;
  tamanhoMB: number;

  usuarioAssinatura: {
    codigo: number;
    nome: string;
  };
  usuarioConversaoPdfa: {
    codigo: number;
    nome: string;
  };
  usuarioExclusao: {
    codigo: number;
  };
  usuarioRegistroBlockchain: {
    codigo: number;
    nome: string;
  };
  usuarioConversaoOCR: {
    codigo: number;
  };

  tipoDocumentoVO: {
    codigo: number;
    nome: string;
    tipoExtensao: string;
    tamanhoArquivo: number;
    faseCorrente: string;
    faseIntermediaria: string;
    faseDestinacaoFinal: string;
    tipoDestinacaoFinal: string;
    legislacao: string;
    departamentoVO: {
      codigo: number;
      nome: string;
    };
    listaIndice: {
      codigo: number;
      nome: string;
      descricao: string;
      tipoIndice: string;
      opcoesTipoIndice: string;
      valor?: string;
    }[];
    pastaBaseArquivo: string;
  };

  empresaVO: {
    codigo: number;
  };

  indiceArquivoVOs: {
    codigo?: number;
    nomeIndice: string;
    tipoIndice: string;
    descricao: string;
    valor?: string;
    opcoesTipoIndice?: string;
  }[];

  arquivoAssinaturaVOs: {
    codigo: number;
    arquivo: number;
    nome: string;
  }[];

  ambienteBlockchain: string;

  pdf: boolean;
  audio: boolean;
  video: boolean;
  html: boolean;
  imagem: boolean;
};
