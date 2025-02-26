import fetch from 'node-fetch';
import 'dotenv/config'; // 确保加载 dotenv

export default async function handler (req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    try {
      console.log('API Key:', process.env.QIANWEN_API_KEY); // 调试日志

      const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.QIANWEN_API_KEY}`, // 使用环境变量
        },
        body: JSON.stringify({
          model: 'qwen-omni-turbo',
          messages: [{ role: 'user', content: message }],
          max_tokens: 1500,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}