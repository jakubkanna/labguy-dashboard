import { useCallback } from "react";
import { ImageInstance } from "../pages/Images";

const useImageUrl = () => {
  const getImageUrl = useCallback(
    (img: ImageInstance, additionalParams?: string) => {
      let baseUrl;
      if (false) {
        //change later
        baseUrl = img.cld_secure_url ? img.cld_secure_url : img.secure_url;
      } else {
        baseUrl = img.cld_url ? img.cld_url : img.url;
      }

      if (additionalParams) {
        return `${baseUrl}${additionalParams}`;
      } else {
        return baseUrl;
      }
    },
    []
  );

  return { getImageUrl };
};

export default useImageUrl;