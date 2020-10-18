/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import AssignmentTurnedIn from "@material-ui/icons/AssignmentTurnedIn";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Category from "@material-ui/icons/Category";
import Receipt from "@material-ui/icons/Receipt";
import Person from "@material-ui/icons/Person";
import BubbleChart from "@material-ui/icons/BubbleChart";
// import Unarchive from "@material-ui/icons/Unarchive";
// import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Icons from "views/Icons/Icons.js";
import { Gavel, Unarchive } from "@material-ui/icons";
import { ListAltOutlined } from "@material-ui/icons";
import Login from "views/login.js";
import OrdersList from "views/Orders/OrdersList";
import AddItem from 'views/AddItem'
import SettingPolicies from 'views/SettingPolicies';

import RequisitionList from "views/Requisition/RequisitionList";
import Summary from "views/Summary/Summary";
import ItemsIndex from "views/Items/ItemsIndex";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  // {
  //   path: "/approvals",
  //   name: "Approval",
  //   rtlName: "لوحة القيادة",
  //   icon: AssignmentTurnedIn,
  //   component: TableList,
  //   layout: "/admin",
  // },
  {
    path: "/requision",
    name: "View Requisions",
    icon: ListAltOutlined,
    component: RequisitionList,
    layout: "/admin",
  },
  {
    path: "/orders",
    name: "Orders",
    icon: ShoppingCart,
    component: OrdersList,
    layout: "/admin",
  },
  {
    path: "/items",
    name: "Items",
    icon: Category,
    component: ItemsIndex,
    layout: "/admin",
  },
  // {
  //   path: "/goods-reciepts",
  //   name: "Goods Receipt",
  //   rtlName: "لوحة القيادة",
  //   icon: Receipt,
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  // {
  //   path: "/invoices-and-payments",
  //   name: "Invoices",
  //   rtlName: "لوحة القيادة",
  //   icon: Receipt,
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: Unarchive,
    component: Login,
    layout: "/auth",
  },
  {
    path: "/settingPolicies",
    name: "Setting Policies",
    icon: Gavel,
    component: SettingPolicies,
    layout: "/admin",
  },

  {
    path: "/summary",
    name: "Summary",
    icon: ListAltOutlined,
    component: Summary,
    layout: "/admin",
  },
];

export default dashboardRoutes;
