import React from "react";
import { WiStrongWind } from "react-icons/wi";
import { BsCloudRainHeavy } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { RiFahrenheitLine } from "react-icons/ri";
import { getTimeOfDay } from "./utils/helperfunctions";
interface ForecastProbabilityOfPrecipitation {
  value: number;
  units: string;
}

interface ForecastRelativeHumidity {
  value: number;
  units: string;
}

interface dailyForecast {
  detailedForecast: string;
  dewpoint: object;
  endTime: string;
  icon: string;
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

interface hourlyForecast {
  detailedForecast: string;
  dewpoint: object;
  endTime: string;
  icon: string;
  isDayTime: boolean;
  name: string;
  number: number;
  startTime: string;
  probabilityOfPrecipitation: ForecastProbabilityOfPrecipitation;
  relativeHumidity: ForecastRelativeHumidity;
  shortForecast: string;
  temperature: number;
  temperatureTrend: null;
  temperatureUnit: string;
  windDirection: string;
  windSpeed: string;
}

interface WeatherDetailDisplayProps {
  selectedForecast: dailyForecast | null;
  selectedHourlyForecast: hourlyForecast[];
}

const WeatherDetailDisplay: React.FC<WeatherDetailDisplayProps> = ({
  selectedForecast,
  selectedHourlyForecast,
}) => {
  if (!selectedForecast) {
    return null;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(173, 216, 230, 0.6)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
          margin: 20,
          padding: 10,
          borderRadius: 10,
        }}
      >
        <h2>{selectedForecast.name}</h2>
        <p>{selectedForecast.shortForecast}</p>
        <div
          style={{
            width: "30%",
            height: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginBottom: 10,
            borderRadius: 20,
            backgroundColor: `rgba(128, 128, 128, 0.2)`,
          }}
        >
          <p>
            {selectedForecast.temperature} <RiFahrenheitLine />
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p style={{ margin: 5 }}>
            <WiStrongWind />
            {selectedForecast.windSpeed}
          </p>
          <p style={{ margin: 5 }}>
            <BsCloudRainHeavy />
            {selectedForecast.probabilityOfPrecipitation.value + " %"}
          </p>
          <p style={{ margin: 5 }}>
            <WiHumidity />
            {selectedForecast.relativeHumidity.value + " %"}
          </p>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "rgba(173, 216, 230, 0.6)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "90%",
          margin: 20,
          alignItems: "center",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <h2>Hourly Forecast</h2>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {selectedHourlyForecast &&
            selectedHourlyForecast
              .filter((hour, index) => index % 4 === 0)
              .map((hour) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 5,
                      backgroundColor: `rgba(128, 128, 128, 0.2)`,
                      padding: 5,
                      borderRadius: 10,
                    }}
                  >
                    <p>{getTimeOfDay(hour.startTime)}</p>
                    <p>
                      <BsCloudRainHeavy />
                      {hour.probabilityOfPrecipitation.value + "%"}
                    </p>
                    <p>
                      {hour.temperature}
                      <RiFahrenheitLine />
                    </p>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default WeatherDetailDisplay;
