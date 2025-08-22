import { useContext } from "react";
import {
  Ellipsis,
  Check,
  AlignJustify,
  Trash2,
  Star,
  ArrowUpToLine,
} from "lucide-react";


import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../../../components/ui/menubar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({q,setQuestionsSelected}){
   const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id:q.id,
     transition: {
    duration: 300, // milliseconds
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
  },
  });

    const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
    const handleMoveToTop=(Qid)=>{
   
     setQuestionsSelected((prev) =>{
      let copy =prev.filter((q) => q.id !== Qid)
      const requiredQ=prev.find((q)=>q.id==Qid)
      copy.unshift(requiredQ)
      return copy
     });
  }

  const handleDeleteQ=(Qid)=>{
   
     setQuestionsSelected((prev) => prev.filter((q) => q.id !== Qid));
  }

    return(       
         <>
        
                  <li ref={setNodeRef} id={q.id}{...attributes} style={style}
                    className=" group p-2 rounded-md  flex items-center  odd:bg-[#272727]"          
                  >
                    <Tooltip>
                      <TooltipTrigger>
                         <div className="ml-2 mr-2 w-5 cursor-pointer" {...listeners}> <AlignJustify className="group-hover:block hidden" color="gray" size={16}/> {q.isSolved && <Check  className="group-hover:hidden block" color="green" size={19}/>}</div>
                      </TooltipTrigger>
                      <TooltipContent>Move</TooltipContent>
                    </Tooltip>
                   
                    <a href="#" className="flex w-full  ">
                      <div className="items-center flex-1 flex space-x-2 ">
                        <span>
                          {q.id}.{"  "}
                        </span>
                          <div className="truncate text-sm max-w-[20vw] sm:max-w-[40vw] md:max-w-[25vw] lg:max-w-[20vw]">{q.title}</div>
                 
                      </div>
                      <div className="flex w-fit items-center  space-x-4 text-sm">
                        <span className="text-white/50 hidden sm:block">{q.acceptance}%</span>
                        <span
                          className={`${
                            q.difficulty === "Easy"
                              ? "text-cyan-500"
                              : q.difficulty === "Med."
                              ? "text-orange-400"
                              : "text-red-500"
                          } `}
                        >
                          {q.difficulty}
                        </span>
                      <Tooltip>
                        <TooltipTrigger>
                            <div >
                          <div className="cursor-pointer">
                            <div className="flex gap-0.5 px-1">
                              <div className="h-2 w-0.5 rounded bg-gray-500 opacity-20"></div>
                              <div className="h-2 w-0.5 rounded  bg-gray-500 opacity-20"></div>
                              <div className="h-2 w-0.5 rounded  bg-gray-500 opacity-20"></div>
                              <div className="h-2 w-0.5 rounded  bg-gray-500 opacity-20"></div>
                              <div className="h-2 w-0.5 rounded  bg-gray-500 opacity-20"></div>
                              <div className="h-2 w-0.5 rounded  bg-gray-500 opacity-20"></div>
                              <div className="h-2 w-0.5 rounded  bg-gray-500 opacity-20"></div>
                              <div className="h-2 w-0.5 rounded  bg-gray-500 opacity-20"></div>
                            </div>
                          </div>
                        </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Subscribe to unlock frequency</p>
                        </TooltipContent>
                      </Tooltip>
                      </div>
                    </a>
                    <div>
                      <Menubar >
                        <MenubarMenu>
                          <MenubarTrigger
                            className={
                              " hover:bg-[#3c3b3b] mx-2 cursor-pointer group-hover:opacity-100 opacity-0"
                            }
                          >
                            <Ellipsis size={16} />
                          </MenubarTrigger>
                          <MenubarContent>
                            <MenubarItem onClick={()=>handleDeleteQ(q.id)}>
                              <Trash2 color="white"/>
                              Delete</MenubarItem>
                            <MenubarItem >
                              <Star color="white" />
                              Add to list</MenubarItem>

                            <MenubarItem onClick={()=>handleMoveToTop(q.id)}>
                              <ArrowUpToLine  color="white"  />Move to top</MenubarItem>
                          </MenubarContent>
                        </MenubarMenu>
                      </Menubar>
                    </div>
                  </li>


     </>
            
    )
}