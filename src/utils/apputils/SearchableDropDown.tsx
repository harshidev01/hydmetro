/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { RiTrainLine } from "react-icons/ri";
import { searchableDropDownType } from "../../types/appDatatypes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PiX } from "react-icons/pi";

interface SearchableDropDownInterface {
  placeHolder: string;
  data: searchableDropDownType[];
  ontrigger: (value: searchableDropDownType | undefined) => void;
}

function SearchableDropDown({
  data,
  placeHolder,
  ontrigger,
}: SearchableDropDownInterface) {
  const [dropDownData, setDropDownData] = useState<
    undefined | searchableDropDownType[]
  >(undefined);
  const [inputClicked, setInputClicked] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const inputRef = useRef(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (data?.length > 0 && !dropDownData) {
      setDropDownData(data);
    }
  }, [data]);

  function handleSelectClick(
    value: searchableDropDownType | undefined,
    index?: number
  ) {
    ontrigger(value);
    if (value) {
      setValue(
        `${value?.stationName[0]} - ${value?.stationName[1]} - ${value?.stationName[3]} - ${value?.stationName[2]}`
      );
    }

    setInputClicked(false);
    if (index || index === 0) {
      setSelectedIndex(index);
    }
  }

  function handleInpuChange(e: any) {
    setSelectedIndex(0);
    const value: string = e?.target?.value;

    if (value === "") {
      handleSelectClick(undefined);
    }

    setValue(value);
    setInputClicked(true);
    setTimeout(() => {
      if (inputRef?.current) {
        (inputRef?.current as any)?.focus();
      }
    }, 0);
    const temp = [];
    const trimmedValue = value.trim();

    for (let index = 0; index < data?.length; index++) {
      const isMatch = data[index]?.stationName?.some((entry) => {
        return entry?.toLowerCase().includes(trimmedValue.toLowerCase());
      });
      if (isMatch) {
        temp.push(data[index]);
      }
    }
    setDropDownData(temp);
  }

  function handlePopoverChange(value: boolean) {
    if (!value) {
      setInputClicked(false);
      setSelectedIndex(selectedIndex);
    }
  }

  function handleInputClick() {
    setInputClicked(true);
    setTimeout(() => {
      if (inputRef?.current) {
        (inputRef?.current as any)?.focus();
      }
    }, 0);
  }

  function handleKeyPress(e: any) {
    const keyCode = e?.keyCode;
    if (keyCode === 40) {
      if (dropDownData && dropDownData?.length > 0) {
        if (selectedIndex < dropDownData?.length - 1) {
          const newIndex = selectedIndex + 1;
          setSelectedIndex(newIndex);
          scrollToSelectedItem(newIndex);
        }
      }
    } else if (keyCode === 38) {
      if (selectedIndex >= 1) {
        const newIndex = selectedIndex - 1;
        setSelectedIndex(newIndex);
        scrollToSelectedItem(newIndex);
      }
    } else if (keyCode === 13) {
      if (dropDownData && dropDownData?.length > 0 && inputClicked)
        handleSelectClick(dropDownData[selectedIndex]);
    }
  }

  function scrollToSelectedItem(index: number) {
    if (listRef.current) {
      const selectedItem = listRef.current.children[index];
      if (selectedItem) {
        selectedItem.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }
  function handleClearClick(){
    handleSelectClick(undefined,0)
    setValue("")
    setDropDownData(data)

  }

  return (
    <div >
      <Popover open={inputClicked} onOpenChange={handlePopoverChange}>
        <PopoverTrigger className="lg:w-[26vw]">
          <div
            onClick={handleInputClick}
            className="relative flex items-center w-full "
          >
            <RiTrainLine className="absolute  text-foreground left-2 h-6 w-6" />
            <input
              ref={inputRef}
              onChange={(e) => {
                handleInpuChange(e);
              }}
              onKeyDown={handleKeyPress}
              value={value}
              className={`w-[80vw] lg:w-full  pl-9 h-12 px-3 text-foreground outline-none border border-foreground rounded-md pr-12`}
              placeholder={placeHolder}
            />
            {
              value && <div onClick={handleClearClick} className="absolute right-2 cursor-pointer hover:bg-black/10 h-7 flex items-center justify-center rounded-full w-7  ">
              <PiX className="text-black" />
            </div>
            }
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[80vw] lg:w-[26vw]  rounded-md border border-foreground">
          <div className="overflow-y-auto overflow-auto overflow-x-auto max-h-[40vh]  cursor-pointer border  rounded-md">
            {dropDownData && dropDownData?.length > 0 && (
              <div
                ref={listRef}
                className="  p-[0.1rem]  text-foreground bg-white"
              >
                {dropDownData?.map((item, index) => {
                  return (
                    <div
                      onClick={() => {
                        handleSelectClick(item, index);
                      }}
                      key={index}
                      className={` py-1 flex items-center  bg-gray-100 
                        ${
                          selectedIndex === index
                            ? "bg-gray-200"
                            : "hover:bg-gray-200"
                        }
                         `}
                    >
                      <div
                        className={` w-2 lg:ml-2 relative h-2 flex items-center justify-center  ${
                          item?.lineNo === 1
                            ? "bg-red-500"
                            : item?.lineNo === 2
                            ? "bg-blue-500"
                            : "bg-green-500"
                        }  rounded-full `}
                      > </div>
                      <div className="lg:ml-6 ml-2 text-[12px] lg:text-[17px] w-[70vw]   lg:w-[25vw] cursor-pointer">
                        {` ${item?.stationName[0]}  -  ${item?.stationName[1]}  -  ${item?.stationName[3]}  -  ${item?.stationName[2]}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {(!dropDownData || dropDownData?.length <= 0) && (
              <div className="ease-in duration-1000 text-foreground items-center border-x border-b ground justify-center flex bg-white w-full py-2">
                No Results!
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default SearchableDropDown;
