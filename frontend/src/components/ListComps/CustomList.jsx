import {
  Atom,
  EllipsisVertical,
  ExternalLink,
  Globe,
  Play,
  Plus,
  SquarePen,
  PanelsTopLeft,
  Search,
  Shuffle,
  ArrowUpDown,
  Funnel,
} from "lucide-react";
import { DndContext } from "@dnd-kit/core";

import { Card } from "../UI/Card";
import { atom,useAtom, useAtomValue, useSetAtom } from "jotai";
import TotalListsAtom from "../../store/atoms/TotalListsAtom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../../../components/ui/menubar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { Input } from "@/components/ui/input";
import SidebarAtom from "../../store/atoms/SidebarAtom";
import { useEffect, useMemo, useState } from "react";
import SortableItem from "./SortableItem";
import {
  arrayMove,
  arraySwap,
  horizontalListSortingStrategy,
  rectSortingStrategy,
  rectSwappingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { atomWithReset, useResetAtom } from "jotai/utils";

import Null from "./Null";
import { Button } from "@/components/ui/button";
import AddQuestionsModal from "./AddQuestionsModal";
import SearchBox from "../UI/SearchBox";
import QuestionSelectedByUserAtom, { focusedAtom } from "@/src/store/atoms/QuestionSelectedByUserAtom";
import ListEditorAtom from "@/src/store/atoms/ListEditorAtom";

import demoQuestionList from "@/src/services/demodata";
import QuestionsCheckedAtom from "@/src/store/atoms/QuestionsCheckedAtom";

export default function CustomList({ listId }) {

const [isModalOpen, setIsModalOpen] = useState(false);
 const TotalLists = useAtomValue(TotalListsAtom);
useEffect(()=>{
  setIsModalOpen(true);
  console.log(isModalOpen);
  
},[TotalLists])

  const setSidebar = useSetAtom(SidebarAtom);

 

  
    const questionsSelectedAtom=useMemo(()=>focusedAtom(listId),[listId])

    const[questionsSelected,setQuestionsSelected] =useAtom(questionsSelectedAtom)


  const [searchNull, setSearchNull] = useState(false);

  const handleDragEnd = ({ active, over }) => {
    if (over === null) return;
    if (active.id === over.id) return;

    setQuestionsSelected((prev) => {
      const oldIdx = prev.findIndex((q) => q.id === active.id);
      const newIdx = prev.findIndex((q) => q.id === over.id);

      return arraySwap(prev, oldIdx, newIdx);
    });
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setQuestionList((prev) => {
      const newArr = prev.filter((q) =>
        q.title.toLowerCase().includes(query.toLowerCase())
      );
      console.log(newArr);

      if (newArr.length > 0) return newArr;
      else {
        resetQuestionList();
        setSearchNull(true);
      }
    });
  };

  const requiredList = TotalLists.find((item) => item.id === listId);
  
  
  const handleEdit = () => {
    console.log("In edit");
  };

  
  let actions;

  if (requiredList.isSmartList && requiredList.isSmartList === true) {
    const handleConditionSetting = () => {
      console.log("In edit");
    };

    actions = [
      { label: "Condition Setting", onclick: handleConditionSetting },
      { label: "Edit", onclick: handleEdit },
      { label: "More", dropdown: true },
    ];
  } else {
    const handleAdd = () => {};

    if (requiredList.private === true) {
      actions = [
        { label: "Add Questions", onclick: handleAdd },
        { label: "Edit", onclick: handleEdit },
        { label: "More", dropdown: true },
      ];
    } else {
      const handleShare = () => {};
      actions = [
        { label: "Add Questions", onclick: handleAdd },
        { label: "Share", onclick: handleShare },
        { label: "More", dropdown: true },
      ];
    }
  }



  
  

  return (
    <>

  

      <div className="flex flex-col md:flex-row  ">

             <AddQuestionsModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
        <Card className="relative  md:w-fit w-full lg:mt-0 mt-14  flex justify-center items-center">
          <div
            className={` m-2 text-white md:border-b  border-[#373737]  pb-6 flex flex-col items-center md:items-start`}
          >
            {listId !== "Favorites" ? (
              <Tooltip>
                <TooltipTrigger>
                  <div className="relative group cursor-pointer ">
                    <img
                      src={requiredList.img}
                      alt="star"
                      className="h-[80px] w-[80px] "
                    />

                    <div
                      className=" bg-black/50 opacity-0 absolute rounded-sm top-0 h-[80px] w-[80px]  flex justify-center items-center group-hover:opacity-100"
                      onClick={() => {
                        console.log("clicked");
                      }}
                    >
                      <SquarePen />{" "}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Edit Cover</TooltipContent>
              </Tooltip>
            ) : (
              <img
                src={requiredList.img}
                alt="star"
                className="h-[80px] w-[80px] "
              />
            )}

            <h1 className=" text-3xl font-bold my-2">{listId}</h1>
            <div className="mb-3">
              {"UserName"}.{questionsSelected.length}
              {" questions"}
            </div>

            <div className="flex text-black">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    disabled={questionsSelected.length === 0}
                    type="button"
                    className="bg-white px-4 disabled:opacity-75 disabled:cursor-auto cursor-pointer  rounded-3xl  flex items-center gap-1"
                  >
                    <Play fill="black" className="size-4" />
                    Practice
                  </button>
                </TooltipTrigger>
                {questionsSelected.length>0 ? (
                  <TooltipContent>
                    {questionsSelected[0].id}.{questionsSelected[0].title}
                  </TooltipContent>
                ) : (
                  ""
                )}
              </Tooltip>

              <div className="ml-3 flex gap-3">
                {actions.map((item, idx) => (
                  <div key={idx}>
                    {item.dropdown ? (
                      <Menubar>
                        <MenubarMenu>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="inline-block">
                                <MenubarTrigger
                                  onFocus={(e) => e.preventDefault()}
                                  className="bg-[#383838] cursor-pointer text-white flex items-center justify-center p-2 rounded-full"
                                >
                                  <EllipsisVertical size={18} />
                                </MenubarTrigger>
                              </div>
                            </TooltipTrigger>

                            <TooltipContent className="text-white bg-[#262626] outline-[.1px] outline-[#454545]">
                              <p>{item.label}</p>
                            </TooltipContent>
                          </Tooltip>

                          <MenubarContent className={"bg-[#383838]"}>
                            <MenubarItem>
                              <Globe />
                              Make Public
                            </MenubarItem>
                          </MenubarContent>
                        </MenubarMenu>
                      </Menubar>
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild  >
                          {item.label === "Add Questions" ? (
                           <AddQuestionsModal>  
                            <button className="bg-[#383838] cursor-pointer text-white flex items-center justify-center p-2 rounded-full " >
                                <Plus size={18} />       
                              </button>                                                                            
                    </AddQuestionsModal>
                          ) : item.label === "Condition Setting" ? (
                            <button className="bg-[#383838] cursor-pointer text-white flex items-center justify-center p-2 rounded-full " >
                                <Atom size={18} />     
                              </button> 
                            
                          ) : item.label === "Share" ? (
                             <button className="bg-[#383838] cursor-pointer text-white flex items-center justify-center p-2 rounded-full " >
                                <ExternalLink size={18} />  
                              </button> 
                            
                          ) : (
                             <button className="bg-[#383838] cursor-pointer text-white flex items-center justify-center p-2 rounded-full " >
                              <SquarePen size={18} />
                              </button> 
                            
                          )}
                        </TooltipTrigger>

                        <TooltipContent className="text-white bg-[#262626] outline-[.1px] outline-[#454545] ">
                          <p>{item.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute lg:hidden md:-top-12 top-3 left-4 md:left-0 bg-[#3d3c3c] size-7 flex justify-center items-center rounded-full outline outline-[#555555] ">
            <button onClick={() => setSidebar((prev) => !prev)}>
              <PanelsTopLeft size={18} />
            </button>
          </div>
        </Card>

        <div className=" md:ml-6 flex-1 ">
          <div className="mb-4 mx-2 mt-4 md:mt-0 flex justify-between ">
            <div className="flex md:space-x-3 space-x-2">
              <SearchBox onInput={handleSearch} />
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="bg-[#262626] p-2 flex items-center rounded-full cursor-pointer">
                    <ArrowUpDown size={16} color="gray" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Sort by custom</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="bg-[#262626] p-2 flex items-center rounded-full cursor-pointer">
                    <Funnel size={16} color="gray" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Filter</TooltipContent>
              </Tooltip>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="hover:bg-[#262626] p-2 flex items-center rounded-full cursor-pointer"
                >
                  <Shuffle size={18} color="gray" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Pick one</TooltipContent>
            </Tooltip>
          </div>
                
                          {questionsSelected.length === 0 ? (
            <div className="md:pt-30 pt-5  ">
              <Null />
              <div className="flex items-center space-y-3 mt-2 flex-col">
                <p>No questions is this list yet</p>

               

                    <AddQuestionsModal>
                     <Button>
                      <Plus />
                      Add Questions
                    </Button>
                    </AddQuestionsModal>

              </div>
            </div>
          ) : (
            <DndContext onDragEnd={handleDragEnd}>
              <SortableContext
                items={questionsSelected}
                strategy={rectSwappingStrategy}
              >
                <ul role="list" className="max-w-[100vw] ">
                  {questionsSelected.map((q, idx) => {
                    return <SortableItem key={idx} setQuestionsSelected={setQuestionsSelected} q={q} />;
                  })}
                </ul>
              </SortableContext>
            </DndContext>
          )}
               
        
        </div>
      </div>

    </>
  );
}
