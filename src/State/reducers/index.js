import { combineReducers } from "redux";
import { demoReducer } from "./demoReducer";
import { uploadManagerReducer } from "./s3Reducer";

const reducers = combineReducers({
  demo: demoReducer,
  uploadManager: uploadManagerReducer,
});

export default reducers;
