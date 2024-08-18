/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};


// curl -X POST "https://api.telegram.org/bot6683288372:AAHjHsIWWEdMwXhieYUdQ5IN4t9qnW-wA9I/sendMessage" \
// -H "Content-Type: application/json" \
// -d '{
//       "chat_id": "1387315974",
//       "text": "Нажмите кнопку ниже, чтобы открыть WebApp:",
//       "reply_markup": {
//         "inline_keyboard": [
//           [
//             {
//               "text": "Открыть WebApp",
//               "web_app": {
//                 "url": "https://zodiac-miniapp.vercel.app/"
//               }
//             }
//           ]
//         ]
//       }
//     }'


// curl -X POST "https://api.telegram.org/bot6683288372:AAHjHsIWWEdMwXhieYUdQ5IN4t9qnW-wA9I/sendMessage" \
// > -H "Content-Type: application/json" \
// > -d @message.json