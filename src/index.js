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
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
// core components
import Admin from "layouts/Admin.js";
import AuthLayout from "layouts/AuthLayout.js";
// import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "theme.js";
import { isLogged } from "config/auth/auth";
import { ToastContainer } from "react-toastify";

const hist = createBrowserHistory();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router history={hist}>
      <Switch>
        <Route path="/admin"
          render={ props =>{
            if(isLogged()){
              return (<Admin {...props} />)
            }else{
              return(<Redirect
                to="/auth/login"
              />)
            }
          }}
        />
        <Route path="/auth" component={AuthLayout} />
        {/* <Route path="/rtl" component={RTL} /> */}
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>
  </ThemeProvider>
  ,
  document.getElementById("root")
);
