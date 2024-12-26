const isDevelopment = import.meta.env.DEV;
const DEV_API_ENDPOINT = 'http://localhost:3000/api/chat/qianwen';
const PROD_API_ENDPOINT = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation';

export async function sendToAI(message) {
  try {
    if (isDevelopment) {
      // 开发环境：使用本地服务器
      console.log('发送消息到本地服务器:', message);
      
      const response = await fetch(DEV_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      console.log('服务器响应:', data);

      if (!response.ok) {
        throw new Error(data.error || '服务响应错误');
      }

      if (data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content;
      } else {
        console.error('响应数据格式错误:', data);
        throw new Error('响应格式错误');
      }
    } else {
      // 生产环境：直接调用通义千问API
      console.log('发送消息到通义千问:', message);
      
      const response = await fetch(PROD_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_QIANWEN_API_KEY}`,
          'X-DashScope-SSE': 'disable'
        },
        body: JSON.stringify({
          model: "qwen-max",
          input: {
            messages: [
              {
                role: "user",
                content: message
              }
            ]
          }
        })
      });

      const data = await response.json();
      console.log('通义千问响应:', data);

      if (data.code && data.code !== "200") {
        throw new Error(data.message || '服务响应错误');
      }

      return data.output?.text || '抱歉，我现在无法回答。';
    }
  } catch (error) {
    console.error('AI服务错误:', error);
    throw error;
  }
}
