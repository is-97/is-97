// ── 默认配置（均可通过环境变量覆盖）──────────────────────────
export const DEFAULT_BASE_URL =
  process.env.NVIDIA_API_BASE_URL ||
  "https://integrate.api.nvidia.com/v1/chat/completions";
export const DEFAULT_MODEL =
  process.env.NVIDIA_MODEL || process.env.NVIDIA_CHAT_MODEL || "";
export const DEFAULT_MAX_TOKENS = Number(
  process.env.NVIDIA_MAX_TOKENS || 16384,
);
export const DEFAULT_TEMPERATURE = Number(
  process.env.NVIDIA_TEMPERATURE || 1.0,
);
export const DEFAULT_TOP_P = Number(process.env.NVIDIA_TOP_P || 1.0);
export const DEFAULT_THINKING = process.env.NVIDIA_THINKING !== "false";

// ── 构建上游请求 payload ──────────────────────────────────
export function buildPayload(body) {
  const { message, model, maxTokens, temperature, topP, thinking, messages } =
    body;

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
      thinking: typeof thinking === "boolean" ? thinking : DEFAULT_THINKING,
    },
  };
}

// ── 调用 NVIDIA 接口并以 SSE 方式转发 ─────────────────────
export async function proxyChatRequest(req, res, actualApiKey) {
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
    res.status(response.status).json({
      error: "调用 NVIDIA 接口失败",
      details: errorText,
    });
    return;
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
}

// ── 请求参数校验 ──────────────────────────────────────────
export function validateChatRequest(body) {
  const { message, messages } = body;
  if (!message && (!Array.isArray(messages) || messages.length === 0)) {
    return "message 或 messages 不能为空";
  }
  return null;
}
