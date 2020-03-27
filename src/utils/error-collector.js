import intl from "react-intl-universal";

import message from "antd/lib/message";
import "antd/lib/message/style/css";

const errorCollector = error => {
  if (!error) return null;

  const tmp =
    error &&
    error.response &&
    error.response.data &&
    error.response.data.message
      ? error.response.data.message
      : error.message;

  if (typeof tmp === "undefined" && error.toString() === "Cancel") {
    return message.error(intl.get("REQUEST_CANCELLED"));
  }

  if (process.env.NODE_ENV === "development") {
    message.error(intl.get("REQUEST_ERROR"));
    console.log("error:", error);
  }

  return null;
};

export default errorCollector;
