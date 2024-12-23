import { Button, ButtonProps } from "@nextui-org/button";
import { ButtonComponentInterface } from "../interfaces/ButtonComponent.interface";
import LoaderComponent from "./LoaderComponent";
import { LoaderComponentSizesEnum } from "../enums/LoaderComponent.enum";

function ButtonComponent({
  children,
  isLoading,
  fullWidth,
  loaderColor = "#000",
}: ButtonComponentInterface) {
  return (
    <Button
      isLoading={isLoading}
      spinner={
        isLoading ? (
          <LoaderComponent
            color={loaderColor}
            size={LoaderComponentSizesEnum.SMALL}
          />
        ) : undefined
      }
      className={`bg-white rounded-lg text-lg px-6 ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {isLoading ? "" : children}
    </Button>
  );
}

export default ButtonComponent;
