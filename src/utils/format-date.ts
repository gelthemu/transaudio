export const formatDate = (input: number | string): string => {
  const timestamp = typeof input === "string" ? Number(input) : input;
  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date.`);
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Africa/Nairobi",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Africa/Nairobi",
  };

  const formattedDate = date.toLocaleDateString("en-US", dateOptions);
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  return `${formattedDate} at ${formattedTime}`;
};
