import express from "express";
import cors from "cors";
import {
  proxyChatRequest,
  validateChatRequest,
} from "./api/shared.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT || 3000);

app.post("/api/chat", async (req, res) => {
  const { apiKey } = req.body;

  const validationError = validateChatRequest(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const actualApiKey = apiKey || process.env.NVIDIA_API_KEY;
  if (!actualApiKey) {
    return res.status(400).json({ error: "未配置 NVIDIA API Key" });
  }

  try {
    await proxyChatRequest(req, res, actualApiKey);

    // Client disconnect cleanup
    req.on("close", () => {
      if (!res.writableEnded) {
        res.end();
      }
    });
  } catch (error) {
    res.status(500).json({
      error: "服务器处理出错",
      message: error.message,
    });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
