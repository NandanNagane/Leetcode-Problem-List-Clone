import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { ErrorBoundary } from "react-error-boundary";

export default function Layout(){
    return(
        <div className="flex flex-col   ">
            <Navbar/>
           <div className="flex-1  bg-[#2c2c2c] ">
        <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
          <Outlet />
        </ErrorBoundary>
      </div>
        </div>
    )
}