export type searchableDropDownType = {
  stationName: string[];
  lineNo: number;
  stationNo: number;
};

export type stationRoutePayloadType = {
  fromStation: {
    stationName: string;
  };
  toStation: {
    stationName: string;
  };
};

export type stationDetails = {
  lineNo: number;
  terminus: boolean;
  stationNo: number;
  busStation: boolean;
  interChange: boolean;
  stationName: string[];
  railwaysAndMMTS: boolean;
  airportShuttleService: boolean;
  interChangeAndTerminus: boolean;
};

export type routeDetailsType = {
  message: "SUCCESS" | "ERROR";
  fare: number;
  fromStation: stationDetails;
  toStation: stationDetails;
  route: stationDetails[];
  route2?: stationDetails[];
};
