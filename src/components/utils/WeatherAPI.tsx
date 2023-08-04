import axios from "axios";

interface Address {
  street: string;
  city?: string;
  state?: string;
  zip?: string;
}

interface ForecastData {
  properties: {
    forecast: string;
    periods: dailyForecast[];
  };
}
interface HourlyForecastData {
  properties: {
    forecastHourly: string;
    periods: hourlyForecast;
  };
}
export interface dailyForecast {
  latitude: number;
  longitude: number;
  detailedForecast: string;
  dewpoint: {
    value: number;
    units: string;
  };
  endTime: string;
  icon: string;
  isDayTime: boolean;
  name: string;
  number: number;
  probabilityOfPrecipitation: {
    value: number;
    units: string;
  };
  relativeHumidity: {
    value: number;
    units: string;
  };
  shortForecast: string;
  temperature: {
    value: number;
    units: string;
  };
  temperatureTrend: null;
  temperatureUnit: string;
  windDirection: string;
  windSpeed: string;
}
export interface hourlyForecast {
  detailedForecast: string;
  dewpoint: {
    value: number;
    units: string;
  };
  endTime: string;
  icon: string;
  isDayTime: boolean;
  name: string;
  number: number;
  probabilityOfPrecipitation: {
    value: number;
    units: string;
  };
  relativeHumidity: {
    value: number;
    units: string;
  };
  shortForecast: string;
  temperature: {
    value: number;
    units: string;
  };
  temperatureTrend: null;
  temperatureUnit: string;
  windDirection: string;
  windSpeed: string;
}

export const geocodeAddress = async (address: Address) => {
  // const apiKey = "YOUR_API_KEY"; // Replace with your US Census Geocoding API key
  const benchmark = "Public_AR_Current"; // Replace with the desired benchmark
  const apiUrl = `https://geocoding.geo.census.gov/geocoder/locations/address?street=${encodeURIComponent(
    address.street
  )}&city=${encodeURIComponent(address.city || "")}&state=${encodeURIComponent(
    address.state || ""
  )}&zip=${encodeURIComponent(
    address.zip || ""
  )}&benchmark=${benchmark}&format=json`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    if (
      data &&
      data.result &&
      data.result.addressMatches &&
      data.result.addressMatches.length > 0
    ) {
      const { y: latitude, x: longitude } =
        data.result.addressMatches[0].coordinates;
      return { latitude, longitude };
    } else {
      throw new Error("Geocoding failed. No matching results.");
    }
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

export const fetchWeatherForecast = async (lat: number, lon: number) => {
  const weatherApiUrl = `https://api.weather.gov/points/${lat},${lon}`;

  try {
    const response = await axios.get<ForecastData>(weatherApiUrl);
    const forecastEndpoint = response.data?.properties?.forecast;

    if (forecastEndpoint) {
      // Fetch the actual forecast data
      const forecastResponse = await axios.get<ForecastData>(forecastEndpoint);
      return forecastResponse.data;
    } else {
      throw new Error("Forecast endpoint not found in the response data.");
    }
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

export const fetchHourlyForecast = async (lat: number, lon: number) => {
  const weatherApiUrl = `https://api.weather.gov/points/${lat},${lon}`;

  try {
    const response = await axios.get<HourlyForecastData>(weatherApiUrl);
    const forecastEndpoint = response.data?.properties?.forecastHourly;
    if (forecastEndpoint) {
      const forecastResponse = await axios.get<HourlyForecastData>(
        forecastEndpoint
      );
      return forecastResponse.data;
    } else {
      throw new Error("forecast endpoint not found in the response data.");
    }
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};
