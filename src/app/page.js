"use client"
import { useEffect, useState } from 'react';
import ZodiacList from '../components/ZodiacList';



export default function Home() {
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
    { sign: 'Aries', dateRange: currentLanguage === 'ru' ? '21 марта - 19 апреля' : 'March 21 - April 19', icon: '♈' },
    { sign: 'Taurus', dateRange: currentLanguage === 'ru' ? '20 апреля - 20 мая' : 'April 20 - May 20', icon: '♉' },
    { sign: 'Gemini', dateRange: currentLanguage === 'ru' ? '21 мая - 20 июня' : 'May 21 - June 20', icon: '♊' },
    { sign: 'Cancer', dateRange: currentLanguage === 'ru' ? '21 июня - 22 июля' : 'June 21 - July 22', icon: '♋' },
    { sign: 'Leo', dateRange: currentLanguage === 'ru' ? '23 июля - 22 августа' : 'July 23 - August 22', icon: '♌' },
    { sign: 'Virgo', dateRange: currentLanguage === 'ru' ? '23 августа - 22 сентября' : 'August 23 - September 22', icon: '♍' },
    { sign: 'Libra', dateRange: currentLanguage === 'ru' ? '23 сентября - 22 октября' : 'September 23 - October 22', icon: '♎' },
    { sign: 'Scorpio', dateRange: currentLanguage === 'ru' ? '23 октября - 21 ноября' : 'October 23 - November 21', icon: '♏' },
    { sign: 'Sagittarius', dateRange: currentLanguage === 'ru' ? '22 ноября - 21 декабря' : 'November 22 - December 21', icon: '♐' },
    { sign: 'Capricorn', dateRange: currentLanguage === 'ru' ? '22 декабря - 19 января' : 'December 22 - January 19', icon: '♑' },
    { sign: 'Aquarius', dateRange: currentLanguage === 'ru' ? '20 января - 18 февраля' : 'January 20 - February 18', icon: '♒' },
    { sign: 'Pisces', dateRange: currentLanguage === 'ru' ? '19 февраля - 20 марта' : 'February 19 - March 20', icon: '♓' },
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
      return data.description;
    } catch (error) {
      console.error('Ошибка:', error);
      return 'Описание недоступно';
    }
  };

  const handleZodiacClick = async (sign) => {
    const description = await fetchZodiacDescription(sign, currentLanguage);
    setDescription(description);
    setSelectedZodiac(sign);
  };

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'ru' : 'en');
  };


  return (
    <div>
      <button onClick={toggleLanguage}>
        {currentLanguage === 'ru' ? 'Русский' : 'English'}
      </button>

      <div className="grid grid-cols-2 gap-4 p-4">
        {zodiacSigns.map((zodiac) => (
          <div
            key={zodiac.sign}
            className="flex items-center justify-between p-4 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
            onClick={() => handleZodiacClick(zodiac.sign)}
          >
            <div>
              <h3 className="text-lg font-semibold">{zodiac.sign}</h3>
              <p className="text-sm text-gray-600">{zodiac.dateRange}</p>
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
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
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