export interface IFile {
  id: string;
  name: string;
  isActive: boolean;
  createdByUserId: string;
  lastModifiedByUserId: string;
  lastModifiedOnDate: string;
  createdOnDate: string;
  applicationId: string;
  objectId: string;
  type: string;
  filePath: string;
  absoluteUri: string;
  fileSize: number;
  storageProvider: string;
}
