import { Button } from "@nextui-org/button";
import { ButtonComponentInterface } from "../interfaces/ButtonComponent.interface";
import LoaderComponent from "./LoaderComponent";
import { LoaderComponentSizesEnum } from "../enums/LoaderComponent.enum";
import { ButtonTypes } from "../enums/ButtonComponent.enum";

function ButtonComponent({
  children,
  className = "",
  isLoading,
  fullWidth,
  type = ButtonTypes.BUTTON,
  loaderColor = "#000",
  callback,
}: ButtonComponentInterface) {
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
      className={`bg-white rounded-lg text-lg px-6 ${className} ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {isLoading ? "" : children}
    </Button>
  );
}

export default ButtonComponent;
