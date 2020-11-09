import React, {useRef} from 'react';
import Home from './components/home/Home';
import Header from './components/partials/Header';
import Sidebar from './components/partials/Sidebar';
import SidebarToggler from './components/partials/SidebarToggler';
import GoTop from './components/partials/GoTop';
import HeaderObserver from './components/partials/HeaderObserver';

import {
  makeStyles
} from '@material-ui/core';

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

  const app = useRef();
  const classes = useClasses();

  return (
    <div className="App" ref={app} className={classes.app} >
        <HeaderObserver>
          <Header app={app} />
        </HeaderObserver>

      <main id="main" className={classes.root} >
        <Sidebar />
        <div id="content">
          <Home />
        </div>

        <SidebarToggler app={app}/>
      </main>
        <GoTop />
    </div>
  );
}

export default App;
