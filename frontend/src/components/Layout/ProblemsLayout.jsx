import {useAtom, useAtomValue, useSetAtom } from 'jotai'
import SideBar from './SideBar'


import ModalAtom from '../../store/atoms/ModalAtom'
import ListFormStateAtom from '../../store/atoms/ListFormStateAtom';


import ListEditorAtom from '../../store/atoms/ListEditorAtom'
import NewListModal from '../Forms/NewListModal';
import { Outlet } from 'react-router-dom';
import SidebarAtom from '../../store/atoms/SidebarAtom';
import { PanelsTopLeft } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';
import { useRef } from 'react';


export default function ProblemsLayout (){

  const isSidebarOpen=useAtomValue(SidebarAtom)
    
    const isModalOpen=useAtomValue(ModalAtom)

    const parentRef=useRef(null);

        return(
            <>
            <div ref={parentRef} className="flex  ">
             <SideBar parentRef={parentRef} />
              <Toaster position="top-center" 
              />
                <div className={`bg-[#1a1a1a] max-w-[100vw] relative flex-1 min-h-[98vh] py-3 px-5 ${isSidebarOpen?'blur-2xl':""}`}>
                    
                  <Outlet/>
                </div>
            </div>
         

          {isModalOpen&&<NewListModal/>}
            </>
        )
}