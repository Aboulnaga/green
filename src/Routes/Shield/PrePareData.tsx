import useIsUserDataLoaded from "../../Hooks/useIsUserDataLoaded";
import Loader from "../../Components/Loader/Loader";
import { Navigate } from "react-router-dom";
export default function PrepareData({
  children,
}: {
  children: React.ReactNode;
}) {
  const checkData = useIsUserDataLoaded();
  //   console.log(checkData?.status);
  // console.log(checkData?.status);
  if (checkData?.status === "loading") return <Loader />;
  if (checkData?.status === "error") {
    return (
      <Navigate
        to={`/error?status=error&message=${checkData?.message}&path=${window.location.pathname} `}
        replace={true}
        state={checkData?.message}
      />
    );
  }

  return <>{children}</>;
}
