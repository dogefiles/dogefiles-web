const isEnvDev = process.env.NODE_ENV === "development";

export const DOGEFILES_AVATAR_BUCKET = isEnvDev ? "dogefiles-avatar-dev" : "dogefiles-avatar";
export const DOGEFILES_MAIN_BUCKET = isEnvDev ? "dogefiles-main-dev" : "dogefiles-main";


export const S3_FILE_UPLOADS_URL =
  `https://s3.eu-central-1.wasabisys.com/${DOGEFILES_MAIN_BUCKET}/`;
export const S3_AVATAR_UPLOADS_URL =
  `https://s3.eu-central-1.wasabisys.com/${DOGEFILES_AVATAR_BUCKET}/`;
