import React, { useState } from 'react';
import { Brain, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: { text: string; score: number }[];
}

interface QuizResult {
  score: number;
  level: 'excellent' | 'good' | 'moderate' | 'needs-attention';
  title: string;
  description: string;
  recommendations: string[];
}

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      question: "How often do you feel overwhelmed by daily stress?",
      options: [
        { text: "Rarely or never", score: 4 },
        { text: "Sometimes", score: 3 },
        { text: "Often", score: 2 },
        { text: "Almost always", score: 1 }
      ]
    },
    {
      id: 2,
      question: "How well do you sleep at night?",
      options: [
        { text: "Very well - I feel rested", score: 4 },
        { text: "Pretty well most nights", score: 3 },
        { text: "Not great - I wake up tired", score: 2 },
        { text: "Poorly - I have trouble sleeping", score: 1 }
      ]
    },
    {
      id: 3,
      question: "How connected do you feel to friends and family?",
      options: [
        { text: "Very connected and supported", score: 4 },
        { text: "Mostly connected", score: 3 },
        { text: "Somewhat isolated", score: 2 },
        { text: "Very isolated and alone", score: 1 }
      ]
    },
    {
      id: 4,
      question: "How often do you engage in activities you enjoy?",
      options: [
        { text: "Regularly - I make time for hobbies", score: 4 },
        { text: "Sometimes when I can", score: 3 },
        { text: "Rarely - I'm usually too busy", score: 2 },
        { text: "Almost never", score: 1 }
      ]
    },
    {
      id: 5,
      question: "How do you typically handle difficult emotions?",
      options: [
        { text: "I process them healthily and seek support", score: 4 },
        { text: "I usually work through them eventually", score: 3 },
        { text: "I struggle but try to cope", score: 2 },
        { text: "I feel overwhelmed and avoid them", score: 1 }
      ]
    }
  ];

  const calculateResult = (): QuizResult => {
    const totalScore = answers.reduce((sum, score) => sum + score, 0);
    const percentage = (totalScore / 20) * 100;

    if (percentage >= 85) {
      return {
        score: percentage,
        level: 'excellent',
        title: 'Excellent Mental Wellness! 🌟',
        description: 'You demonstrate strong mental health practices and resilience. You have healthy coping mechanisms and maintain good balance in your life.',
        recommendations: [
          'Continue your current self-care practices',
          'Share your wellness strategies with others',
          'Consider mentoring someone who might benefit from your experience',
          'Stay mindful of maintaining this balance during challenging times'
        ]
      };
    } else if (percentage >= 70) {
      return {
        score: percentage,
        level: 'good',
        title: 'Good Mental Wellness 😊',
        description: 'You have a solid foundation for mental health with room for some improvements. You generally handle stress well but could benefit from fine-tuning certain areas.',
        recommendations: [
          'Focus on areas where you scored lower',
          'Establish more consistent self-care routines',
          'Practice mindfulness or meditation regularly',
          'Strengthen your support network connections'
        ]
      };
    } else if (percentage >= 50) {
      return {
        score: percentage,
        level: 'moderate',
        title: 'Moderate Mental Wellness 💛',
        description: 'Your mental wellness is okay but there are several areas that could use attention. This is a good time to focus on building healthier habits and coping strategies.',
        recommendations: [
          'Prioritize sleep hygiene and regular sleep schedule',
          'Engage in regular physical activity',
          'Practice stress management techniques',
          'Connect with supportive friends and family more often',
          'Consider professional guidance if needed'
        ]
      };
    } else {
      return {
        score: percentage,
        level: 'needs-attention',
        title: 'Mental Wellness Needs Attention 🤗',
        description: 'It seems like you\'re going through a challenging time. Remember that seeking help is a sign of strength, and there are many resources available to support you.',
        recommendations: [
          'Consider speaking with a mental health professional',
          'Focus on basic self-care: sleep, nutrition, and gentle exercise',
          'Reach out to trusted friends, family, or support groups',
          'Practice daily mindfulness or breathing exercises',
          'Be patient and gentle with yourself during this time'
        ]
      };
    }
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers, questions[currentQuestion].options[selectedOption].score];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizComplete(false);
    setSelectedOption(null);
  };

  const result = quizComplete ? calculateResult() : null;

  const levelColors = {
    excellent: 'from-green-100 to-emerald-100 border-green-200',
    good: 'from-blue-100 to-cyan-100 border-blue-200',
    moderate: 'from-yellow-100 to-orange-100 border-yellow-200',
    'needs-attention': 'from-red-100 to-pink-100 border-red-200'
  };

  if (quizComplete && result) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-3 rounded-full">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium">Assessment Complete</span>
          </div>
        </div>

        <div className={`bg-gradient-to-r ${levelColors[result.level]} rounded-3xl p-8 shadow-sm border`}>
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{result.title}</h2>
            <div className="text-4xl font-bold text-gray-800">
              {Math.round(result.score)}%
            </div>
            <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
              {result.description}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 Personalized Recommendations</h3>
          <div className="space-y-3">
            {result.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="p-1 bg-blue-100 rounded-full mt-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <p className="text-gray-700">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-2xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 flex items-center space-x-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Take Quiz Again</span>
          </button>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-3xl p-6 border border-amber-100">
          <div className="text-sm text-gray-600 space-y-2">
            <p className="font-medium">📝 Important Note:</p>
            <p>This assessment is for educational purposes only and is not a substitute for professional mental health diagnosis or treatment. If you're experiencing persistent mental health concerns, please consider consulting with a qualified mental health professional.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 px-6 py-3 rounded-full">
          <Brain className="w-5 h-5 text-blue-600" />
          <span className="text-blue-700 font-medium">Mental Wellness Assessment</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Understand Your Mental Health</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Take this brief assessment to gain insights into your current mental wellness and receive personalized recommendations.
        </p>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
          {questions[currentQuestion].question}
        </h3>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`w-full p-4 rounded-2xl text-left transition-all duration-200 border ${
                selectedOption === index
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300 text-blue-800'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  selectedOption === index
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedOption === index && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
                <span className="font-medium">{option.text}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className="px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-2xl hover:from-blue-500 hover:to-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <span>{currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}</span>
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-6 border border-purple-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">💭 Assessment Tips</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="space-y-2">
            <p>• Answer honestly for the most accurate results</p>
            <p>• Think about your typical experiences, not just recent ones</p>
          </div>
          <div className="space-y-2">
            <p>• There are no right or wrong answers</p>
            <p>• This is a tool for self-reflection and awareness</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;