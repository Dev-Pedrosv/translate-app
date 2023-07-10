export const isValidUrl = (url?: string) => {
  if (!url) return false;
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
};
