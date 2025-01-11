const isDevelopment = process.env.NODE_ENV === 'development';

const DEV_API_ENDPOINT = "http://localhost:3000/api/chat/qianwen"; // 本地代理
const PROD_API_ENDPOINT = "/api/chat/qianwen"; // 生产环境通过 Vercel 路由代理

export async function sendToAI (message) {
  const endpoint = isDevelopment ? DEV_API_ENDPOINT : PROD_API_ENDPOINT;

  console.log(`发送消息到 ${isDevelopment ? '本地服务器' : '通义干问'}`, message);
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    console.log('服务器响应:', data);

    if (!response.ok) {
      throw new Error(data.error || "服务响应错误");
    }

    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content;
    } else {
      console.error('响应数据格式错误:', data);
      throw new Error('响应格式错误');
    }
  } catch (error) {
    console.error('AI服务错误:', error);
    throw error;
  }
}