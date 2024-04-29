import { ILoginModel } from "@/utils/models/ILoginModel";
import { IResponseModel } from "@/utils/models/IResponseModel";
import { IUser } from "@/utils/models/IUser";
import Endpoint from "../endpoints/endpoint";
import { axiosInstance } from "../middleware/middleware";

export class AuthenticationService {
  public static readonly logIn = async (payload: ILoginModel) => {
    try {
      const response: IResponseModel<IUser> = await axiosInstance.post(
        Endpoint.login,
        payload
      );
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };
}
