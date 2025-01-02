import { FormEvent } from "react";
import { InputType } from "../enums/FormComponent.enum";

export interface FormComponentProps {
  structure: FormStructureInterface[];
  callback: (event: FormEvent<HTMLFormElement>) => void;
  buttonText: string;
  isLoading: boolean;
}

export interface FormStructureInterface {
  id: string;
  type: InputType;
  isRequired: boolean;
  label: string;
  placeholder: string;
}
