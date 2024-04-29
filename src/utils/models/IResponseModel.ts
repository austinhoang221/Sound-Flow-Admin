import { StatusCode } from "../enums/statusCode";

export interface IResponseModel<T> {
  code: StatusCode;
  data: T;
  totalTime: number;
}
