export const extractKeywords = (
  shortForecast: string,
  images: object
): string[] => {
  if (!shortForecast) {
    return [];
  }
  const keywords = shortForecast.toLowerCase().split(" ");
  return keywords.filter((keyword) => images.hasOwnProperty(keyword));
};

export const getTimeOfDay = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours >= 12 ? "pm" : "am";

  const formattedHours = hours % 12 || 12;
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${amPm}`;
};
