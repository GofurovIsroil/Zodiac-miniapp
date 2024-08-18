import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import fs from 'fs';

// Токен вашего бота
const token = '6683288372:AAHjHsIWWEdMwXhieYUdQ5IN4t9qnW-wA9I';
const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /start
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;

    // Путь к вашему JSON файлу
    const messageFilePath = 'path/to/message.json';

    // Чтение данных из файла
    const messageData = JSON.parse(fs.readFileSync(messageFilePath, 'utf8'));

    try {
        // Отправка сообщения с использованием данных из JSON файла
        await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, messageData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Message sent successfully');
    } catch (error) {
        console.error('Error sending message:', error);
    }
});