import ButtonComponent from "../components/ButtonComponent";
import { Form } from "@nextui-org/form";
import { Input } from "@nextui-org/react";
import { ButtonTypes } from "../enums/ButtonComponent.enum";
import { FormComponentProps } from "../interfaces/FormComponent.interface";

function FormComponent({
  structure,
  callback,
  buttonText,
  isLoading,
}: FormComponentProps) {
  return (
    <Form
      className="prose w-full justify-center items-center gap-3"
      onSubmit={callback}
    >
      {structure.map((el) => {
        return (
          <Input
            key={el.id}
            classNames={{
              label: "!text-white",
            }}
            isRequired={el.isRequired}
            label={el.label}
            labelPlacement="outside"
            placeholder={el.placeholder}
            name={el.id}
            type={el.type}
          />
        );
      })}

      <ButtonComponent
        className="mt-3"
        type={ButtonTypes.SUBMIT}
        fullWidth={true}
        isLoading={isLoading}
      >
        {buttonText}
      </ButtonComponent>
    </Form>
  );
}

export default FormComponent;
