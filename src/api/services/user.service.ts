import { IUser } from "@/utils/models/authenticate/IUser";
import { IPaginateRequestModel } from "@/utils/models/common/IPaginateRequestModel";
import { IPaginateResponseModel } from "@/utils/models/common/IPaginateResponseModel";
import { IResponseModel } from "@/utils/models/common/IResponseModel";
import Endpoint from "../endpoints/endpoint";
import { axiosInstance } from "../middleware/middleware";

export class UserService {
  public static readonly getPaginate = async (
    payload: IPaginateRequestModel
  ) => {
    try {
      let request =
        Endpoint.User +
        `?currentPage=${payload.currentPage}&pageSize=${payload.pageSize}`;
      if (payload.filter) request += `&filter=${payload.filter}`;
      const response: IPaginateResponseModel<IResponseModel<IUser>> =
        await axiosInstance.get(request);
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  public static readonly create = async (payload: IUser) => {
    try {
      const response: IResponseModel<IUser> = await axiosInstance.post(
        Endpoint.User,
        payload
      );
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  public static readonly update = async (id: string, payload: IUser) => {
    try {
      const response: IResponseModel<IUser> = await axiosInstance.put(
        Endpoint.User + "/" + id,
        payload
      );
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  public static readonly get = async (id: string) => {
    try {
      const response: IResponseModel<IUser> = await axiosInstance.get(id);
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };
}
