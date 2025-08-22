import { useAtomValue, useSetAtom } from "jotai";
import ListEditorAtom from "../../store/atoms/ListEditorAtom";
import ModalAtom from "../../store/atoms/ModalAtom";
import Modal, { ModalBody,ModalFooter,TriggerButton } from "../UI/Modal";
import NewListForm from "./NewListForm";
import ListFormStateAtom from "../../store/atoms/ListFormStateAtom";
import { useNavigate } from "react-router-dom";
import AddQuestionsModal from "../ListComps/AddQuestionsModal";
import { toast } from "sonner"
import { CircleCheck } from "lucide-react";
import { useState } from "react";

export default function NewListModal(){
   
     const setIsModalOpen=useSetAtom(ModalAtom)
     const EditList =useSetAtom(ListEditorAtom)
        const TitleCount=useAtomValue(ListFormStateAtom)
        const navigate=useNavigate()
        const FormState = useAtomValue(ListFormStateAtom);

    const handleClick=()=>{
            EditList();
            setIsModalOpen(false);

            navigate(`problem-list/${FormState.values.Title}`)
    }


    return(
        <>
     
             <Modal >

                <ModalBody>
                    <NewListForm  />
                </ModalBody>
                
               < ModalFooter>
                    <TriggerButton >
                            <span className="font-bold"> Cancel</span>
                    </TriggerButton>
                        
         
                                       <button
                            disabled={!(TitleCount.counts.Title>0)}
                             onClick={() =>{
                                handleClick();
                            toast.custom((t) => (
                                    <div className="flex items-center outline-1 outline-[#454545] bg-[#272727]  space-x-2 rounded-2xl py-3 px-4">
                                        <CircleCheck color="green"/>
                                        <h1>{FormState.values.Title }{' '}created</h1> 
                                    </div>
                                    ));
                                     }

                             }
                                
                                            className="bg-[#f5f5f5] text-black cursor-pointer disabled:bg-[#8d8d8d] disabled:cursor-auto rounded-lg py-2 px-3"
                                                    >
                                <span className="font-bold">Create </span>
                      </button>

   
                    

                    
                     
               </ModalFooter>
                
             
             </Modal>
        </>
    )
}