// import
import Dashboard from "views/Dashboard/Dashboard";
import Tables from "views/Dashboard/Tables";
import Billing from "views/Dashboard/Billing";
import RTLPage from "views/Dashboard/RTL";
// import Profile from "views/Dashboard/Profile";

//import SignIn from "views/Dashboard/SignIn"
import SignIn from "views/Auth/SignIn";
import Home from "views/Dashboard/Home";
import DeleteOrders from "views/Dashboard/DeleteOrders";
import CreateCategories from "views/Dashboard/CreateCategories"
//import Bars from "views/Dashboard/Bars";
import StocksItem from "views/Dashboard/StocksItem";
import SignUp from "views/Auth/SignUp.js";
import SubCategories from "views/Dashboard/SubCategories";
import AddCategories from "views/Dashboard/AddCategories";
import UpdateBranch from "views/Dashboard/UpdateBranch";
import AddSubCategories from "views/Dashboard/AddSubCategories";
import UpdateCategories from "views/Dashboard/UpdateCategories";
import UpdateSubCategories from "views/Dashboard/UpdateSubCategories"
import AddBar from "views/Dashboard/Billing/AddBar";
import UpdateBar from "views/Dashboard/Billing/UpdateBar";
import Branches from "views/Dashboard/Branches";
import AddBranch from "views/Dashboard/AddBranch";


import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  GlobeIcon,
  CartIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";

var dashRoutes = [


  {
    path: "/home",
    name: "Home",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/orders",
    name: "Orders",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color="inherit" />,
    component: Home,
    layout: "/admin",
  },
  {
    path: "/categories",
    name: "Categories",
    rtlName: "لوحة القيادة",
    icon: <CartIcon color="inherit" />,
    secondaryNavbar: true,
    component: CreateCategories,
    layout: "/admin",
  },
  {
    path: "/addcategories",
    name: "Add Categories",
    rtlName: "لوحة القيادة",
    icon: <CartIcon color="inherit" />,
    hidden: true,
    component: AddCategories,
    layout: "/admin",
  },
  {
    path: "/addsubcategories",
    name: "Add SubCategories",
    rtlName: "لوحة القيادة",
    icon: <CartIcon color="inherit" />,
    hidden: true,
    component: AddSubCategories,
    layout: "/admin",
  },
  {
    path: "/addbranch",
    name: "Add Branch",
    rtlName: "لوحة القيادة",
    icon: <CartIcon color="inherit" />,
    hidden: true,
    component: AddBranch,
    layout: "/admin",
  },
  {
    path: "/updatecategories",
    name: "Update Categories",
    rtlName: "لوحة القيادة",
    icon: <CartIcon color="inherit" />,
    hidden: true,
    component: UpdateCategories,
    layout: "/admin",
  },
  {
    path: "/updatebranch",
    name: "Update Branch",
    rtlName: "لوحة القيادة",
    icon: <CartIcon color="inherit" />,
    hidden: true,
    component: UpdateBranch,
    layout: "/admin",
  },
  {
    path: "/updatebar",
    name: "Update Bar",
    rtlName: "لوحة القيادة",
    icon: <CartIcon color="inherit" />,
    hidden: true,
    component: UpdateBar,
    layout: "/admin",
  },
  {
    path: "/updatesubcategories",
    name: "Update Sub Categories",
    rtlName: "لوحة القيادة",
    icon: <CartIcon color="inherit" />,
    hidden: true,
    component: UpdateSubCategories,
    layout: "/admin",
  },
  {
    path: "/subCategories",
    name: "Sub Categories",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: SubCategories,
    layout: "/admin",
  },
  // {
  //   path: "/deleteOrders",
  //   name: "Delete Orders",
  //   rtlName: "لوحة القيادة",
  //   icon: <CreditIcon color="inherit" />,
  //   component: DeleteOrders,
  //   layout: "/admin",
  // },

  // {
  //   path: "/subCategories",
  //   name: "SubCategories",
  //   rtlName: "لوحة القيادة",
  //   icon: <StatsIcon color="inherit" />,
  //   component: Tables,
  //   layout: "/admin",
  // },
  {
    path: "/bar",
    name: "Bars",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color="inherit" />,
    component: Billing,
    layout: "/admin",
  },
  {
    path: "/addbar",
    name: "AddBars",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color="inherit" />,
    hidden: true,
    component: AddBar,
    layout: "/admin",
  },


  // {
  //   path: "/branches",
  //   name: "Branches",
  //   rtlName: "لوحة القيادة",
  //   icon: <CreditIcon color="inherit" />,
  //   component: Branches,
  //   layout: "/admin",
  // },
  {
    path: "/branches",
    name: "Branches",
    rtlName: "لوحة القيادة",
    icon: <GlobeIcon color="inherit" />,
    component: Branches,
    layout: "/admin",
  },
  // {
  //   path: "/rtl-support-page",
  //   name: "RTL",
  //   rtlName: "آرتيإل",
  //   icon: <SupportIcon color="inherit" />,
  //   component: RTLPage,
  //   layout: "/rtl",
  // },

  // name: "ACCOUNT PAGES",
  // category: "account",
  // rtlName: "صفحات",
  // state: "pageCollapse",
  // views: [
  // {
  //   path: "/categories",
  //   name: "Categories",
  //   rtlName: "لوحة القيادة",
  //   icon: <PersonIcon color="inherit" />,
  //   secondaryNavbar: true,
  //   component: CreateCategories,
  //   layout: "/admin",
  // },
  {
    path: "/signIn",
    name: "Sign In",
    rtlName: "لوحة القيادة",
    icon: <DocumentIcon color="inherit" />,
    component: SignIn,
    layout: "/auth",
  },
  // {
  //   path: "/signIn",
  //   name: "Sign In",
  //   rtlName: "لوحة القيادة",
  //   icon: <DocumentIcon color="inherit" />,
  //   component: SignIn,
  //   layout: "/admin",
  // },



];
export default dashRoutes;
