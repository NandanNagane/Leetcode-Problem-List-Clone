import { useEffect, useRef, useState } from "react";
import {
  LibraryBig,
  GraduationCap,
  Plus,
  ChevronDown,
  ChevronRight,
  Lock,
  Atom,
  Globe,
  ListStartIcon,
  PanelsTopLeft
} from "lucide-react";
import Tooltip from "../UI/Tooltip";
import Menu, { MenuButton, MenuItem, MenuItems } from "../UI/Menu";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import ModalAtom from "../../store/atoms/ModalAtom";
import TotalListsAtom from "../../store/atoms/TotalListsAtom";
import { Link, useNavigate, useParams } from "react-router-dom";
import SidebarAtom from "../../store/atoms/SidebarAtom";
import { Button } from "../../../components/ui/button";
import { document } from "postcss";

export default function SideBar({parentRef}) {


 
  
  const {listId}=useParams()
  const [isSidebarOpen,setSidebar]=useAtom(SidebarAtom)

  

  
 const buttonRef=useRef(null);
 const navigate=useNavigate()
  const [openList, setList] = useState(true);

  const sidebarRef=useRef(null)
  const List=useAtomValue(TotalListsAtom)
    const  setisModalOpen = useSetAtom(ModalAtom);

  function windowResized(){
       if(window.matchMedia("(width <=1024px)").matches)  return
     setSidebar(false)   
  }
     const handleOutsideClick=(e)=>{
        
        
     if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
  setSidebar(false);
}
  }

  useEffect(()=>{

     window.addEventListener('resize',windowResized)

    parentRef.current?.addEventListener('mousedown',handleOutsideClick)
    return ()=>{parentRef.current?.removeEventListener('mousedown',handleOutsideClick)

                window.removeEventListener('resize',windowResized)
    }

  },[])
 


  const menuArr=[{label:"New List"},{label:"New Smart List..."}]

    const ModalOpenFun=(id)=>{
        setisModalOpen(id)
    }

  return (
    <>
   
     <div
        ref={sidebarRef}
      className={`h-screen mr-3 absolute lg:relative z-50   ${isSidebarOpen?'-left-0 ':'-left-100'} lg:-left-0 transition-position lg:transition-none duration-200    bg-[#1a1a1a] p-2 `}>
        <div className="p-2 ">
          <div className="border-b-1 pb-6 m-2 w-[200px] flex font-bold  flex-col gap-2 text-white border-gray-500 ">
            <div className="flex gap-2 p-3   hover:bg-[#2c2c2c] rounded-md">
              <LibraryBig />
              Library
            </div>
            <div className="flex gap-3 p-3 pl-2  hover:bg-[#2c2c2c] rounded-md">
              <GraduationCap />
              Study Plan
            </div>
          </div>


          <div className="px-2">
            <div className="flex text-[#787878]  text-xl items-center cursor-pointer">
              <div className="flex relative justify-between items-center w-full group ">
                <button className="flex items-center gap-2 w-full cursor-pointer relative "
                onClick={() => setList((prev) => !prev)}
                >
                  <span
                    className={` opacity-0 hover:opacity-100 group-hover:opacity-100 absolute  -left-4 cursor-pointer `}
                    
                  >
                   {openList ? <ChevronRight className="size-4" /> : <ChevronDown className="size-4" />}
                  </span>
                  <span className=" text-sm font-bold">My Lists</span>
                </button>
                <Menu >
                  <MenuButton className="hover:bg-[#2c2c2c] rounded-md cursor-pointer">
                    <span className="flex items-center p-2">
                      <Plus className="text-white size-4" />{" "}
                      <ChevronDown className="size-4" />
                    </span>
                  </MenuButton>
                  <MenuItems
                    className=" px-4 py-3 
                        mt-2 w-64 origin-top-right rounded-md bg-[#303030] shadow-xl  focus:outline-none z-50"
                  >
                    {
                     menuArr.map((item,index)=>{
                        return(
                             <MenuItem key={index} >
                                  {({active,close})=>{
                                 
                                     return(
                                     <button
                                      id={item.label}
                                    className={`${
                                       active? "bg-[#3c3c3c]":'' 
                                      } ${
                                       item.label==="New List"?"text-white":'text-violet-400' 
                                      }  px-4 w-full py-2 rounded-md mx-1   cursor-pointer `}
                                      
                                      onClick={(e)=>{close();ModalOpenFun(e.target.id)}}
                                   
                                   >
                                         <div className="flex gap-3 pointer-events-none  text-[1.2rem]  "
                                          id={item.label}
                                         > 
                                          {item.label==='New List'?<Plus/>: <Atom/>} 
                                     {item.label}</div>
                                    </button>)
                                  }
                                            
                                  }

                                </MenuItem>
                        )
                     }
                      
                     )
                    }
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>
          {!openList && 
          
            List.map((item,idx)=>(
                
              <button 
              onClick={()=>{navigate(`/problem-list/${item.id}`);setSidebar(false)}}
              ref={buttonRef}
              key={idx}        
              className={`text-white appearance-none font-bold m-2 p-2 hover:bg-[#2c2c2c] ${listId==item.id ?'bg-[#2c2c2c]':''} flex items-center rounded-md justify-between w-full cursor-pointer gap-2  `}>
                <div  className="  flex gap-2   ">
                <div className="!h-5 !w-5 ">
                  <img
                    className="h-[80px] w-[80px]  mr-2.5 !h-5 !w-5 rounded-[3px]"
                    src={item.img}
                  />
                </div>
                <span className="text-sm font-bold ">{item.id}</span>

                        </div>

                      <Tooltip label={item.isSmartList?'Smart List':item.private?'Private':'Public'} bgColor="#2c2c2c" color="white">
                <div >
                {item.isSmartList?<Atom className="text-[#9c9c9c]  size-5"/>
                
                :

                 item.private?<Lock className="text-[#9c9c9c] size-5 "  />:<Globe className="text-[#9c9c9c] size-5 "/> 
                
                }
                
                </div>
              </Tooltip>



              </button>

        
      
            ))
          
          
           
          }
        </div>
      </div>
 
     
    </>
  );
}
