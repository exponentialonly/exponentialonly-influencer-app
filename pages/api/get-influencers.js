export default async function handler(req, res) {
  // Replace with your actual Sheet ID from the Google Sheets URL
  const SHEET_ID = '1ebZswB2W8yT7VhfIhB5wyS2NvreKkC2lq5lmlX1Kp-E';
  const SHEET_NAME = 'Sheet1'; // Default sheet name
  
  try {
    // Fetch data from Google Sheets (CSV format)
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch sheet data');
    }
    
    const text = await response.text();
    
    // Parse CSV data
    const rows = text.split('\n').map(row => {
      // Handle quoted values in CSV
      const matches = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
      return matches ? matches.map(value => value.replace(/^"|"$/g, '').trim()) : [];
    });
    
    // Get headers and data
    const headers = rows[0];
    const data = rows.slice(1).filter(row => row.length > 1 && row[0]); // Filter out empty rows
    
    // Convert to JSON format
    const influencers = data.map((row, index) => {
      const influencer = {};
      headers.forEach((header, idx) => {
        const value = row[idx] || '';
        const cleanHeader = header.replace(/['"]/g, '').trim();
        
        // Parse different data types based on header
        switch(cleanHeader.toLowerCase()) {
          case 'id':
            influencer.id = parseInt(value) || index + 1;
            break;
          case 'followers':
          case 'avglikesperpost':
            influencer[cleanHeader] = parseInt(value.replace(/,/g, '')) || 0;
            break;
          case 'engagementrate':
          case 'postsperweek':
            influencer[cleanHeader] = parseFloat(value) || 0;
            break;
          case 'rating':
            influencer[cleanHeader] = parseInt(value) || 0;
            break;
          case 'platforms':
          case 'categories':
            // Handle comma-separated values
            influencer[cleanHeader] = value ? value.split(',').map(item => item.trim().toLowerCase()) : [];
            break;
          case 'instagram_username':
            // Store Instagram username for profile picture
            influencer.instagram_username = value.replace('@', '').trim();
            break;
          case 'email':
            influencer.email = value.trim();
            break;
          case 'rate_range':
            influencer.rate_range = value.trim();
            break;
          case 'status':
            // Ensure status is capitalized properly
            influencer.status = value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : 'Available';
            break;
          case 'notes':
            influencer.notes = value.trim();
            break;
          case 'last_contact':
            influencer.last_contact = value.trim();
            break;
          default:
            influencer[cleanHeader] = value;
        }
      });
      
      // Ensure required fields exist
      influencer.id = influencer.id || index + 1;
      influencer.name = influencer.name || 'Unknown';
      influencer.handle = influencer.handle || '@unknown';
      influencer.email = influencer.email || '';
      influencer.platforms = influencer.platforms || [];
      influencer.followers = influencer.followers || 0;
      influencer.engagementRate = influencer.engagementRate || 0;
      influencer.bio = influencer.bio || '';
      influencer.location = influencer.location || '';
      influencer.categories = influencer.categories || [];
      influencer.avgLikesPerPost = influencer.avgLikesPerPost || 0;
      influencer.postsPerWeek = influencer.postsPerWeek || 0;
      influencer.website = influencer.website || '';
      influencer.instagram_username = influencer.instagram_username || '';
      influencer.rate_range = influencer.rate_range || '';
      influencer.status = influencer.status || 'Available';
      influencer.rating = influencer.rating || 0;
      influencer.notes = influencer.notes || '';
      influencer.last_contact = influencer.last_contact || '';
      
      // Add computed fields (removed for new version)
      influencer.profileImage = ''; // Not used anymore
      influencer.topContent = ['', '', '']; // Not used anymore
      
      return influencer;
    });
    
    res.status(200).json({ 
      influencers, 
      source: 'google-sheets',
      count: influencers.length 
    });
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    res.status(500).json({ 
      error: 'Failed to fetch data from Google Sheets',
      details: error.message,
      tip: 'Make sure your Google Sheet is published to web and the Sheet ID is correct'
    });
  }
}
