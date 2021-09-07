import "reflect-metadata";
import { startServer } from "./app";

async function main() {
  const app = await startServer();
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
}

try {
  main();
} catch (error) {
  console.error(JSON.stringify(error));
}
