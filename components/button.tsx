"use client";

import { FaArrowRight } from "react-icons/fa";

export default function Button(){
    return(
        <button className="py-2 px-6 border-2 text-sm rounded-lg flex gap-2 items-center bg-[#202020] ">
            See More
            <FaArrowRight />
        </button>
    )
}