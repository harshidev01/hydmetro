/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  useGetAllStations,
  useGetStationsRoute,
} from "../../hooks/stationHooks";
import AppSpinner from "../../utils/apputils/AppSpinner";
import SearchableDropDown from "../../utils/apputils/SearchableDropDown";
import {
  routeDetailsType,
  searchableDropDownType,
} from "../../types/appDatatypes";
import StationRouteDialog from "./StationRouteDialog";

function SelectStationsCard() {
  const { isPending, getAllStations } = useGetAllStations();
  const { getRoute, isPending: isLoading } = useGetStationsRoute();

  const [allStations, setAllStations] = useState<any>(undefined);
  const [fromStationDetails, setFromStationDetails] = useState<
    searchableDropDownType | undefined
  >(undefined);
  const [toStationDetails, setToStationDetails] = useState<
    searchableDropDownType | undefined
  >(undefined);

  const [fromStationsDetailsData, setFromStationsDetailsData] = useState();
  const [toStationsDetailsData, setToStationsDetailsData] = useState();

  const [routeDetails, setRouteDetails] = useState<
    undefined | routeDetailsType
  >(undefined);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    getAllStations(undefined, {
      onSuccess(data) {
        if (data?.message === "SUCCESS") {
          if (data?.data?.length > 0) {
            setAllStations(data?.data);
            setFromStationsDetailsData(data?.data);
            setToStationsDetailsData(data?.data);
          }
        }
      },
    });
  }, []);

  function handleFromStationClick(value: searchableDropDownType | undefined) {
    setFromStationDetails(value);
    if (value) {
      setToStationsDetailsData(
        allStations?.filter(
          (station: searchableDropDownType) =>
            station?.stationName[0] !== value?.stationName[0]
        )
      );
    }
  }

  function handleToStationClick(value: searchableDropDownType | undefined) {
    setToStationDetails(value);
  }

  function handleFindRouteClick() {
    if (fromStationDetails && toStationDetails) {
      getRoute(
        {
          fromStation: {
            stationName: fromStationDetails?.stationName[0],
          },
          toStation: {
            stationName: toStationDetails?.stationName[0],
          },
        },
        {
          onSuccess(data) {
            if (data?.message === "SUCCESS") {
              setRouteDetails(data);
              setOpenDialog(true);
            }
          },
        }
      );
    }
  }
  function handleCloseDialog() {
    setOpenDialog(false);
    setRouteDetails(undefined);
  }

  if (isPending) return <AppSpinner />;

  return (
    <div className="w-full h-full relative  rounded-sm bg-[#094eb0] items-center  flex flex-col   ">
      {allStations && (
        <div className="w-full">
          <div className="border-b w-fit ml-10 mt-6  pb-1 text-2xl font-semibold">
          Find trip details
        </div>
        </div>
      )}
      <div className="  lg:px-10 mt-7 ">
        {fromStationsDetailsData && (
          <SearchableDropDown
            data={fromStationsDetailsData}
            placeHolder="Select From Station"
            ontrigger={handleFromStationClick}
          />
        )}
      </div>

      <div className="mt-10  lg:px-10">
        {fromStationDetails && toStationsDetailsData && (
          <SearchableDropDown
            data={toStationsDetailsData}
            placeHolder="Select To Station"
            ontrigger={handleToStationClick}
          />
        )}
      </div>
      {fromStationDetails && toStationDetails && (
        <div className="w-full flex justify-center mt-20  ">
          <button
            onClick={handleFindRouteClick}
            className="bg-green-500 text-background font-semibold hover:scale-105 ease-in-out  px-6 py-2 rounded-md  "
          >
            {" "}
            Find Route{" "}
          </button>
        </div>
      )}
      <div className="absolute bottom-0  w-full flex  justify-center gap-7 items-center pb-8 ">
        <div className="flex items-center gap-3 ">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <label className="text-nowrap text-xs lg:text-lg">Line no : 1</label>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <label className="text-nowrap text-xs lg:text-lg">Line no : 2</label>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <label className="text-nowrap text-xs lg:text-lg">Line no : 3</label>
        </div>
      </div>
      {openDialog && routeDetails && (
        <StationRouteDialog data={routeDetails} onClose={handleCloseDialog} />
      )}
      {isLoading && <AppSpinner />}
    </div>
  );
}
export default SelectStationsCard;
