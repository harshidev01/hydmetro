import { useMutation } from "@tanstack/react-query";
import { getAllStationsAPI, getStationsRouteAPI } from "../services/stationApis";
import { stationRoutePayloadType } from "@/types/appDatatypes";

export function useGetAllStations() {
  const { mutate: getAllStations, isPending } = useMutation({
    mutationFn: () => getAllStationsAPI(),
  });

  return {
    isPending,
    getAllStations,
  };
}

export function useGetStationsRoute() {
  const { mutate: getRoute, isPending } = useMutation({
    mutationFn: (data:stationRoutePayloadType) => getStationsRouteAPI(data),
  });

  return {
    isPending,
    getRoute,
  };
}

