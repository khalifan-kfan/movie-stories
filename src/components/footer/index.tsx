import React from "react";

const Footer = () => {
  return (
    <div className="h-[6rem] w-full flex-col text-white bg-[#000] flex items-start px-3 justify-center">
      <p className="text-[13px] md:text-[18px]">
        Copyright {new Date().getFullYear()}. By Muwonge Khalifan.
      </p>
      <p className="text-[8px] md:text-[13px] text-[#d3cece]">With resources from <a target="blank" className="text-[#200e85]" href="http://www.omdbapi.com">http://www.omdbapi.com</a> open API.</p>
    </div>
  );
};

export default Footer;
