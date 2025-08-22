import "./App.css";

import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProblemsLayout from "./components/Layout/ProblemsLayout";
import Layout from "./components/Layout/Layout";

// import FavouritesPage from "./pages/problemset/ListPage";
import ListPage from "./pages/problemset/ListPage";
import { PanelsTopLeft } from "lucide-react";
import { useSetAtom } from "jotai";
import SidebarAtom from "./store/atoms/SidebarAtom";
import { Toaster } from "@/components/ui/sonner"


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/problem-list/Favorites" replace />} />
            <Route element={<ProblemsLayout />}>
            <Route path="problemset" element={<Problemset/>}></Route>
              <Route path="problem-list">
                <Route path=":listId" element={<ListPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
        
    </>
  );
}
function Problemset(){

 const  setSidebar=useSetAtom(SidebarAtom)

  return(<div className="absolute lg:hidden left-8 top-4 bg-[#3d3c3c] size-7 flex justify-center items-center rounded-full outline outline-[#555555] ">
                    <button onClick={()=>setSidebar((prev)=>!prev)}>
                      <PanelsTopLeft size={18}/>
                    </button>
                    </div>)
}
export default App;
