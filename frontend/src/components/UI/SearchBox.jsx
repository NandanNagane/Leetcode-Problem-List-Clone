import { Search } from "lucide-react";

export default function SearchBox({onInputFun,className}){
    return(
        <>
             <div className= {`${className} rounded-full flex items-center md:space-x-3  pl-2 md:px-3  bg-[#373737] `}>
                <Search size={18} color="gray" />
                <input
                  name="search"
                  type="text"
                  placeholder="Search questions"
                  className="outline-none"
                  onInput={onInputFun}
               
                />
              </div>
        </>
    )
}