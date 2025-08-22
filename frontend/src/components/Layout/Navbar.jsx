import { Link, Outlet } from "react-router-dom";

import { Bell, ChevronDown, Flame, AlignJustify, X } from "lucide-react";
// import {
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuItems,
//   Transition,
// } from "@headlessui/react";
import Menu, { MenuButton, MenuItem, MenuItems } from "../UI/Menu";
import { memo, useState } from "react";
import Slider from "../UI/Slider";

function Navbar() {
  const [activeTab, setActiveTab] = useState("");
  const [slider, setSlider] = useState(false);
  const tabs = [
    { name: "Explore", path: "/" },
    { name: "Problems", path: "/problemset" },
    { name: "Contest", path: "/" },
    { name: "Discuss", path: "/" },
    {
      name: "Interview",
      dropdown: true,
      drpdownItems: [
        { label: "Online Interview", path: "onlineInterview" },
        { label: "Assessment", path: "Assessment" },
      ],
    },
    {
      name: "Store",
      dropdown: true,
      drpdownItems: [
        { label: "Redeem", path: "Redeem" },
        { label: "Premium", path: "Premium" },
      ],
    },
  ];
  return (
    <>
      <div className="bg-[#282828] shadow-sm relative  flex items-center justify-between px-4 py-2">
        <Link to="/">
          <div className="px-2">
            <svg
              width="25"
              height="30"
              viewBox="0 0 95 111"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-auto max-w-none"
            >
              <path
                d="M68.0063 83.0664C70.5 80.5764 74.5366 80.5829 77.0223 83.0809C79.508 85.579 79.5015 89.6226 77.0078 92.1127L65.9346 103.17C55.7187 113.371 39.06 113.519 28.6718 103.513C28.6117 103.456 23.9861 98.9201 8.72653 83.957C-1.42528 74.0029 -2.43665 58.0749 7.11648 47.8464L24.9282 28.7745C34.4095 18.6219 51.887 17.5122 62.7275 26.2789L78.9048 39.362C81.6444 41.5776 82.0723 45.5985 79.8606 48.3429C77.6488 51.0873 73.635 51.5159 70.8954 49.3003L54.7182 36.2173C49.0488 31.6325 39.1314 32.2622 34.2394 37.5006L16.4274 56.5727C11.7767 61.5522 12.2861 69.574 17.6456 74.8292C28.851 85.8169 37.4869 94.2846 37.4969 94.2942C42.8977 99.496 51.6304 99.4184 56.9331 94.1234L68.0063 83.0664Z"
                fill="#FFA116"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M41.1067 72.0014C37.5858 72.0014 34.7314 69.1421 34.7314 65.615C34.7314 62.0879 37.5858 59.2286 41.1067 59.2286H88.1245C91.6454 59.2286 94.4997 62.0879 94.4997 65.615C94.4997 69.1421 91.6454 72.0014 88.1245 72.0014H41.1067Z"
                fill="#B3B3B3"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M49.9118 2.02335C52.3173 -0.55232 56.3517 -0.686894 58.9228 1.72277C61.494 4.13244 61.6284 8.17385 59.2229 10.7495L16.4276 56.5729C11.7768 61.552 12.2861 69.5738 17.6453 74.8292L37.4088 94.2091C39.9249 96.6764 39.968 100.72 37.505 103.24C35.042 105.761 31.0056 105.804 28.4895 103.337L8.72593 83.9567C-1.42529 74.0021 -2.43665 58.0741 7.1169 47.8463L49.9118 2.02335Z"
                fill="white"
              ></path>
            </svg>
          </div>
        </Link>
        <div className=" hidden md:flex justify-between w-full ">
          <div className="flex items-center ">
            <div className="flex ml-5 justify-evenly  text-[#787878] text-md font-semibold">
              {tabs.map((tab, index) => {
                if (tab.dropdown) {
                  return (
                    <Menu
                      as="div"
                      key={index}
                      className="relative inline-block text-left mx-2 "
                    >
                      <div>
                        <MenuButton className="text-[#787878] inline-flex font-semibold items-center gap-1 rounded-md hover:text-white cursor-pointer   focus:outline-none">
                          {tab.name}
                          <ChevronDown className="h-4 w-4" />
                        </MenuButton>
                      </div>

                      <MenuItems
                        className="absolute p-1 


                        mt-2 w-42 origin-top-right rounded-md bg-[#303030] shadow-xl  focus:outline-none z-50"
                      >
                        <div className="py-1">
                          {tab.drpdownItems.map((menuItem, idx) => {
                            return (
                              <MenuItem key={idx}>
                                {({ active }) => (
                                  <a
                                    href={menuItem.path}
                                    className={`${
                                      active ? "bg-[#3c3c3c]" : ""
                                    } block px-4 py-2 text-sm rounded-md mx-1 text-white`}
                                  >
                                    {menuItem.label}
                                  </a>
                                )}
                              </MenuItem>
                            );
                          })}
                        </div>
                      </MenuItems>
                    </Menu>
                  );
                }
                return (
                  <Link
                    to={tab.path}
                    key={index}
                    onClick={() => setActiveTab(tab.name)}
                  >
                    <span
                      className={`p-3 hover:text-white`}
                    >
                      <span  className={`py-3 ${
                        activeTab === tab.name ? "border-b-2 text-white" : ""
                      }`}>{tab.name}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center md:gap-4 gap-3 text-[#787878] pr-3">
            <Bell className="flex size-5 md:size-6 " />
            <span className="flex size-7 md:size-9 justify-center items-center">
              {" "}
              <Flame /> 0
            </span>
            <span className="h-6 w-6">
              <img
                alt="avatar"
                className="h-full w-full rounded-full object-cover"
                src="https://assets.leetcode.com/users/default_avatar.jpg"
              />
            </span>
            <span className="text-orange-400 px-2 py-1 my-2 bg-[#433729] rounded-xl">
              Premium
            </span>
          </div>
        </div>

        <div className="md:hidden z-50 absolute top-1/4 right-5 cursor-pointer ">
          <button
            className="text-white "
            onClick={(e) => setSlider((prev) => !prev)}
          >
            {" "}
            {slider ? <X /> : <AlignJustify />}
          </button>
        </div>

        <Slider open={slider} />
      </div>
    </>
  );
}
export default memo(Navbar);
