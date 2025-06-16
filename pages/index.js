import React, { useState, useEffect } from 'react';
import { Search, Filter, Instagram, Youtube, Twitter, TrendingUp, Calendar, Download, Bookmark, ExternalLink, Users, MapPin, Tag, Image } from 'lucide-react';

export default function InfluencerDiscoveryApp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInfluencers, setFilteredInfluencers] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedFollowerRange, setSelectedFollowerRange] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [savedInfluencers, setSavedInfluencers] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showApiInfo, setShowApiInfo] = useState(false);

  // Mock data for influencers
  const mockInfluencers = [
    {
      id: 1,
      name: "Sarah Johnson",
      handle: "@sarahfit",
      platforms: ["instagram", "youtube"],
      followers: 125000,
      engagementRate: 4.8,
      bio: "Certified fitness coach | Yoga instructor | Healthy lifestyle advocate | Plant-based nutrition",
      location: "Los Angeles, CA",
      categories: ["fitness", "wellness", "lifestyle"],
      avgLikesPerPost: 6000,
      postsPerWeek: 5,
      profileImage: "",
      topContent: ["", "", ""],
      website: "www.sarahfit.com"
    },
    {
      id: 2,
      name: "Mike Chen",
      handle: "@techmikereviews",
      platforms: ["youtube", "twitter"],
      followers: 450000,
      engagementRate: 6.2,
      bio: "Tech reviewer | Gadget enthusiast | Software developer | Unboxing the latest tech trends",
      location: "San Francisco, CA",
      categories: ["tech", "reviews"],
      avgLikesPerPost: 28000,
      postsPerWeek: 3,
      profileImage: "",
      topContent: ["", "", ""],
      website: "www.techmike.io"
    },
    {
      id: 3,
      name: "Emma Watson",
      handle: "@emmacooks",
      platforms: ["instagram", "tiktok"],
      followers: 89000,
      engagementRate: 8.5,
      bio: "Vegan chef | Recipe developer | Sustainable living | Making plant-based cooking simple",
      location: "Portland, OR",
      categories: ["food", "vegan", "sustainability"],
      avgLikesPerPost: 7500,
      postsPerWeek: 7,
      profileImage: "",
      topContent: ["", "", ""],
      website: "www.emmacooks.com"
    },
    {
      id: 4,
      name: "David Park",
      handle: "@davidtravels",
      platforms: ["instagram", "youtube"],
      followers: 320000,
      engagementRate: 5.9,
      bio: "Travel photographer | Adventure seeker | Capturing hidden gems worldwide | Travel tips & guides",
      location: "New York, NY",
      categories: ["travel", "photography", "lifestyle"],
      avgLikesPerPost: 19000,
      postsPerWeek: 4,
      profileImage: "",
      topContent: ["", "", ""],
      website: "www.davidtravels.net"
    },
    {
      id: 5,
      name: "Lisa Martinez",
      handle: "@lisamakeup",
      platforms: ["instagram", "tiktok", "youtube"],
      followers: 67000,
      engagementRate: 9.2,
      bio: "Professional makeup artist | Beauty tutorials | Sustainable beauty advocate | Cruelty-free only",
      location: "Miami, FL",
      categories: ["beauty", "makeup", "sustainability"],
      avgLikesPerPost: 6200,
      postsPerWeek: 6,
      profileImage: "",
      topContent: ["", "", ""],
      website: "www.lisamakeup.com"
    },
    {
      id: 6,
      name: "James Wilson",
      handle: "@jamesfashion",
      platforms: ["instagram", "tiktok"],
      followers: 156000,
      engagementRate: 7.1,
      bio: "Men's fashion blogger | Sustainable fashion advocate | Style tips for the modern man",
      location: "Chicago, IL",
      categories: ["fashion", "lifestyle", "sustainability"],
      avgLikesPerPost: 11000,
      postsPerWeek: 5,
      profileImage: "",
      topContent: ["", "", ""],
      website: "www.jamesstyle.com"
    },
    {
      id: 7,
      name: "Robert Thompson",
      handle: "@robertrealestate",
      platforms: ["instagram", "youtube"],
      followers: 234000,
      engagementRate: 5.3,
      bio: "Real estate investor | Property coach | Helping you build wealth through real estate | Investment strategies",
      location: "Dallas, TX",
      categories: ["real estate", "finance", "investment"],
      avgLikesPerPost: 12400,
      postsPerWeek: 4,
      profileImage: "",
      topContent: ["", "", ""],
      website: "www.robertrealtor.com"
    },
    {
      id: 8,
      name: "Amanda Chen",
      handle: "@amandahomes",
      platforms: ["instagram", "tiktok"],
      followers: 87000,
      engagementRate: 7.8,
      bio: "Real estate agent | Home staging expert | First-time buyer specialist | Making your dream home a reality",
      location: "Seattle, WA",
      categories: ["real estate", "home decor", "lifestyle"],
      avgLikesPerPost: 6800,
      postsPerWeek: 6,
      profileImage: "",
      topContent: ["", "", ""],
      website: "www.amandahomes.com"
    }
  ];

  const categories = ["all", "fitness", "wellness", "lifestyle", "tech", "reviews", "food", "vegan", "sustainability", "travel", "photography", "beauty", "makeup", "fashion", "real estate", "finance", "investment", "home decor"];

  const searchSuggestions = [
    "fitness coach",
    "vegan recipes", 
    "tech reviewer",
    "travel photographer",
    "makeup artist",
    "sustainable fashion",
    "yoga instructor",
    "food blogger",
    "real estate",
    "property investment"
  ];

  const platformIcons = {
    instagram: <Instagram className="icon-small" />,
    youtube: <Youtube className="icon-small" />,
    twitter: <Twitter className="icon-small" />,
    tiktok: (
      <svg className="icon-small" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    )
  };

  const getFollowerRangeLabel = (followers) => {
    if (followers < 10000) return "Nano (1K-10K)";
    if (followers < 100000) return "Micro (10K-100K)";
    if (followers < 500000) return "Mid-tier (100K-500K)";
    return "Macro (500K+)";
  };

  useEffect(() => {
    setShowApiInfo(false);
  }, [selectedPlatform, selectedFollowerRange, selectedLocation, selectedCategory, sortBy]);

  useEffect(() => {
    let filtered = mockInfluencers;

    if (searchTerm) {
      filtered = filtered.filter(influencer =>
        influencer.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        influencer.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedPlatform !== "all") {
      filtered = filtered.filter(influencer =>
        influencer.platforms.includes(selectedPlatform)
      );
    }

    if (selectedFollowerRange !== "all") {
      filtered = filtered.filter(influencer => {
        if (selectedFollowerRange === "nano") return influencer.followers < 10000;
        if (selectedFollowerRange === "micro") return influencer.followers >= 10000 && influencer.followers < 100000;
        if (selectedFollowerRange === "mid") return influencer.followers >= 100000 && influencer.followers < 500000;
        if (selectedFollowerRange === "macro") return influencer.followers >= 500000;
        return true;
      });
    }

    if (selectedLocation) {
      filtered = filtered.filter(influencer =>
        influencer.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(influencer =>
        influencer.categories.includes(selectedCategory)
      );
    }

    if (sortBy === "followers") {
      filtered.sort((a, b) => b.followers - a.followers);
    } else if (sortBy === "engagement") {
      filtered.sort((a, b) => b.engagementRate - a.engagementRate);
    }

    setFilteredInfluencers(filtered);
  }, [searchTerm, selectedPlatform, selectedFollowerRange, selectedLocation, selectedCategory, sortBy]);

  const handleSearch = () => {
    if (!searchTerm) return;
    
    setIsLoading(true);
    
    const hasResults = mockInfluencers.some(influencer =>
      influencer.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    setTimeout(() => {
      setIsLoading(false);
      if (!hasResults) {
        setShowApiInfo(true);
      }
    }, 1500);
  };

  const toggleSaveInfluencer = (id) => {
    setSavedInfluencers(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const exportToCSV = () => {
    const dataToExport = filteredInfluencers;
    const headers = ["Name", "Handle", "Platforms", "Followers", "Engagement Rate", "Location", "Categories", "Website"];
    const rows = dataToExport.map(inf => [
      inf.name,
      inf.handle,
      inf.platforms.join(", "),
      inf.followers,
      inf.engagementRate + "%",
      inf.location,
      inf.categories.join(", "),
      inf.website
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "influencers-demo-export.csv";
    a.click();
  };

  return (
    <div className="app-container">
      <style jsx>{`
        .app-container {
          min-height: 100vh;
          background-color: #f5f5f5;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        .header {
          margin-bottom: 2rem;
        }
        .title {
          font-size: 2rem;
          font-weight: bold;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }
        .subtitle {
          color: #666;
          margin-bottom: 0.25rem;
        }
        .demo-note {
          font-size: 0.875rem;
          color: #888;
          margin-top: 0.25rem;
        }
        .search-container {
          position: relative;
          margin-bottom: 1.5rem;
        }
        .search-wrapper {
          display: flex;
          gap: 0.5rem;
        }
        .search-input-wrapper {
          position: relative;
          flex: 1;
        }
        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #999;
          width: 1.25rem;
          height: 1.25rem;
        }
        .search-input {
          width: 100%;
          padding: 0.75rem 0.75rem 0.75rem 2.5rem;
          border: 1px solid #ddd;
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: border-color 0.2s;
        }
        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
        }
        .search-button {
          padding: 0.75rem 1.5rem;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          transition: background-color 0.2s;
        }
        .search-button:hover {
          background-color: #2563eb;
        }
        .suggestions {
          position: absolute;
          z-index: 10;
          width: 100%;
          margin-top: 0.25rem;
          background-color: white;
          border: 1px solid #e5e5e5;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .suggestions-header {
          padding: 0.5rem;
          font-size: 0.875rem;
          color: #888;
        }
        .suggestion-item {
          width: 100%;
          text-align: left;
          padding: 0.75rem 1rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.875rem;
          transition: background-color 0.2s;
        }
        .suggestion-item:hover {
          background-color: #f5f5f5;
        }
        .filters-container {
          background-color: white;
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          margin-bottom: 1.5rem;
        }
        .filters-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        .filters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        .filter-select {
          padding: 0.5rem 0.75rem;
          border: 1px solid #ddd;
          border-radius: 0.375rem;
          font-size: 0.875rem;
        }
        .filter-input {
          padding: 0.5rem 0.75rem;
          border: 1px solid #ddd;
          border-radius: 0.375rem;
          font-size: 0.875rem;
        }
        .api-info {
          background-color: #dbeafe;
          border: 1px solid #60a5fa;
          border-radius: 0.5rem;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }
        .api-info h3 {
          font-weight: 600;
          color: #1e40af;
          margin-bottom: 0.5rem;
        }
        .api-info p {
          color: #1e40af;
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
        }
        .api-info ul {
          list-style: disc;
          list-style-position: inside;
          color: #2563eb;
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
        }
        .api-info ul li {
          margin-bottom: 0.25rem;
        }
        .api-info-note {
          color: #3b82f6;
          font-size: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .clear-button {
          color: #2563eb;
          font-size: 0.875rem;
          text-decoration: underline;
          background: none;
          border: none;
          cursor: pointer;
        }
        .clear-button:hover {
          color: #1e40af;
        }
        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .results-info {
          color: #666;
        }
        .saved-count {
          font-size: 0.875rem;
          color: #888;
        }
        .export-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .export-button:hover {
          background-color: #2563eb;
        }
        .icon-small {
          width: 1rem;
          height: 1rem;
        }
        .loading-container {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
        }
        .loading-content {
          text-align: center;
        }
        .spinner {
          width: 3rem;
          height: 3rem;
          border: 2px solid #f3f4f6;
          border-top-color: #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .loading-text {
          color: #666;
        }
        .influencers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }
        .influencer-card {
          background-color: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.2s;
          padding: 1.5rem;
        }
        .influencer-card:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .card-header {
          display: flex;
          align-items: start;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .profile-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .profile-image {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 1.25rem;
        }
        .profile-gradient-1 {
          background: linear-gradient(to bottom right, #10b981, #3b82f6);
        }
        .profile-gradient-2 {
          background: linear-gradient(to bottom right, #8b5cf6, #ec4899);
        }
        .profile-gradient-3 {
          background: linear-gradient(to bottom right, #f59e0b, #ef4444);
        }
        .profile-gradient-0 {
          background: linear-gradient(to bottom right, #3b82f6, #8b5cf6);
        }
        .profile-info h3 {
          font-size: 1.125rem;
          font-weight: 600;
        }
        .profile-handle {
          color: #888;
          font-size: 0.875rem;
        }
        .save-button {
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
        }
        .save-button-saved {
          background-color: #dbeafe;
          color: #3b82f6;
        }
        .save-button-unsaved {
          background-color: #f3f4f6;
          color: #9ca3af;
        }
        .save-button-unsaved:hover {
          background-color: #e5e7eb;
        }
        .platforms {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          color: #666;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #666;
          font-size: 0.875rem;
        }
        .stat-value {
          font-weight: 600;
        }
        .stat-label {
          font-size: 0.75rem;
          color: #888;
        }
        .bio {
          font-size: 0.875rem;
          color: #666;
          margin-bottom: 1rem;
          line-height: 1.5;
        }
        .location {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.875rem;
          color: #888;
          margin-bottom: 0.75rem;
        }
        .categories {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .category-tag {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.5rem;
          background-color: #f3f4f6;
          color: #4b5563;
          font-size: 0.75rem;
          border-radius: 9999px;
        }
        .analytics {
          border-top: 1px solid #e5e7eb;
          padding-top: 0.75rem;
          margin-bottom: 1rem;
        }
        .analytics h4 {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #4b5563;
        }
        .analytics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          font-size: 0.875rem;
        }
        .analytics-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #666;
        }
        .recent-content {
          margin-bottom: 1rem;
        }
        .recent-content h4 {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #4b5563;
        }
        .content-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }
        .content-placeholder {
          width: 100%;
          height: 5rem;
          background: linear-gradient(to bottom right, #e5e7eb, #d1d5db);
          border-radius: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
        }
        .actions {
          display: flex;
          gap: 0.5rem;
        }
        .view-button {
          flex: 1;
          padding: 0.5rem 0.75rem;
          background-color: #3b82f6;
          color: white;
          font-size: 0.875rem;
          border-radius: 0.375rem;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .view-button:hover {
          background-color: #2563eb;
        }
        .website-link {
          padding: 0.5rem 0.75rem;
          background-color: #f3f4f6;
          color: #4b5563;
          font-size: 0.875rem;
          border-radius: 0.375rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          text-decoration: none;
          transition: background-color 0.2s;
        }
        .website-link:hover {
          background-color: #e5e7eb;
        }
        .no-results {
          text-align: center;
          padding: 3rem;
        }
        .no-results p {
          color: #888;
          margin-bottom: 0.5rem;
        }
        .no-results-hint {
          color: #999;
          font-size: 0.875rem;
        }
      `}</style>

      <div className="container">
        <div className="header">
          <h1 className="title">🔍 Influencer Discovery Tool</h1>
          <p className="subtitle">Find the perfect influencers for your brand</p>
          <p className="demo-note">Demo version with 8 sample influencers - Try searching for "real estate" now!</p>
        </div>

        <div className="search-container">
          <div className="search-wrapper">
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search by keywords (e.g., real estate, fitness coach, vegan recipes)"
                className="search-input"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowApiInfo(false);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchTerm) {
                    handleSearch();
                  }
                }}
              />
            </div>
            <button onClick={handleSearch} className="search-button">
              <Search size={20} />
              Search
            </button>
          </div>
          
          {showSuggestions && !searchTerm && (
            <div className="suggestions">
              <div className="suggestions-header">Popular searches:</div>
              {searchSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  className="suggestion-item"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setSearchTerm(suggestion);
                    setShowSuggestions(false);
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="filters-container">
          <div className="filters-header">
            <Filter size={20} />
            <h3>Filters</h3>
          </div>
          
          <div className="filters-grid">
            <select
              className="filter-select"
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
            >
              <option value="all">All Platforms</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="twitter">Twitter/X</option>
              <option value="tiktok">TikTok</option>
            </select>

            <select
              className="filter-select"
              value={selectedFollowerRange}
              onChange={(e) => setSelectedFollowerRange(e.target.value)}
            >
              <option value="all">All Sizes</option>
              <option value="nano">Nano (1K-10K)</option>
              <option value="micro">Micro (10K-100K)</option>
              <option value="mid">Mid-tier (100K-500K)</option>
              <option value="macro">Macro (500K+)</option>
            </select>

            <input
              type="text"
              placeholder="Filter by location..."
              className="filter-input"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            />

            <select
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.slice(1).map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>

            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="followers">Sort by Followers</option>
              <option value="engagement">Sort by Engagement</option>
            </select>
          </div>
        </div>

        {showApiInfo && searchTerm && filteredInfluencers.length === 0 && !isLoading && (
          <div className="api-info">
            <h3>🔍 Real-Time Search Integration</h3>
            <p>
              This is a demo version using sample data. In a production environment, searching for "{searchTerm}" would:
            </p>
            <ul>
              <li>Query Instagram's API for profiles matching your keywords</li>
              <li>Search TikTok's Creator Marketplace API</li>
              <li>Access YouTube's Data API for channel information</li>
              <li>Pull data from Twitter/X's API</li>
              <li>Aggregate results from influencer databases</li>
            </ul>
            <p className="api-info-note">
              To implement real search, you'll need API keys from each platform and/or access to influencer marketing platforms like AspireIQ, GRIN, or CreatorIQ.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setShowApiInfo(false);
              }}
              className="clear-button"
            >
              Clear search and view all demo influencers
            </button>
          </div>
        )}

        <div className="results-header">
          <div>
            <p className="results-info">{filteredInfluencers.length} influencers found</p>
            {savedInfluencers.length > 0 && (
              <p className="saved-count">{savedInfluencers.length} saved</p>
            )}
          </div>
          <button
            onClick={exportToCSV}
            className="export-button"
            title={`Export ${filteredInfluencers.length} filtered results to CSV`}
          >
            <Download size={16} />
            Export to CSV
          </button>
        </div>

        {isLoading && (
          <div className="loading-container">
            <div className="loading-content">
              <div className="spinner"></div>
              <p className="loading-text">Searching for influencers...</p>
            </div>
          </div>
        )}

        {!isLoading && (
          <div className="influencers-grid">
            {filteredInfluencers.map((influencer) => (
              <div key={influencer.id} className="influencer-card">
                <div className="card-header">
                  <div className="profile-section">
                    <div className={`profile-image profile-gradient-${influencer.id % 4}`}>
                      {influencer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="profile-info">
                      <h3>{influencer.name}</h3>
                      <p className="profile-handle">{influencer.handle}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSaveInfluencer(influencer.id)}
                    className={`save-button ${savedInfluencers.includes(influencer.id) ? 'save-button-saved' : 'save-button-unsaved'}`}
                    title={savedInfluencers.includes(influencer.id) ? "Remove from saved" : "Save influencer"}
                  >
                    <Bookmark size={20} fill={savedInfluencers.includes(influencer.id) ? "currentColor" : "none"} />
                  </button>
                </div>

                <div className="platforms">
                  {influencer.platforms.map(platform => (
                    <span key={platform}>
                      {platformIcons[platform]}
                    </span>
                  ))}
                </div>

                <div className="stats-grid">
                  <div>
                    <div className="stat-item">
                      <Users size={16} />
                      <span>Followers</span>
                    </div>
                    <p className="stat-value">{(influencer.followers / 1000).toFixed(0)}K</p>
                    <p className="stat-label">{getFollowerRangeLabel(influencer.followers)}</p>
                  </div>
                  <div>
                    <div className="stat-item">
                      <TrendingUp size={16} />
                      <span>Engagement</span>
                    </div>
                    <p className="stat-value">{influencer.engagementRate}%</p>
                    <p className="stat-label">Avg rate</p>
                  </div>
                </div>

                <p className="bio">
                  {searchTerm ? (
                    influencer.bio.split(new RegExp(`(${searchTerm})`, 'gi')).map((part, index) =>
                      part.toLowerCase() === searchTerm.toLowerCase() ? (
                        <span key={index} style={{ backgroundColor: '#fef3c7' }}>{part}</span>
                      ) : (
                        part
                      )
                    )
                  ) : (
                    influencer.bio
                  )}
                </p>

                <div className="location">
                  <MapPin size={16} />
                  <span>{influencer.location}</span>
                </div>

                <div className="categories">
                  {influencer.categories.map(cat => (
                    <span key={cat} className="category-tag">
                      <Tag size={12} />
                      {cat}
                    </span>
                  ))}
                </div>

                <div className="analytics">
                  <h4>Analytics</h4>
                  <div className="analytics-grid">
                    <div className="analytics-item">
                      <TrendingUp size={12} />
                      <span>Avg likes: {(influencer.avgLikesPerPost / 1000).toFixed(1)}K</span>
                    </div>
                    <div className="analytics-item">
                      <Calendar size={12} />
                      <span>{influencer.postsPerWeek} posts/week</span>
                    </div>
                  </div>
                </div>

                <div className="recent-content">
                  <h4>Recent Content</h4>
                  <div className="content-grid">
                    {influencer.topContent.map((content, idx) => (
                      <div key={idx} className="content-placeholder">
                        <Image size={24} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="actions">
                  <button className="view-button">
                    View Profile
                  </button>
                  <a
                    href={`https://${influencer.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="website-link"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && filteredInfluencers.length === 0 && (
          <div className="no-results">
            <p>No influencers found matching your criteria.</p>
            {searchTerm && (
              <p className="no-results-hint">
                Try searching for "fitness", "tech", "vegan", "travel", or "real estate" to see demo results.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
