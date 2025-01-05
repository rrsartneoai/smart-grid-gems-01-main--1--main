const API_BASE_URL = 'https://api.electricitymap.org/v3';

const getApiKey = () => {
  const apiKey = localStorage.getItem('ELECTRICITY_MAPS_API_KEY');
  if (!apiKey) {
    throw new Error('API key not found in localStorage');
  }
  // Remove any whitespace and quotes that might have been accidentally included
  return apiKey.trim().replace(/['"]/g, '');
};

const createHeaders = (apiKey: string) => ({
  'auth-token': apiKey,
  'Accept': 'application/json'
});

export const fetchEnergyData = async (apiKey: string) => {
  try {
    const cleanApiKey = apiKey.trim().replace(/['"]/g, '');
    console.log('Starting API call with key:', cleanApiKey.substring(0, 4) + '...');
    
    const response = await fetch(`${API_BASE_URL}/power-breakdown/PL`, {
      headers: createHeaders(cleanApiKey)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        error: errorText
      });
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);
    
    return {
      production: data.powerProductionBreakdown || {},
      carbonIntensity: data.carbonIntensity || 0,
      renewablePercentage: data.renewablePercentage || 0
    };
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
};

export const fetchPowerData = async (lat: number, lon: number) => {
  try {
    const apiKey = getApiKey();
    const response = await fetch(`${API_BASE_URL}/power-breakdown/PL?lat=${lat}&lon=${lon}`, {
      headers: createHeaders(apiKey)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch power data: ${errorText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Power Data Fetch Error:', error);
    throw error;
  }
};

export const fetchPowerForecast = async (zoneId: string) => {
  try {
    const apiKey = getApiKey();
    const response = await fetch(`${API_BASE_URL}/power-forecast/${zoneId}`, {
      headers: createHeaders(apiKey)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch power forecast: ${errorText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Power Forecast Fetch Error:', error);
    throw error;
  }
};

export const fetchConsumptionForecast = async (lat: number, lon: number) => {
  try {
    const apiKey = getApiKey();
    const response = await fetch(`${API_BASE_URL}/consumption-forecast?lat=${lat}&lon=${lon}`, {
      headers: createHeaders(apiKey)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch consumption forecast: ${errorText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Consumption Forecast Fetch Error:', error);
    throw error;
  }
};