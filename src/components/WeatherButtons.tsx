import React from "react";
import { extractKeywords } from "./utils/helperfunctions";
interface WeatherButtonsProps {
  combinedObjects: any[];
  dayArrayIndices: number[];
  selectedButtonIndex: number;
  forecastImages: { [key: string]: string };
  toggleIndex: (index: number) => void;
}

const WeatherButtons: React.FC<WeatherButtonsProps> = ({
  combinedObjects,
  dayArrayIndices,
  forecastImages,
  toggleIndex,
}) => {
  return (
    <div
      style={{
        display: "flex",
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      {combinedObjects.map((dayArray: any, index: any) => {
        const selectedForecast = dayArray[dayArrayIndices[index]];
        const shortForecast = selectedForecast?.shortForecast;
        const keyWords = extractKeywords(shortForecast, forecastImages);
        const backgroundImageUrl =
          keyWords.length > 0 && forecastImages[keyWords[0]];
        console.log(backgroundImageUrl);
        return (
          <button
            key={index}
            onClick={() => toggleIndex(index)}
            style={{
              height: 250,
              width: 200,
              margin: 5,
              borderRadius: 10,
              backgroundImage: `url(${backgroundImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <p style={{ color: "black", fontWeight: "bold" }}>
              {dayArray[dayArrayIndices[index]]?.name}
            </p>
            <p style={{ color: "black", fontWeight: "bold" }}>
              {dayArray[dayArrayIndices[index]]?.shortForecast}
            </p>
            <div>
              <p style={{ margin: 0, color: "black", fontWeight: "bold" }}>
                Temperature: {dayArray[dayArrayIndices[index]]?.temperature}{" "}
                {dayArray[dayArrayIndices[index]]?.temperature.units}
              </p>
              <p style={{ margin: 0, color: "black", fontWeight: "bold" }}>
                Humidity:{" "}
                {dayArray[dayArrayIndices[index]]?.relativeHumidity.value + "%"}{" "}
                {dayArray[dayArrayIndices[index]]?.relativeHumidity.units}
              </p>
              <p style={{ margin: 0, color: "black", fontWeight: "bold" }}>
                Wind Speed: {dayArray[dayArrayIndices[index]]?.windSpeed}{" "}
                {dayArray[dayArrayIndices[index]]?.windSpeed.units}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default WeatherButtons;
