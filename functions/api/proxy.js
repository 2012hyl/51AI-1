
export async function onRequest(context) {
  const { request, env } = context;
 
  // CORS 预检
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
 
  // 只接受 POST
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }
 
  // Origin / Referer 白名单
  const allowedOrigins = [
    'https://51ai-1.pages.dev',
    'https://734a1763.51ai-1.pages.dev',
    'https://2012hyl.github.io',
    'http://localhost',
  ];
 
  const origin = request.headers.get('Origin') || '';
  const referer = request.headers.get('Referer') || '';
 
  const isAllowed = allowedOrigins.some(
    (o) => origin.startsWith(o) || referer.startsWith(o)
  );
 
  // 去掉原来的 isDirectAccess 放行逻辑
  // 无 Origin + 无 Referer 的请求（curl 等工具）直接拒绝
  if (!isAllowed) {
    return new Response(JSON.stringify({ error: '禁止访问' }), {
      status: 403,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
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
 
  // 模型白名单，防止传入任意 model 字符串
  const ALLOWED_MODELS = [
    'deepseek-chat',
    'deepseek-v3',
    'glm-4',
    'glm-4-flash',
    'glm-4-air',
  ];
 
  const model = body.model || '';
  if (!ALLOWED_MODELS.includes(model)) {
    return new Response(JSON.stringify({ error: '不支持的模型' }), {
      status: 400,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    });
  }
 
  // 选择 API 地址和 Key
  let apiUrl, apiKey;
  if (model.startsWith('deepseek')) {
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
 
  // 构造干净的请求体，只转发必要字段
  // 防止用户注入 max_tokens: 999999 等参数
  const safeBody = {
    model: body.model,
    messages: body.messages,
    temperature: typeof body.temperature === 'number'
      ? Math.min(Math.max(body.temperature, 0), 2)
      : 0.7,
    max_tokens: typeof body.max_tokens === 'number'
      ? Math.min(body.max_tokens, 1000)   // 最多 1000，防止暴刷
      : 800,
    stream: body.stream === true,
  };
 
  // 转发
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(safeBody),
    });
 
    return new Response(response.body, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': safeBody.stream ? 'text/event-stream' : 'application/json',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: '上游请求失败' }), {
      status: 502,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    });
  }
}
 
