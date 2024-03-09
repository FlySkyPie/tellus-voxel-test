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
        label: "Contacts",
        icon: "pi pi-box",
        className: clsx(
          matchPath("/contacts/*", location.pathname) && "active"
        ),
        command: () => navigate("/contacts/123"),
      },
    ],
    [location.pathname, navigate]
  );

  return <PanelMenu model={items} className="w-full md:w-20rem" />;
};
