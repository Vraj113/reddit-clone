import React from "react";
import ProfileToggle from "../components/ProfileToggle";
import Link from "next/link";
const NavBar = async () => {
  return (
    <div className="flex justify-between px-10 py-2  border-b-2 h-20 items-center fixed w-full top-0 bg-white  z-20 ">
      <Link href="/">
        <div>
          <img src="/logo2.png" className="h-10 w-auto" />
        </div>
      </Link>

      <div className="md:block hidden">
        <input
          type="text"
          name=""
          placeholder="Search Reddit"
          id=""
          className="bg-gray-100 w-[500px] h-[40px] rounded-full px-4"
        />
      </div>
      <div>
        <ProfileToggle />
      </div>
    </div>
  );
};

export default NavBar;
