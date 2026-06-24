export async function onRequest(context) {
  const { request, env } = context;
  
  // 处理 CORS 预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // 只允许 POST 请求
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 防护：只允许来自你自己网站的请求
  const allowedOrigins = [
    'https://51ai-1.pages.dev',
    'https://734a1763.51ai-1.pages.dev',
    'https://2012hyl.github.io',
    'http://localhost'
  ];

  const origin = request.headers.get('Origin');
  const referer = request.headers.get('Referer');
  
  const isAllowed = allowedOrigins.some(allowed => {
    return (origin && origin.startsWith(allowed)) || (referer && referer.startsWith(allowed));
  });
  
  const isDirectAccess = !origin && !referer;
  
  if (!isAllowed && !isDirectAccess) {
    return new Response(JSON.stringify({ error: '禁止访问' }), {
      status: 403,
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json' 
      },
    });
  }

  // 解析请求体
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: '请求格式错误' }), {
      status: 400,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    });
  }

  const model = body.model || '';

  // 根据模型选择 API 地址和密钥
  let apiUrl, apiKey;
  if (model.includes('deepseek')) {
    apiUrl = 'https://api.deepseek.com/chat/completions';
    apiKey = env.DEEPSEEK_API_KEY;
  } else {
    apiUrl = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
    apiKey = env.ZHIPU_API_KEY;
  }

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API Key 未配置' }), {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    });
  }

  // 转发请求到对应的 AI 服务商
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // 直接返回流式响应
    return new Response(response.body, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: '代理请求失败' }), {
      status: 502,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    });
  }
}
