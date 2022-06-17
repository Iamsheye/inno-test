import React from "react";

const Pill = ({ text }: { text: string }) => {
  return (
    <span className="ml-1.5 inline-block rounded-lg bg-[#afb8c133] px-2 py-0.5 text-center text-sm font-medium">
      {text}
    </span>
  );
};

export default Pill;
