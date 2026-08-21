import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());

const PORT = Number(process.env.PORT || 3000);

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
