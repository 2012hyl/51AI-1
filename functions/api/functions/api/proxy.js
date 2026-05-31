export async function onRequest(context) {
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  const body = await context.request.json();
  const model = body.model || '';

  let apiUrl, apiKey;
  if (model.includes('deepseek')) {
    apiUrl = 'https://api.deepseek.com/chat/completions';
    apiKey = context.env.DEEPSEEK_API_KEY;
  } else {
    apiUrl = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
    apiKey = context.env.ZHIPU_API_KEY;
  }

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API Key 未配置' }), { status: 500 });
  }

  const modifiedRequest = new Request(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  try {
    const response = await fetch(modifiedRequest);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: '代理请求失败' }), { status: 500 });
  }
}
