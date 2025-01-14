import { useLoadingScreen } from "../contexts/LoadingOverlayContext";
import { LoaderComponentSizesEnum } from "../enums/LoaderComponent.enum";
import LoaderComponent from "./LoaderComponent";

function LoaderOverlayComponent() {
  const { isScreenLoading } = useLoadingScreen();

  if (!isScreenLoading) return null;

  return (
    <div className="absolute w-screen h-screen top-0 left-0 flex justify-center items-center bg-black bg-opacity-75 z-10">
      <LoaderComponent size={LoaderComponentSizesEnum.BIG}></LoaderComponent>
    </div>
  );
}

export default LoaderOverlayComponent;
