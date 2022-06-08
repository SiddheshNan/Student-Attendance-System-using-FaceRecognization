export const API_URL = "/api"

export const getUserTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const createLocalTimeFromEpoch = (time) => {
  if (!time) return "Never";

  return new Date(parseInt(time)*1000)
    .toLocaleString("en-IN", { timeZone: getUserTimeZone() })
    .toUpperCase();
};

export const createLocalTime = (time) => {
  if (!time) return "Never";

  return new Date(time)
    .toLocaleString("en-IN", { timeZone: getUserTimeZone() })
    .toUpperCase();
};

export  const USERNAME = "admin"
export  const PASSWORD = "admin"