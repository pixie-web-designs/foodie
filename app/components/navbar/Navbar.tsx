/* Navbar Component */
import React from "react";
import { cookies } from "next/headers";
import UserInterface from "./UserInterface";

const Navbar = async () => {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");
  // console.log(userCookie);
  return (
    <div className="navbar fixed z-1 text-neutral-content bg-base-300 shadow-base-300 shadow-sm">
      <div className="flex-1">
        <h2 className="text-base-content text-3xl pl-2">Foodie 🥐</h2>
      </div>
      <div className="flex gap-4 pr-2">
        <UserInterface userData={userCookie?.value} />
      </div>
    </div>
  );
};

export default Navbar;
