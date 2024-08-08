/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface VideoRefSchema {
  etag?: string;
  mediaType?: "IMAGE" | "VIDEO" | "THREE_D";
  id?: string | null;
  vimeo_url?: string | null;
  sc_url?: string | null;
  yt_url?: string | null;
  title?: string;
  duration?: string | null;
  definition?: string | null;
  description?: string;
  thumbnail?: string | null;
  player_loop?: boolean;
  player_muted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  [k: string]: unknown;
}