import axios from "axios";

// const BASE_URL = "https://riddimfutar.ey.r.appspot.com/api/v1";
const BASE_URL = "http://localhost:8080/api/v1";

export const API = {
  getMetadata: async () => axios.get(`${BASE_URL}/metadata`),
  getNearbyVehicles: async (lat: number, lon: number) =>
    axios.get(`${BASE_URL}/vehicles?lat=${lat}&lon=${lon}`),
};
