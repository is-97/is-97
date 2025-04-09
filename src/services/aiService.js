export async function sendToAI(message, onMessageChunk) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const DEV_API_ENDPOINT = "http://localhost:3000/api/chat/qianwen"; // 本地代理
  const PROD_API_ENDPOINT = "/api/chat/qianwen"; // 生产环境通过 Vercel 路由代理
  const endpoint = isDevelopment ? DEV_API_ENDPOINT : PROD_API_ENDPOINT;

  console.log(`发送消息到 ${isDevelopment ? '本地服务器' : '通义千问'}`, message);

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
              console.log(delta)
              onMessageChunk(delta); // ✅ 每次推送一段文字
            }
          } catch (e) {
            console.warn("JSON 解析失败:", jsonStr, e);
          }
        }
      }
    }
  } catch (err) {
    console.error('AI服务错误:', err);
    throw err;
  }
}
