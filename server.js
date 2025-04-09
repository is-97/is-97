import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
import { Readable } from 'stream';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const DEFAULT_API_KEY = process.env.QIANWEN_API_KEY;

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

app.post('/api/chat/qianwen', async (req, res) => {
  const { message, apiKey } = req.body;

  if (!message) {
    return res.status(400).json({ error: '消息不能为空' });
  }

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
        messages: [{ role: "user", content: message }],
        max_tokens: 1500,
        temperature: 0.7,
        stream: true
      })
    });

    // 检查响应
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
      console.error('通义千问响应错误:', err);
      res.end();
    });

  } catch (error) {
    console.error('服务器处理出错:', error);
    res.status(500).json({
      error: '服务器处理出错',
      message: error.message
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`服务器启动成功：http://localhost:${PORT}`);
});
