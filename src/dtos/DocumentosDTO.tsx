export type DocumentosDTO = {
    list: {
      codigo: number;
      nome: string;
      nomeRepositorio: string;
      arquivoAssinado: boolean;
      usuarioAssinatura: {
        codigo: number;
        nome: string;
      };
      dataAssinatura: string;
      arquivoConvertidoPdfa: boolean;
      conformidadePdfa: string;
      usuarioConversaoPdfa: {
        codigo: number;
        nome: string;
      };
      dataConversaoPdfa: string;
      arquivoExcluido: boolean;
      usuarioExclusao: {
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
          valor?: string;   // aparece só em alguns itens
        }[];
        pastaBaseArquivo: string;
      };
      empresaVO: {
        codigo: number;
      };
      indiceArquivoVOs: {
        codigo?: number;    // alguns itens não têm código
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
      tamanhoKB: number;
      tamanhoMB: number;
      ambienteBlockchain: string;
      registradoBlockchain: boolean;
      codigoIntegracaoBlockchain: number;
      privadoBlockchain: boolean;
      dataRegistroBlockchain: string;
      usuarioRegistroBlockchain: {
        codigo: number;
        nome: string;
      };
      paginas: number;
      convertidoOCR: boolean;
      usuarioConversaoOCR: {
        codigo: number;
      };
    }[];
  };