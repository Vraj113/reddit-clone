import ContentLoader from "react-content-loader";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ShareIcon from "@mui/icons-material/Share";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
export const PostLoader = () => (
  <div className="md:w-[800px] p-4  my-4    bg-white rounded-3xl shadow-md">
    <ContentLoader
      uniqueKey="posts"
      viewBox="0 0 380 80"
      backgroundColor="#9c9c9c"
      foregroundColor="#c9c9c9"
    >
      <rect x="0" y="0" rx="3" ry="3" width="30" height="8" />
      <rect x="35" y="0" rx="3" ry="3" width="40" height="8" />
      <rect x="80" y="0" rx="3" ry="3" width="80" height="8" />
      <rect x="0" y="18" rx="3" ry="3" width="300" height="10" />
      <rect x="0" y="38" rx="3" ry="3" width="380" height="10" />
      <rect x="0" y="53" rx="3" ry="3" width="380" height="10" />
      <rect x="0" y="68" rx="3" ry="3" width="280" height="10" />
    </ContentLoader>
    <div className="flex gap-x-2   border-2 rounded-full bg-zinc-50 w-fit p-2 border-zinc-500  mt-4">
      <div className="group p-1 px-2 rounded-xl   border-black cursor-pointer ">
        <div className="group-hover:hidden">
          <ThumbUpOutlinedIcon />
        </div>
        <div className="hidden group-hover:block">
          <ThumbUpIcon />
        </div>
      </div>
      <div className="p-1 px-2 rounded-xl   border-black cursor-pointer ">
        {0}
      </div>
      <div className=" group p-1 px-2 rounded-xl  border-black cursor-pointer ">
        <ThumbDownOutlinedIcon className="group-hover:hidden" />
        <div className="hidden group-hover:block">
          <ThumbDownIcon />
        </div>
      </div>
      <div className="p-1 px-2 rounded-xl  border-black cursor-pointer pt-2 ">
        <svg
          fill="white"
          height="20"
          viewBox="-2 -2 52 52"
          width="20"
          className=""
        >
          <path
            clipRule="evenodd"
            d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
            stroke="black"
            strokeWidth="3"
          ></path>
        </svg>
      </div>
      <div className=" group p-1 px-2 rounded-xl  border-black cursor-pointer ">
        <div className="group-hover:hidden">
          <ShareOutlinedIcon />
        </div>
        <div className="hidden group-hover:block">
          <ShareIcon />
        </div>
      </div>
    </div>
  </div>
);
export const CommentLoader = () => {
  return (
    <div className="bg-zinc-100 p-4 rounded-xl my-2 w-full">
      <div className="max-w-[1000px]">
        <ContentLoader
          uniqueKey="comments"
          viewBox="0 0 380 40"
          backgroundColor="#0023ad"
          foregroundColor="#e6e6e6"
        >
          {/* Only SVG shapes */}
          <rect x="0" y="0" rx="3" ry="3" width="60" height="10" />
          <rect x="70" y="1" rx="3" ry="3" width="50" height="8" />
          <rect x="0" y="16" rx="3" ry="3" width="380" height="8" />
          <rect x="0" y="28" rx="3" ry="3" width="380" height="8" />
        </ContentLoader>
        <div className="flex   mt-2     w-fit py-2    ">
          <div className="group p-1 px-2 rounded-xl   border-black cursor-pointer ">
            <div className="group-hover:hidden">
              <ThumbUpOutlinedIcon />
            </div>
            <div className="hidden group-hover:block">
              <ThumbUpIcon />
            </div>
          </div>
          <div className="p-1 px-2 rounded-xl   border-black cursor-pointer ">
            {0}
          </div>
          <div className=" group p-1 px-2 rounded-xl  border-black cursor-pointer ">
            <ThumbDownOutlinedIcon className="group-hover:hidden" />
            <div className="hidden group-hover:block">
              <ThumbDownIcon />
            </div>
          </div>
          <div className=" group p-1 px-2 rounded-xl  border-black cursor-pointer ">
            <div className="group-hover:hidden">
              <ShareOutlinedIcon />
            </div>
            <div className="hidden group-hover:block">
              <ShareIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
