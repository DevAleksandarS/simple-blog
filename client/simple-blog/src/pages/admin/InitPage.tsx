import { useEffect, useState } from "react";
import {
  CreateAdminInterface,
  UsersExistInterface,
} from "../../interfaces/ServerResponse.interface";
import { useNavigate } from "react-router";
import { RoutesNavigatorEnum } from "../../enums/Routes.enum";
import { ServerRoutesEnum } from "../../enums/ServerRoutes.enum";
import { sendReq } from "../../utils/CustomAxios.utils";
import FormComponent from "../../components/FormComponent";
import { AdminRegistrationFormStructure } from "../../definitions/Form.definition";
import { useSnackbar } from "notistack";
import { ToastVarientEnum } from "../../enums/ToastComponent.enum";
import { useLoadingScreen } from "../../contexts/LoadingOverlayContext";

function InitPage() {
  const [createAdminLoading, setCreateAdminLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { setIsScreenLoading } = useLoadingScreen();

  useEffect(() => {
    setIsScreenLoading(true);

    sendReq<UsersExistInterface>(
      {
        method: "GET",
        url: ServerRoutesEnum.USERS_EXIST,
      },
      false
    )
      .then((res) => {
        if (res.data?.exist) {
          navigate(RoutesNavigatorEnum.ADMIN_LOGIN, { replace: true });
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsScreenLoading(false);
      });
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setCreateAdminLoading(true);

    const data = Object.fromEntries(new FormData(e.currentTarget));

    sendReq<CreateAdminInterface>(
      {
        method: "POST",
        url: ServerRoutesEnum.CREATE_ADMIN,
        data: data,
      },
      false
    )
      .then((res) => {
        if (!res.data.error) {
          navigate(RoutesNavigatorEnum.ADMIN_LOGIN, { replace: true });
          enqueueSnackbar("Admin successfuly created.", {
            variant: ToastVarientEnum.SUCCESS,
          });
        } else {
          console.error(res.data.error);
          enqueueSnackbar("An error occurred. Please try again later.", {
            variant: ToastVarientEnum.ERROR,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar("An error occurred. Please try again later.", {
          variant: ToastVarientEnum.ERROR,
        });
      })
      .finally(() => {
        setCreateAdminLoading(false);
      });
  };

  return (
    <div className="prose prose-lg prose-invert prose-h2:mb-4">
      <h2>Initialize</h2>

      <p>
        The Init page registers the first user as an admin if no users exist.
      </p>

      <FormComponent
        structure={AdminRegistrationFormStructure}
        callback={onSubmit}
        buttonText="Registrate"
        isLoading={createAdminLoading}
      ></FormComponent>
    </div>
  );
}

export default InitPage;
