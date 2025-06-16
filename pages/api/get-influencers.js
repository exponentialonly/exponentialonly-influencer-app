export default async function handler(req, res) {
  // Replace with your actual Sheet ID
  const SHEET_ID = '1ebZswB2W8yT7VhfIhB5wyS2NvreKkC2lq5lmlX1Kp-E';
  const SHEET_NAME = 'Sheet1'; // Default sheet name
  
  try {
    // Fetch data from Google Sheets (CSV format)
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;
    
    const response = await fetch(url);
    const text = await response.text();
    
    // Parse CSV data
    const rows = text.split('\n').map(row => {
      // Handle quoted values in CSV
      const matches = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
      return matches ? matches.map(value => value.replace(/^"|"$/g, '')) : [];
    });
    
    // Get headers and data
    const headers = rows[0];
    const data = rows.slice(1).filter(row => row.length > 1);
    
    // Convert to JSON format
    const influencers = data.map(row => {
      const influencer = {};
      headers.forEach((header, index) => {
        const value = row[index] || '';
        
        // Parse different data types
        switch(header) {
          case 'id':
          case 'followers':
          case 'avgLikesPerPost':
            influencer[header] = parseInt(value) || 0;
            break;
          case 'engagementRate':
          case 'postsPerWeek':
            influencer[header] = parseFloat(value) || 0;
            break;
          case 'platforms':
          case 'categories':
            influencer[header] = value ? value.split(',').map(item => item.trim()) : [];
            break;
          default:
            influencer[header] = value;
        }
      });
      
      // Add computed fields
      influencer.profileImage = '';
      influencer.topContent = ['', '', ''];
      
      return influencer;
    });
    
    res.status(200).json({ influencers, source: 'google-sheets' });
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    res.status(500).json({ error: 'Failed to fetch data from Google Sheets' });
  }
}
