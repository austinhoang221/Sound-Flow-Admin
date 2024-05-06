import { IAlbum } from "@/utils/models/album/IAlbum";
import { IPaginateRequestModel } from "@/utils/models/common/IPaginateRequestModel";
import { IPaginateResponseModel } from "@/utils/models/common/IPaginateResponseModel";
import { IResponseModel } from "@/utils/models/common/IResponseModel";
import Endpoint from "../endpoints/endpoint";
import { axiosInstance } from "../middleware/middleware";

export class AlbumService {
  public static readonly getPaginate = async (
    payload: IPaginateRequestModel
  ) => {
    try {
      let request =
        Endpoint.Album +
        `?currentPage=${payload.currentPage}&pageSize=${payload.pageSize}`;
      if (payload.filter) request += `&filter=${payload.filter}`;
      const response: IPaginateResponseModel<IResponseModel<IAlbum>> =
        await axiosInstance.get(request);
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  public static readonly create = async (payload: IAlbum) => {
    try {
      const response: IResponseModel<IAlbum> = await axiosInstance.post(
        Endpoint.Album,
        payload
      );
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  public static readonly update = async (id: string, payload: IAlbum) => {
    try {
      const response: IResponseModel<IAlbum> = await axiosInstance.put(
        Endpoint.Album + "/" + id,
        payload
      );
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  public static readonly get = async (id: string) => {
    try {
      const response: IResponseModel<IAlbum> = await axiosInstance.get(id);
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  public static readonly deleteMany = async (ids: string[]) => {
    try {
      const response: IResponseModel<IAlbum> = await axiosInstance.post(
        Endpoint.Album + "/delete-many",
        ids
      );
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };
}
