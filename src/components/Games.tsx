import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Wind, Brain, Focus } from 'lucide-react';

const Games: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const GameCard: React.FC<{ 
    title: string; 
    description: string; 
    icon: React.ReactNode; 
    gameId: string;
    gradient: string;
  }> = ({ title, description, icon, gameId, gradient }) => (
    <div className={`${gradient} rounded-3xl p-6 shadow-sm border border-opacity-20 hover:shadow-md transition-all duration-200 cursor-pointer`}
         onClick={() => setActiveGame(gameId)}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-white/50 rounded-full">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <button className="bg-white/70 hover:bg-white/90 text-gray-800 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200">
        Start Game
      </button>
    </div>
  );

  const BreatheGame: React.FC = () => {
    const [isBreathing, setIsBreathing] = useState(false);
    const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
    const [count, setCount] = useState(4);

    useEffect(() => {
      if (!isBreathing) return;

      const timer = setInterval(() => {
        setCount((prev) => {
          if (prev <= 1) {
            setPhase((currentPhase) => {
              if (currentPhase === 'inhale') return 'hold';
              if (currentPhase === 'hold') return 'exhale';
              return 'inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }, [isBreathing]);

    return (
      <div className="text-center space-y-8">
        <h3 className="text-2xl font-bold text-gray-800">Breathe With Me</h3>
        
        <div className="relative w-64 h-64 mx-auto">
          <div className={`w-full h-full rounded-full bg-gradient-to-r from-blue-200 to-purple-200 transition-all duration-1000 flex items-center justify-center ${
            phase === 'inhale' ? 'scale-125' : phase === 'exhale' ? 'scale-75' : 'scale-100'
          }`}>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700 capitalize">{phase}</p>
              <p className="text-3xl font-bold text-gray-800">{count}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            {phase === 'inhale' && 'Breathe in slowly and deeply...'}
            {phase === 'hold' && 'Hold your breath gently...'}
            {phase === 'exhale' && 'Release your breath slowly...'}
          </p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setIsBreathing(!isBreathing)}
              className={`px-6 py-3 rounded-2xl text-white font-medium transition-all duration-200 flex items-center space-x-2 ${
                isBreathing 
                  ? 'bg-red-400 hover:bg-red-500' 
                  : 'bg-blue-400 hover:bg-blue-500'
              }`}
            >
              {isBreathing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isBreathing ? 'Pause' : 'Start'}</span>
            </button>
            
            <button
              onClick={() => {
                setIsBreathing(false);
                setPhase('inhale');
                setCount(4);
              }}
              className="px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-2xl font-medium transition-all duration-200 flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const MindMazeGame: React.FC = () => {
    const [currentThought, setCurrentThought] = useState(0);
    const [score, setScore] = useState(0);

    const negativeThoughts = [
      { thought: "I always mess things up", positive: "I learn from my experiences and grow stronger" },
      { thought: "Nobody likes me", positive: "I am worthy of love and friendship" },
      { thought: "I'm not good enough", positive: "I am enough exactly as I am" },
      { thought: "Nothing ever goes right", positive: "Challenges help me discover my resilience" },
      { thought: "I can't do anything right", positive: "I have unique strengths and abilities" }
    ];

    const handlePositiveChoice = () => {
      setScore(score + 1);
      if (currentThought < negativeThoughts.length - 1) {
        setCurrentThought(currentThought + 1);
      } else {
        // Game complete
        setCurrentThought(0);
        setScore(0);
      }
    };

    return (
      <div className="text-center space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">Mind Maze</h3>
        <p className="text-gray-600">Transform negative thoughts into positive affirmations</p>
        
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-3xl p-6 border border-red-100">
          <div className="mb-4">
            <span className="text-sm text-gray-500">Negative Thought:</span>
            <p className="text-lg text-gray-800 font-medium">"{negativeThoughts[currentThought].thought}"</p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
            <span className="text-sm text-gray-500">Choose the positive reframe:</span>
            <p className="text-lg text-gray-800 font-medium mt-2">"{negativeThoughts[currentThought].positive}"</p>
          </div>
          
          <button
            onClick={handlePositiveChoice}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-2xl hover:from-green-500 hover:to-emerald-500 transition-all duration-200"
          >
            Transform Thought
          </button>
        </div>
        
        <div className="text-sm text-gray-600">
          Thoughts transformed: {score} / {negativeThoughts.length}
        </div>
      </div>
    );
  };

  const FocusBubbleGame: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [bubbleSize, setBubbleSize] = useState(100);

    useEffect(() => {
      if (!isActive) return;

      const timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
        setBubbleSize((prev) => Math.min(prev + 2, 300));
      }, 1000);

      return () => clearInterval(timer);
    }, [isActive]);

    const resetGame = () => {
      setIsActive(false);
      setSeconds(0);
      setBubbleSize(100);
    };

    const handleBubbleClick = () => {
      if (isActive) {
        resetGame();
      }
    };

    return (
      <div className="text-center space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">Focus Bubble</h3>
        <p className="text-gray-600">Watch the bubble grow. Stay focused and don't touch it!</p>
        
        <div className="relative h-80 flex items-center justify-center">
          <div
            className={`rounded-full bg-gradient-to-r from-blue-200 to-purple-200 transition-all duration-1000 cursor-pointer flex items-center justify-center ${
              isActive ? 'animate-pulse' : ''
            }`}
            style={{ width: bubbleSize, height: bubbleSize }}
            onClick={handleBubbleClick}
          >
            <span className="text-lg font-bold text-gray-700">{seconds}s</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            {!isActive ? 'Click Start to begin focusing' : 'Stay calm and focused. Don\'t touch the bubble!'}
          </p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className={`px-6 py-3 rounded-2xl text-white font-medium transition-all duration-200 flex items-center space-x-2 ${
                isActive 
                  ? 'bg-red-400 hover:bg-red-500' 
                  : 'bg-blue-400 hover:bg-blue-500'
              }`}
            >
              <Focus className="w-4 h-4" />
              <span>{isActive ? 'Stop' : 'Start'}</span>
            </button>
            
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-2xl font-medium transition-all duration-200 flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (activeGame) {
    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setActiveGame(null)}
          className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-2xl transition-all duration-200"
        >
          ← Back to Games
        </button>
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-purple-100">
          {activeGame === 'breathe' && <BreatheGame />}
          {activeGame === 'maze' && <MindMazeGame />}
          {activeGame === 'focus' && <FocusBubbleGame />}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-purple-100 px-6 py-3 rounded-full">
          <Brain className="w-5 h-5 text-pink-600" />
          <span className="text-pink-700 font-medium">Mind Calming Games</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Interactive Self-Care</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Practice mindfulness and emotional wellness through these gentle, interactive games designed to calm your mind and nurture positive thinking.
        </p>
      </div>

      {/* Games Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <GameCard
          title="Breathe With Me"
          description="Follow the breathing bubble to practice deep, calming breaths and center yourself."
          icon={<Wind className="w-5 h-5 text-blue-600" />}
          gameId="breathe"
          gradient="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100"
        />
        
        <GameCard
          title="Mind Maze" 
          description="Transform negative thoughts into positive affirmations by choosing healthier perspectives."
          icon={<Brain className="w-5 h-5 text-green-600" />}
          gameId="maze"
          gradient="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100"
        />
        
        <GameCard
          title="Focus Bubble"
          description="Practice patience and focus by watching the bubble grow without touching it."
          icon={<Focus className="w-5 h-5 text-purple-600" />}
          gameId="focus"
          gradient="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100"
        />
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl p-6 border border-yellow-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">🌟 Benefits of Mindful Gaming</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="space-y-2">
            <p>• Reduces stress and anxiety</p>
            <p>• Improves focus and concentration</p>
            <p>• Builds emotional resilience</p>
          </div>
          <div className="space-y-2">
            <p>• Promotes positive thinking patterns</p>
            <p>• Enhances mindfulness practice</p>
            <p>• Provides gentle self-care breaks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;