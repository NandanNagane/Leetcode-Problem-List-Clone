export default function Tooltip({ label, bgColor, color, children,position }) {
  return (
    <div className="inline-block relative  group">
      {children}
      <div
        style={{ backgroundColor: bgColor, color }}
        className={`z-50 whitespace-nowrap opacity-0 pointer-events-none px-3 py-1 border-gray-500 border-1  rounded-xl  group-hover:opacity-100 transition-all delay-500  absolute left-1/2 top-full mt-2 -translate-x-1/2`}
      >
        <div
          style={{ backgroundColor: bgColor, color }}
          className={` border-l border-t border-gray-500  size-2 absolute -top-1 left-[45%]  rotate-45 `}
        />
        {label}
      </div>
    </div>
  );
}
