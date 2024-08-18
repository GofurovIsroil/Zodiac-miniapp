const TelegramBot = require('node-telegram-bot-api');

const token = 'YOUR_BOT_TOKEN_HERE';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const options = {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Открыть WebApp',
                        web_app: { url: 'https://zodiac-miniapp.vercel.app/' }
                    }
                ]
            ]
        }
    };
    bot.sendMessage(chatId, 'Нажмите кнопку ниже, чтобы открыть WebApp:', options);
});