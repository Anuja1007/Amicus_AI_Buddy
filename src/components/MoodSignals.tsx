import React, { useState } from 'react';
import { Calendar, TrendingUp, Edit3, Save } from 'lucide-react';

interface MoodEntry {
  date: string;
  mood: 'red' | 'yellow' | 'green';
  note?: string;
}

const MoodSignals: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState('');
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);

  const moodColors = {
    red: { bg: 'bg-red-200', text: 'text-red-800', label: 'Sad/Stressed', emoji: '😔' },
    yellow: { bg: 'bg-yellow-200', text: 'text-yellow-800', label: 'Meh/Neutral', emoji: '😐' },
    green: { bg: 'bg-green-200', text: 'text-green-800', label: 'Happy/Content', emoji: '😊' }
  };

  const getCurrentMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push(dateStr);
    }
    
    return { days, monthName: firstDay.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) };
  };

  const getMoodForDate = (date: string): MoodEntry | undefined => {
    return moodEntries.find(entry => entry.date === date);
  };

  const handleMoodSelect = (mood: 'red' | 'yellow' | 'green') => {
    if (!selectedDate) return;
    
    const existingEntry = moodEntries.find(entry => entry.date === selectedDate);
    if (existingEntry) {
      setMoodEntries(moodEntries.map(entry => 
        entry.date === selectedDate ? { ...entry, mood } : entry
      ));
    } else {
      setMoodEntries([...moodEntries, { date: selectedDate, mood }]);
    }
  };

  const handleNoteSave = () => {
    if (!selectedDate) return;
    
    const existingEntry = moodEntries.find(entry => entry.date === selectedDate);
    if (existingEntry) {
      setMoodEntries(moodEntries.map(entry => 
        entry.date === selectedDate ? { ...entry, note: editingNote } : entry
      ));
    } else {
      setMoodEntries([...moodEntries, { date: selectedDate, mood: 'yellow', note: editingNote }]);
    }
    setEditingNote('');
  };

  const getMoodStats = () => {
    if (moodEntries.length === 0) return { red: 0, yellow: 0, green: 0 };
    
    const stats = moodEntries.reduce((acc, entry) => {
      acc[entry.mood]++;
      return acc;
    }, { red: 0, yellow: 0, green: 0 });

    const total = moodEntries.length;
    return {
      red: Math.round((stats.red / total) * 100),
      yellow: Math.round((stats.yellow / total) * 100),
      green: Math.round((stats.green / total) * 100)
    };
  };

  const { days, monthName } = getCurrentMonth();
  const stats = getMoodStats();
  const selectedEntry = selectedDate ? getMoodForDate(selectedDate) : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full">
          <Calendar className="w-5 h-5 text-purple-600" />
          <span className="text-purple-700 font-medium">Mood Signals</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Track Your Emotional Journey</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Visualize your emotional patterns and gain insights into your mental wellness journey.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-purple-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{monthName}</h3>
          
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {days.map((date, index) => {
              if (!date) {
                return <div key={index} className="aspect-square"></div>;
              }
              
              const moodEntry = getMoodForDate(date);
              const dayNumber = new Date(date).getDate();
              const isSelected = selectedDate === date;
              
              return (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`aspect-square rounded-2xl flex items-center justify-center text-sm font-medium transition-all duration-200 relative ${
                    isSelected 
                      ? 'ring-2 ring-purple-400 ring-offset-2' 
                      : 'hover:bg-gray-50'
                  } ${
                    moodEntry 
                      ? `${moodColors[moodEntry.mood].bg} ${moodColors[moodEntry.mood].text}` 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {dayNumber}
                  {moodEntry && (
                    <span className="absolute -top-1 -right-1 text-xs">
                      {moodColors[moodEntry.mood].emoji}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Mood Selection */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-purple-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {selectedDate ? `Mood for ${new Date(selectedDate).toLocaleDateString()}` : 'Select a date'}
            </h3>
            
            {selectedDate && (
              <div className="space-y-3">
                {Object.entries(moodColors).map(([mood, config]) => (
                  <button
                    key={mood}
                    onClick={() => handleMoodSelect(mood as 'red' | 'yellow' | 'green')}
                    className={`w-full p-3 rounded-2xl text-left transition-all duration-200 border ${
                      selectedEntry?.mood === mood 
                        ? `${config.bg} ${config.text} border-current` 
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{config.emoji}</span>
                      <span className="font-medium">{config.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Note Section */}
          {selectedDate && (
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <Edit3 className="w-4 h-4" />
                <span>Daily Note</span>
              </h3>
              
              <div className="space-y-3">
                <textarea
                  value={editingNote || selectedEntry?.note || ''}
                  onChange={(e) => setEditingNote(e.target.value)}
                  placeholder="How are you feeling today? What's on your mind?"
                  className="w-full px-3 py-2 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent resize-none"
                  rows={4}
                />
                
                <button
                  onClick={handleNoteSave}
                  className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-2 rounded-2xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Note</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-100">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Monthly Summary</h3>
        </div>
        
        {moodEntries.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(moodColors).map(([mood, config]) => (
              <div key={mood} className="text-center">
                <div className={`${config.bg} rounded-2xl p-4 mb-2`}>
                  <div className="text-2xl mb-1">{config.emoji}</div>
                  <div className="text-2xl font-bold text-gray-800">
                    {stats[mood as keyof typeof stats]}%
                  </div>
                </div>
                <p className="text-sm text-gray-600">{config.label}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Start tracking your moods to see insights here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodSignals;