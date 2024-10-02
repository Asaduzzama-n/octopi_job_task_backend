import { Server } from "http";
import app from "./app";
import config from "./config";

const port = config.port || 5000;

async function main() {
  const server: Server = app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log("Server is closed!");
      });
    }
    process.exit(1);
  };

  const unExpectedErrorHandler = (error: Error) => {
    console.log(`🚩 Unexpected error Handler: ${error}`);
    exitHandler();
  };

  process.on("uncaughtException", unExpectedErrorHandler);
  process.on("unhandledRejection", unExpectedErrorHandler);
}

main();
