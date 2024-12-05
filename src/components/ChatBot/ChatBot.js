// src/components/ChatBot.js
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import answers from './answers.json';
import './ChatBot.css';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const { t, i18n } = useTranslation();

    const findBestResponse = (input) => {
        let currentLang = 'en';
        if (i18n.language.includes('es')) {
            currentLang = 'es';
        } else if (i18n.language.includes('en')) {
            currentLang = 'en';
        }
        const inputLower = input.toLowerCase();
        const { keywords } = answers[currentLang];

        // Agregar arrays de respuestas fallback
        const fallbackResponses = {
            es: [
                "¡Interesante! Como robot social, me encanta aprender de las interacciones con humanos. ¿Hay algo específico que quieras saber sobre mí o sobre SinfonIA?",
                "¡Qué bueno charlar contigo! Me ayuda a mejorar mi comprensión. ¿Te gustaría saber más sobre mis capacidades?",
                "Cada conversación es una oportunidad de aprendizaje. ¿Hay algún tema en particular que te interese explorar?",
                "¡Fascinante! Me encanta conocer nuevas perspectivas. ¿Qué te gustaría descubrir sobre SinfonIA?"
            ],
            en: [
                "Interesting! As a social robot, I love learning from interactions with humans. Is there anything specific you'd like to know about me or SinfonIA?",
                "Great chatting with you! It helps me improve my understanding. Would you like to know more about my capabilities?",
                "Every conversation is a learning opportunity. Is there any particular topic you'd like to explore?",
                "Fascinating! I love gaining new perspectives. What would you like to discover about SinfonIA?"
            ]
        };

        // Buscar coincidencias en keywords
        for (const [category, keywordList] of Object.entries(keywords)) {
            if (keywordList.some(keyword => inputLower.includes(keyword))) {
                return answers[currentLang].responses[category];
            }
        }

        // Si no hay coincidencias, retornar respuesta por defecto
        if (answers[currentLang].responses.default) {
            return answers[currentLang].responses.default;
        }

        // Fallback con respuesta aleatoria
        const randomIndex = Math.floor(Math.random() * fallbackResponses[currentLang].length);
        return fallbackResponses[currentLang][randomIndex];
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setMessages([...messages, { text: input, sender: 'user' }]);

        setTimeout(() => {
            const response = findBestResponse(input);
            setMessages(prev => [...prev, { text: response, sender: 'nova' }]);
        }, 1000);

        setInput('');
    };

    return (
        <div className="chatbot-container">
            {!isOpen ? (
                <button 
                    className="chat-button"
                    onClick={() => setIsOpen(true)}
                >
                    <img 
                        src="/icon-pepper.svg" 
                        alt="Pepper Icon" 
                        className="pepper-icon"
                    /> {t('chatbot.buttonText')}
                </button>
            ) : (
                <div className="chat-window">
                    <div className="chat-header">
                        <div className="header-content">
                            <img 
                                src="/icon-pepper.svg" 
                                alt="Pepper Icon" 
                                className="pepper-icon"
                            />
                            <h5>{t('chatbot.headerTitle')}</h5>
                        </div>
                        <button 
                            className="close-button"
                            onClick={() => setIsOpen(false)}
                        >
                            ×
                        </button>
                    </div>
                    <div className="messages-container">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit} className="input-form">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t('chatbot.inputPlaceholder')}
                            className="message-input"
                        />
                        <button type="submit" className="send-button">
                            {t('chatbot.sendButton')}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBot;