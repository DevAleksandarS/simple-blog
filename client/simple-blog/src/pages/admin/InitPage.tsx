import AdminAuthLayout from "../../layouts/AdminAuthLayout";
import LoaderOverlayComponent from "../../components/LoaderOverlayComponent";
import { useEffect, useState } from "react";
import {
  CreateAdminInterface,
  UsersExistInterface,
} from "../../interfaces/ServerResponse.interface";
import { useNavigate } from "react-router";
import { RoutesNavigatorEnum } from "../../enums/Routes.enum";
import { ServerRoutesEnum } from "../../enums/ServerRoutes.enum";
import ButtonComponent from "../../components/ButtonComponent";
import { Form } from "@nextui-org/form";
import { Input } from "@nextui-org/react";
import { ButtonTypes } from "../../enums/ButtonComponent.enum";
import { sendReq } from "../../utils/CustomAxios.utils";

function InitPage() {
  const [pageLoading, setPageLoading] = useState(true);
  const [createAdminLoading, setCreateAdminLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    sendReq<UsersExistInterface>({
      method: "GET",
      url: ServerRoutesEnum.USERS_EXIST,
    })
      .then((res) => {
        if (res.data?.exist) {
          navigate(RoutesNavigatorEnum.ADMIN_LOGIN, { replace: true });
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setPageLoading(false);
      });
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setCreateAdminLoading(true);

    const data = Object.fromEntries(new FormData(e.currentTarget));

    sendReq<CreateAdminInterface>({
      method: "POST",
      url: ServerRoutesEnum.CREATE_ADMIN,
      data: data,
    })
      .then((res) => {
        if (!res.data.error) {
          console.log(res.data.userId);
        } else {
          console.error(res.data.error);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setCreateAdminLoading(false);
      });
  };

  return pageLoading ? (
    <LoaderOverlayComponent></LoaderOverlayComponent>
  ) : (
    <AdminAuthLayout>
      <div className="prose prose-lg prose-invert prose-h2:mb-4">
        <h2>Registration</h2>
        <p>
          The Init page registers the first user as an admin if no users exist.
        </p>
        {/* TODO: Create Form Component */}
        <Form
          className="prose w-full justify-center items-center gap-3"
          onSubmit={onSubmit}
        >
          <Input
            classNames={{
              label: "!text-white",
            }}
            isRequired
            label="First Name"
            labelPlacement="outside"
            placeholder="First Name"
            name="first_name"
          />

          <Input
            classNames={{
              label: "!text-white",
            }}
            isRequired
            label="Last Name"
            labelPlacement="outside"
            placeholder="Last Name"
            name="last_name"
          />

          <Input
            classNames={{
              label: "!text-white",
            }}
            isRequired
            label="Username"
            labelPlacement="outside"
            placeholder="Username"
            name="username"
          />

          <Input
            classNames={{
              label: "!text-white",
            }}
            isRequired
            label="Password"
            labelPlacement="outside"
            placeholder="Password"
            name="password"
            type="password"
          />

          <ButtonComponent
            className="mt-3"
            type={ButtonTypes.SUBMIT}
            fullWidth={true}
            isLoading={createAdminLoading}
          >
            Register
          </ButtonComponent>
        </Form>
      </div>
    </AdminAuthLayout>
  );
}

export default InitPage;
