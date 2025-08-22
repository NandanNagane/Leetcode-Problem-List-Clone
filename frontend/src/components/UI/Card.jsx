export function Card({children,className}){
    return(
        <div className={`p-4 bg-[#262626] rounded-md shadow-xl w-fit h-fit ${className} `}
            
        >
            {children}
        </div>
    )
}
