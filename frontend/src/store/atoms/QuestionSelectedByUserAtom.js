
import { atom } from 'jotai'
import { atomWithImmer } from 'jotai-immer'
import { focusAtom } from 'jotai-optics'

const QuestionSelectedByUserAtom=atomWithImmer([{id:"Favorites",
    questions:[]
}])


export function focusedAtom(listId){
   const questionsAtom = focusAtom(QuestionSelectedByUserAtom, (optic) =>
    optic
    .find((obj) => obj.id === listId) 
    .prop('questions')  
  );
    return questionsAtom;
}



export default QuestionSelectedByUserAtom