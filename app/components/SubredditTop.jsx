import React from "react";
import JoinButton from "./JoinButton";
const SubredditTop = ({ slug, name, description, image, bannerImage }) => {
  return (
    <div className="mt-8 mr-4">
      <div>
        <img className="rounded-xl" src={bannerImage} />
      </div>
      <div className="flex items-center ml-4 mt-4 md:justify-start justify-between">
        <div className="flex items-center">
          <img
            src={image}
            className="mdw-24   md:h-24 w-16 h-16 rounded-full"
          />
          <div className="md:text-4xl text-2xl font-bold ml-4">r/{name}</div>
        </div>
        <div className="text-lg font-bold ml-4">
          <JoinButton slug={slug} />
        </div>
      </div>
      <div className="border-2 text-lg   p-2 my-4  rounded-xl">
        {description}
      </div>
    </div>
  );
};

export default SubredditTop;
