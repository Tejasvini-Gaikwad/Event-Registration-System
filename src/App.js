import logo from './logo.svg';
import { BrowserRouter, Routes ,Route, Navigate} from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import Login from './components/Login';
import { store } from './store';
import SidebarLayout from './components/SidebarLayout';
import Register from './components/Register';
import { useEffect,useState } from 'react';
import Home from './components/Home';
import Protected from './components/Protected';
import Dashboard from './components/Dashboard';
import Event from './components/Event';
import CreateEvent from './components/Events/CreateEvent';
import Users from './components/Users/Users';
import Role from './components/Role/Role';
import CreateRole from './components/Role/CreateRole';
import ViewEvent from './components/Events/ViewEvent';
import RegisterEvents from './components/Events/RegisterEvents.js';
import RoutesComponent from './root/Routes';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <RoutesComponent />
        {/* <BrowserRouter>
          <Routes>
            
            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<Register />} />
            <Route element={<SidebarLayout />}>
              <Route path="/dashboard" element={<Protected Component={Dashboard} />} />
              <Route path="/home" element={<Protected Component={Home} />} />
              <Route path="/event" element={<Protected Component={Event} />} />
              <Route path="/create-event" element={<Protected Component={CreateEvent} />} />
              <Route path="/users" element={<Protected Component={Users} />} />
              <Route path="/role" element={<Protected Component={Role} />} />
              <Route path="/create-role" element={<Protected Component={CreateRole} />} />
              <Route path="/view-event" element={<Protected Component={ViewEvent} />} />
              <Route path="/register-event" element={<Protected Component={RegisterEvents} />} />
              <Route path="/*" element={<Navigate to="/dashboard" />}></Route>

            </Route>
          </Routes>
        </BrowserRouter> */}
      </div>
    </Provider>
  );
}

export default App;
