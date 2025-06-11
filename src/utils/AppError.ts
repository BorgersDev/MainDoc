export class AppError extends Error {
  response?: any;
  status?: number;
  headers?: any;

  constructor(
    message: string,
    response?: any,
    status?: number,
    headers?: any
  ) {
    super(message);
    this.response = response;
    this.status = status ?? response?.status;
    this.headers = headers ?? response?.headers;
  }
}