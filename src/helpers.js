export const getUrl = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return "http://localhost:3001";
  } else {
    return "https://todos-node-client.herokuapp.com";
  }
};
