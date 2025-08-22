import { Check } from "lucide-react";
import Modal, { ModalBody, ModalFooter } from "../UI/Modal";
import SearchBox from "../UI/SearchBox";
import demoQuestionList from "@/src/services/demodata";
import { useMemo, useState } from "react";
import QuestionSelectedByUserAtom, { focusedAtom } from "@/src/store/atoms/QuestionSelectedByUserAtom";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useParams } from "react-router-dom";
import QuestionsCheckedAtom from "@/src/store/atoms/QuestionsCheckedAtom";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card } from "../UI/Card";



export default function AddQuestionsModal({children,open,onOpenChange}) {

  const{listId}=useParams()
  
    const [questionsChecked,setQuestionsChecked] =useAtom(QuestionsCheckedAtom)
 
 
  const selectedQuestionsAtom = useMemo(() => focusedAtom(listId), [listId]);

  const[questionsSelected,setQuestionsSelected] =useAtom(selectedQuestionsAtom)


    const handleCheck = (QId) => {
      setQuestionsChecked((prev)=>{
        if(prev.includes(QId)) return prev.filter((id)=>id!==QId)
        return prev.concat(QId)
      })
  
  };

  

  const handleAddToList = () => {
    const selectedQuestions = questionsChecked.map((id) => {
      return demoQuestionList.find((demoQ) => demoQ.id === id);
    });

    setQuestionsSelected((prev) => {
        let copy=[...selectedQuestions,...prev]
       return copy
      }
    );
     setQuestionsChecked([]);
  };

  return (


      <>

           <Dialog open={open} onOpenChange={onOpenChange} >
                  {open===undefined && <DialogTrigger asChild>
                   {children}
                  </DialogTrigger>}  
                  <DialogContent className="sm:max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Add Questions</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      Select Questions to add to your list
                    </DialogDescription>

                    <div className="overflow-y-scroll max-h-[300px] md:max-h-[500px]">
      <SearchBox className={"w-[40%] p-2 mb-4"} />
      <ul role="list" >
        {demoQuestionList.map((q,idx) => (
          <li key={idx} className=" group py-3 px-2 pr-7 rounded-md  flex items-center justify-between  odd:bg-[#333333]">
            <div className="flex w-full justify-between pr-4">
              <div className="items-center  flex space-x-2 ">
                <span>
                  {q.id}.{"  "}
                </span>
                <div className="truncate text-sm max-w-[20vw] sm:max-w-[40vw] md:max-w-[25vw] lg:max-w-[20vw]">
                  {q.title}
                </div>
              </div>
              <div className="flex w-fit items-center  space-x-4 text-sm">
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
              </div>
            </div>
            <div>
              <button
                type="button"
                role="checkbox"
                
                aria-checked={questionsChecked.includes(q.id)}
                onClick={()=>handleCheck(q.id)}
                disabled={questionsSelected.some((obj)=>obj.id===q.id)}

                id={q.id}
                className="ring size-5 rounded-md disabled:cursor-no-drop disabled:bg-white  flex justify-center items-center cursor-pointer  aria-checked:bg-white  "
              >
                {(questionsChecked.includes(q.id) || questionsSelected.some((obj)=>obj.id===q.id) ) && <Check className=" text-black size-4" />}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>

                    <DialogFooter className="sm:justify-end items-center">
                      {questionsChecked.length > 0 && (
                        <span>{questionsChecked.length} Selected</span>
                      )}
                      <DialogClose asChild>
                        <Button
                          type="button"
                          disabled={questionsChecked.length === 0}
                          onClick={handleAddToList}
                        >
                          Add to list
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
      
      </>








    
  );
}
