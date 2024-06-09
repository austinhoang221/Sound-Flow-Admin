import { FileService } from "@/api/services/file.service";
import { checkResponseStatus } from "@/utils/helpers";
import { IFile } from "@/utils/models/file/IFile";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
interface IImageUploadProps {
  src: string;
  afterUpload: (file: IFile) => void;
}
export const ImageUpload = (props: IImageUploadProps) => {
  const [file, setFile] = useState<IFile | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const onDropAccepted = (files: File[]) => {
    FileService.upload({ name: files?.[0].name, file: files?.[0] }).then(
      (res) => {
        if (checkResponseStatus(res) && res?.data) {
          setFile(res?.data);
          setIsDragActive(false);
          props.afterUpload(res?.data);
        }
      }
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: onDropAccepted,
  });

  return (
    <section
      className={`border-2 border-dashed border-blue-400 p-4 rounded-lg transform  transition-all duration-300 ease-in-out cursor-pointer ${
        isDragActive ? "bg-blue-100 border-blue-600" : ""
      }`}
    >
      <div
        {...getRootProps({
          className: `dropzone p-4 `,
        })}
      >
        <input {...getInputProps()} />
        <p className="text-blue-500">
          {isDragActive
            ? "Drop the files here ..."
            : "Drag 'n' drop or click to select file"}
        </p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
      {(file || props.src) && (
        <img
          width="200px"
          height="200px"
          className="ml-auto mr-auto"
          src={file?.absoluteUri || props.src}
          alt={file?.name}
        />
      )}
    </section>
  );
};
