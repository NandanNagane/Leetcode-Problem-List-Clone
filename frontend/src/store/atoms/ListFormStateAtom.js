import { atom } from 'jotai';
import { atomWithImmer } from 'jotai-immer';
import { RESET } from 'jotai/utils';

const initialState = {
  values: {
    Title: "",
    Description: ""
  },
  counts: {
    Title: 0,
    Description: 0,
  },
  private: false
};

const baseListFormStateAtom = atomWithImmer(initialState);

const ListFormStateAtom = atom(
  (get) => get(baseListFormStateAtom),
  (get, set, update) => {
    if (update === RESET) {
      set(baseListFormStateAtom, initialState);
    } else {
      set(baseListFormStateAtom, update);
    }
  }
);

export default ListFormStateAtom
