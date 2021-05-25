export const refetchReducer = (state = { fetchValue: null }, action) => {
  switch (action.type) {
    case "cloud":
      return { fetchValue: "cloud" };
    case "earnings":
      return { fetchValue: "earnings" };
    case "toggle":
      return { fetchValue: null };
    default:
      return state;
  }
};
