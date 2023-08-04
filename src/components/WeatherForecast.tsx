import React, { useState, useMemo, useEffect } from "react";
import AddressForm from "./AddressForm";
import WeatherDetailDisplay from "./WeatherDetailDisplay";
import WeatherButtons from "./WeatherButtons";
import {
  geocodeAddress,
  fetchWeatherForecast,
  fetchHourlyForecast,
} from "./utils/WeatherAPI";
import { extractKeywords } from "./utils/helperfunctions";
import forecastImages from "./utils/ForecastImages";

interface Address {
  street: string;
  city?: string;
  state?: string;
  zip?: string;
}
interface ForecastProbabilityOfPrecipitation {
  value: number;
  units: string;
}

interface ForecastRelativeHumidity {
  value: number;
  units: string;
}
interface hourlyForecast {
  detailedForecast: string;
  dewpoint: object;
  endTime: string;
  icon: string;
  startTime: string;
  isDayTime: boolean;
  name: string;
  number: number;
  probabilityOfPrecipitation: ForecastProbabilityOfPrecipitation;
  relativeHumidity: ForecastRelativeHumidity;
  shortForecast: string;
  temperature: number;
  temperatureTrend: null;
  temperatureUnit: string;
  windDirection: string;
  windSpeed: string;
}
const WeatherForecast: React.FC = () => {
  const [address, setAddress] = useState<Address>({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const [forecastData, setForecastData] = useState<any | null>(null);
  const [hourlyForecastData, setHourlyForecastData] = useState<any | null>(
    null
  );

  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number>(0);
  const [selectedForecast, setSelectedForecast] = useState<any | null>(null); // State to keep track of the selected forecast
  const [selectedHourlyForecast, setSelectedHourlyForecast] = useState<
    any | null
  >(null);
  const geocodeAndFetchForecast = async () => {
    try {
      const { latitude, longitude } = await geocodeAddress(address);
      await fetchAndSetForecastData(latitude, longitude);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchAndSetForecastData = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const forecastData = await fetchWeatherForecast(latitude, longitude);

      setForecastData(forecastData);

      // Fetch and set the hourly forecast data
      const hourlyForecastData = await fetchHourlyForecast(latitude, longitude);
      setHourlyForecastData(hourlyForecastData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const combinedObjects = useMemo(() => {
    const tempCombinedObjects: any = [];
    if (forecastData) {
      for (let i = 0; i < forecastData.properties.periods.length; i += 2) {
        if (i + 1 < forecastData.properties.periods.length) {
          const combinedGroup = [
            forecastData.properties.periods[i],
            forecastData.properties.periods[i + 1],
          ];
          tempCombinedObjects.push(combinedGroup);
        } else {
          const remainingGroup = [forecastData.properties.periods[i]];
          tempCombinedObjects.push(remainingGroup);
        }
      }
    }
    return tempCombinedObjects;
  }, [forecastData]);

  useEffect(() => {
    const getHourlyForecastForSelectedDay = () => {
      if (hourlyForecastData && selectedForecast) {
        // Get the date of the selected forecast
        const selectedDate = new Date(
          selectedForecast.startTime
        ).toLocaleDateString();

        // Filter the hourly forecast data for the selected date
        const hourlyForecastForSelectedDay =
          hourlyForecastData.properties.periods.filter(
            (hourlyForecast: hourlyForecast) => {
              const hourlyForecastDate = new Date(
                hourlyForecast.startTime
              ).toLocaleDateString();
              return hourlyForecastDate === selectedDate;
            }
          );

        return hourlyForecastForSelectedDay;
      }

      return [];
    };
    const hourlyForecastForSelectedDay = getHourlyForecastForSelectedDay();
    setSelectedHourlyForecast(hourlyForecastForSelectedDay);
  }, [hourlyForecastData, selectedForecast]);

  const [dayArrayIndices, setDayArrayIndices] = useState<number[]>(
    combinedObjects.map(() => 0)
  );

  const toggleIndex = async (index: number) => {
    // Toggle the value of the specific index in dayArrayIndices array
    setDayArrayIndices((prevIndices) => {
      const updatedIndices = [...prevIndices];
      updatedIndices[index] = updatedIndices[index] === 0 ? 1 : 0;
      return updatedIndices;
    });
    setSelectedButtonIndex(index);
  };

  useEffect(() => {
    if (combinedObjects.length > 0) {
      setDayArrayIndices(combinedObjects.map(() => 0));
    }
  }, [combinedObjects]);

  useEffect(() => {
    if (combinedObjects.length > 0) {
      setSelectedForecast(
        combinedObjects[selectedButtonIndex][
          dayArrayIndices[selectedButtonIndex]
        ]
      );
    }
  }, [combinedObjects, selectedButtonIndex, dayArrayIndices]);

  const screenHeight = window.innerHeight;
  const shortForecast = selectedForecast?.shortForecast;
  const keyWords = extractKeywords(shortForecast, forecastImages);
  const backgroundImageUrl = keyWords.length > 0 && forecastImages[keyWords[0]];
  console.log(selectedHourlyForecast);
  return (
    <div
      style={{
        height: screenHeight,
        width: "100%",
      }}
    >
      <AddressForm
        address={address}
        onAddressChange={setAddress}
        onGeocodeAddress={geocodeAndFetchForecast}
      />

      {combinedObjects.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <WeatherDetailDisplay
            selectedForecast={
              combinedObjects[selectedButtonIndex][
                dayArrayIndices[selectedButtonIndex]
              ]
            }
            selectedHourlyForecast={selectedHourlyForecast}
          />
          <div style={{ marginBottom: 40 }}>
            <WeatherButtons
              combinedObjects={combinedObjects}
              dayArrayIndices={dayArrayIndices}
              selectedButtonIndex={selectedButtonIndex}
              forecastImages={forecastImages}
              toggleIndex={toggleIndex}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
