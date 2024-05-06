import { IPaginateRequestModel } from "@/utils/models/common/IPaginateRequestModel";
import { IPaginateResponseModel } from "@/utils/models/common/IPaginateResponseModel";
import { IResponseModel } from "@/utils/models/common/IResponseModel";
import { IGenre } from "@/utils/models/genre/IGenre";
import Endpoint from "../endpoints/endpoint";
import { axiosInstance } from "../middleware/middleware";

export class GenreService {
  public static readonly getPaginate = async (
    payload: IPaginateRequestModel
  ) => {
    try {
      let request =
        Endpoint.Genre +
        `?currentPage=${payload.currentPage}&pageSize=${payload.pageSize}`;
      if (payload.filter) request += `&filter=${payload.filter}`;
      const response: IPaginateResponseModel<IResponseModel<IGenre>> =
        await axiosInstance.get(request);
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  public static readonly create = async (payload: IGenre) => {
    try {
      const response: IResponseModel<IGenre> = await axiosInstance.post(
        Endpoint.Genre,
        payload
      );
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  public static readonly update = async (id: string, payload: IGenre) => {
    try {
      const response: IResponseModel<IGenre> = await axiosInstance.put(
        Endpoint.Genre + "/" + id,
        payload
      );
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  public static readonly get = async (id: string) => {
    try {
      const response: IResponseModel<IGenre> = await axiosInstance.get(id);
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  public static readonly deleteMany = async (ids: string[]) => {
    try {
      const response: IResponseModel<IGenre> = await axiosInstance.post(
        Endpoint.Genre + "/delete-many",
        ids
      );
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };
}
