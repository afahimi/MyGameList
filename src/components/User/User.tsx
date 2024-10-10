import React, { useEffect, useState } from "react";

type UserInfo = {
  username: string;
  email: string;
};

type UserProps = {
  token: string;
};

export const User = ({ token }: UserProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:3000/user-info", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("userInfo: ", data);
          setUserInfo(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      fetchUserInfo();
    }
  }, [token]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 justify-between w-1/3 h-3/4 bg-gray-200 rounded-md shadow-md p-12">
        <h1 className="text-4xl font-bold self-center">User Info</h1>
        <div className="h-3/4 flex flex-col gap-3 justify-start items-start w-max">
          <h3 className="text-2xl font-semibold">Username: </h3>
          <h3 className="text-2xl font-light">{userInfo?.username || "Loading"}</h3>
          <h3 className="text-2xl font-semibold">Email: </h3>
          <h3 className="text-2xl font-light">{userInfo?.email || "Loading"}</h3>
        </div>
      </div>
    </div>
  );
};
