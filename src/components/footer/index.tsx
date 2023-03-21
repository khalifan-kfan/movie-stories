import React from "react";

const Footer = () => {
  return (
    <div className="h-[6rem] w-full flex-col text-white bg-[#000] flex items-start px-3 justify-center">
      <p className="font-[13px]">
        Copyright {new Date().getFullYear()}. By Muwonge Khalifan.
      </p>
      <p className="font-[8px] text-[#d3cece]">With resources from <a target="blank" className="text-[#200e85]" href="http://www.omdbapi.com">http://www.omdbapi.com</a> open API.</p>
    </div>
  );
};

export default Footer;
