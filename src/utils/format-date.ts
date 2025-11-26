export const formatDate = (input: number | string): string => {
  const timestamp = typeof input === "string" ? Number(input) : input;
  const date = new Date(timestamp);

  console.log("Input:", input);
  console.log("Timestamp:", timestamp);
  console.log("Date:", date);
  console.log("Is valid?", !isNaN(date.getTime()));

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date. Input: ${input}, Parsed: ${timestamp}`);
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
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

  const formattedDate = date
    .toLocaleDateString("en-US", dateOptions)
    .replace(/(\w+),\s\w+\s(\d+),\s(\d+)/, "$1 $2, $3");
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  return `${formattedDate} at ${formattedTime}`;
};
