
import { CiWifiOff } from "react-icons/ci";
import Translate from "../shared/Translate";
import AppLayout from "@/layout/AppLayout";

const NoInternet = () => {
    return (
    <AppLayout>
      <div
        className={
          "w-screen h-[calc(100vh-80px)] flex flex-col gap-0 items-center justify-center"
        }
      >
        <CiWifiOff className="text-primary-red" size={35} />
        <div className="flex flex-col justify-center items-center gap-1 p-10 text-center">
          <p className="text font-bold">
            <Translate text="noInternet.noInternet" />
          </p>
          <p className="text-neutral-500 text-sm">
            <Translate text="noInternet.check" />
          </p>
        </div>
      </div>
    </AppLayout>
  );
};
export default NoInternet;
