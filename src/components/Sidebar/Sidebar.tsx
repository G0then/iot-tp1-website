import Image from "next/image";
import Link from "next/link";
import DarkModeSwitch from "../DarkMode/DarkModeSwitch";
import { IoMenu } from "react-icons/io5";

type SidebarProps = {
  showSidebar: boolean;
  onSidebarLinkClick: () => void;
};

const Sidebar = ({ showSidebar, onSidebarLinkClick }: SidebarProps) => {
  return (
    <div
      className={`fixed h-full w-[225px] z-9998 top-[64px] left-0 bg-[color:var(--color-white)] overflow-x-hidden py-2 transition-all ease-in-out duration-300 select-none xl:hidden ${
        showSidebar ? "translate-x-0 " : "translate-x-[-225px]"
      }`}
    >
      <div className="flex flex-col space-y-1 items-center justify-center">
        <Link href="/" className="sidebarLink" onClick={onSidebarLinkClick}>
          Dashboard
        </Link>
        <Link
          href="/devices"
          className="sidebarLink"
          onClick={onSidebarLinkClick}
        >
          Devices
        </Link>
        <Link
          href="/sensors"
          className="sidebarLink"
          onClick={onSidebarLinkClick}
        >
          Sensors
        </Link>
        <Link
          href="/readings"
          className="sidebarLink"
          onClick={onSidebarLinkClick}
        >
          Readings
        </Link>
        <Link
          href="/alerts"
          className="sidebarLink"
          onClick={onSidebarLinkClick}
        >
          Alerts
        </Link>
        <Link href="/logs" className="sidebarLink" onClick={onSidebarLinkClick}>
          Logs
        </Link>
        <Link
          href="/users"
          className="sidebarLink"
          onClick={onSidebarLinkClick}
        >
          Users
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
