export type UserDTO = {
    "nome": string,
    "codigoEmpresa": number,
    "nomeEmpresa": string,
    "tokenEmpresa": string,
    "tokenUsuario": string,
    "superUsuario": boolean,
    "permissaoAcessoMenu": {
        "menuAdministrativo": boolean,
        "configuracaoSistema": boolean,
        "departamento": boolean,
        "empresa": boolean,
        "tipoDocumento": boolean,
        "licenca": boolean,
        "perfilUsuario": boolean,
        "usuario": boolean,
        "menuSeguranca": boolean,
        "menuGestaoArquivos": boolean,
        "arquivo": boolean,
        "lixeira": boolean,
        "log": boolean,
        "digitalizarArquivos": boolean
    },
    "empresaVOs": [
        {
            "codigo": number,
            "nome": "string"
        }
    ]

}