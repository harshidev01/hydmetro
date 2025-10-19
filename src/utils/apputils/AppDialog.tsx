import { ReactNode, useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

interface AppDialogInterface {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

function AppDialog({ children, title, onClose }: AppDialogInterface) {
  const [isClosing, setIsClosing] = useState(false); 
  const [isVisible, setIsVisible] = useState(false);
  const [isOpening, setIsOpening] = useState(false); 

  function handleCloseClick() {
    setIsClosing(true); 
    setTimeout(() => {
      setIsVisible(false); 
      onClose();
    }, 600); 
  }

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => {
      setIsOpening(true); 
    }, 30); 
  }, []);

  return (
    isVisible && (
      <div
        className={`fixed flex items-center justify-center w-full h-full inset-0 bg-foreground/50 backdrop-blur-3xl transition-opacity ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
      >
        <div
          className={`bg-background w-fit h-fit min-w-[20vw] rounded-md min-h-[20vh] flex flex-col gap-3 transition-transform transform ${
            isClosing
              ? "translate-y-[100vh] opacity-0"
              : isOpening
              ? "translate-y-0 opacity-100"
              : "translate-y-[100vh] opacity-0"
          }`}
          style={{
            transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
          }}
        >
          <div className="w-full flex items-center justify-between px-4 gap-20 py-2 bg-foreground/10">
            <div className="w-full text-sm lg:text-xl font-semibold text-foreground">{title}</div>
            <div
              className="border rounded-full border-foreground cursor-pointer"
              onClick={handleCloseClick}
            >
              <IoMdClose className="text-foreground w-6 h-6 p-1" />
            </div>
          </div>

          <div>{children}</div>
        </div>
      </div>
    )
  );
}

export default AppDialog;
