// backend/index.js
const express = require('express');
const crypto = require('crypto');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const { TELEGRAM_BOT_TOKEN, LOGTO_BASE_URL, LOGTO_CLIENT_ID, LOGTO_CLIENT_SECRET } = process.env;

// 验证 Telegram 签名
function verifyTelegram(data) {
  const secret = crypto.createHash('sha256').update(TELEGRAM_BOT_TOKEN).digest();
  const sorted = Object.keys(data)
    .filter((k) => k !== 'hash')
    .sort()
    .map((k) => `${k}=${data[k]}`)
    .join('\n');
  const hash = crypto.createHmac('sha256', secret).update(sorted).digest('hex');
  return hash === data.hash;
}

app.post('/api/telegram', async (req, res) => {
  const data = req.body;
  if (!verifyTelegram(data)) return res.status(401).send('Invalid signature');

  // 获取 M2M Token 调用 Logto 管理 API citeturn2search8
  const tokenResp = await axios.post(
    `${LOGTO_BASE_URL}/oidc/token`,
    new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: LOGTO_CLIENT_ID,
      client_secret: LOGTO_CLIENT_SECRET,
      scope: 'all',
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  const m2mToken = tokenResp.data.access_token;

  // 查找或创建用户（social connector）citeturn0search4
  const search = await axios.get(
    `${LOGTO_BASE_URL}/api/users?search=${data.id}`,
    { headers: { Authorization: `Bearer ${m2mToken}` } }
  );

  let userId;
  if (search.data.length) {
    userId = search.data[0].id;
  } else {
    const create = await axios.post(
      `${LOGTO_BASE_URL}/api/users`,
      { identities: [{ provider: 'telegram', userId: String(data.id) }], name: data.first_name },
      { headers: { Authorization: `Bearer ${m2mToken}` } }
    );
    userId = create.data.id;
  }

  // 颁发自定义会话 token 或将用户重定向至 Logto 登录完成流程
  res.json({ success: true, userId });
});

app.listen(4000, () => console.log('Backend listening on port 4000'));