import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, TrendingUp } from 'lucide-react';

const NewsPage: React.FC = () => {
  // Mock news articles data
  const articles = [
    {
      id: '1',
      title: 'Singapore Property Market Shows Resilience in Q4 2024',
      excerpt: 'Despite global economic uncertainties, Singapore\'s property market continues to demonstrate strong fundamentals with steady price growth and healthy transaction volumes.',
      author: 'Emily Tan',
      date: '2024-06-08',
      category: 'Market Analysis',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
      readTime: '5 min read',
      featured: true
    },
    {
      id: '2',
      title: 'New Cooling Measures Impact on Property Buyers',
      excerpt: 'The latest cooling measures introduced by the government aim to maintain a stable property market while ensuring affordability for Singaporeans.',
      author: 'Michael Chen',
      date: '2024-06-07',
      category: 'Policy Updates',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400',
      readTime: '3 min read',
      featured: false
    },
    {
      id: '3',
      title: 'Rising Demand for Sustainable Homes in Singapore',
      excerpt: 'Eco-friendly features and green building certifications are becoming increasingly important factors for property buyers in Singapore.',
      author: 'Sarah Lim',
      date: '2024-06-06',
      category: 'Sustainability',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      readTime: '4 min read',
      featured: false
    },
    {
      id: '4',
      title: 'HDB Resale Market Trends: What Buyers Need to Know',
      excerpt: 'An in-depth analysis of the HDB resale market trends, including price movements, popular locations, and buyer preferences.',
      author: 'David Wong',
      date: '2024-06-05',
      category: 'HDB',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
      readTime: '6 min read',
      featured: false
    },
    {
      id: '5',
      title: 'Investment Opportunities in Commercial Real Estate',
      excerpt: 'Exploring the potential of commercial real estate investments in Singapore\'s evolving business landscape.',
      author: 'Amanda Teo',
      date: '2024-06-04',
      category: 'Investment',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400',
      readTime: '7 min read',
      featured: false
    },
    {
      id: '6',
      title: 'Technology Transforming Property Viewings',
      excerpt: 'Virtual reality and augmented reality technologies are revolutionizing how potential buyers view and experience properties.',
      author: 'James Lee',
      date: '2024-06-03',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1565402170291-8491f14678db?w=400',
      readTime: '4 min read',
      featured: false
    }
  ];

  const categories = ['All', 'Market Analysis', 'Policy Updates', 'Sustainability', 'HDB', 'Investment', 'Technology'];

  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Property News & Insights</h1>
          <p className="text-lg text-gray-600">Stay informed with the latest trends and developments in Singapore's property market</p>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <span className="ml-3 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {featuredArticle.category}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{featuredArticle.title}</h2>
                  <p className="text-gray-600 mb-6">{featuredArticle.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <User className="w-4 h-4 mr-2" />
                      <span className="mr-4">{featuredArticle.author}</span>
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="mr-4">{featuredArticle.date}</span>
                      <span>{featuredArticle.readTime}</span>
                    </div>
                    <Link
                      to={`/news/${featuredArticle.id}`}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white transition-colors border border-gray-200"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {regularArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {article.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{article.date}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{article.readTime}</span>
                  <Link
                    to={`/news/${article.id}`}
                    className="text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Market Insights Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-8 h-8 mr-3" />
            <h2 className="text-3xl font-bold">Market Insights</h2>
          </div>
          <p className="text-xl mb-6">Get expert analysis and market reports delivered to your inbox</p>
          <div className="max-w-md flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;