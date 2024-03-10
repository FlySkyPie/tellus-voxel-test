import type { MenuItem } from "primereact/menuitem";
import clsx from "clsx";
import { useMemo } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { PanelMenu } from "primereact/panelmenu";

export const NavigationList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const items: MenuItem[] = useMemo(
    () => [
      {
        label: "Home",
        icon: "pi pi-box",
        className: clsx(matchPath("/", location.pathname) && "active"),
        command: () => navigate("/"),
      },
      {
        label: "Unit Cells",
        icon: "pi pi-box",
        className: clsx(
          matchPath("/unit-cells", location.pathname) && "active"
        ),
        command: () => navigate("/unit-cells"),
      },
      {
        label: "Voxels",
        icon: "pi pi-box",
        className: clsx(
          matchPath("/voxels", location.pathname) && "active"
        ),
        command: () => navigate("/voxels"),
      },
    ],
    [location.pathname, navigate]
  );

  return <PanelMenu model={items} className="w-full md:w-20rem" />;
};
