'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ZodiacList = () => {
    const [zodiacs, setZodiacs] = useState([]);
    const [selectedZodiac, setSelectedZodiac] = useState(null);
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        axios.post('API_URL', {
            sign: '',
            language: language,
            period: 'today'
        })
            .then(response => setZodiacs(response.data))
            .catch(error => console.error(error));
    }, [language]);

    const handleZodiacClick = (sign) => {
        axios.post('API_URL', {
            sign: sign,
            language: language,
            period: 'today'
        })
            .then(response => setSelectedZodiac(response.data))
            .catch(error => console.error(error));
    };

    return (
        <div className="p-4">
            {selectedZodiac ? (
                <div className="bg-white p-4 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-2">{selectedZodiac.name}</h2>
                    <p>{selectedZodiac.description}</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => setSelectedZodiac(null)}
                    >
                        Back
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {zodiacs.map(zodiac => (
                        <div
                            key={zodiac.sign}
                            className="bg-gray-100 p-4 rounded shadow-md cursor-pointer"
                            onClick={() => handleZodiacClick(zodiac.sign)}
                        >
                            <h3 className="text-xl font-semibold mb-2">{zodiac.name}</h3>
                            <p className="mb-2">{zodiac.period}</p>
                            <img src={zodiac.icon} alt={zodiac.name} className="w-16 h-16 object-cover" />
                        </div>
                    ))}
                </div>
            )}
            <button
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
            >
                {language === 'en' ? 'Switch to Russian' : 'Switch to English'}
            </button>
        </div>
    );
};

export default ZodiacList;