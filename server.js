import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const DEFAULT_API_KEY = process.env.QIANWEN_API_KEY;

// 添加调试日志中间件
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

app.post('/api/chat/qianwen', async (req, res) => {
  const { message, apiKey } = req.body;
  
  console.log('收到聊天请求:', { message });
  
  if (!message) {
    return res.status(400).json({ error: '消息不能为空' });
  }
  
  // 优先使用请求中的 API Key，如果没有则使用默认的
  const actualApiKey = apiKey || DEFAULT_API_KEY;
  
  if (!actualApiKey) {
    return res.status(400).json({ error: '未配置 API Key' });
  }
  
  try {
    console.log('正在发送请求到通义千问 API...');
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
    console.log('通义千问 API 响应:', data);
    
    // 检查API错误
    if (!response.ok) {
      let errorMessage = '请求通义千问API时发生错误';
      if (response.status === 403) {
        errorMessage = 'API Key无效或没有权限。请确保：\n1. API Key格式正确\n2. API Key有效且未过期\n3. 有权限访问 qwen-turbo 模型';
      }
      return res.status(response.status).json({
        error: errorMessage,
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
});

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`服务器启动于 http://localhost:${PORT}`);
  console.log('API Key 配置状态:', DEFAULT_API_KEY ? '已配置' : '未配置');
});
