import Settings from "/Settings.gif";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full" aria-live="polite">
      <img 
        src={Settings} 
        alt="Loading, please wait..." 
        className="w-12 h-12 md:w-16 md:h-16" 
        onError={(e) => (e.target.style.display = 'none')} 
      />
      {/* <span>Loading...</span> */}
    </div>
  );
};

export default Loader;
