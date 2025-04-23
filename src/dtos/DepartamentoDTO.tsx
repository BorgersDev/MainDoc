export type DepartamentoDTO = {
    limitePorPagina: number;
    paginaAtual: number;
    valorConsulta: string;
    list: {
      codigoDepartamento: number;
      nome: string;
      qtdDoc: number;
    }[];
  };