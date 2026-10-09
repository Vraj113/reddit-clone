"use client";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";

export default function VoteBar({ votes = 0, onComment }) {
  return (
    <div className="flex items-center gap-1 border-t border-slate-100 px-4 py-2">
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100"
        aria-label="Upvote"
      >
        <ArrowUpwardOutlinedIcon sx={{ fontSize: 16 }} />
      </button>
      <span className="min-w-[2rem] text-center text-xs font-semibold text-slate-800">
        {votes}
      </span>
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100"
        aria-label="Downvote"
      >
        <ArrowDownwardOutlinedIcon sx={{ fontSize: 16 }} />
      </button>
      <button
        type="button"
        onClick={onComment}
        className="ml-2 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100"
      >
        <ChatBubbleOutlineIcon sx={{ fontSize: 15 }} />
        Comments
      </button>
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100"
      >
        <ShareOutlinedIcon sx={{ fontSize: 15 }} />
        Share
      </button>
    </div>
  );
}
