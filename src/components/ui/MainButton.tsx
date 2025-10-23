
interface MainButtonProps {
  text: string;
}

const MainButton:React.FC<MainButtonProps> = ({text}) => {
    return (
      <div>
        <button className="relative cursor-pointer inline-flex justify-center items-center w-36 lg:w-40 h-12 lg:h-14 bg-transparent border-2 border-[#59B2F4] rounded-lg font-bold text-[#59B2F4] tracking-widest overflow-hidden group">
          <span className="absolute top-0 left-0 w-0 h-full bg-[#59B2F4] z-10 transition-all duration-500 group-hover:w-full"></span>
          <span className="relative z-20 transition-colors duration-500 group-hover:text-[#191f36]">
           {text}
          </span>
        </button>
      </div>
    );
};

export default MainButton;