
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"

   const menuContext=createContext()
   


export default function Menu({className, as:Comp='div',children}){
   
    const menuRef=useRef(null);
     const [open,setOpen]=useState(false);

  const close=useCallback(()=>{
   
    
        setOpen(false);
  },[])
     

      const toggleFun=useCallback(()=>{setOpen((prev)=>!prev)},[])
  
    const handleOutsideClick=(e)=>{       
            if (menuRef.current && menuRef.current.contains(e.target)) return;
         
                close();
            
           
    }
    useEffect(()=>{
        document.body.addEventListener('mousedown',handleOutsideClick)

        return ()=> {
            document.body.removeEventListener('mousedown',handleOutsideClick)
        }

    },[])

   

    return(
        
      <menuContext.Provider value={{open,toggleFun,close}}>
          <Comp
         className={`${className}?${className}:'' z-50 `}
         
         ref={menuRef}
         >
            {children}
        </Comp>
      </menuContext.Provider>
    )
}

export function MenuButton({ className, children }) {
  const { toggleFun } = useContext(menuContext);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button className={className} onClick={toggleFun}>
        {children}
      </button>
    </div>
  );
}


export function MenuItems({ className, children }) {
  const { open } = useContext(menuContext);

  return (
    
    <div 
    style={{ pointerEvents: open? 'auto':'none',
        position:'absolute',
       
    opacity: open ? '1' : '0',
      transition:'opacity',
      transitionDuration:'200ms'}}>
      <div className={className}>
        {children}
      </div>
      
    </div>
  );
}

export function MenuItem({children,}){
     
    const [active,setActive]=useState(false)
    const {close} =useContext(menuContext)

    return(
        <div 
            onMouseEnter={()=>setActive(true)}
            onMouseLeave={()=>setActive(false)}
        >
            {typeof(children)==='function'?children({active,close}):children}
        </div>
    )
}