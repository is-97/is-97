import {
  proxyChatRequest,
  validateChatRequest,
} from "./shared.js";

export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

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
  } catch (error) {
    res.status(500).json({
      error: "服务器处理出错",
      message: error.message,
    });
  }
}
