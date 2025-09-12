import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, MessageCircle, X, Volume2, VolumeX } from 'lucide-react';

interface Message {
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface SpeechRecognitionEvent {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionStatic {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionStatic;
    webkitSpeechRecognition: SpeechRecognitionStatic;
  }
}

const VoiceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('hi'); // Default to Hindi
  const [showPopup, setShowPopup] = useState<boolean>(true);
  
  // Hardcoded API key - Gemini 2.0 Flash Pro version with no rate limits
  const apiKey = 'AIzaSyAn80nBH76GuwNGQVkw5-s7VPGZm368t5w';

  // Language configuration
  const languages = {
    'hi': { name: 'हिंदी (Hindi)', code: 'hi-IN', flag: '🇮🇳' },
    'or': { name: 'ଓଡ଼ିଆ (Odia)', code: 'or-IN', flag: '🇮🇳' },
    'en': { name: 'English', code: 'en-US', flag: '🇺🇸' }
  };

  // Test API connectivity
  const testAPI = async () => {
    try {
      const testResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: 'Hello, can you hear me?'
            }]
          }]
        })
      });
      console.log('API Test Status:', testResponse.status);
      if (testResponse.ok) {
        console.log('API is working correctly');
      } else {
        console.log('API test failed:', await testResponse.text());
      }
    } catch (error) {
      console.error('API test error:', error);
    }
  };
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Initialize speech synthesis
    synthRef.current = window.speechSynthesis;
    
    // Initialize speech synthesis properly
    const initializeSpeech = () => {
      if (window.speechSynthesis) {
        // Get available voices
        const voices = window.speechSynthesis.getVoices();
        console.log('Available voices:', voices.length);
        
        // If no voices yet, wait for them to load
        if (voices.length === 0) {
          window.speechSynthesis.addEventListener('voiceschanged', () => {
            const updatedVoices = window.speechSynthesis.getVoices();
            console.log('Voices loaded:', updatedVoices.length);
          });
        }
      }
    };
    
    initializeSpeech();
    
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = languages[selectedLanguage as keyof typeof languages].code;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Add multilingual welcome message when component loads
    const getWelcomeMessage = () => {
      if (selectedLanguage === 'hi') {
        return 'नमस्ते! मैं 20+ वर्ष के अनुभव के साथ आपका कृषि विशेषज्ञ हूँ। मुझसे फसल, मिट्टी, कीड़े, सिंचाई, खाद, या सब्सिडी के बारे में पूछिए। मैं 200 शब्दों में व्यावहारिक सलाह दूंगा।';
      } else if (selectedLanguage === 'or') {
        return 'ନମସ୍କାର! ମୁଁ 20+ ବର୍ଷର ଅଭିଜ୍ଞତା ସହ ଆପଣଙ୍କ କୃଷି ବିଶେଷଜ୍ଞ। ମୋତେ ଫସଲ, ମାଟି, କୀଟପତଙ୍ଗ, ସିଙ୍ଚନ, ଖାଦ୍ୟ, କିମ୍ବା ସବସିଡି ବିଷୟରେ ପ୍ରଶ୍ନ କରନ୍ତୁ। ମୁଁ 200 ଶବ୍ଦରେ ବ୍ୟବହାରିକ ସଲାହ ଦେବି।';
      } else {
        return 'Hello! I\'m your Agricultural Expert with 20+ years of farming experience. Ask me about crops, soil, pests, irrigation, fertilizers, or subsidies. I\'ll give you practical advice under 200 words.';
      }
    };
    
    const welcomeMessage: Message = {
      type: 'ai',
      content: getWelcomeMessage(),
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    
    // Don't auto-speak welcome message - let user trigger manually
    
    // Test API on component mount
    testAPI();
  }, []);

  // Update welcome message when language changes
  useEffect(() => {
    const getWelcomeMessage = () => {
      if (selectedLanguage === 'hi') {
        return 'नमस्ते! मैं 20+ वर्ष के अनुभव के साथ आपका कृषि विशेषज्ञ हूँ। मुझसे फसल, मिट्टी, कीड़े, सिंचाई, खाद, या सब्सिडी के बारे में पूछिए। मैं 200 शब्दों में व्यावहारिक सलाह दूंगा।';
      } else if (selectedLanguage === 'or') {
        return 'ନମସ୍କାର! ମୁଁ 20+ ବର୍ଷର ଅଭିଜ୍ଞତା ସହ ଆପଣଙ୍କ କୃଷି ବିଶେଷଜ୍ଞ। ମୋତେ ଫସଲ, ମାଟି, କୀଟପତଙ୍ଗ, ସିଙ୍ଚନ, ଖାଦ୍ୟ, କିମ୍ବା ସବସିଡି ବିଷୟରେ ପ୍ରଶ୍ନ କରନ୍ତୁ। ମୁଁ 200 ଶବ୍ଦରେ ବ୍ୟବହାରିକ ସଲାହ ଦେବି।';
      } else {
        return 'Hello! I\'m your Agricultural Expert with 20+ years of farming experience. Ask me about crops, soil, pests, irrigation, fertilizers, or subsidies. I\'ll give you practical advice under 200 words.';
      }
    };
    
    // Update the first message when language changes
    if (messages.length > 0) {
      const updatedWelcomeMessage: Message = {
        type: 'ai',
        content: getWelcomeMessage(),
        timestamp: new Date()
      };
      setMessages([updatedWelcomeMessage]);
    }
    
    // Update speech recognition language
    if (recognitionRef.current) {
      recognitionRef.current.lang = languages[selectedLanguage as keyof typeof languages].code;
    }
  }, [selectedLanguage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startListening = (): void => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = (): void => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string): void => {
    if (!text || text.trim() === '') return;
    
    // Ensure speech synthesis is available
    if (!window.speechSynthesis) {
      console.error('Speech synthesis not supported in this browser');
      return;
    }

    // Cancel any ongoing speech first
    window.speechSynthesis.cancel();
    
    // Wait a bit for cancellation to complete
    setTimeout(() => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Configure voice settings for better clarity
        utterance.rate = 1.3; // Faster speech rate as requested
        utterance.pitch = 1.0;
        utterance.volume = 1.0; // Maximum volume
        utterance.lang = languages[selectedLanguage as keyof typeof languages].code;
        
        // Set up event handlers
        utterance.onstart = () => {
          console.log('Speech started');
          setIsSpeaking(true);
        };
        
        utterance.onend = () => {
          console.log('Speech ended');
          setIsSpeaking(false);
        };
        
        utterance.onerror = (event) => {
          console.error('Speech error:', event.error);
          setIsSpeaking(false);
        };
        
        utterance.onpause = () => {
          console.log('Speech paused');
        };
        
        utterance.onresume = () => {
          console.log('Speech resumed');
        };
        
        // Speak the text
        console.log('Starting speech synthesis for:', text.substring(0, 50) + '...');
        window.speechSynthesis.speak(utterance);
        
      } catch (error) {
        console.error('Error in speech synthesis:', error);
        setIsSpeaking(false);
      }
    }, 100);
  };

  const stopSpeaking = (): void => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      console.log('Speech synthesis stopped');
    }
  };

  const sendMessage = async (text: string): Promise<void> => {
    if (!text.trim()) return;
    
    const userMessage: Message = { type: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Enhanced agricultural expert prompt with language support
      const languageName = selectedLanguage === 'hi' ? 'Hindi (हिंदी)' : 
                           selectedLanguage === 'or' ? 'Odia (ଓଡ଼ିଆ)' : 'English';
      
      const prompt = `You are a highly experienced Agricultural Expert with 20+ years of farming expertise.
      
      STRICT REQUIREMENTS:
      - Respond ONLY in ${languageName} language
      - Maximum 200 words response DON'T SAY THIS IN YOUR RESPONSE
      - Provide ONLY practical, actionable advice
      - Use simple, farmer-friendly language
      - Be specific and accurate
      - Focus on immediate solutions
      - Don't use asterisk or other special characters and don't make any response bold
      - Don't use any emojis or special characters
      - If user asks in Hinglish, respond in ${languageName}
      
      User Question: ${text}
      
      As an expert, give concise advice in ${languageName} on: crop cultivation, soil management, pest control, irrigation, fertilizers, government schemes, or farming techniques. Provide direct answers farmers can implement today.`;

      const requestBody = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3, // Lower for more focused responses
          topK: 20,
          topP: 0.8,
          maxOutputTokens: 200, // Strict limit for concise responses
          candidateCount: 1
        }
      };

      console.log('Sending request to Gemini API...', requestBody);

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        
        // Provide helpful fallback responses based on common agricultural questions
        const fallbackResponse = getFallbackResponse(text);
        const aiMessage: Message = { type: 'ai', content: fallbackResponse, timestamp: new Date() };
        setMessages(prev => [...prev, aiMessage]);
        
        // Don't auto-speak - let user manually trigger if needed
        console.log('Fallback response ready. User can click Speak button if needed.');
        
        return;
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      let aiResponse = '';
      
      if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
        aiResponse = data.candidates[0].content.parts[0].text;
      } else {
        console.error('Unexpected API response structure:', data);
        aiResponse = getFallbackResponse(text);
      }
      
      const aiMessage: Message = { type: 'ai', content: aiResponse, timestamp: new Date() };
      setMessages(prev => [...prev, aiMessage]);
      
      // Don't auto-speak - let user click 'Speak' button if they want to hear it
      console.log('AI response ready. User can click Speak button to hear it.');
      
    } catch (error) {
      console.error('Detailed Error:', error);
      
      // Use fallback response instead of generic error
      const fallbackResponse = getFallbackResponse(text);
      const errorMessage: Message = { 
        type: 'ai', 
        content: fallbackResponse, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, errorMessage]);
      
      // Don't auto-speak error responses - let user decide
      console.log('Error fallback ready. User can click Speak button if needed.');
    } finally {
      setIsLoading(false);
    }
  };

  // Multilingual fallback responses from agricultural expert
  const getFallbackResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Hindi responses
    if (selectedLanguage === 'hi') {
      if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('namaste')) {
        return 'नमस्ते! मैं आपका कृषि विशेषज्ञ हूँ। मुझसे फसल, मिट्टी, कीड़े, सिंचाई, खाद, या सब्सिडी के बारे में पूछिए। मैं 200 शब्दों में व्यावहारिक सलाह दूंगा।';
      }
      if (lowerQuestion.includes('crop') || lowerQuestion.includes('fasal') || lowerQuestion.includes('plant')) {
        return 'फसल चुनाव: मिट्टी के प्रकार, जलवायु, पानी और बाजार की मांग के अनुसार किस्म चुनें। नए किसानों के लिए: टमाटर, प्याज, आलू भरोसेमंद हैं। मिट्टी का pH 6.0-7.0 रखें, अच्छा निकास सुनिश्चित करें।';
      }
      if (lowerQuestion.includes('subsidy') || lowerQuestion.includes('yojana') || lowerQuestion.includes('scheme')) {
        return 'सरकारी सब्सिडी: पहले प्रशिक्षण मॉड्यूल पूरा करें। पात्रता जमीन के आकार पर निर्भर करती है। छोटे किसानों (≤2 एकड़) के लिए PM-KISAN, मध्यम खेतों (2-5 एकड़) के लिए RKVY। दस्तावेज तैयार रखें: आधार, जमीन के कागजात, बैंक विवरण।';
      }
      if (lowerQuestion.includes('water') || lowerQuestion.includes('sinchayee') || lowerQuestion.includes('irrigation')) {
        return 'सिंचाई की अच्छी प्रथाओं: 30% पानी की बचत के लिए ड्रिप सिंचाई का उपयोग करें। बढ़ते मौसम में 70-80% मिट्टी की नमी बनाए रखें। सुबह जल्दी या शाम को पानी दें। मिट्टी की नमी 2-3 इंच गहराई में जांचें। ज्यादा पानी न दें - जड़ सड़न होती है।';
      }
      // Generic Hindi response
      return 'मैं आपका कृषि विशेषज्ञ हूँ! मुझसे फसल की किस्में, मिट्टी तैयार करना, कीड़े नियंत्रण, सिंचाई, खाद, या सरकारी योजनाओं के बारे में पूछिए। मैं 200 शब्दों में व्यावहारिक सलाह दूंगा।';
    }
    
    // Odia responses
    if (selectedLanguage === 'or') {
      if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('namaskar')) {
        return 'ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କ କୃଷି ବିଶେଷଜ୍ଞ। ମୋତେ ଫସଲ, ମାଟି, କୀଟପତଙ୍ଗ, ସିଙ୍ଚନ, ଖାଦ୍ୟ, କିମ୍ବା ସବସିଡି ବିଷୟରେ ପ୍ରଶ୍ନ କରନ୍ତୁ। ମୁଁ 200 ଶବ୍ଦରେ ବ୍ୟବହାରିକ ସଲାହ ଦେବି।';
      }
      if (lowerQuestion.includes('crop') || lowerQuestion.includes('fasal') || lowerQuestion.includes('plant')) {
        return 'ଫସଲ ବାଛିବା: ଆପଣଙ୍କ ମାଟି ପ୍ରକାର, ଜଳବାୟୁ, ପାଣି ଭରଣା ଆର ବାଜାର ମାଗ ଅନୁସାରେ ପ୍30ଜାତି ଚୟନ କରନ୍ତୁ। ନୂଆ କୃଷକଙ୍କ ପାଇଁ: ଟମେଟୋ, ପିଆଜ, ଆଲୁ ଭରସାଯୋଗ୍ୟ। ମାଟି pH 6.0-7.0 ରାଖନ୍ତୁ, ଭାଲ ପାଣି ନିକାସ ସୁନିଶ୍ଚିତ କରନ୍ତୁ।';
      }
      // Generic Odia response
      return 'ମୁଁ ଆପଣଙ୍କ କୃଷି ବିଶେଷଜ୍ଞ! ମୋତେ ଫସଲ ପ୍ରଜାତି, ମାଟି ତୈୟାରୀ, କୀଟପତଙ୍ଗ ନିୟନ୍ତ୍ରଣ, ସିଙ୍ଚନ ପଦ୍ଧତି, ଖାଦ୍ୟ ପ୍ରୟୋଗ, କିମ୍ବା ସରକାରୀ ଯୋଜନା ବିଷୟରେ ପ୍ରଶ୍ନ କରନ୍ତୁ। ମୁଁ 200 ଶବ୍ଦରେ ବ୍ୟବହାରିକ ସଲାହ ଦେବି।';
    }
    
    // English responses (fallback)
    if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi')) {
      return 'Hello! I\'m your Agricultural Expert. Ask me about crops, soil, pests, irrigation, fertilizers, or subsidies. I\'ll give you practical farming advice in under 200 words.';
    }
    
    if (lowerQuestion.includes('crop') || lowerQuestion.includes('plant')) {
      return 'Crop Selection Tips: Choose varieties based on your soil type, climate, and local market demand. For beginners: tomatoes, onions, potatoes are reliable. Check soil pH (6.0-7.0 ideal), ensure good drainage, and select disease-resistant varieties. Consider crop rotation to maintain soil health.';
    }
    
    // Generic English response
    return 'I\'m your Agricultural Expert! Ask specific questions about: crop varieties, soil preparation, pest control, irrigation methods, fertilizer application, or government schemes. I\'ll provide practical, actionable advice under 200 words.';
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  const clearChat = (): void => {
    setMessages([]);
    stopSpeaking();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* KrishiShayak Popup */}
      {!isOpen && showPopup && (
        <div className="absolute bottom-20 right-0 mb-2 mr-2 z-60">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg relative animate-bounce">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">🌾 KrishiShayak</span>
              <button
                onClick={() => setShowPopup(false)}
                className="text-white hover:text-gray-200 transition-colors"
                title="Close popup"
              >
                <X size={14} />
              </button>
            </div>
            <p className="text-xs mt-1">Your AI Farming Expert</p>
            {/* Arrow pointing to chatbot */}
            <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-green-600"></div>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setShowPopup(false);
          }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl border w-full max-w-[450px] h-[500px] flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-medium">KrishiShayak</span>
            </div>
            <div className="flex items-center space-x-2">
              {/* Language Selector */}
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="text-xs bg-white/20 text-white border border-white/30 rounded px-2 py-1 focus:outline-none focus:bg-white/30"
                title="Select Language"
              >
                {Object.entries(languages).map(([code, lang]) => (
                  <option key={code} value={code} className="text-gray-800">
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              {isSpeaking && (
                <button
                  onClick={stopSpeaking}
                  className="p-1 hover:bg-white/20 rounded"
                  title="Stop speaking"
                >
                  <VolumeX size={16} />
                </button>
              )}
              <button
                onClick={clearChat}
                className="p-1 hover:bg-white/20 rounded text-xs"
                title="Clear chat"
              >
                Clear
              </button>
              <button
                onClick={() => speakText('Speech test - voice assistant is working properly!')}
                className="p-1 hover:bg-white/20 rounded text-xs"
                title="Test speech"
              >
                Test Voice
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-sm">Agricultural Assistant is ready to help!</p>
                <p className="text-xs mt-2">Ask me about farming, crops, subsidies, or say "Hello"</p>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 border'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.type === 'ai' && (
                    <div className="mt-2 flex items-center justify-between">
                      <button
                        onClick={() => speakText(message.content)}
                        disabled={isSpeaking}
                        className="text-xs text-blue-600 hover:text-blue-800 disabled:text-gray-400 flex items-center space-x-1 transition-colors"
                      >
                        <Volume2 size={12} />
                        <span>{isSpeaking ? 'Speaking...' : 'Click to Speak'}</span>
                      </button>
                      <span className="text-xs text-gray-400">🎧 Voice available</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message or use voice..."
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                />
              </div>
              
              <button
                onClick={isListening ? stopListening : startListening}
                disabled={isLoading}
                className={`p-2 rounded-full transition-colors ${
                  isListening
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                } disabled:opacity-50`}
                title={isListening ? 'Stop listening' : 'Start voice input'}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              
              <button
                onClick={() => sendMessage(inputText)}
                disabled={!inputText.trim() || isLoading}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Send message"
              >
                <Send size={20} />
              </button>
            </div>
            
            {isListening && (
              <p className="text-xs text-red-600 mt-2 text-center animate-pulse">
                🎤 Listening... Speak now
              </p>
            )}
            
            {isSpeaking && (
              <p className="text-xs text-blue-600 mt-2 text-center flex items-center justify-center space-x-1">
                <span>🔊</span>
                <span>Speaking... Click stop button in header to cancel</span>
              </p>
            )}
            
            {!isSpeaking && (
              <p className="text-xs text-gray-500 mt-2 text-center">
                💡 Tip: Click "Click to Speak" on any AI message to hear it
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;