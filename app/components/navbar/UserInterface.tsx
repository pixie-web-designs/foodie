/* User component of the navbar */
"use client";

import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import Link from "next/link";

interface User {
  userData: string | undefined;
}

interface UserData {
  id: string;
  name: string;
  src: string;
}

const UserInterface = ({ userData }: User) => {
  const [user, setUser] = useState<UserData>({ id: "0", name: "Guest", src: "" });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userCookie = JSON.parse(userData || "");
        if (userCookie) setUser(JSON.parse(userCookie.value));
      } catch (err) {
        console.log("No user logged in. Setting Guest");
        setUser({ id: "none", name: "Guest", src: "" });
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <>
      {user.name !== "Guest" && (
        <div role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="" />
          </div>
        </div>
      )}
      <a className="btn">Login</a>
      <a className="btn btn-primary">Sign Up</a>
    </>
  );
};

export default UserInterface;
