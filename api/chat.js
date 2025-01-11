import fetch from 'node-fetch';
import * as dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

const DEFAULT_API_KEY = process.env.QIANWEN_API_KEY;

export default async function handler (req, res) {
  const { message, apiKey } = req.body;

  if (!message) {
    return res.status(400).json({ error: '消息不能为空' });
  }

  // 优先使用请求中的 API Key，如果没有则使用默认的
  const actualApiKey = apiKey || DEFAULT_API_KEY;

  if (!actualApiKey) {
    return res.status(400).json({ error: '未配置 API Key' });
  }

  try {
    const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${actualApiKey}`
      },
      body: JSON.stringify({
        model: "qwen-turbo",
        messages: [
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 1500,
        temperature: 0.7
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: '请求通义千问API时发生错误',
        details: data
      });
    }

    res.json(data);
  } catch (error) {
    console.error('处理请求时发生错误:', error);
    res.status(500).json({
      error: '服务器内部错误',
      message: error.message
    });
  }
}
