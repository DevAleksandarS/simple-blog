import { ButtonTypes } from "../enums/ButtonComponent.enum";

export interface ButtonComponentInterface {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  fullWidth?: boolean;
  type?: ButtonTypes;
  loaderColor?: string;
}
