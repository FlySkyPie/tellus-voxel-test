import { Outlet } from "react-router-dom";
import { Avatar } from "primereact/avatar";

import { NavigationList } from "../layouts/navigation-list";

export default function Root() {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="hidden lg:block fixed z-20 inset-0 left-[max(0px,calc(50%-45rem))] right-auto w-[19rem] pb-10 pl-8 pr-6 overflow-y-auto">
        <span className="inline-flex align-items-center gap-1 px-2 py-2 my-4">
          <Avatar label="TV" shape="circle" />
          <span className="font-medium text-xl">Tellus Voxel</span>
        </span>
        <div className="card flex justify-content-center">
          <NavigationList />
        </div>
      </div>
      <div className="lg:pl-[19.5rem]">
        <div className="max-w-3xl mx-auto relative z-20 xl:max-w-none">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
