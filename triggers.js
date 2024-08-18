import TelegramBot from 'node-telegram-bot-api';

const token = '6683288372:AAHjHsIWWEdMwXhieYUdQ5IN4t9qnW-wA9I';
const bot = new TelegramBot(token, { polling: true });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Ваш код для обработки
        const chatId = 'YOUR_CHAT_ID';
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
        await bot.sendMessage(chatId, 'Нажмите кнопку ниже, чтобы открыть WebApp:', options);
        res.status(200).json({ message: 'Message sent successfully' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}