import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-slate-900 text-white fixed bottom-0 w-full">
      <div className="logo font-bold text-white text-2xl">
        <span className="text-green-500"> &lt;</span>
        <span>Pass</span>
        <span className="text-green-500">FORT/&gt;</span>
      </div>
      <div className="flex">
        created with{" "}
        <img className="w-[20px] mx-1" src="icons/heart.svg" alt="" /> by
        Sabyasachi
      </div>
    </div>
  );
};

export default Footer;
