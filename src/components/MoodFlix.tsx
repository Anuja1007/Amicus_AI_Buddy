import React, { useState } from 'react';
import { Film, RefreshCw, Heart, Star } from 'lucide-react';

interface Movie {
  title: string;
  genre: string;
  summary: string;
  rating: number;
  type: 'bollywood' | 'hollywood';
}

const MoodFlix: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<'red' | 'yellow' | 'green' | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const movieDatabase: Record<string, Movie[]> = {
    red: [
      {
        title: "The Pursuit of Happyness",
        genre: "Drama/Biography",
        summary: "A struggling salesman's journey of perseverance and hope, showing that even in darkest times, determination can lead to happiness.",
        rating: 8.0,
        type: "hollywood"
      },
      {
        title: "Taare Zameen Par",
        genre: "Drama/Family",
        summary: "A heartwarming story about a special child and his teacher, celebrating uniqueness and the power of understanding.",
        rating: 8.4,
        type: "bollywood"
      },
      {
        title: "Inside Out",
        genre: "Animation/Family",
        summary: "A beautiful exploration of emotions and mental health, showing how all feelings have their place in our lives.",
        rating: 8.1,
        type: "hollywood"
      },
      {
        title: "Queen",
        genre: "Comedy/Drama",
        summary: "An empowering journey of self-discovery as a woman learns to embrace her independence and find her inner strength.",
        rating: 8.1,
        type: "bollywood"
      },
      {
        title: "A Beautiful Mind",
        genre: "Drama/Biography",
        summary: "The inspiring story of overcoming mental health challenges through love, support, and personal resilience.",
        rating: 8.2,
        type: "hollywood"
      }
    ],
    yellow: [
      {
        title: "The Grand Budapest Hotel",
        genre: "Comedy/Adventure",
        summary: "A whimsical and visually stunning comedy about friendship, loyalty, and the beauty in life's small moments.",
        rating: 8.1,
        type: "hollywood"
      },
      {
        title: "3 Idiots",
        genre: "Comedy/Drama",
        summary: "A light-hearted yet meaningful story about friendship, following your passion, and not taking life too seriously.",
        rating: 8.4,
        type: "bollywood"
      },
      {
        title: "Paddington",
        genre: "Family/Comedy",
        summary: "A charming and gentle film about kindness, family, and finding home in unexpected places.",
        rating: 7.2,
        type: "hollywood"
      },
      {
        title: "Zindagi Na Milegi Dobara",
        genre: "Adventure/Comedy",
        summary: "Three friends on a road trip discovering life, friendship, and the importance of living in the moment.",
        rating: 8.2,
        type: "bollywood"
      },
      {
        title: "Julie & Julia",
        genre: "Comedy/Drama",
        summary: "A feel-good story about finding passion and purpose through cooking and following your dreams.",
        rating: 7.0,
        type: "hollywood"
      }
    ],
    green: [
      {
        title: "The Greatest Showman",
        genre: "Musical/Drama",
        summary: "An uplifting musical celebration of dreams, acceptance, and the power of believing in yourself.",
        rating: 7.5,
        type: "hollywood"
      },
      {
        title: "Dangal",
        genre: "Sports/Biography",
        summary: "An inspiring story of determination, breaking barriers, and achieving greatness against all odds.",
        rating: 8.4,
        type: "bollywood"
      },
      {
        title: "Chef",
        genre: "Comedy/Drama",
        summary: "A heartwarming story about rediscovering passion, family connections, and the joy of creating something you love.",
        rating: 7.3,
        type: "hollywood"
      },
      {
        title: "Chhichhore",
        genre: "Comedy/Drama",
        summary: "A motivational story about friendship, perseverance, and finding success in failure.",
        rating: 8.3,
        type: "bollywood"
      },
      {
        title: "Hidden Figures",
        genre: "Biography/Drama",
        summary: "An empowering story of brilliant women breaking barriers and achieving excellence in their field.",
        rating: 7.8,
        type: "hollywood"
      }
    ]
  };

  const moodInfo = {
    red: { 
      label: 'Comforting & Healing', 
      emoji: '🤗', 
      description: 'Movies that provide comfort, hope, and emotional healing',
      color: 'from-red-100 to-pink-100 border-red-100'
    },
    yellow: { 
      label: 'Light & Chill', 
      emoji: '😌', 
      description: 'Easy-going films perfect for a relaxed, peaceful mood',
      color: 'from-yellow-100 to-orange-100 border-yellow-100'
    },
    green: { 
      label: 'Inspiring & Energetic', 
      emoji: '🌟', 
      description: 'Uplifting movies that motivate and energize your spirit',
      color: 'from-green-100 to-emerald-100 border-green-100'
    }
  };

  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const refreshSuggestions = () => {
    setCurrentMovieIndex((prev) => (prev + 1) % 5);
  };

  const toggleFavorite = (movieTitle: string) => {
    setFavorites(prev => 
      prev.includes(movieTitle) 
        ? prev.filter(title => title !== movieTitle)
        : [...prev, movieTitle]
    );
  };

  const getMoviesToShow = () => {
    if (!selectedMood) return [];
    const movies = movieDatabase[selectedMood];
    return movies.slice(currentMovieIndex, currentMovieIndex + 3);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-6 py-3 rounded-full">
          <Film className="w-5 h-5 text-indigo-600" />
          <span className="text-indigo-700 font-medium">MoodFlix</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Movies for Your Mood</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover films curated to match your emotional state - from comforting stories to inspiring adventures.
        </p>
      </div>

      {/* Mood Selection */}
      <div className="grid md:grid-cols-3 gap-4">
        {Object.entries(moodInfo).map(([mood, info]) => (
          <button
            key={mood}
            onClick={() => {
              setSelectedMood(mood as 'red' | 'yellow' | 'green');
              setCurrentMovieIndex(0);
            }}
            className={`bg-gradient-to-r ${info.color} p-6 rounded-3xl shadow-sm border hover:shadow-md transition-all duration-200 ${
              selectedMood === mood ? 'ring-2 ring-offset-2 ring-purple-400' : ''
            }`}
          >
            <div className="text-center space-y-3">
              <div className="text-3xl">{info.emoji}</div>
              <h3 className="text-lg font-semibold text-gray-800">{info.label}</h3>
              <p className="text-sm text-gray-600">{info.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Movie Suggestions */}
      {selectedMood && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800">
              {moodInfo[selectedMood].emoji} {moodInfo[selectedMood].label} Movies
            </h3>
            <button
              onClick={refreshSuggestions}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-2xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getMoviesToShow().map((movie, index) => (
              <div key={`${movie.title}-${currentMovieIndex}-${index}`} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">{movie.title}</h4>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          movie.type === 'bollywood' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {movie.type === 'bollywood' ? '🇮🇳 Bollywood' : '🇺🇸 Hollywood'}
                        </span>
                        <span className="text-sm text-gray-500">{movie.genre}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(movie.title)}
                      className={`p-2 rounded-full transition-all duration-200 ${
                        favorites.includes(movie.title)
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(movie.title) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed">{movie.summary}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{movie.rating}/10</span>
                    </div>
                    <span className="text-xs text-gray-500">IMDb Rating</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-3xl p-6 border border-pink-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Heart className="w-5 h-5 text-pink-600 fill-current" />
            <span>Your Favorites ({favorites.length})</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {favorites.map(title => (
              <span key={title} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-pink-200">
                {title}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">🎬 Movie Therapy Tips</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="space-y-2">
            <p>• Choose movies that match your current emotional needs</p>
            <p>• Don't force yourself to watch uplifting films when feeling down</p>
            <p>• Create a cozy environment for your viewing experience</p>
          </div>
          <div className="space-y-2">
            <p>• It's okay to cry during emotional films - it can be healing</p>
            <p>• Discuss meaningful movies with friends or family</p>
            <p>• Use films as inspiration for positive life changes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodFlix;