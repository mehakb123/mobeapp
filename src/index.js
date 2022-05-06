/*!

=========================================================
* Purity UI Dashboard - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/purity-ui-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/purity-ui-dashboard/blob/master/LICENSE.md)

* Design by Creative Tim & Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import ForgotPassword from "views/Auth/ForgotPassword";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import RTLLayout from "layouts/RTL.js";
import AddBars from "views/Dashboard/Billing/AddBar"
import AddCategories from "views/Dashboard/AddCategories";
import UpdateBranch from "views/Dashboard/UpdateBranch";
import AddSubCategories from "views/Dashboard/SubCategories";
import UpdateCategories from "views/Dashboard/UpdateCategories";
import UpdateSubCategories from "views/Dashboard/UpdateSubCategories"
import AddBranch from "views/Dashboard/AddBranch";
import UpdateBar from "views/Dashboard/Billing/UpdateBar";
import Setup from "setup/Setup";
//import SignIn from "views/Dashboard/SignIn";
import SignIn from "views/Auth/SignIn";


ReactDOM.render(
  // <Setup />,
  <HashRouter>
    <Switch>
      <Route path={`/auth`} component={AuthLayout} />
      <Route path={`/admin`} component={AdminLayout} />
      <Route path={`/rtl`} component={RTLLayout} />
      <Route path={`/signin`} component={SignIn} />
      {/* <Route path={`/forgotpassword`} component={ForgotPassword} /> */}
      {/* <Route path={'/admin/addcategories'} component={AddCategories} /> */}
      <Redirect from={`/`} to="/admin/dashboard" />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
