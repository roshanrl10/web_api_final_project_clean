const axios = require("axios");

// Get weather data for a location
const getWeatherData = async (req, res) => {
  try {
    const { location } = req.query;
    
    if (!location) {
      return res.status(400).json({ message: "Location parameter is required" });
    }

    // Using OpenWeatherMap API (you'll need to get a free API key)
    const API_KEY = process.env.OPENWEATHER_API_KEY || "your_api_key_here";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(url);
    
    if (response.data.cod !== 200) {
      return res.status(404).json({ message: "Location not found" });
    }

    const weatherData = {
      location: response.data.name,
      country: response.data.sys.country,
      temperature: Math.round(response.data.main.temp),
      feelsLike: Math.round(response.data.main.feels_like),
      condition: response.data.weather[0].main,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: Math.round(response.data.wind.speed * 3.6), // Convert m/s to km/h
      visibility: Math.round(response.data.visibility / 1000), // Convert m to km
      pressure: response.data.main.pressure,
      sunrise: new Date(response.data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(response.data.sys.sunset * 1000).toLocaleTimeString(),
      icon: response.data.weather[0].icon,
      recommendation: getTrekkingRecommendation(response.data)
    };

    res.status(200).json(weatherData);
  } catch (error) {
    console.error("Weather API Error:", error.message);
    res.status(500).json({ 
      message: "Error fetching weather data", 
      error: error.message 
    });
  }
};

// Get weather forecast for a location
const getWeatherForecast = async (req, res) => {
  try {
    const { location } = req.query;
    
    if (!location) {
      return res.status(400).json({ message: "Location parameter is required" });
    }

    const API_KEY = process.env.OPENWEATHER_API_KEY || "your_api_key_here";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(url);
    
    if (response.data.cod !== "200") {
      return res.status(404).json({ message: "Location not found" });
    }

    // Process forecast data to get daily forecasts
    const dailyForecasts = processForecastData(response.data.list);
    
    res.status(200).json({
      location: response.data.city.name,
      country: response.data.city.country,
      forecasts: dailyForecasts
    });
  } catch (error) {
    console.error("Weather Forecast API Error:", error.message);
    res.status(500).json({ 
      message: "Error fetching weather forecast", 
      error: error.message 
    });
  }
};

// Helper function to get trekking recommendation based on weather
const getTrekkingRecommendation = (weatherData) => {
  const temp = weatherData.main.temp;
  const condition = weatherData.weather[0].main.toLowerCase();
  const windSpeed = weatherData.wind.speed;
  const visibility = weatherData.visibility;

  if (temp < 0 || condition.includes("snow") || condition.includes("storm")) {
    return "Not recommended for trekking";
  } else if (temp < 10 || condition.includes("rain") || windSpeed > 10) {
    return "Challenging conditions - proper gear required";
  } else if (temp < 20 && visibility > 5) {
    return "Good for trekking with proper gear";
  } else if (temp < 30 && visibility > 8) {
    return "Perfect conditions for trekking";
  } else {
    return "Hot weather - stay hydrated and avoid peak hours";
  }
};

// Helper function to process forecast data
const processForecastData = (forecastList) => {
  const dailyData = {};
  
  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!dailyData[date]) {
      dailyData[date] = {
        date: date,
        temp: item.main.temp,
        condition: item.weather[0].main,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        windSpeed: Math.round(item.wind.speed * 3.6)
      };
    }
  });

  return Object.values(dailyData).slice(0, 5); // Return next 5 days
};

// Get mock weather data for development (when API key is not available)
const getMockWeatherData = async (req, res) => {
  try {
    const { location } = req.query;
    
    const mockData = {
      location: location || "Everest Base Camp",
      country: "Nepal",
      temperature: Math.floor(Math.random() * 20) + 5,
      feelsLike: Math.floor(Math.random() * 20) + 5,
      condition: "Clear",
      description: "clear sky",
      humidity: Math.floor(Math.random() * 30) + 40,
      windSpeed: Math.floor(Math.random() * 15) + 5,
      visibility: Math.floor(Math.random() * 5) + 8,
      pressure: 1013,
      sunrise: "06:30:00",
      sunset: "18:45:00",
      icon: "01d",
      recommendation: "Perfect conditions for trekking"
    };

    res.status(200).json(mockData);
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching mock weather data", 
      error: error.message 
    });
  }
};

module.exports = {
  getWeatherData,
  getWeatherForecast,
  getMockWeatherData
}; 