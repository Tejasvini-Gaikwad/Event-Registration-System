import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Register from "../components/Register";
import { CREATE_EVENT_PATH, CREATE_ROLE_PATH, DASHBOARD_PATH, EVENT_PATH, HOME_PATH, LOGIN_PATH, REGISTER_EVENT_PATH, REGISTER_PATH, ROLE_PATH, USERS_PATH, VIEW_EVENT_PATH } from "./routeConstants";
import Home from "../components/Home";
import Event from "../components/Event";
import Users from "../components/Users/Users";
import Role from "../components/Role/Role";
import RegisterEvents from "../components/Events/RegisterEvents";
import CreateEvent from "../components/Events/CreateEvent";
import CreateRole from "../components/Role/CreateRole";
import ViewEvent from "../components/Events/ViewEvent";

const routesConfig = [
      {
        path: LOGIN_PATH,
        isHeader: false,
        element: <Login />,
        isProtected: false,
        key: "login"
      }
      ,
      {
        path: REGISTER_PATH,
        isHeader: false,
        element: <Register />,
        isProtected: false,
        key: "register"
      },{
        path: DASHBOARD_PATH,
        isHeader: true,
        element: <Dashboard />,
        isProtected: true,
        key: "dashboard"
      },
      {
        path: HOME_PATH,
        isHeader: true,
        element: <Home />,
        isProtected: true,
        key: "home"
      },
      {
        path: EVENT_PATH,
        isHeader: true,
        element: <Event />,
        isProtected: true,
        key: "event"
      },
      {
        path: CREATE_EVENT_PATH,
        isHeader: true,
        element: <CreateEvent />,
        isProtected: true,
        key: "create event"
      },
      {
        path: USERS_PATH,
        isHeader: true,
        element: <Users />,
        isProtected: true,
        key: "users"
      },
      {
        path: ROLE_PATH,
        isHeader: true,
        element: <Role />,
        isProtected: true,
        key: "role"
      },
      {
        path: CREATE_ROLE_PATH,
        isHeader: true,
        element: <CreateRole />,
        isProtected: true,
        key: "create role"
      },
      {
        path: VIEW_EVENT_PATH,
        isHeader: true,
        element: <ViewEvent />,
        isProtected: true,
        key: "view event"
      },
      {
        path: REGISTER_EVENT_PATH,
        isHeader: true,
        element: <RegisterEvents />,
        isProtected: true,
        key: "register events"
      }
]

export default routesConfig;