import React, { useState, useEffect, useRef } from 'react';

const EnglishBot = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm your AI Teacher. We are at Level 1. Ready to practice?", vocab: [] }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Ở đây bạn sẽ gọi API Gemini hoặc OpenAI
      // Tạm thời giả lập phản hồi của giáo viên AI
      setTimeout(() => {
        const aiResponse = {
          role: 'bot',
          text: "That's good! 'Happy' is a great word.",
          correction: "You said: '" + input + "'. Perfect!",
          vocab: [{ word: "Happy", mean: "Hạnh phúc" }]
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Lỗi kết nối AI:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto border rounded-2xl shadow-2xl bg-white overflow-hidden">
      {/* Header - Hiển thị Level */}
      <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <h2 className="font-bold">E-English AI Assistant</h2>
        <span className="bg-blue-800 px-3 py-1 rounded-full text-xs">Level 1/20</span>
      </div>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${
              msg.role === 'user' ? 'bg-blue-500 text-white shadow-md' : 'bg-white border text-gray-800 shadow-sm'
            }`}>
              <p>{msg.text}</p>
              {msg.correction && (
                <p className="mt-2 text-xs italic border-t pt-1 border-gray-200 text-green-600">
                  💡 {msg.correction}
                </p>
              )}
              {msg.vocab && msg.vocab.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {msg.vocab.map((v, i) => (
                    <span key={i} className="text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                      {v.word}: {v.mean}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-xs text-gray-400 animate-pulse">Giáo viên đang soạn câu trả lời...</div>}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t flex gap-2 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Speak or type English here..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button 
          onClick={handleSend}
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EnglishBot;
