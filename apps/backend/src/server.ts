require("dotenv").config();

import express from "express";
import payload from "payload";
import config from "./payload.config";

const app = express();

const start = async () => {
  await payload.init({
    config,
    onInit: () => {
      payload.logger.info(`Admin URL: ${payload.getAdminURL()}`);
    },
  });

  app.listen(4000, () => {
    console.log(`🚀 Payload CMS running on http://localhost:4000`);
  });
};

start();
