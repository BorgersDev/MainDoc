export type TipoDocumentoDTO = {
    list: {
      codigoDepartamento: number;
      nome:               string;
      qtdDoc:             number;
      tipoDocumentoArquivoVOs: {
        codigo:             number;
        nome:               string;
        departamento:       string;
        codigoDepartamento: number;
        qtdDoc:             number;
      }[];
    }[];
    limitePorPagina: number;
    paginaAtual:     number;
    valorConsulta:   string;
  }