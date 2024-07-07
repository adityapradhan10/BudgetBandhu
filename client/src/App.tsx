import Loader from "@/common/components/Loader";
import Router from "@/common/components/Router";
import { RootState } from "@/context";
import { fetchCurrentUser } from "@/context/slices/account";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./common/hooks/useRedux";

const App = () => {
  const isLoading = useAppSelector((state: RootState) => state.account.loading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  if (isLoading) return <Loader />;

  return <Router />;
};

export default App;
