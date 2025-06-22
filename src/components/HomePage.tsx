import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Brain, Moon, Send } from 'lucide-react';

const motivationalQuotes = {
  happy: [
    "Your positive energy is contagious! Keep shining bright.",
    "Happiness is a choice, and you're making it beautifully.",
    "Your joy creates ripples of positivity in the world."
  ],
  neutral: [
    "Every small step forward is progress worth celebrating.",
    "It's okay to have quiet moments. They help us grow.",
    "Balance is found in embracing both sunshine and storms."
  ],
  sad: [
    "Your feelings are valid, and you're stronger than you know.",
    "Healing happens one breath at a time. You're doing great.",
    "Tomorrow holds new possibilities for peace and joy."
  ]
};

interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  emotion?: string;
  suggestions?: string[];
}

const HomePage: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState('');
  const [userMood, setUserMood] = useState<'happy' | 'neutral' | 'sad'>('neutral');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hello! I'm here to listen and support you. Tell me about your day in a word or two, or share whatever is on your mind...",
      isUser: false,
      timestamp: new Date(),
    }
  ]);

  useEffect(() => {
    const quotes = motivationalQuotes[userMood];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
  }, [userMood]);

  const analyzeEmotion = (text: string): string => {
    const positiveWords = ['happy', 'great', 'good', 'wonderful', 'amazing', 'excited', 'joy', 'love', 'peaceful'];
    const negativeWords = ['sad', 'angry', 'frustrated', 'tired', 'stressed', 'anxious', 'worried', 'difficult', 'hard'];
    
    const lowerText = text.toLowerCase();
    
    if (positiveWords.some(word => lowerText.includes(word))) {
      return 'positive';
    } else if (negativeWords.some(word => lowerText.includes(word))) {
      return 'negative';
    }
    return 'neutral';
  };

  const generateResponse = (userText: string, emotion: string): { response: string; suggestions: string[] } => {
    const responses = {
      positive: [
        "It's wonderful to hear the joy in your words! Your positive energy is truly inspiring.",
        "I can feel the happiness radiating from what you've shared. Keep embracing those beautiful moments!",
        "Your optimism is a gift not just to yourself, but to everyone around you. Thank you for sharing this brightness."
      ],
      negative: [
        "I hear you, and I want you to know that your feelings are completely valid. It takes courage to acknowledge difficult emotions.",
        "Thank you for trusting me with what you're going through. You're not alone in this, and it's okay to feel what you're feeling.",
        "I can sense the weight you're carrying right now. Remember that seeking support shows strength, not weakness."
      ],
      neutral: [
        "Thank you for sharing with me. Sometimes the quiet moments in between are just as important as the highs and lows.",
        "I appreciate you taking the time to reflect and share your thoughts. Every feeling deserves recognition and care.",
        "Your willingness to check in with yourself shows great self-awareness. That's a valuable skill for mental wellness."
      ]
    };

    const suggestions = {
      positive: [
        "Consider journaling about what made today special",
        "Share your positive energy with someone you care about",
        "Take a moment to practice gratitude for these good feelings"
      ],
      negative: [
        "Try some deep breathing exercises to center yourself",
        "Consider reaching out to a trusted friend or family member",
        "Remember that difficult emotions are temporary and valid"
      ],
      neutral: [
        "Try a short mindfulness meditation",
        "Take a gentle walk in nature if possible",
        "Consider setting one small, achievable goal for tomorrow"
      ]
    };

    const responseArray = responses[emotion as keyof typeof responses];
    const suggestionArray = suggestions[emotion as keyof typeof suggestions];
    
    return {
      response: responseArray[Math.floor(Math.random() * responseArray.length)],
      suggestions: suggestionArray
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    const emotion = analyzeEmotion(input);
    const { response, suggestions } = generateResponse(input, emotion);

    const aiMessage: ChatMessage = {
      id: messages.length + 2,
      text: response,
      isUser: false,
      timestamp: new Date(),
      emotion,
      suggestions,
    };

    setMessages([...messages, userMessage, aiMessage]);
    setInput('');
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span className="text-purple-700 font-medium">Welcome back to your safe space</span>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Hello, Beautiful Soul
        </h2>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Take a moment to breathe, reflect, and connect with yourself. 
          Amicus is here to support your mental wellness journey with empathy and care.
        </p>
      </div>

      {/* Daily Check-in */}
      <div className="bg-white rounded-3xl shadow-sm border border-green-100 overflow-hidden">
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
            <Heart className="w-5 h-5 text-green-600" />
            <span>Daily Check-in</span>
          </h3>
        </div>
        
        {/* Messages */}
        <div className="h-64 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md ${message.isUser ? 'bg-gradient-to-r from-green-200 to-emerald-200 text-green-800' : 'bg-gray-50 text-gray-800'} rounded-2xl p-4 shadow-sm`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                {message.emotion && message.suggestions && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Brain className="w-4 h-4 text-yellow-500" />
                        <span className="text-xs font-medium text-gray-600">Gentle suggestions:</span>
                      </div>
                      {message.suggestions.map((suggestion, index) => (
                        <p key={index} className="text-xs text-gray-600 ml-6">• {suggestion}</p>
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tell me about your day in a word or two..."
              className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-2xl hover:from-green-500 hover:to-emerald-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </form>
      </div>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 text-center shadow-sm border border-purple-100">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-white rounded-full shadow-sm">
            <Heart className="w-6 h-6 text-pink-500" />
          </div>
        </div>
        <blockquote className="text-lg text-gray-700 italic font-medium mb-4">
          "{currentQuote}"
        </blockquote>
        <div className="flex justify-center space-x-2">
          {(['happy', 'neutral', 'sad'] as const).map((mood) => (
            <button
              key={mood}
              onClick={() => setUserMood(mood)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                userMood === mood
                  ? 'bg-purple-200 text-purple-700'
                  : 'bg-white text-gray-600 hover:bg-purple-50'
              }`}
            >
              {mood === 'happy' ? '😊' : mood === 'neutral' ? '😐' : '😔'} {mood}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 shadow-sm border border-green-100 hover:shadow-md transition-all duration-200 cursor-pointer">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-200 rounded-full">
              <Brain className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Personal Journal</h3>
          </div>
          <p className="text-gray-600 mb-4">Write detailed diary entries and reflect on your thoughts</p>
          <div className="bg-white rounded-2xl p-3 text-sm text-gray-500">
            Available in Journal section
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-6 shadow-sm border border-pink-100 hover:shadow-md transition-all duration-200 cursor-pointer">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-pink-200 rounded-full">
              <Heart className="w-5 h-5 text-pink-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Mood Tracking</h3>
          </div>
          <p className="text-gray-600 mb-4">Track your emotional journey with visual insights</p>
          <div className="bg-white rounded-2xl p-3 text-sm text-gray-500">
            Available in Mood Signals section
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-all duration-200 cursor-pointer">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-200 rounded-full">
              <Moon className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Calming Games</h3>
          </div>
          <p className="text-gray-600 mb-4">Practice mindfulness through interactive activities</p>
          <div className="bg-white rounded-2xl p-3 text-sm text-gray-500">
            Available in Games section
          </div>
        </div>
      </div>

      {/* Features Overview */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-purple-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Your Wellness Toolkit
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-purple-100 rounded-full mt-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">AI-Powered Check-ins</h4>
                <p className="text-sm text-gray-600">Get empathetic responses and emotional insights</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-purple-100 rounded-full mt-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Personal Journal</h4>
                <p className="text-sm text-gray-600">Write, edit, and organize your diary entries</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-purple-100 rounded-full mt-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Mindfulness Games</h4>
                <p className="text-sm text-gray-600">Breathing exercises, focus training, and positive thinking</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-purple-100 rounded-full mt-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Mood Analytics</h4>
                <p className="text-sm text-gray-600">Visual tracking with calendar and insights</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-purple-100 rounded-full mt-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Movie Recommendations</h4>
                <p className="text-sm text-gray-600">Mood-based film suggestions for healing and inspiration</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-purple-100 rounded-full mt-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Wellness Assessment</h4>
                <p className="text-sm text-gray-600">Short quizzes to understand your mental health patterns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;