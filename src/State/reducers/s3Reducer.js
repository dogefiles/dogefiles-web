import { UPLOADS_ON, UPLOADS_OFF } from "State/constants";

export const uploadManagerReducer = (state = { files: [] }, action) => {
  switch (action.type) {
    case UPLOADS_ON:
      return { files: [...state.files, action.payload] };
    case UPLOADS_OFF:
      return { files: [] };
    default:
      return state;
  }
};
