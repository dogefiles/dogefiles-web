import { combineReducers } from "redux";
import { demoReducer } from "./demoReducer";
import { uploadManagerReducer } from "./s3Reducer";
import { refetchReducer } from "./refetchReducer";

const reducers = combineReducers({
  demo: demoReducer,
  uploadManager: uploadManagerReducer,
  refetchR: refetchReducer,
});

export default reducers;
