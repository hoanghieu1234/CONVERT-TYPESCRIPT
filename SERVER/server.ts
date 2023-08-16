import app from "./src/app/app";

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
