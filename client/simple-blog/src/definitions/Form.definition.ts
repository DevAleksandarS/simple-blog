import {
  AdminRegistrationInputId,
  InputType,
} from "../enums/FormComponent.enum";
import { FormStructureInterface } from "../interfaces/FormComponent.interface";

export const AdminRegistrationFormStructure: FormStructureInterface[] = [
  {
    id: AdminRegistrationInputId.FIRST_NAME,
    type: InputType.TEXT,
    isRequired: true,
    label: "First Name",
    placeholder: "First Name",
  },
  {
    id: AdminRegistrationInputId.LAST_NAME,
    type: InputType.TEXT,
    isRequired: true,
    label: "Last Name",
    placeholder: "Last Name",
  },
  {
    id: AdminRegistrationInputId.USERNAME,
    type: InputType.TEXT,
    isRequired: true,
    label: "Username",
    placeholder: "Username",
  },
  {
    id: AdminRegistrationInputId.PASSWORD,
    type: InputType.PASSWORD,
    isRequired: true,
    label: "Password",
    placeholder: "Password",
  },
];
