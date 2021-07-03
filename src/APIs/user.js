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

export const updateContact = async (userToken, contact) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const { data } = await Axios.put(
    "/user/updateContact",
    {
      contact,
    },
    config
  );
  return data;
};

export const updateContactVisibility = async (userToken, contactVisibility) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const { data } = await Axios.put(
    "/user/updateContactVisibility",
    {
      contactVisibility,
    },
    config
  );
  return data;
};
