export async function sendToAI(message, onMessageChunk) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const DEV_API_ENDPOINT = "http://localhost:3000/api/chat/qianwen"; // 本地代理
  const PROD_API_ENDPOINT = "/api/chat/qianwen"; // 生产环境通过 Vercel 路由代理
  const endpoint = isDevelopment ? DEV_API_ENDPOINT : PROD_API_ENDPOINT;



  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok || !response.body) {
      throw new Error("响应异常，可能是 API Key 或服务器错误");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let partial = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      partial += chunk;

      const lines = partial.split('\n');
      // 保存最后一行，因为它可能是不完整的
      partial = lines.pop() || '';

      for (let line of lines) {
        line = line.trim();
        if (line.startsWith("data:")) {
          const jsonStr = line.replace(/^data:\s*/, '');
          if (jsonStr === '[DONE]') {
            return; // 正常结束
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const delta = parsed.choices?.[0]?.delta?.content || '';
            if (delta) {
              onMessageChunk(delta); // ✅ 每次推送一段文字
            }
          } catch (e) {
            // JSON 解析失败，忽略此行
          }
        }
      }
    }
  } catch (err) {
    throw err;
  }
}
