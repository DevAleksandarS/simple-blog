import { LoaderComponentSizesEnum } from "../enums/LoaderComponent.enum";
import { LoaderComponentPropsInterface } from "../interfaces/LoaderComponent.interface";
import "../styles/LoaderComponent.css";

function LoaderComponent({
  color = "#fff",
  size = LoaderComponentSizesEnum.MEDIUM,
}: LoaderComponentPropsInterface) {
  const sizeMap = {
    small: "20px",
    medium: "40px",
    big: "60px",
  };

  const spinnerSize = sizeMap[size];

  const lineSizeMap = {
    small: "3.8px",
    medium: "6.4px",
    big: "9px",
  };

  const LineSize = lineSizeMap[size];

  const spinnerStyle: Record<string, string> = {
    "--spinner-color": color,
    "--spinner-size": spinnerSize,
    "--spinner-line-width": LineSize,
  };

  return <div className="custom-spinner" style={spinnerStyle}></div>;
}

export default LoaderComponent;
