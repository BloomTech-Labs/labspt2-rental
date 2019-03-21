import { merge } from "lodash";
const env = process.env.NODE_ENV || "development";

const baseConfig = {
  env,
  isDev: env === "development",
  isTest: env === "testing",
  isProd: env === "production"
};

let envConfig = {};

switch (env) {
  case "dev":
  case "development":
    envConfig = require("./dev").config;
    break;
  case "test":
  case "testing":
    envConfig = require("./testing").config;
    break;
  case "prod":
  case "production":
    envConfig = require("./prod").config;
    break;
  default:
    envConfig = require("./dev").config;
}

export default merge(baseConfig, envConfig);
