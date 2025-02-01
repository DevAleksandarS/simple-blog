import { Button } from "@nextui-org/button";
import { ButtonComponentInterface } from "../interfaces/ButtonComponent.interface";
import LoaderComponent from "./LoaderComponent";
import { LoaderComponentSizesEnum } from "../enums/LoaderComponent.enum";
import { ButtonStyles, ButtonTypes } from "../enums/ButtonComponent.enum";
import "../styles/ButtonComponent.css";

function ButtonComponent({
  children,
  className = "",
  isLoading,
  fullWidth,
  type = ButtonTypes.BUTTON,
  loaderColor = "#000",
  style = ButtonStyles.DEFAULT,
  callback,
}: ButtonComponentInterface) {
  const getStyle = (): string => {
    let classes = "";

    switch (style) {
      case ButtonStyles.ICON:
        classes += "custom-button-icon";
        break;
      default:
        classes += "custom-button-default";
        break;
    }

    if (fullWidth) classes += " w-full";
    if (className) classes += " " + className;

    return classes;
  };

  return (
    <Button
      onClick={callback ? callback : undefined}
      isLoading={isLoading}
      type={type}
      spinner={
        isLoading ? (
          <LoaderComponent
            color={loaderColor}
            size={LoaderComponentSizesEnum.SMALL}
          />
        ) : undefined
      }
      className={getStyle()}
    >
      {isLoading ? "" : children}
    </Button>
  );
}

export default ButtonComponent;
