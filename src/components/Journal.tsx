import React, { useState } from 'react';
import { BookOpen, Plus, Edit3, Trash2, Save, X, Calendar } from 'lucide-react';

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  date: string;
  timestamp: Date;
}

const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: 1,
      title: "My First Day",
      content: "Today I started using Amicus for my mental wellness journey. I'm feeling hopeful about having a safe space to express my thoughts and feelings. The interface feels warm and welcoming, which makes me want to write more.",
      date: "2024-01-15",
      timestamp: new Date("2024-01-15T10:30:00")
    }
  ]);

  const [isWriting, setIsWriting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: ''
  });

  const handleSaveEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;

    const now = new Date();
    const entry: JournalEntry = {
      id: entries.length + 1,
      title: newEntry.title,
      content: newEntry.content,
      date: now.toISOString().split('T')[0],
      timestamp: now
    };

    setEntries([entry, ...entries]);
    setNewEntry({ title: '', content: '' });
    setIsWriting(false);
  };

  const handleEditEntry = (id: number) => {
    const entry = entries.find(e => e.id === id);
    if (entry) {
      setNewEntry({ title: entry.title, content: entry.content });
      setEditingId(id);
      setIsWriting(true);
    }
  };

  const handleUpdateEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim() || !editingId) return;

    setEntries(entries.map(entry => 
      entry.id === editingId 
        ? { ...entry, title: newEntry.title, content: newEntry.content }
        : entry
    ));
    
    setNewEntry({ title: '', content: '' });
    setEditingId(null);
    setIsWriting(false);
  };

  const handleDeleteEntry = (id: number) => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

  const handleCancel = () => {
    setNewEntry({ title: '', content: '' });
    setEditingId(null);
    setIsWriting(false);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEntriesByDate = () => {
    const grouped = entries.reduce((acc, entry) => {
      const date = entry.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(entry);
      return acc;
    }, {} as Record<string, JournalEntry[]>);

    return Object.entries(grouped).sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime());
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 px-6 py-3 rounded-full">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span className="text-blue-700 font-medium">Personal Journal</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Your Private Diary</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Write, reflect, and organize your thoughts in your personal journal. Create multiple entries for each day and revisit your journey whenever you need.
        </p>
      </div>

      {/* New Entry Button */}
      {!isWriting && (
        <div className="text-center">
          <button
            onClick={() => setIsWriting(true)}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-400 to-indigo-400 text-white rounded-2xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-200 shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span>Write New Entry</span>
          </button>
        </div>
      )}

      {/* Writing Interface */}
      {isWriting && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-100">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingId ? 'Edit Entry' : 'New Journal Entry'}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
            
            <input
              type="text"
              value={newEntry.title}
              onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
              placeholder="Give your entry a title..."
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-lg font-medium"
            />
            
            <textarea
              value={newEntry.content}
              onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
              placeholder="Pour your heart out... What's on your mind today?"
              rows={8}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent resize-none leading-relaxed"
            />
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-2xl transition-all duration-200 flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={editingId ? handleUpdateEntry : handleSaveEntry}
                disabled={!newEntry.title.trim() || !newEntry.content.trim()}
                className="px-4 py-2 bg-gradient-to-r from-blue-400 to-indigo-400 text-white rounded-2xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{editingId ? 'Update' : 'Save'} Entry</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Journal Entries */}
      <div className="space-y-6">
        {getEntriesByDate().length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">No entries yet</h3>
            <p className="text-gray-400">Start writing your first journal entry to begin your journey</p>
          </div>
        ) : (
          getEntriesByDate().map(([date, dateEntries]) => (
            <div key={date} className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-px bg-gradient-to-r from-blue-200 to-indigo-200 flex-1"></div>
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-full">
                  <span className="text-sm font-medium text-blue-700">{formatDate(date)}</span>
                </div>
                <div className="h-px bg-gradient-to-r from-indigo-200 to-blue-200 flex-1"></div>
              </div>
              
              <div className="space-y-4">
                {dateEntries.map((entry) => (
                  <div key={entry.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{entry.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span>{entry.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditEntry(entry.id)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{entry.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Journal Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-6 border border-purple-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">✍️ Journaling Tips</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="space-y-2">
            <p>• Write without judgment - let your thoughts flow freely</p>
            <p>• Include both positive and challenging experiences</p>
            <p>• Use specific details to make memories vivid</p>
          </div>
          <div className="space-y-2">
            <p>• Write regularly, even if just a few sentences</p>
            <p>• Reflect on patterns and growth over time</p>
            <p>• Your journal is a safe space - be authentic</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;