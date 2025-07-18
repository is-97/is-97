import fetch from 'node-fetch';
import 'dotenv/config'; // 确保加载 dotenv

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message, apiKey } = req.body;

    if (!message) {
      return res.status(400).json({ error: '消息不能为空' });
    }

    const actualApiKey = apiKey || process.env.QIANWEN_API_KEY;
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
          messages: [{ role: "user", content: message }],
          max_tokens: 1500,
          temperature: 0.7,
          stream: true
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({
          error: '调用通义千问失败',
          details: errorData
        });
      }

      // 设置响应头，告诉浏览器这是个 EventStream（SSE）
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      // 通过 node stream 读取响应并转发
      response.body.on('data', (chunk) => {
        res.write(chunk);
      });

      response.body.on('end', () => {
        res.end();
      });

      response.body.on('error', (err) => {
        res.end();
      });

    } catch (error) {
      res.status(500).json({
        error: '服务器处理出错',
        message: error.message
      });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}