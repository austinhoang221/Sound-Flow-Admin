import { IResponseModel } from "./models/common/IResponseModel";

export function checkResponseStatus<T>(
  response: IResponseModel<T> | undefined
) {
  return (
    response && response?.data && response?.code >= 200 && response?.code < 400
  );
}
