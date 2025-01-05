import { useState } from "react";
import ButtonComponent from "../../components/ButtonComponent";
import { ButtonTypes } from "../../enums/ButtonComponent.enum";
import { sendReq } from "../../utils/CustomAxios.utils";
import { ServerRoutesEnum } from "../../enums/ServerRoutes.enum";
import { UserLogoutInterface } from "../../interfaces/ServerResponse.interface";
import { useNavigate } from "react-router";
import { RoutesNavigatorEnum } from "../../enums/Routes.enum";
import { ToastVarientEnum } from "../../enums/ToastComponent.enum";
import { useSnackbar } from "notistack";

function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const buttonClick = () => {
    setLoading(true);
    sendReq<UserLogoutInterface>({
      method: "POST",
      url: ServerRoutesEnum.LOGOUT,
    })
      .then((res) => {
        if (res.data.logout) {
          navigate(RoutesNavigatorEnum.ADMIN_LOGIN, { replace: true });
          enqueueSnackbar("User successfully logged out.", {
            variant: ToastVarientEnum.SUCCESS,
          });
        } else {
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
        setLoading(false);
      });
  };

  return (
    <>
      <h1>Dashboard</h1>
      <ButtonComponent
        callback={buttonClick}
        type={ButtonTypes.BUTTON}
        isLoading={loading}
      >
        Logout
      </ButtonComponent>
    </>
  );
}

export default DashboardPage;
