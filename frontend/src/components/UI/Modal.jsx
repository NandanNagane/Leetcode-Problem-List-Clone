import { X } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

import { useSetAtom } from "jotai";
import ModalAtom from "../../store/atoms/ModalAtom";


const ModalContext=createContext(null);

export default function Modal({ children }) {

  const ModalRef = useRef(null);
  const setIsModalOpen=useSetAtom(ModalAtom)

    

  const handleOutsideClick = (e) => {
    if (ModalRef.current && ModalRef.current.contains(e.target)) return;
    setIsModalOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.addEventListener("mousedown", handleOutsideClick);

    return () =>
      document.body.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  return (
    <ModalContext.Provider value={setIsModalOpen}>
    <div className="h-[100vh] w-[100vw] flex items-center justify-center backdrop-blur-xs fixed top-0  z-50">
      <div
        ref={ModalRef}
        className="bg-[#262626] relative p-4 w-[500px] min-w-fit text-white rounded-md shadow-2xl z-50 "
      >
          <button onClick={()=>setIsModalOpen(false)} className="absolute top-3 right-4 cursor-pointer">
            <X />
          </button>

        <ModalBody>{children}</ModalBody>
    
    <ModalFooter/>
        
      </div>
    </div>
    </ModalContext.Provider>
  );
}

export function ModalBody({children }){
    return <>
    {children}

    </>;
    
}

export function ModalFooter({children}){
    return(
        <div className="flex md:justify-end md:flex-row flex-col-reverse gap-4 pt-2 mt-4 mb-3">
         
         {children}
      
        </div>
    )
}

export function TriggerButton({children}){
   const setIsModalOpen=useContext(ModalContext)

        return(
               <button
            onClick={()=>setIsModalOpen(false)}
            className="bg-[#383838] font-extrabold cursor-pointer rounded-lg py-2 px-3">
                 {children}
            </button>
        )
}


