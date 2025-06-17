import React, { useState, useEffect } from 'react';
import { Search, Filter, Instagram, Youtube, Twitter, TrendingUp, Calendar, Download, Bookmark, ExternalLink, Users, MapPin, Tag, RefreshCw, Database, Star, DollarSign, Mail, Copy, CheckCircle } from 'lucide-react';

export default function InfluencerDiscoveryApp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInfluencers, setFilteredInfluencers] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedFollowerRange, setSelectedFollowerRange] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedRateRange, setSelectedRateRange] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [savedInfluencers, setSavedInfluencers] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showApiInfo, setShowApiInfo] = useState(false);
  const [dataSource, setDataSource] = useState('demo');
  const [allInfluencers, setAllInfluencers] = useState([]);
  const [copiedEmail, setCopiedEmail] = useState(null);

  // Mock data for demo mode
  const mockInfluencers = [
    {
      id: 1,
      name: "Sarah Johnson",
      handle: "@sarahfit",
      email: "sarah@influencer.com",
      platforms: ["instagram", "youtube"],
      followers: 125000,
      engagementRate: 4.8,
      bio: "Certified fitness coach | Yoga instructor | Healthy lifestyle advocate | Plant-based nutrition",
      location: "Los Angeles, CA",
      categories: ["fitness", "wellness", "lifestyle"],
      avgLikesPerPost: 6000,
      postsPerWeek: 5,
      website: "www.sarahfit.com",
      instagram_username: "sarahfit",
      rate_range: "$$$",
      status: "Available",
      rating: 5,
      notes: "Great engagement, prefers lifestyle brands",
      last_contact: "2024-01-15"
    },
    {
      id: 2,
      name: "Mike Chen",
      handle: "@techmikereviews",
      email: "mike@techreviews.com",
      platforms: ["youtube", "twitter"],
      followers: 450000,
      engagementRate: 6.2,
      bio: "Tech reviewer | Gadget enthusiast | Software developer | Unboxing the latest tech trends",
      location: "San Francisco, CA",
      categories: ["tech", "reviews"],
      avgLikesPerPost: 28000,
      postsPerWeek: 3,
      website: "www.techmike.io",
      instagram_username: "techmikereviews",
      rate_range: "$$$$",
      status: "Contacted",
      rating: 4,
      notes: "Prefers long-term partnerships",
      last_contact: "2024-02-01"
    },
    {
      id: 3,
      name: "Emma Watson",
      handle: "@emmacooks",
      email: "emma@vegancooking.com",
      platforms: ["instagram", "tiktok"],
      followers: 89000,
      engagementRate: 8.5,
      bio: "Vegan chef | Recipe developer | Sustainable living | Making plant-based cooking simple",
      location: "Portland, OR",
      categories: ["food", "vegan", "sustainability"],
      avgLikesPerPost: 7500,
      postsPerWeek: 7,
      website: "www.emmacooks.com",
      instagram_username: "emmacooks",
      rate_range: "$$",
      status: "Available",
      rating: 5,
      notes: "Very responsive, great content quality",
      last_contact: "2024-01-20"
    },
    {
      id: 4,
      name: "David Park",
      handle: "@davidtravels",
      email: "david@travelphoto.com",
      platforms: ["instagram", "youtube"],
      followers: 320000,
      engagementRate: 5.9,
      bio: "Travel photographer | Adventure seeker | Capturing hidden gems worldwide | Travel tips & guides",
      location: "New York, NY",
      categories: ["travel", "photography", "lifestyle"],
      avgLikesPerPost: 19000,
      postsPerWeek: 4,
      website: "www.davidtravels.net",
      instagram_username: "davidtravels",
      rate_range: "$$$$",
      status: "Negotiating",
      rating: 4,
      notes: "Requires 2-month advance booking",
      last_contact: "2024-02-10"
    },
    {
      id: 5,
      name: "Lisa Martinez",
      handle: "@lisamakeup",
      email: "lisa@beautystudio.com",
      platforms: ["instagram", "tiktok", "youtube"],
      followers: 67000,
      engagementRate: 9.2,
      bio: "Professional makeup artist | Beauty tutorials | Sustainable beauty advocate | Cruelty-free only",
      location: "Miami, FL",
      categories: ["beauty", "makeup", "sustainability"],
      avgLikesPerPost: 6200,
      postsPerWeek: 6,
      website: "www.lisamakeup.com",
      instagram_username: "lisamakeup",
      rate_range: "$$",
      status: "Available",
      rating: 5,
      notes: "Excellent for beauty campaigns",
      last_contact: "2024-01-25"
    },
    {
      id: 6,
      name: "James Wilson",
      handle: "@jamesfashion",
      email: "james@mensstyle.com",
      platforms: ["instagram", "tiktok"],
      followers: 156000,
      engagementRate: 7.1,
      bio: "Men's fashion blogger | Sustainable fashion advocate | Style tips for the modern man",
      location: "Chicago, IL",
      categories: ["fashion", "lifestyle", "sustainability"],
      avgLikesPerPost: 11000,
      postsPerWeek: 5,
      website: "www.jamesstyle.com",
      instagram_username: "jamesfashion",
      rate_range: "$$$",
      status: "Confirmed",
      rating: 4,
      notes: "Working on current campaign",
      last_contact: "2024-02-05"
    },
    {
      id: 7,
      name: "Robert Thompson",
      handle: "@robertrealestate",
      email: "robert@realestatepro.com",
      platforms: ["instagram", "youtube"],
      followers: 234000,
      engagementRate: 5.3,
      bio: "Real estate investor | Property coach | Helping you build wealth through real estate | Investment strategies",
      location: "Dallas, TX",
      categories: ["real estate", "finance", "investment"],
      avgLikesPerPost: 12400,
      postsPerWeek: 4,
      website: "www.robertrealtor.com",
      instagram_username: "robertrealestate",
      rate_range: "$$$$",
      status: "Unavailable",
      rating: 3,
      notes: "Booked until March",
      last_contact: "2024-01-30"
    },
    {
      id: 8,
      name: "Amanda Chen",
      handle: "@amandahomes",
      email: "amanda@homestyle.com",
      platforms: ["instagram", "tiktok"],
      followers: 87000,
      engagementRate: 7.8,
      bio: "Real estate agent | Home staging expert | First-time buyer specialist | Making your dream home a reality",
      location: "Seattle, WA",
      categories: ["real estate", "home decor", "lifestyle"],
      avgLikesPerPost: 6800,
      postsPerWeek: 6,
      website: "www.amandahomes.com",
      instagram_username: "amandahomes",
      rate_range: "$$",
      status: "Available",
      rating: 5,
      notes: "Specializes in home decor content",
      last_contact: "2024-02-08"
    }
  ];

  // Initialize with mock data
  useEffect(() => {
    setAllInfluencers(mockInfluencers);
    setFilteredInfluencers(mockInfluencers);
  }, []);

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

  const statusOptions = ["all", "Available", "Contacted", "Negotiating", "Confirmed", "Unavailable"];
  const rateRangeOptions = ["all", "$", "$$", "$$$", "$$$$"];

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

  const getStatusColor = (status) => {
    const colors = {
      'Available': '#10b981',
      'Contacted': '#f59e0b',
      'Negotiating': '#f97316',
      'Confirmed': '#3b82f6',
      'Unavailable': '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const getFollowerRangeLabel = (followers) => {
    if (followers < 10000) return "Nano (1K-10K)";
    if (followers < 100000) return "Micro (10K-100K)";
    if (followers < 500000) return "Mid-tier (100K-500K)";
    return "Macro (500K+)";
  };

  const copyEmail = (email, id) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(id);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const formatLastContact = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        fill={i < rating ? '#fbbf24' : 'none'}
        color={i < rating ? '#fbbf24' : '#d1d5db'}
      />
    ));
  };

  // Fetch from Google Sheets
  const fetchFromSheets = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/get-influencers');
      const data = await response.json();
      
      if (data.influencers && data.influencers.length > 0) {
        setAllInfluencers(data.influencers);
        setDataSource('sheets');
        filterInfluencers(data.influencers);
      } else {
        alert('No data found in Google Sheets. Make sure your sheet is set up correctly.');
      }
    } catch (error) {
      console.error('Error loading sheet data:', error);
      alert('Failed to load data from Google Sheets. Make sure you have set up the API route with your Sheet ID.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter influencers based on all criteria
  const filterInfluencers = (influencersToFilter) => {
    let filtered = influencersToFilter || allInfluencers;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(influencer =>
        influencer.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (influencer.categories && influencer.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    // Platform filter
    if (selectedPlatform !== "all") {
      filtered = filtered.filter(influencer =>
        influencer.platforms && influencer.platforms.includes(selectedPlatform)
      );
    }

    // Follower range filter
    if (selectedFollowerRange !== "all") {
      filtered = filtered.filter(influencer => {
        const followers = influencer.followers || 0;
        if (selectedFollowerRange === "nano") return followers < 10000;
        if (selectedFollowerRange === "micro") return followers >= 10000 && followers < 100000;
        if (selectedFollowerRange === "mid") return followers >= 100000 && followers < 500000;
        if (selectedFollowerRange === "macro") return followers >= 500000;
        return true;
      });
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter(influencer =>
        influencer.location && influencer.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(influencer =>
        influencer.categories && influencer.categories.includes(selectedCategory)
      );
    }

    // Status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter(influencer =>
        influencer.status === selectedStatus
      );
    }

    // Rate range filter
    if (selectedRateRange !== "all") {
      filtered = filtered.filter(influencer =>
        influencer.rate_range === selectedRateRange
      );
    }

    // Sorting
    if (sortBy === "followers") {
      filtered.sort((a, b) => (b.followers || 0) - (a.followers || 0));
    } else if (sortBy === "engagement") {
      filtered.sort((a, b) => (b.engagementRate || 0) - (a.engagementRate || 0));
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredInfluencers(filtered);
  };

  // Apply filters whenever criteria change
  useEffect(() => {
    filterInfluencers();
  }, [searchTerm, selectedPlatform, selectedFollowerRange, selectedLocation, selectedCategory, selectedStatus, selectedRateRange, sortBy, allInfluencers]);

  // Reset API info when filters change
  useEffect(() => {
    setShowApiInfo(false);
  }, [selectedPlatform, selectedFollowerRange, selectedLocation, selectedCategory, selectedStatus, selectedRateRange, sortBy]);

  const handleSearch = () => {
    if (!searchTerm) return;
    
    setIsLoading(true);
    
    const hasResults = allInfluencers.some(influencer =>
      influencer.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (influencer.categories && influencer.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase())))
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
    const headers = ["Name", "Handle", "Email", "Platforms", "Followers", "Engagement Rate", "Location", "Categories", "Website", "Rate Range", "Status", "Rating", "Notes", "Last Contact"];
    const rows = dataToExport.map(inf => [
      inf.name || '',
      inf.handle || '',
      inf.email || '',
      inf.platforms ? inf.platforms.join(", ") : '',
      inf.followers || 0,
      (inf.engagementRate || 0) + "%",
      inf.location || '',
      inf.categories ? inf.categories.join(", ") : '',
      inf.website || '',
      inf.rate_range || '',
      inf.status || '',
      inf.rating || '',
      inf.notes || '',
      inf.last_contact || ''
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "influencers-export.csv";
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
        .data-source-toggle {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: #f0f9ff;
          border-radius: 0.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .data-source-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .data-source-label {
          font-weight: bold;
        }
        .data-source-status {
          color: #666;
        }
        .data-source-button {
          padding: 0.5rem 1rem;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }
        .data-source-button:hover:not(:disabled) {
          background: #2563eb;
        }
        .data-source-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .data-source-button-active {
          background: #10b981;
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
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
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
          flex-wrap: wrap;
          gap: 1rem;
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
          position: relative;
        }
        .influencer-card:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .status-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          color: white;
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
          overflow: hidden;
          background: #e5e7eb;
        }
        .profile-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
          margin-bottom: 0.25rem;
        }
        .profile-handle {
          color: #888;
          font-size: 0.875rem;
        }
        .rating-section {
          display: flex;
          gap: 0.125rem;
          margin-top: 0.25rem;
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
        .contact-section {
          background-color: #f9fafb;
          padding: 0.75rem;
          border-radius: 0.375rem;
          margin-bottom: 1rem;
        }
        .email-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .email-text {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #374151;
        }
        .copy-button {
          padding: 0.25rem 0.5rem;
          background: #e5e7eb;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          transition: all 0.2s;
        }
        .copy-button:hover {
          background: #d1d5db;
        }
        .copy-button-success {
          background: #10b981;
          color: white;
        }
        .info-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }
        .rate-badge {
          font-weight: 600;
          color: #059669;
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
        .notes-section {
          background-color: #fef3c7;
          padding: 0.75rem;
          border-radius: 0.375rem;
          margin-bottom: 1rem;
        }
        .notes-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #92400e;
          margin-bottom: 0.25rem;
        }
        .notes-text {
          font-size: 0.875rem;
          color: #78350f;
          line-height: 1.4;
        }
        .actions {
          display: flex;
          gap: 0.5rem;
        }
        .website-link {
          flex: 1;
          padding: 0.5rem 0.75rem;
          background-color: #f3f4f6;
          color: #4b5563;
          font-size: 0.875rem;
          border-radius: 0.375rem;
          display: flex;
          align-items: center;
          justify-content: center;
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
        @media (max-width: 640px) {
          .filters-grid {
            grid-template-columns: 1fr;
          }
          .influencers-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="container">
        <div className="header">
          <h1 className="title">🔍 Influencer Discovery Tool</h1>
          <p className="subtitle">Find the perfect influencers for your brand</p>
          <p className="demo-note">
            {dataSource === 'sheets' 
              ? 'Using data from Google Sheets' 
              : 'Demo version with 8 sample influencers - Connect Google Sheets for real data!'}
          </p>
        </div>

        {/* Data Source Toggle */}
        <div className="data-source-toggle">
          <div className="data-source-info">
            <Database size={20} />
            <span className="data-source-label">Data Source:</span>
            <span className="data-source-status">
              {dataSource === 'sheets' ? 'Google Sheets (Live Data)' : 'Demo Data'}
            </span>
          </div>
          <button
            onClick={fetchFromSheets}
            disabled={isLoading}
            className={`data-source-button ${dataSource === 'sheets' ? 'data-source-button-active' : ''}`}
          >
            {isLoading ? (
              <>
                <RefreshCw size={16} className="spinner" />
                Loading...
              </>
            ) : dataSource === 'sheets' ? (
              <>
                <RefreshCw size={16} />
                Refresh Data
              </>
            ) : (
              <>
                <Database size={16} />
                Load from Google Sheets
              </>
            )}
          </button>
        </div>

        {/* Search Bar */}
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

        {/* Filters */}
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
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status}
                </option>
              ))}
            </select>

            <select
              className="filter-select"
              value={selectedRateRange}
              onChange={(e) => setSelectedRateRange(e.target.value)}
            >
              {rateRangeOptions.map(rate => (
                <option key={rate} value={rate}>
                  {rate === 'all' ? 'All Rates' : rate}
                </option>
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
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>

        {/* API Info */}
        {showApiInfo && searchTerm && filteredInfluencers.length === 0 && !isLoading && (
          <div className="api-info">
            <h3>🔍 No Results Found</h3>
            <p>
              No influencers found for "{searchTerm}" in the current data source.
            </p>
            <p className="api-info-note">
              {dataSource === 'sheets' 
                ? 'Try adding more influencers to your Google Sheet or search for different keywords.'
                : 'Connect your Google Sheets to add your own influencer data!'}
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setShowApiInfo(false);
              }}
              className="clear-button"
            >
              Clear search and view all influencers
            </button>
          </div>
        )}

        {/* Results Header */}
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

        {/* Loading State */}
        {isLoading && (
          <div className="loading-container">
            <div className="loading-content">
              <div className="spinner"></div>
              <p className="loading-text">
                {dataSource === 'sheets' ? 'Loading from Google Sheets...' : 'Searching for influencers...'}
              </p>
            </div>
          </div>
        )}

        {/* Influencer Grid */}
        {!isLoading && (
          <div className="influencers-grid">
            {filteredInfluencers.map((influencer) => (
              <div key={influencer.id} className="influencer-card">
                {/* Status Badge */}
                {influencer.status && (
                  <div 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(influencer.status) }}
                  >
                    {influencer.status}
                  </div>
                )}

                {/* Card Header */}
                <div className="card-header">
                  <div className="profile-section">
                    <div className="profile-image">
                      {influencer.instagram_username ? (
                        <img 
                          src={`https://unavatar.io/instagram/${influencer.instagram_username}?fallback=false`}
                          alt={influencer.name}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.classList.add(`profile-gradient-${(influencer.id || Math.random() * 100) % 4}`);
                            e.target.parentElement.innerHTML = influencer.name ? influencer.name.split(' ').map(n => n[0]).join('') : '?';
                          }}
                        />
                      ) : (
                        <div className={`profile-gradient-${(influencer.id || Math.random() * 100) % 4}`}>
                          {influencer.name ? influencer.name.split(' ').map(n => n[0]).join('') : '?'}
                        </div>
                      )}
                    </div>
                    <div className="profile-info">
                      <h3>{influencer.name || 'Unknown'}</h3>
                      <p className="profile-handle">{influencer.handle || '@unknown'}</p>
                      {influencer.rating && (
                        <div className="rating-section">
                          {renderStars(influencer.rating)}
                        </div>
                      )}
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

                {/* Contact Section */}
                {(influencer.email || influencer.rate_range || influencer.last_contact) && (
                  <div className="contact-section">
                    {influencer.email && (
                      <div className="email-row">
                        <div className="email-text">
                          <Mail size={14} />
                          <span>{influencer.email}</span>
                        </div>
                        <button
                          onClick={() => copyEmail(influencer.email, influencer.id)}
                          className={`copy-button ${copiedEmail === influencer.id ? 'copy-button-success' : ''}`}
                        >
                          {copiedEmail === influencer.id ? (
                            <>
                              <CheckCircle size={12} />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    )}
                    {influencer.rate_range && (
                      <div className="info-row">
                        <DollarSign size={14} />
                        <span>Rate: <span className="rate-badge">{influencer.rate_range}</span></span>
                      </div>
                    )}
                    {influencer.last_contact && (
                      <div className="info-row">
                        <Calendar size={14} />
                        <span>Last contact: {formatLastContact(influencer.last_contact)}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Platforms */}
                <div className="platforms">
                  {influencer.platforms && influencer.platforms.map(platform => (
                    <span key={platform}>
                      {platformIcons[platform]}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="stats-grid">
                  <div>
                    <div className="stat-item">
                      <Users size={16} />
                      <span>Followers</span>
                    </div>
                    <p className="stat-value">{((influencer.followers || 0) / 1000).toFixed(0)}K</p>
                    <p className="stat-label">{getFollowerRangeLabel(influencer.followers || 0)}</p>
                  </div>
                  <div>
                    <div className="stat-item">
                      <TrendingUp size={16} />
                      <span>Engagement</span>
                    </div>
                    <p className="stat-value">{influencer.engagementRate || 0}%</p>
                    <p className="stat-label">Avg rate</p>
                  </div>
                </div>

                {/* Bio */}
                <p className="bio">
                  {searchTerm && influencer.bio ? (
                    influencer.bio.split(new RegExp(`(${searchTerm})`, 'gi')).map((part, index) =>
                      part.toLowerCase() === searchTerm.toLowerCase() ? (
                        <span key={index} style={{ backgroundColor: '#fef3c7' }}>{part}</span>
                      ) : (
                        part
                      )
                    )
                  ) : (
                    influencer.bio || 'No bio available'
                  )}
                </p>

                {/* Location */}
                {influencer.location && (
                  <div className="location">
                    <MapPin size={16} />
                    <span>{influencer.location}</span>
                  </div>
                )}

                {/* Categories */}
                {influencer.categories && influencer.categories.length > 0 && (
                  <div className="categories">
                    {influencer.categories.map(cat => (
                      <span key={cat} className="category-tag">
                        <Tag size={12} />
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

                {/* Analytics */}
                {(influencer.avgLikesPerPost || influencer.postsPerWeek) && (
                  <div className="analytics">
                    <h4>Analytics</h4>
                    <div className="analytics-grid">
                      {influencer.avgLikesPerPost && (
                        <div className="analytics-item">
                          <TrendingUp size={12} />
                          <span>Avg likes: {(influencer.avgLikesPerPost / 1000).toFixed(1)}K</span>
                        </div>
                      )}
                      {influencer.postsPerWeek && (
                        <div className="analytics-item">
                          <Calendar size={12} />
                          <span>{influencer.postsPerWeek} posts/week</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {influencer.notes && (
                  <div className="notes-section">
                    <div className="notes-label">📝 Notes</div>
                    <div className="notes-text">{influencer.notes}</div>
                  </div>
                )}

                {/* Actions */}
                <div className="actions">
                  {influencer.website && (
                    <a
                      href={`https://${influencer.website.replace(/^https?:\/\//, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="website-link"
                    >
                      <ExternalLink size={16} />
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredInfluencers.length === 0 && !showApiInfo && (
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
