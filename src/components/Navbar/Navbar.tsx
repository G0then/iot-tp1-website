import Image from "next/image";
import Link from "next/link";
import DarkModeSwitch from "../DarkMode/DarkModeSwitch";

const Navbar = () => {
  return (
    <div className="bg-[color:var(--color-white)] h-16 px-6 border-b-[1px] border-[color:var(--c-grey-200)] flex items-center justify-between top-0 left-0 fixed w-full">
      <div className="w-[150px] h-[40px] relative">
        <Link href="/">
          <Image src="/UAlg.png" fill alt="Ualg Banner" />
        </Link>
      </div>
      <div className="flex space-x-4">
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
      <div className="w-64 flex justify-end">
        <DarkModeSwitch />
      </div>
    </div>
  );
};

export default Navbar;
