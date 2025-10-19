import { stationRoutePayloadType } from "@/types/appDatatypes";

const baseUrl = "https://hyderabad-metro-api-73qh.onrender.com";

export async function getAllStationsAPI() {
  const server = await fetch(baseUrl + "/api/allstations");
  const response = await server.json();
  return response;
}
export async function getStationsRouteAPI(data: stationRoutePayloadType) {
  const server = await fetch(baseUrl + "/api/route/stations", {
    method: "POST",
    headers: {
        "Content-Type": "application/json", 
      },
    body: JSON.stringify(data),
  });
  const response = await server.json();
  return response;
}
