import React from "react";
import * as FaIcons from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import {MdManageAccounts,MdOutlineGrading,MdPendingActions } from "react-icons/md";
import { HiUserAdd} from "react-icons/hi";
import {  FaListAlt} from "react-icons/fa";
import { CgPlayListRemove } from "react-icons/cg";

export const AdmnData = [
{
	title: "Employees",
	path: "/EmpServices",
	icon: <FaIcons.FaUsers size="22px"/>,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "AddEmployee",
		path: "/EmpServices/AddEmployee",
		icon: <HiUserAdd size="21px"/>,
	},
	{
		title: "Manage Employee",
		path: "/EmpServices/ManageEmp",
		icon: <MdManageAccounts size="21px"/>,
	},
	],
},
{
	title: "Leave Management",
	path: "/LeaveMgnt",
	icon: <FaListAlt size="18px" />,
	iconClosed: <RiIcons.RiArrowDownSFill />,
	iconOpened: <RiIcons.RiArrowUpSFill />,

	subNav: [
	{
		title: "All Leaves",
		path: "/LeaveMgnt/AllLeaves",
		icon: <RiIcons.RiFileList3Fill size="20px"/>,
		cName: "sub-nav",
	},
	{
		title: "Pending Leaves",
		path: "/LeaveMgnt/PendingLeaves",
		icon: <MdPendingActions size="20px"/>,
	},
	{
		title: "Approved Leaves",
		path: "/LeaveMgnt/ApprovedLeaves",
		icon: <MdOutlineGrading size="20px"/>,
		cName: "sub-nav",
	},
	{
		title: "Not Approved Leaves",
		path: "/LeaveMgnt/NotApprovedLeaves",
		icon: <CgPlayListRemove size="22px"/>,
	}
	],
},
{
	title: "Log Out",
	path: "/AdmnLogout",
	icon: <BiLogOut size="24px" />,
}
];
