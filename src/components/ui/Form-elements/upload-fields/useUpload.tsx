import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { FileService } from "@/services/file/file.service";

type TypeUpload = (
  onChange: (url: string) => void,
  folder?: string
) => {
  uploadImage: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  isLoading: boolean;
};

export const useUpload: TypeUpload = (onChange, folder) => {
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync } = useMutation(
    "upload file",
    (data: FormData) => FileService.upload(data, folder),
    {
      onSuccess({ data }) {
        onChange(data[0].url);
      },
      onError(error) {
        console.error(error);
      },
    }
  );

  const uploadImage = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setIsLoading(true);
      const files = e.target.files;
      if (files?.length) {
        const fileArray = Array.from(files); // Convert FileList to an array
        for (const file of fileArray) {
          const formData = new FormData();
          formData.append("image", file);
          await mutateAsync(formData);
        }
        setIsLoading(false);
      }
    },
    [mutateAsync]
  );

  return useMemo(() => ({ uploadImage, isLoading }), [uploadImage, isLoading]);
};
