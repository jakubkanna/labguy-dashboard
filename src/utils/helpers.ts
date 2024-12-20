import { ImageRefSchema } from '@jakubkanna/labguy-front-schema';

const getImageUrl = (img: ImageRefSchema, additionalParams?: string) => {
  const baseUrl = img.cld_url;
  return additionalParams ? `${baseUrl}${additionalParams}` : baseUrl;
};

import { VideoRefSchema } from '@jakubkanna/labguy-front-schema';
import { MediaRef } from '../pages/Media';

const getThumbnail = (media: MediaRef) => {
  if (media?.mediaType === 'IMAGE') return getImageUrl(media as ImageRefSchema);
  if (media?.mediaType === 'VIDEO') return (media as VideoRefSchema).thumbnail;
  throw new Error(`Unsupported media type: ${media?.mediaType}`);
};

function isVideo(media: MediaRef) {
  return media?.mediaType === 'VIDEO';
}
function isImage(media: MediaRef) {
  return media?.mediaType === 'IMAGE';
}

function hasIdProperty<T>(item: T | undefined): item is T & { id: string } {
  return (
    item !== undefined &&
    typeof item === 'object' &&
    item !== null &&
    'id' in item &&
    typeof (item as { id: unknown }).id === 'string'
  );
}

export { getImageUrl, getThumbnail, isVideo, isImage, hasIdProperty };
