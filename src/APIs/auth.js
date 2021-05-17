import Axios from "Utils/Axios";

export const userCheck = async userToken => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  return Axios.get("/auth", config);
};
