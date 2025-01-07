import { useState } from "react";
import FormComponent from "../../components/FormComponent";
import { UserLoginFormStructure } from "../../definitions/Form.definition";
import { sendReq } from "../../utils/CustomAxios.utils";
import { UserLoginInterface } from "../../interfaces/ServerResponse.interface";
import { ServerRoutesEnum } from "../../enums/ServerRoutes.enum";
import { useNavigate } from "react-router";
import { RoutesNavigatorEnum } from "../../enums/Routes.enum";
import { useSnackbar } from "notistack";
import { ToastVarientEnum } from "../../enums/ToastComponent.enum";

function AuthPage() {
  const navigate = useNavigate();
  const [loginLoading, setLoginLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoginLoading(true);

    const data = Object.fromEntries(new FormData(e.currentTarget));

    sendReq<UserLoginInterface>(
      {
        method: "POST",
        url: ServerRoutesEnum.LOGIN,
        data: data,
      },
      false
    )
      .then((res) => {
        if (!res.data.error) {
          navigate(RoutesNavigatorEnum.USER_DASHBOARD, { replace: true });
          enqueueSnackbar("User successfuly logged in.", {
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
        setLoginLoading(false);
      });
  };

  return (
    <div className="prose prose-lg prose-invert prose-h2:mb-4">
      <h2>Login</h2>

      <p>
        Login to your account to access personalized features and manage your
        preferences.
      </p>

      <FormComponent
        structure={UserLoginFormStructure}
        callback={onSubmit}
        buttonText="Login"
        isLoading={loginLoading}
      ></FormComponent>
    </div>
  );
}

export default AuthPage;
