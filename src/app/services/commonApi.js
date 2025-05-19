import axios from "axios";

axios.defaults.withCredentials = true;

export const commonApi = async (reqMethod, url, reqBody, reqHeader) => {
  try {
    const reqConfig = {
      method: reqMethod,
      url,
      data: reqBody,
      headers: reqHeader ? reqHeader : { "Content-Type": "application/json" },
      withCredentials: true, // Ensure credentials are included
    };

    const result = await axios(reqConfig);
    return result;
  } catch (err) {
    return err.response || { error: "Something went wrong", details: err };
  }
};
