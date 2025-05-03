````

> **说明**：后端首先验证 Telegram 数据完整性与来源，然后通过 Logto 管理 API（M2M）创建或查找对应用户身份。citeturn0search0turn0search6

---

## 3. Logto 控制台配置

1. **创建应用**（Traditional web / Next.js）citeturn2search9。
2. **添加 Social Connector：OAuth2**，填写 `clientId`/`clientSecret` 等，类型选 OAuth2，自定义名称 "Telegram"。citeturn0search4
3. **启用 Connector** 于 Sign-in Experience。
4. （可选）在 Connectors 列表中新增 Custom Connector `telegram`，Logo 可填 `https://telegram.org/img/t_logo.png`，ID 填 `telegram`。citeturn0search10

---

## 4. 运行 & 测试

1. 启动后端：
   ```bash
   cd backend
   node index.js
````
2. 启动前端：
   ```bash
cd frontend
npm run dev
````
3. 在浏览器打开 http://localhost:3000，点击 Telegram 登录按钮，完成授权后查看后端日志与前端响应。