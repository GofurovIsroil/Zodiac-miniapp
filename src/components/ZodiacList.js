"use client"
import { useEffect, useState } from 'react';

export default function ZodiacList() {
    const [selectedZodiac, setSelectedZodiac] = useState(null);
    const [description, setDescription] = useState('');
    const [currentLanguage, setCurrentLanguage] = useState('en');


    const getTelegramLanguage = () => {
        if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
            const userLanguage = window.Telegram.WebApp.initDataUnsafe.user?.language_code;
            return userLanguage;
        }
        return null;
    };

    useEffect(() => {
        const userLanguage = getTelegramLanguage();
        if (userLanguage === 'ru') {
            setCurrentLanguage('ru');
        } else {
            setCurrentLanguage('en');
        }
    }, []);

    const zodiacSigns = [
        { sign: currentLanguage === 'en' ? 'Aries' : 'Овен', icon: '♈' },
        { sign: currentLanguage === 'en' ? 'Taurus' : 'Телец', icon: '♉' },
        { sign: currentLanguage === 'en' ? 'Gemini' : 'Близнецы', icon: '♊' },
        { sign: currentLanguage === 'en' ? 'Cancer' : 'Рак', icon: '♋' },
        { sign: currentLanguage === 'en' ? 'Leo' : 'Лев', icon: '♌' },
        { sign: currentLanguage === 'en' ? 'Virgo' : 'Дева', icon: '♍' },
        { sign: currentLanguage === 'en' ? 'Libra' : 'Весы', icon: '♎' },
        { sign: currentLanguage === 'en' ? 'Scorpio' : 'Скорпион', icon: '♏' },
        { sign: currentLanguage === 'en' ? 'Sagittarius' : 'Стрелец', icon: '♐' },
        { sign: currentLanguage === 'en' ? 'Capricorn' : 'Козерог', icon: '♑' },
        { sign: currentLanguage === 'en' ? 'Aquarius' : 'Водолей', icon: '♒' },
        { sign: currentLanguage === 'en' ? 'Pisces' : "Рыбы", icon: '♓' },
    ];

    const fetchZodiacDescription = async (sign, language = 'en') => {
        try {
            const response = await fetch('https://poker247tech.ru/get_horoscope/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sign: sign.toLowerCase(),
                    language: language === 'ru' ? 'original' : 'translated',
                    period: 'today',
                }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при получении данных');
            }

            const data = await response.json();
            return data.horoscope;
        } catch (error) {
            console.error('Ошибка:', error);
            return 'Описание недоступно';
        }
    };

    const handleZodiacClick = async (sign) => {
        const descriptionFromData = await fetchZodiacDescription(sign, currentLanguage);
        setDescription(descriptionFromData);
        setSelectedZodiac(sign);
    };

    const toggleLanguage = () => {
        setCurrentLanguage(currentLanguage === 'en' ? 'ru' : 'en');
    };



    return (
        <div>
            <button onClick={toggleLanguage} className='ml-4 bg-slate-500 p-2 text-white rounded-md active:bg-slate-400 md:hover:bg-slate-400'>
                {currentLanguage === 'ru' ? 'Поменять на Английский язык' : 'Switch to Russian Language'}
            </button>

            <div className="grid grid-cols-2 gap-4 p-4">
                {zodiacSigns.map((zodiac) => (
                    <div
                        key={zodiac.sign}
                        className="flex items-center justify-between p-4 bg-gray-200 rounded-lg cursor-pointer active:bg-gray-300 md:hover:bg-gray-300"
                        onClick={() => handleZodiacClick(zodiac.sign)}
                    >
                        <div>
                            <h3 className="text-lg font-semibold">{zodiac.sign}</h3>
                            <p className="text-sm text-gray-600">{currentLanguage === 'ru' ? 'Сегодня' : 'Today'}</p>
                        </div>
                        <div>{zodiac.icon}</div>
                    </div>
                ))}

                {selectedZodiac && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-4 rounded-lg max-w-md w-full">
                            <h3 className="text-lg font-semibold">{selectedZodiac}</h3>
                            <p className="mt-2">{description}</p>
                            <button
                                onClick={() => setSelectedZodiac(null)}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded active:bg-blue-400 md:hover:bg-blue-400"
                            >
                                {currentLanguage === 'ru' ? 'Назад' : 'Back'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}