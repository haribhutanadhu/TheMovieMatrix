"use client";

import { useEffect, useState } from "react";
import { getUserData } from "../../utils/request";
import { useSession } from "next-auth/react";

const UserData = () => {
  const { status, data: session } = useSession();
  const [fetchData, setfetchData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getUserData();
      setfetchData(data);
    };
    getData();
  }, []);

  if (status === "unauthenticated" || session?.user?.email === "haribhutanadh@gmail.com") {
    return (
      <div>
        <div className="flex justify-center">
          <h1 className="text-gray-400 text-3xl mb-10 mt-20">
            {" "}
            <span className="text-red-500 text-opacity-70">Oops</span> !!{" "}
          </h1>
        </div>
        <div className="flex justify-center my-10">
          <p className="text-gray-500 text-2xl">
            Not authenticated!! Please{" "}
            <span className="text-red-500 text-opacity-70">SignIn</span> as Admin to
            access this page ..
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Hello, Admin !!</h1>
      <div className="flex justify-center my-10">
        <h1 className="text-gray-500 text-2xl"> Total Loged In Users data</h1>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fetchData.map((i, idx) => (
            <div
              key={idx}
              className="p-6 bg-black rounded-lg border border-gray-500 border-opacity-35 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h1 className="text-xl font-semibold text-gray-400">{i.name}</h1>
              <h1 className="text-md text-gray-400 mt-2">{i.email}</h1>
              <h1 className="text-sm text-gray-400 mt-1">
                First Login : {new Date(i.createdAt).toLocaleDateString()}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserData;
