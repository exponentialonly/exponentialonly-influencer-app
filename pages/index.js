import { useState } from 'react';
import { Search, Filter, Users, TrendingUp, Bookmark, ExternalLink, Tag } from 'lucide-react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [savedInfluencers, setSavedInfluencers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - In a real app, this would come from a database
  const influencers = [
    {
      id: 1,
      name: "Sarah Johnson",
      handle: "@sarahfit",
      platform: "Instagram",
      followers: 125000,
      engagement: 4.8,
      bio: "Certified fitness coach | Yoga instructor | Healthy lifestyle advocate",
      categories: ["fitness", "wellness", "lifestyle"],
      verified: true
    },
    {
      id: 2,
      name: "Mike Chen",
      handle: "@techmikereviews",
      platform: "YouTube",
      followers: 450000,
      engagement: 6.2,
      bio: "Tech reviewer | Gadget enthusiast | Honest reviews on latest tech",
      categories: ["tech", "reviews"],
      verified: true
    },
    {
      id: 3,
      name: "Emma Watson",
      handle: "@emmacooks",
      platform: "TikTok",
      followers: 89000,
      engagement: 8.5,
      bio: "Vegan chef | Quick recipes | Making plant-based cooking simple",
      categories: ["food", "vegan", "cooking"],
      verified: false
    },
    {
      id: 4,
      name: "Robert Thompson",
      handle: "@robertrealestate",
      platform: "Instagram",
      followers: 234000,
      engagement: 5.3,
      bio: "Real estate investor | Property tips | Building wealth through real estate",
      categories: ["real estate", "finance", "investment"],
      verified: true
    }
  ];

  const categories = ["all", "fitness", "tech", "food", "real estate", "lifestyle"];

  const filteredInfluencers = influencers.filter(influencer => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         influencer.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         influencer.categories.some(cat => cat.includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           influencer.categories.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  const toggleSave = (id) => {
    setSavedInfluencers(prev =>
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>
          🔍 Influencer Discovery Tool
        </h1>
        <p style={{ color: '#666' }}>Find the perfect influencers for your brand</p>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px', position: 'relative' }}>
        <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
        <input
          type="text"
          placeholder="Search by name, bio, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 12px 12px 45px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            outline: 'none'
          }}
        />
      </div>

      {/* Category Filter */}
      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              background: selectedCategory === category ? '#007bff' : '#f0f0f0',
              color: selectedCategory === category ? 'white' : '#333',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Found {filteredInfluencers.length} influencers
      </p>

      {/* Influencer Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {filteredInfluencers.map(influencer => (
          <div key={influencer.id} style={{
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '5px' }}>
                  {influencer.name} {influencer.verified && '✓'}
                </h3>
                <p style={{ color: '#666', fontSize: '14px' }}>{influencer.handle}</p>
              </div>
              <button
                onClick={() => toggleSave(influencer.id)}
                style={{
                  background: savedInfluencers.includes(influencer.id) ? '#007bff' : '#f0f0f0',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px',
                  cursor: 'pointer'
                }}
              >
                <Bookmark 
                  size={20} 
                  fill={savedInfluencers.includes(influencer.id) ? 'white' : 'none'}
                  color={savedInfluencers.includes(influencer.id) ? 'white' : '#666'}
                />
              </button>
            </div>

            {/* Platform Badge */}
            <span style={{
              background: '#e3f2fd',
              color: '#1976d2',
              padding: '4px 12px',
              borderRadius: '16px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {influencer.platform}
            </span>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#666', fontSize: '14px' }}>
                  <Users size={16} /> Followers
                </div>
                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  {(influencer.followers / 1000).toFixed(0)}K
                </p>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#666', fontSize: '14px' }}>
                  <TrendingUp size={16} /> Engagement
                </div>
                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  {influencer.engagement}%
                </p>
              </div>
            </div>

            {/* Bio */}
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px', lineHeight: '1.5' }}>
              {influencer.bio}
            </p>

            {/* Categories */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '15px' }}>
              {influencer.categories.map(cat => (
                <span key={cat} style={{
                  background: '#f0f0f0',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Tag size={12} /> {cat}
                </span>
              ))}
            </div>

            {/* Action Button */}
            <button style={{
              width: '100%',
              padding: '10px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              View Profile <ExternalLink size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredInfluencers.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
          <p style={{ fontSize: '18px' }}>No influencers found matching your criteria.</p>
          <p style={{ marginTop: '10px' }}>Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
