import {
  buildPayload,
  validateChatRequest,
  DEFAULT_BASE_URL,
} from "./shared.js";

export const config = {
  runtime: "edge",
};
export const maxDuration = 60;

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method Not Allowed" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch (_) {
    return new Response(
      JSON.stringify({ error: "无效的 JSON 请求体" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const validationError = validateChatRequest(body);
  if (validationError) {
    return new Response(
      JSON.stringify({ error: validationError }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const actualApiKey = body.apiKey || process.env.NVIDIA_API_KEY;
  if (!actualApiKey) {
    return new Response(
      JSON.stringify({ error: "未配置 NVIDIA API Key" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const upstreamResponse = await fetch(DEFAULT_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${actualApiKey}`,
        Accept: "text/event-stream",
      },
      body: JSON.stringify(buildPayload(body)),
    });

    if (!upstreamResponse.ok) {
      const errorText = await upstreamResponse.text();
      return new Response(
        JSON.stringify({
          error: "调用 NVIDIA 接口失败",
          details: errorText,
        }),
        {
          status: upstreamResponse.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 将上游的 ReadableStream 直接直传给浏览器，零缓存实时推送
    return new Response(upstreamResponse.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "服务器处理出错",
        message: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
