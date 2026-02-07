export const generateRandomId = (length: number = 11): string => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "t";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const cleanFileName = (fileName: string) => {
  const ext = fileName.match(/\.[^/.]+$/)?.[0] || "";
  return (
    fileName
      .replace(/\.[^/.]+$/, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase()
      .trim() + ext
  );
};
