import { useEffect } from "react"

export default function Slider({ open }) {

    useEffect(()=>{

    },[])
    return(
        
             <div className={`absolute md:hidden z-1 h-screen min-w-screen left-0 -top-[100vh] transform  transition-transform duration-100 ease-in bg-[#313131] ${open ? 'translate-y-[100vh]' : ''}`}>
                <h1 className="text-white">Slider menu</h1>
              </div>
     
    )
}