import { atom } from "jotai";
import TotalListsAtom from './TotalListsAtom';
import ModalAtom from "./ModalAtom";
import ListFormStateAtom from "./ListFormStateAtom";
import QuestionSelectedByUserAtom from "./QuestionSelectedByUserAtom";
import { RESET } from 'jotai/utils';

const ListEditorAtom = atom(null, (get, set) => {
  const values=  get(ListFormStateAtom).values
    const isPrivatePresent= get(ListFormStateAtom).private
    const ModalOpenedBy=get(ModalAtom)
    // const questionSelectedByUser=get(QuestionSelectedByUserAtom)

  const newEntry = {
    id: values.Title,
    img: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f4dd.svg",
    private: isPrivatePresent,
    isSmartList:!(ModalOpenedBy==='New List'),
    questionSelectedByUser:[]
  };

 
  set(TotalListsAtom, (draft) => {
    draft.splice(1,0,newEntry);
  });
   set(ListFormStateAtom,RESET)
   set(QuestionSelectedByUserAtom,(draft)=>{
    draft.push({id:values.Title,questions:[]})
   })
});

export default ListEditorAtom;