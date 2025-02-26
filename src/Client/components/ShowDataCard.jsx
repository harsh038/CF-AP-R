import React from "react";

const ShowDataCard = ({ number, text }) => {
  return (
    <div className="border w-full h-full flex justify-center items-center">
      <h3 className="text-3xl">
        {number} <br />
        {text}
      </h3>
    </div>
  );
};

export default ShowDataCard;
