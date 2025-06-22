import React, { useState } from 'react';
import { Heart, Home, BookOpen, Gamepad2, Calendar, Film, Brain, MessageSquare } from 'lucide-react';
import HomePage from './components/HomePage';
import Journal from './components/Journal';
import Games from './components/Games';
import MoodSignals from './components/MoodSignals';
import MoodFlix from './components/MoodFlix';
import Quiz from './components/Quiz';
import Reviews from './components/Reviews';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'journal', name: 'Journal', icon: BookOpen },
    { id: 'games', name: 'Games', icon: Gamepad2 },
    { id: 'mood', name: 'Mood Signals', icon: Calendar },
    { id: 'movies', name: 'MoodFlix', icon: Film },
    { id: 'quiz', name: 'Quiz', icon: Brain },
    { id: 'reviews', name: 'Reviews', icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'journal':
        return <Journal />;
      case 'games':
        return <Games />;
      case 'mood':
        return <MoodSignals />;
      case 'movies':
        return <MoodFlix />;
      case 'quiz':
        return <Quiz />;
      case 'reviews':
        return <Reviews />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Amicus</h1>
                <p className="text-sm text-gray-600">Your empathetic AI companion</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              Built with Bolt.new
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/60 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-200 to-pink-200 text-purple-700 shadow-sm'
                      : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="transition-all duration-300 ease-in-out">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;