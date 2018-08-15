import React from 'react';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Header';
// import Sidebar from './Sidebar';
import Footer from './Footer';
// import Welcome from './Welcome';
import Dashboard from './dashboard/Dashboard';
import About from './About';
import Contact from './Contact';

import * as actions from '../actions/auth';

const App = ({
  user, login, logout, initUser,
}) => {
  const localUser = localStorage.getItem('user');
  const authedUser = user || JSON.parse(localUser);
  initUser(); // TODO: Get rid of this

  return (
    <div id="app-container" className="flex columns">
      {/* Notification Container */}
      <ToastContainer
        className='toast-container'
        toastClassName="dark-toast"
        progressClassName='toast-progress'
      />

      <Header
        user={user || authedUser}
        logout={logout}
        login={login}
      ></Header>

      {/* <Sidebar></Sidebar> */}

      <div id="app-body" className="flex app-body">
        {/* Landing page for all users
        <Route exact path="/welcome" component={Welcome} />

        {/* Redirect guest users to the landing page */}
        {/* {!authedUser
          && <Redirect to='/welcome' />
        }

        {/* Authenticated users can see these pages */}
        {/* {authedUser
          && <Switch>
            <Route path="/" component={Dashboard} />
          </Switch>
        } */}

        <Switch>
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/" render={props => <Dashboard {...props} user={user || authedUser} />} />
        </Switch>

      </div>

      <Footer user={user || authedUser}></Footer>
    </div>
  );
};

App.propTypes = {
  user: PropTypes.object,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  initUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default withRouter(connect(
  mapStateToProps,
  actions,
)(DragDropContext(HTML5Backend)(App)));
