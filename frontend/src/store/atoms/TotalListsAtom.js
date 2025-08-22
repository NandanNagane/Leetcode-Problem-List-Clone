import { atom } from 'jotai'
import { atomWithImmer } from 'jotai-immer'
import { splitAtom } from 'jotai/utils'
import { focusAtom } from 'jotai-optics'

const TotalListsAtom=atomWithImmer([

    {   id:"Favorites",
        img:"https://assets.leetcode.com/favorite/default_favorite_cover.png",
        private:true,
        isSmartList:false,
        // questionSelectedByUser:[]
    }
]
   
)

// export const listAtoms=splitAtom(TotalListsAtom)

// export const listQuestionAtomsAtom = atom((get) => {
//   const atoms = get(listAtoms);
//   return atoms.map((itemAtom) => focusAtom(itemAtom, (optic) => optic.prop("questionSelectedByUser")));
// });

export default TotalListsAtom