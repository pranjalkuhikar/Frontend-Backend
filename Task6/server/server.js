import app from "./src/app.js";

let port = 3000;

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
