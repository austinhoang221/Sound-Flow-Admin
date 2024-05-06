import { ILoginModel } from "@/utils/models/authenticate/ILoginModel";
import { IUser } from "@/utils/models/authenticate/IUser";
import { IResponseModel } from "@/utils/models/common/IResponseModel";
import Endpoint from "../endpoints/endpoint";
import { axiosInstance } from "../middleware/middleware";

export class AuthenticationService {
  public static readonly logIn = async (payload: ILoginModel) => {
    try {
      const response: IResponseModel<IUser> = await axiosInstance.post(
        Endpoint.Login,
        payload
      );
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };
}
