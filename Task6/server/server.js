import app from "./src/app.js";
import config from "./src/config/config.js";

let port = config.PORT;

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
