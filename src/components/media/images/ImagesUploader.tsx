import { Dispatch, SetStateAction, useContext, useState } from "react";
import ImagesDropZone, { FileWithPreview } from "./ImagesDropZone";
import { Alert, AlertProps, AlertTitle, Grid } from "@mui/material";
import { AuthContext } from "../../../contexts/AuthContext";
import LoadingButton from "@mui/lab/LoadingButton";
import { ImageInstance, MediaInstance } from "../../../pages/Media";

interface ImagesUploaderProps {
  setMedia: Dispatch<SetStateAction<MediaInstance[]>>;
}

const ImagesUploader = ({ setMedia }: ImagesUploaderProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);

  const [uploading, setUploading] = useState(false);
  const { token } = useContext(AuthContext);

  const uploadImages = async () => {
    try {
      setUploading(true);
      setSnackbar({
        children: `Preparing images...`,
        severity: "info",
      });

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      setSnackbar({
        children: `Uploading images...`,
        severity: "info",
      });

      const response = await fetch("http://localhost:3000/api/images/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload to server");
      }

      const result = (await response.json()) as ImageInstance[];

      setSnackbar({
        children: "Images uploaded successfully.",
        severity: "success",
      });

      // Update the image list without adding duplicates
      setMedia((prevList) => {
        const newImages = result.filter((newImage) => {
          return !prevList.some((image) => {
            if ("public_id" in image) {
              return image.public_id === newImage.public_id;
            }
            return false;
          });
        });
        return [...newImages, ...prevList];
      });
    } catch (error) {
      if (error instanceof Error)
        setSnackbar({
          children: `Error during upload: ${error.message}`,
          severity: "error",
        });
    }

    setUploading(false);
    setFiles([]);
  };

  return (
    <Grid container spacing={2}>
      {/* First row */}
      <Grid item xs={12}>
        <ImagesDropZone files={files} setFiles={setFiles} />
      </Grid>

      {/* Second row */}
      {!!snackbar && snackbar.children && (
        <Grid item xs={12}>
          <Alert severity={snackbar.severity}>
            <AlertTitle>{snackbar.children}</AlertTitle>
          </Alert>
        </Grid>
      )}

      {/* Third row */}
      {files.length > 0 && (
        <Grid item xs={12}>
          <LoadingButton
            loading={uploading}
            onClick={uploadImages}
            disabled={uploading}>
            Upload
          </LoadingButton>
        </Grid>
      )}
    </Grid>
  );
};

export default ImagesUploader;