import fetch from "node-fetch";
import "dotenv/config";

const DEFAULT_BASE_URL =
  process.env.NVIDIA_API_BASE_URL ||
  "https://integrate.api.nvidia.com/v1/chat/completions";
const DEFAULT_MODEL =
  process.env.NVIDIA_MODEL || process.env.NVIDIA_CHAT_MODEL || "minimaxai/minimax-m2.7";
const DEFAULT_MAX_TOKENS = Number(process.env.NVIDIA_MAX_TOKENS || 16384);
const DEFAULT_TEMPERATURE = Number(process.env.NVIDIA_TEMPERATURE || 1.0);
const DEFAULT_TOP_P = Number(process.env.NVIDIA_TOP_P || 1.0);
const DEFAULT_THINKING = process.env.NVIDIA_THINKING !== "false";

function buildPayload(body) {
  const {
    message,
    model,
    maxTokens,
    temperature,
    topP,
    thinking,
    messages,
  } = body;

  return {
    model: model || DEFAULT_MODEL,
    messages:
      Array.isArray(messages) && messages.length > 0
        ? messages
        : [{ role: "user", content: message }],
    max_tokens: Number.isFinite(Number(maxTokens))
      ? Number(maxTokens)
      : DEFAULT_MAX_TOKENS,
    temperature: Number.isFinite(Number(temperature))
      ? Number(temperature)
      : DEFAULT_TEMPERATURE,
    top_p: Number.isFinite(Number(topP)) ? Number(topP) : DEFAULT_TOP_P,
    stream: true,
    chat_template_kwargs: {
      thinking:
        typeof thinking === "boolean" ? thinking : DEFAULT_THINKING,
    },
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { message, apiKey, messages } = req.body;

  if (!message && (!Array.isArray(messages) || messages.length === 0)) {
    return res.status(400).json({ error: "message 或 messages 不能为空" });
  }

  const actualApiKey = apiKey || process.env.NVIDIA_API_KEY;
  if (!actualApiKey) {
    return res.status(400).json({ error: "未配置 NVIDIA API Key" });
  }

  try {
    const response = await fetch(DEFAULT_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${actualApiKey}`,
        Accept: "text/event-stream",
      },
      body: JSON.stringify(buildPayload(req.body)),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: "调用 NVIDIA 接口失败",
        details: errorText,
      });
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    response.body.on("data", (chunk) => {
      res.write(chunk);
    });

    response.body.on("end", () => {
      res.end();
    });

    response.body.on("error", () => {
      res.end();
    });
  } catch (error) {
    res.status(500).json({
      error: "服务器处理出错",
      message: error.message,
    });
  }
}
