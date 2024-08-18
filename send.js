import TelegramBot from 'node-telegram-bot-api';


const TelegramBot = require('node-telegram-bot-api');

const token = '6683288372:AAHjHsIWWEdMwXhieYUdQ5IN4t9qnW-wA9I';
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