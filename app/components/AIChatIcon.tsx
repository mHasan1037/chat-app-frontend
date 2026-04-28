"use client"

const AIChatIcon = () => {

  const aiButtonClick = () =>{
     console.log('the ai is running')
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className="group relative flex items-center blue-background text-white rounded-full shadow-lg cursor-pointer
                   h-12 pr-12 pl-0 hover:pl-[88px] transition-all duration-300 ease-in-out overflow-hidden"
        onClick={()=> aiButtonClick()}
      >
        <span
          className="absolute font-semibold left-4 whitespace-nowrap opacity-0 -translate-x-4
                     group-hover:opacity-100 group-hover:translate-x-0
                     transition-all duration-300"
        >
          CHAT WITH
        </span>
        <span
          className="absolute right-0 w-12 h-12 flex items-center justify-center font-semibold"
        >
          AI
        </span>
      </div>
    </div>
  );
};

export default AIChatIcon;
