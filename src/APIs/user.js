import Axios from "Utils/Axios";

export const userInfo = async userToken => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  const { data } = await Axios.get("/user/userInfo", config);
  return data;
};

export const updateAbout = async (userToken, about) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  const { data } = await Axios.put(
    "/user/updateAbout",
    {
      about,
    },
    config
  );
  return data;
};
