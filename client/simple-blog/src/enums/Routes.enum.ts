import { createRoute } from "../utils/Routes.util";

export enum RoutesEnum {
  ADMIN = "admin",
  INIT = "init",
  DASHBOARD = "dashboard",
  BLOGS = "blogs",
}

export const RoutesNavigatorEnum = {
  ADMIN_LOGIN: createRoute(RoutesEnum.ADMIN),
  USER_DASHBOARD: createRoute(RoutesEnum.ADMIN, RoutesEnum.DASHBOARD),
  USER_BLOGS: createRoute(RoutesEnum.ADMIN, RoutesEnum.BLOGS),
};
