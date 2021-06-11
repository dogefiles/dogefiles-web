import { combineReducers } from "redux";
import { demoReducer } from "./demoReducer";
import { uploadManagerReducer } from "./s3Reducer";
import { refetchReducer } from "./refetchReducer";

const reducers = combineReducers({
  demo: demoReducer,
  uploadManager: uploadManagerReducer,
  refetchR: refetchReducer,
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGOUT":
      return reducers(undefined, action);
    default:
      return reducers(state, action);
  }
};

// export default reducers;
export default rootReducer;
