import React from 'react';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Header from './Header';
import Footer from './Footer';
// import Welcome from './Welcome';
import Dashboard from './dashboard/Dashboard';
import * as actions from '../actions/auth';
import 'react-toastify/dist/ReactToastify.css';

const App = ({
  user, login, logout, initUser,
}) => {
  const localUser = localStorage.getItem('user');
  const authedUser = user || JSON.parse(localUser);
  initUser(); // TODO: Get rid of this

  return (
    <BrowserRouter>
      <div className="flex columns">
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

        <div className="flex app-body">
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

          <Route path="/" render={props => <Dashboard {...props} user={user || authedUser} />} />
        </div>

        <Footer user={user || authedUser}></Footer>
      </div>
    </BrowserRouter>
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

export default connect(
  mapStateToProps,
  actions,
)(DragDropContext(HTML5Backend)(App));
