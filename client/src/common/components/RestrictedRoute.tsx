import { RootState } from "@/context";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useRedux";

interface RestrictedRouteProps extends PropsWithChildren {
  private?: boolean;
}

const RestrictedRoute = (props: RestrictedRouteProps) => {
  const currentUser = useAppSelector(
    (state: RootState) => state.account.user?.email
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (props.private && !currentUser) {
      navigate("/login", { replace: true });
    }
    if (!props.private && currentUser) {
      navigate("/", { replace: true });
    }
  }, []);

  return props.children;
};

export default RestrictedRoute;
