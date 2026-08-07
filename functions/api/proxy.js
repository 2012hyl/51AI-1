// functions/api/proxy.js
// 通用AI代理：温柔陪伴 + 旅行Agent + 简历Agent 共用

export async function onRequest(context) {
  const { request, env } = context;

  // 处理 CORS 预检
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

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: '只支持POST' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  // ===== 允许访问的域名白名单 =====
  const allowedOrigins = [
    'https://51ai-1.pages.dev',
    'https://734a1763.51ai-1.pages.dev',
    'https://2012hyl.github.io',
    'https://travel-agent.pages.dev',
    'https://job-agent.pages.dev',
    'http://localhost'
  ];

  const origin = request.headers.get('Origin');
  const referer = request.headers.get('Referer');

  const isAllowed = allowedOrigins.some(allowed => {
    return (origin && origin.startsWith(allowed)) || (referer && referer.startsWith(allowed));
  });

  // 如果没有 Origin 也没有 Referer，放行（可能是直接访问或同源请求）
  const isDirectAccess = !origin && !referer;

  if (!isAllowed && !isDirectAccess) {
    return new Response(JSON.stringify({ error: '禁止访问' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  // ===== 解析请求 =====
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'JSON解析失败' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  const model = body.model || 'glm-4-flash';

  // ===== 根据模型选择 API =====
  let apiUrl, apiKey;
  if (model.includes('deepseek')) {
    apiUrl = 'https://api.deepseek.com/chat/completions';
    apiKey = env.DEEPSEEK_API_KEY;
  } else {
    // 默认走智谱
    apiUrl = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
    apiKey = env.ZHIPU_API_KEY;
  }

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API Key 未配置' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  // ===== 转发请求 =====
  try {
    const aiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const aiData = await aiResponse.json();

    if (aiData.error) {
      return new Response(JSON.stringify({ error: 'AI调用失败: ' + (aiData.error.message || '') }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    return new Response(JSON.stringify(aiData), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: '服务器内部错误' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}
