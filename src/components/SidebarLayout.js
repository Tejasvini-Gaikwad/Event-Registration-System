import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"

const SidebarLayout = () => {
    return (
        <div>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default SidebarLayout;