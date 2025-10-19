import { routeDetailsType } from "@/types/appDatatypes";
import AppDialog from "@/utils/apputils/AppDialog";
import { MdDoNotDisturbOnTotalSilence } from "react-icons/md";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { PiCurrencyInrLight } from "react-icons/pi";
import { MdDirectionsRailway } from "react-icons/md";

import { TfiHandPointRight } from "react-icons/tfi";

interface StationRouteDialogInterface {
  data: routeDetailsType;
  onClose: () => void;
}

function StationRouteDialog({ data, onClose }: StationRouteDialogInterface) {
  return (
    <AppDialog
      onClose={onClose}
      title={`${data?.fromStation?.stationName[0]} To ${data?.toStation?.stationName[0]} Metro Route`}
    >
      <div className="text-foreground pb-5 max-h-[90vh] lg:max-h-[80vh] overflow-auto">
        <div className="px-3 pl-4 flex flex-col gap-4 ">
          <div className="flex items-center">
            <div className="w-[30vw] lg:w-[6vw]">
              <label className="font-semibold border-b border-dotted w-fit border-foreground flex gap-3">
                From station
              </label>
            </div>
            <label className=" font-bold flex  items-center gap-1">
              <MdDirectionsRailway className="w-4 h-4" />
              {data?.fromStation?.stationName[0]}
            </label>
          </div>
          <div className="flex items-center">
            <div className="w-[30vw] lg:w-[6vw]">
              <label className="font-semibold border-b border-dotted w-fit border-foreground flex gap-3">
                To station
              </label>
            </div>
            <label className=" font-bold flex  items-center gap-1">
              <MdDirectionsRailway className="w-4 h-4" />
              {data?.toStation?.stationName[0]}
            </label>
          </div>
          <div className="flex items-center">
            <div className="w-[30vw] lg:w-[6vw]">
              <label className="font-semibold border-b border-dotted w-fit border-foreground flex gap-3">
                Total stops
              </label>
            </div>
            <label className=" font-bold flex  items-center gap-1">
              <MdDoNotDisturbOnTotalSilence className="w-4 h-4" />
              {data?.route?.length}
            </label>
          </div>

          <div className="flex items-center">
            <div className="w-[30vw] lg:w-[6vw]">
              <label className="font-semibold border-b border-dotted w-fit border-foreground flex gap-3">
                Interchange
              </label>
            </div>
            <label className=" font-bold flex  items-center gap-1">
              <LiaExchangeAltSolid className="w-4 h-4" />
              {data?.fromStation?.lineNo === data?.toStation?.lineNo
                ? "0 Stations"
                : "1 Station"}
            </label>
          </div>

          <div className="flex items-center">
            <div className="w-[30vw] lg:w-[6vw]">
              <label className="font-semibold border-b border-dotted w-fit border-foreground flex gap-3">
                Token Fare
              </label>
            </div>
            <label className=" font-bold flex  items-center gap-1">
              <PiCurrencyInrLight className="w-4 h-4" />
              {data?.fare ?? "-"}
            </label>
          </div>
          <div>💁 Note: This information is only for reference </div>
        </div>

        <div className="mt-5 px-4 flex flex-col gap-3">
          {data?.route?.map((item, index) => {
            return (
              <div key={index} className="">
                {index === 0 && (
                  <div className="flex  gap-3 items-center bg-foreground/10 rounded mb-3">
                    <div className="bg-purple-600 rounded-tl-sm  pr-2 rounded-bl-sm text-background px-6 py-2 w-fit  flex items-center gap-2 ">
                      Trip Starts
                      <TfiHandPointRight className="w-4 h-4" />
                    </div>
                    <div className="font-semibold ">
                      {item?.lineNo === 1
                        ? "Red line "
                        : item?.lineNo === 2
                        ? "Blue line "
                        : "green line "}
                      {item?.stationName[0]}
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 pl-3    ">
                  <MdDoNotDisturbOnTotalSilence
                    className={`${
                      item?.lineNo === 1
                        ? "text-red-500"
                        : item?.lineNo === 2
                        ? "text-blue-500"
                        : "text-green-500"
                    }`}
                  />
                  <div>{item?.stationName[0]}</div>
                </div>

                {index !== 0 &&
                  index !== data?.route?.length - 1 &&
                  data?.fromStation?.lineNo !== data?.toStation?.lineNo && item?.interChange && item?.lineNo !== data?.route[index+1]?.lineNo  && (
                    <div className="flex  gap-3 items-center bg-foreground/10 rounded mt-3">
                      <div className="bg-purple-600 rounded-tl-sm pr-2 rounded-bl-sm text-background px-6 py-2 w-fit  flex items-center gap-2 ">
                        Change Here
                        <TfiHandPointRight className="w-4 h-4" />
                      </div>
                      <div className="font-semibold">
                        {item?.lineNo === 1
                          ? "Red line "
                          : item?.lineNo === 2
                          ? "Blue line "
                          : "green line "}
                        {item?.stationName[0]}
                      </div>
                    </div>
                  )}

                

                {index === data?.route?.length - 1 && (
                  <div className="flex  gap-3 items-center bg-foreground/10 rounded mb-3 mt-3">
                    <div className="bg-purple-600  rounded-tl-sm  rounded-bl-sm text-background px-6 py-2 w-fit  flex items-center gap-2 ">
                      Trip Ends 🙏
                    </div>
                    <div className="font-semibold pr-2">
                      {item?.lineNo === 1
                        ? "Red line "
                        : item?.lineNo === 2
                        ? "Blue line "
                        : "green line "}
                      {item?.stationName[0]}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AppDialog>
  );
}
export default StationRouteDialog;
