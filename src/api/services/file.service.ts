import { IResponseModel } from "@/utils/models/common/IResponseModel";
import { IFile } from "@/utils/models/file/IFile";
import { IFileUploadRequestModel } from "@/utils/models/file/IFileUploadRequestModel";
import Endpoint from "../endpoints/endpoint";
import { axiosInstance } from "../middleware/middleware";

export class FileService {
  public static readonly upload = async (payload: IFileUploadRequestModel) => {
    const form = new FormData();
    form.append("File", payload.file);
    form.append("Name", payload.name);
    try {
      const response: IResponseModel<IFile> = await axiosInstance.post(
        Endpoint.File,
        form
      );
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  public static readonly updateObject = async (
    id: string,
    objectId: string
  ) => {
    try {
      const response: IResponseModel<IFile> = await axiosInstance.patch(
        Endpoint.File + `/${id}/objectId/${objectId}`
      );
      return response;
    } catch (error) {
      console.error("Error making request:", error);
    }
  };
}
