
import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';

const token = '6683288372:AAHjHsIWWEdMwXhieYUdQ5IN4t9qnW-wA9I';
const bot = new TelegramBot(token, { polling: true });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Example usage of fs
        fs.readFile('path/to/file.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to read file' });
            }
            console.log(data);

            // Send message with inline keyboard
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

            res.status(200).json({ message: 'Bot configured successfully' });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}