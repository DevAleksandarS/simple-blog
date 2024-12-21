import AdminAuthLayout from "../../layouts/AdminAuthLayout";
import LoaderOverlayComponent from "../../components/LoaderOverlayComponent";
import useAxios from "../../hooks/useAxios";
import { useEffect } from "react";
import { UsersExistInterface } from "../../interfaces/ServerResponse.interface";
import { useNavigate } from "react-router";
import { RoutesNavigatorEnum } from "../../enums/Routes.enum";
import { ServerRoutesEnum } from "../../enums/ServerRoutes.enum";

function InitPage() {
  const navigate = useNavigate();

  const { response, error, loading } = useAxios<UsersExistInterface>({
    method: "GET",
    url: ServerRoutesEnum.USERS_EXIST,
  });

  useEffect(() => {
    if (!loading) {
      console.log(response);
      if (response?.exist) {
        navigate(RoutesNavigatorEnum.ADMIN_LOGIN, { replace: true });
      }
    }
  }, [loading]);

  return loading ? (
    <LoaderOverlayComponent></LoaderOverlayComponent>
  ) : (
    <AdminAuthLayout>
      <div className="prose prose-lg prose-invert prose-h2:mb-4">
        <h2>Registration</h2>
        <p>
          The Init page registers the first user as an admin if no users exist.
        </p>
      </div>
    </AdminAuthLayout>
  );
}

export default InitPage;
