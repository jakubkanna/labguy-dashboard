/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type The$OidSchema = string;
export type TheTitleSchema = string;
export type TheDescriptionSchema = string;
export type TheApiUrlSchema = string;
export type TheEnableCldSchema = boolean;
export type TheApiUrlSchema1 = string;
export type TheApiKeySchema = string;
export type TheCloudNameSchema = string;
export type ThePresetNameSchema = string;
export type TheHttpsProtocolSchema = boolean;
export type TheHtmlSchema = string;
export type The$OidSchema1 = string;
export type TheTitleSchema1 = string;
export type TheHtmlSchema1 = string;
export type TheAdditionalSchema = ASchema1[];
export type The$OidSchema2 = string;
export type TheEmailSchema = string;
export type TheProfileUrlSchema = string;
export type TheUsernameSchema = string;
export type The$OidSchema3 = string;
export type TheSocialmediaSchema = ASchema3[];
export type TheContactSchema = ASchema2[];
export type The$DateSchema = string;
export type The_VSchema = number;
export type RootSchema = ASchema[];

export interface ASchema {
  _id: TheIdSchema;
  general: TheGeneralSchema;
  profile: TheProfileSchema;
  timestamp: TheTimestampSchema;
  __v: The_VSchema;
  [k: string]: unknown;
}
export interface TheIdSchema {
  $oid: The$OidSchema;
  [k: string]: unknown;
}
export interface TheGeneralSchema {
  homepage: TheHomepageSchema;
  apis: TheApisSchema;
  security: TheSecuritySchema;
  [k: string]: unknown;
}
export interface TheHomepageSchema {
  metadata: TheMetadataSchema;
  [k: string]: unknown;
}
export interface TheMetadataSchema {
  title: TheTitleSchema;
  description: TheDescriptionSchema;
  [k: string]: unknown;
}
export interface TheApisSchema {
  server: TheServerSchema;
  cld: TheCldSchema;
  [k: string]: unknown;
}
export interface TheServerSchema {
  api_url: TheApiUrlSchema;
  [k: string]: unknown;
}
export interface TheCldSchema {
  enable_cld: TheEnableCldSchema;
  api_url: TheApiUrlSchema1;
  api_key: TheApiKeySchema;
  cloud_name: TheCloudNameSchema;
  preset_name: ThePresetNameSchema;
  [k: string]: unknown;
}
export interface TheSecuritySchema {
  https_protocol: TheHttpsProtocolSchema;
  [k: string]: unknown;
}
export interface TheProfileSchema {
  bio: TheBioSchema;
  contact: TheContactSchema;
  [k: string]: unknown;
}
export interface TheBioSchema {
  statement: TheStatementSchema;
  additional: TheAdditionalSchema;
  [k: string]: unknown;
}
export interface TheStatementSchema {
  html: TheHtmlSchema;
  [k: string]: unknown;
}
export interface ASchema1 {
  _id: TheIdSchema1;
  title: TheTitleSchema1;
  html: TheHtmlSchema1;
  [k: string]: unknown;
}
export interface TheIdSchema1 {
  $oid: The$OidSchema1;
  [k: string]: unknown;
}
export interface ASchema2 {
  _id: TheIdSchema2;
  email: TheEmailSchema;
  socialmedia: TheSocialmediaSchema;
  [k: string]: unknown;
}
export interface TheIdSchema2 {
  $oid: The$OidSchema2;
  [k: string]: unknown;
}
export interface ASchema3 {
  instagram: TheInstagramSchema;
  _id: TheIdSchema3;
  [k: string]: unknown;
}
export interface TheInstagramSchema {
  profile_url: TheProfileUrlSchema;
  username: TheUsernameSchema;
  [k: string]: unknown;
}
export interface TheIdSchema3 {
  $oid: The$OidSchema3;
  [k: string]: unknown;
}
export interface TheTimestampSchema {
  $date: The$DateSchema;
  [k: string]: unknown;
}
