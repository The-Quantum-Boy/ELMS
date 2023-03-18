import React from "react";
import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
export const EmpData = [
  {
    title: "Leaves",
    path: "/Leaves",
    icon: <FaIcons.FaList style={{ marginLeft: "11px" }} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Leave Apply",
        path: "/Leaves/LeaveApply",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Leave History",
        path: "/Leaves/LeaveHistory",
        icon: <FaIcons.FaListAlt />,
      },
    ],
  },

  {
    title: "Log Out",
    path: "/EmpLogout",
    icon: <BiLogOut size="25px" />,
  },
];
