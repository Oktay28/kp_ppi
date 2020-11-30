import React, {useContext, useEffect} from 'react';
import Header from './components/partials/Header';
import Sidebar from './components/partials/Sidebar';
import SidebarToggler from './components/partials/SidebarToggler';
import GoTop from './components/partials/GoTop';
import HeaderObserver from './components/partials/HeaderObserver';
import {Switch, Route, useLocation, useHistory} from 'react-router-dom';
import GlobalContext from './components/context/GlobalContext';
import { ToastContainer } from 'react-toastify';

import Home from './components/home/Home';
import Products from './components/products/Products';

import useUrlParams from './hooks/useUrlParams';

import {
  makeStyles
} from '@material-ui/core';
import Footer from './components/partials/Footer';
import Contacts from './components/contacts/Contacts';
import Profile from './components/profile/Profile';

const useClasses = makeStyles(theme => ({
  root: {
    flex: "1",
    paddingTop: "50px"
  },
  app: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.primary.contrastText,
    overflow: "hidden"
  }
}))

function App() {

  const classes = useClasses();
  const params = useUrlParams();
  const modal = params.get("modal");
  const isMenu = (modal == "menu");
  const {pathname} = useLocation();
  const {logged} = useContext(GlobalContext);
  const {push} = useHistory();

  useEffect(() => {
    if(logged) {
      push(pathname)
    }
  }, [logged])

  return (
    <div className={`${classes.app} ${isMenu ? "sidebar-open" : ""}`} >
        <HeaderObserver>
          <Header/>
        </HeaderObserver>

      <main id="main" className={classes.root} >
        <Sidebar />
        <div id="content">
          <ToastContainer hideProgressBar autoClose={2000}/>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/products">
              <Products />
            </Route>

            <Route path="/contacts">
              <Contacts />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>

          </Switch>
        </div>

        <SidebarToggler/>
      </main>
        <GoTop />
        <Footer />
    </div>
  );
}

export default App;
