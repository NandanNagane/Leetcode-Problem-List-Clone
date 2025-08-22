import { useState } from "react";

import { Check } from "lucide-react";
import ListFormStateAtom from '../../store/atoms/ListFormStateAtom';
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import ModalAtom from "../../store/atoms/ModalAtom";



export default function NewListForm() {

  const [isChecked, setIsChecked] = useState(false);
  const modalOpenedBy=useAtomValue(ModalAtom)

  const [FormState, setFormState] = useAtom(ListFormStateAtom);
 
  const handlePrivateClick=  ()=>{
       setIsChecked((prev)=>!prev);
      
         setFormState((state) => {
      state.private=!isChecked
    });
  }

  const handleInput = (e) => {
      
    const id = e.target.id;
    const value=e.target.value
    const length = e.target.value.length;

       setFormState((state) => {
      state.values[id]=value,
      state.counts[id]=length
    });
   
   
  };
  

  return (
    <>
      <div className="mb-2 flex justify-between not-first:">
        <h1 className=" whitespace-nowrap font-bold text-2xl">
          {modalOpenedBy === "New List"
            ? "Create New List"
            : "Generate Smart List"}
        </h1>
      </div>
      <form>
        <div className="m-2">
          <label htmlFor="Title" className="block mb-2 text-xl">
            Title
          </label>
          <div className="border rounded-md border-gray-500 p-2 flex justify-between focus-within:border-gray-300">
            <input
              type="text"
              name="Title"
              id="Title"
              maxLength={30}
              placeholder="Enter a list name"
              className="appearance-none outline-none  w-full"
              onInput={handleInput}
            />
            <div className="pointer-events-none text-[#9d9d9d]">
              {FormState?.counts?.Title ?? 0}/30
            </div>
          </div>
        </div>
        <div className="m-2  ">
          <label htmlFor="Description" className="block mb-2 text-xl">
            Description
          </label>
          <textarea
            name="Description"
            id="Description"
            placeholder="Describe your list"
            maxLength={150}
            className="appearance-none h-[6rem]  resize-none  p-2 rounded-md border border-gray-500  focus:ring ring-gray-300 outline-none w-full"
            onInput={handleInput}
          />

          <div className="flex justify-end  pr-1 pointer-events-none text-[#9d9d9d]">
            {FormState?.counts?.Description??0}
            /150
          </div>
        </div>
        {modalOpenedBy === "New List" && (
          <div className="flex items-center">
            <button
             type="button"
              role="checkbox"
              aria-checked={isChecked}
              onClick={handlePrivateClick}
              id="new-list-private"
              className="ring size-5 rounded-md flex justify-center items-center cursor-pointer  aria-checked:bg-white  "
            >
              {isChecked && <Check className=" text-black size-4" />}
            </button>
            <label htmlFor="Private " className="ms-2">
              Private
            </label>
          </div>
        )}
      </form>
    </>
  );
}
