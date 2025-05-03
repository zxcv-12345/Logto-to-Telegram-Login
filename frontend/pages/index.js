// frontend/pages/index.js
import React from 'react';

export default function Home() {
  const handleTelegramResponse = (e) => {
    e.preventDefault();
    const data = e.target;
    // 自动提交到 /api/telegram
    fetch('/api/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(data))),
    }).then((res) => {
      // 登录成功后可调用 Logto SDK 登录
      window.location.href = '/';
    });
  };

  return (
    <div>
      <form action="/api/telegram" method="post" onSubmit={handleTelegramResponse}>
        <script
          async
          src="https://telegram.org/js/telegram-widget.js?7"
          data-telegram-login="YourBotUsername"
          data-size="large"
          data-userpic="false"
          data-auth-url="/api/telegram"
          data-request-access="write"
        ></script>
      </form>
    </div>
  );
}