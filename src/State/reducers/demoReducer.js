export const demoReducer = (state = { demo: 1 }, action) => {
  switch(action.type) {
    case "1":
      return { demo: 1 };
    case "2":
      return { demo: 2 };
    default:
      return state;
  }
}