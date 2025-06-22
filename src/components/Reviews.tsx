import React, { useState } from 'react';
import { MessageSquare, Star, Send, ThumbsUp } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      comment: "Amicus has been a game-changer for my mental health journey. The AI responses are surprisingly empathetic and the mood tracking helps me understand my patterns better. The breathing exercises are my favorite!",
      date: "2024-01-15",
      helpful: 12
    },
    {
      id: 2,
      name: "Alex K.",
      rating: 4,
      comment: "Love the calming games, especially the Focus Bubble. It really helps me center myself during stressful days. The movie recommendations are spot-on too!",
      date: "2024-01-10",
      helpful: 8
    },
    {
      id: 3,
      name: "Priya R.",
      rating: 5,
      comment: "As someone dealing with anxiety, this app provides a safe space to express my feelings. The AI companion is non-judgmental and offers practical suggestions. Highly recommend!",
      date: "2024-01-08",
      helpful: 15
    },
    {
      id: 4,
      name: "Michael T.",
      rating: 4,
      comment: "The mental health quiz gave me insights I hadn't considered before. The personalized recommendations are helpful, though I'd love to see more games added in future updates.",
      date: "2024-01-05",
      helpful: 6
    }
  ]);

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: ''
  });

  const [helpfulVotes, setHelpfulVotes] = useState<number[]>([]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) return;

    const review: Review = {
      id: reviews.length + 1,
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    };

    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '' });
  };

  const handleHelpfulVote = (reviewId: number) => {
    if (helpfulVotes.includes(reviewId)) return;
    
    setHelpfulVotes([...helpfulVotes, reviewId]);
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
            className={`w-5 h-5 ${interactive ? 'cursor-pointer hover:scale-110' : ''} transition-transform duration-200`}
            disabled={!interactive}
          >
            <Star 
              className={`w-full h-full ${
                star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`} 
            />
          </button>
        ))}
      </div>
    );
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-purple-100 px-6 py-3 rounded-full">
          <MessageSquare className="w-5 h-5 text-pink-600" />
          <span className="text-pink-700 font-medium">Community Reviews</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">What Our Users Say</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Share your experience and help others discover how Amicus can support their mental wellness journey.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Overall Rating */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl p-6 border border-yellow-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-3xl font-bold text-gray-800">
                    {averageRating.toFixed(1)}
                  </span>
                  {renderStars(Math.round(averageRating))}
                </div>
                <p className="text-sm text-gray-600">Based on {reviews.length} reviews</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">{reviews.length}</p>
                <p className="text-sm text-gray-600">Total Reviews</p>
              </div>
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-800">{review.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
                
                <button
                  onClick={() => handleHelpfulVote(review.id)}
                  disabled={helpfulVotes.includes(review.id)}
                  className={`flex items-center space-x-2 text-sm transition-all duration-200 ${
                    helpfulVotes.includes(review.id)
                      ? 'text-green-600 cursor-not-allowed'
                      : 'text-gray-500 hover:text-green-600 cursor-pointer'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${helpfulVotes.includes(review.id) ? 'fill-current' : ''}`} />
                  <span>
                    Helpful ({review.helpful}) 
                    {helpfulVotes.includes(review.id) && ' ✓'}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Share Your Experience</h3>
            
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                {renderStars(newReview.rating, true, (rating) => 
                  setNewReview({ ...newReview, rating })
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Share your thoughts about Amicus..."
                  rows={4}
                  className="w-full px-3 py-2 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-3 rounded-2xl hover:from-purple-500 hover:to-pink-500 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Review</span>
              </button>
            </form>
          </div>

          {/* Review Guidelines */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-4 border border-blue-100">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">💡 Review Guidelines</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Be honest about your experience</li>
              <li>• Focus on specific features you liked or disliked</li>
              <li>• Keep your language respectful</li>
              <li>• Help others understand how Amicus helped you</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Testimonials Highlight */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-6 border border-green-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          🌟 Why Users Love Amicus
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div className="text-center">
            <div className="text-2xl mb-2">🤗</div>
            <p className="font-medium mb-1">Empathetic Support</p>
            <p className="text-xs text-gray-600">AI companion that truly understands</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🎯</div>
            <p className="font-medium mb-1">Personalized Insights</p>
            <p className="text-xs text-gray-600">Tailored recommendations for your needs</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🌱</div>
            <p className="font-medium mb-1">Gentle Growth</p>
            <p className="text-xs text-gray-600">Mindful activities for mental wellness</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;