"use client"

import Image from "next/image";
import Link from "next/link";
import DarkModeSwitch from "../DarkMode/DarkModeSwitch";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  
  const onSidebarLinkClick = () => {
    setSidebar(false);
  }

  return (
    <>
    <div className="bg-[color:var(--color-white)] h-16 px-6 border-b-[1px] border-[color:var(--c-grey-200)] grid  grid-cols-4 gap-3 mx-auto top-0 left-0 fixed w-full z-9999">
      <div className="xl:hidden flex justify-start items-center">
        <IoMenu className="text-2xl cursor-pointer" onClick={() => setSidebar(!sidebar)} />
      </div>
      <div className="h-full flex items-center justify-center xl:justify-start col-span-2 xl:col-span-1 select-none">
        <div className="relative w-[150px] h-[40px]">
          <Link href="/">
            <Image src="/UAlg.png" fill alt="Ualg Banner" />
          </Link>
        </div>
      </div>
      <div className="xl:flex hidden space-x-4 items-center justify-center col-span-2">
       <Link href="/" className="link">
          Dashboard
        </Link>
        <Link href="/devices" className="link">
          Devices
        </Link>
        <Link href="/sensors" className="link">
          Sensors
        </Link>
        <Link href="/readings" className="link">
          Readings
        </Link>
        <Link href="/alerts" className="link">
          Alerts
        </Link>
        <Link href="/logs" className="link">
          Logs
        </Link>
        <Link href="/users" className="link">
          Users
        </Link>
      </div>
      <div className="flex justify-end items-center">
        <DarkModeSwitch />
      </div>
    </div>
    <Sidebar showSidebar={sidebar} onSidebarLinkClick={onSidebarLinkClick}/>
    </>
  );
};

export default Navbar;
