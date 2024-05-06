import { IPaginateRequestModel } from "@/utils/models/common/IPaginateRequestModel";
import { IPaginateResponseModel } from "@/utils/models/common/IPaginateResponseModel";
import { IResponseModel } from "@/utils/models/common/IResponseModel";
import { ITrack } from "@/utils/models/track/ITrack";
import Endpoint from "../endpoints/endpoint";
import { axiosInstance } from "../middleware/middleware";

export class TrackService {
  public static readonly getPaginate = async (
    payload: IPaginateRequestModel
  ) => {
    try {
      let request =
        Endpoint.Track +
        `?currentPage=${payload.currentPage}&pageSize=${payload.pageSize}`;
      if (payload.filter) request += `&filter=${payload.filter}`;
      const response: IPaginateResponseModel<IResponseModel<ITrack>> =
        await axiosInstance.get(request);
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  public static readonly create = async (payload: ITrack) => {
    try {
      const response: IResponseModel<ITrack> = await axiosInstance.post(
        Endpoint.Track,
        payload
      );
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  public static readonly update = async (id: string, payload: ITrack) => {
    try {
      const response: IResponseModel<ITrack> = await axiosInstance.put(
        Endpoint.Track + "/" + id,
        payload
      );
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  public static readonly get = async (id: string) => {
    try {
      const response: IResponseModel<ITrack> = await axiosInstance.get(id);
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  public static readonly deleteMany = async (ids: string[]) => {
    try {
      const response: IResponseModel<ITrack> = await axiosInstance.post(
        Endpoint.Track + "/delete-many",
        ids
      );
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };
}
