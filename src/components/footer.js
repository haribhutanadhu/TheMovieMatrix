import { footerData } from "@/config/footerData";
import Link from "next/link";
import { FaInstagram, FaGithub } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

export default function Footer() {

  const curentYear = new Date().getFullYear();

  return (
    <div>
      <div className="mt-10">
        <h1 className="border border-b-1 border-gray-600 border-opacity-40"></h1>
      </div>
      <div className="mb-8 lg:mt-10 mt-auto justify-end lg:px-8">
        <div className="my-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {footerData.map((data, id) => (
            <div key={id} className="flex flex-col gap-[4px] sm:mt-4">
              <h4 className="my-2 mt-8 text-gray-300 font-semibold sm:mt-0">
                {data.header}
              </h4>
              {data.items.map((item, ind) => (
                <Link
                  key={ind}
                  href={item.href}
                  className="cursor-pointer text-gray-500 hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ))}

          <div className="flex flex-col gap-[4px] sm:mt-4">
            <h1 className="my-2 mt-8 text-red-600 text-2xl font-semibold sm:mt-0 ">
              Movie Matrix
            </h1>
            <div className="flex gap-4 mt-1 text-2xl text-gray-500">
              <FaInstagram className=" hover:text-white/80 cursor-pointer"></FaInstagram>
              <MdMailOutline className=" hover:text-white/80 cursor-pointer"></MdMailOutline>
              <FaGithub className=" hover:text-white/80 cursor-pointer"></FaGithub>
            </div>
          </div>

          {/* <div className=" lg:mt-0 mt-4">
            <h1 className="text-xl md:text-2xl sm:text-3xl font-sans font-semibold text-red-600 text-opacity-80 mt-4 ">
              Movie Matrix
            </h1>
            <h2 className="text-white/80 mt-3">
              Developed By{" "}
              <Link
                href="https://github.com/haribhutanadhu"
                className="cursor-pointer font-semibold hover:text-white"
              >
                Hari Bhutanadhu
              </Link>
            </h2>
            <div className="flex gap-4 mt-4 text-2xl text-gray-500">
              <FaInstagram className=" hover:text-white/70 cursor-pointer"></FaInstagram>
              <MdMailOutline className=" hover:text-white/70 cursor-pointer"></MdMailOutline>
              <FaGithub className=" hover:text-white/70 cursor-pointer"></FaGithub>
            </div>
          </div> */}
        </div>
        <div className="text-gray-500 mt-10 ">
          <div className="flex justify-center gap-2">
            <h1>Developed by </h1>
            <Link
              href="https://github.com/haribhutanadhu"
              className="cursor-pointer font-semibold hover:text-white"
            >
              Hari Bhutandhu
            </Link>
          </div>
          <div className="flex justify-center">
            <h1>Movie Matrix copy rights reserved @{curentYear}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
