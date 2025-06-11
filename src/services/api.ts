import axios from "axios";
import { AppError } from "@utils/AppError";

const api = axios.create({
    baseURL: 'https://maindoc.com.br'
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(
        new AppError(
          error.response.data.mensagem,
          error.response,
          error.response.status,
          error.response.headers
        )
      );
    } else {
      console.log(error);
      return Promise.reject(
        new AppError(
          "Erro no servidor. Tente novamente mais tarde.",
          error.response
        )
      );
    }
  }
);

export { api }
