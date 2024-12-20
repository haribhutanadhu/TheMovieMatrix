"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/youtube"), { ssr: false });

export default function VideoPlayer({ video_key }) {
  return (
    <div className="relative m-auto flex w-full flex-col justify-center lg:m-0 border border-gray-500 border-opacity-20">
      <ReactPlayer
        playing={true}
        width="100%"
        url={`https://www.youtube.com/watch?v=${video_key}`}
      />
    </div>
  );
}
