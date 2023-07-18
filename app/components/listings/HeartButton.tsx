'use client'

import { SafeUser } from "@/app/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavourite from "../hooks/useFavourite";

interface HeartButtonProps{
    listingId:string;
    currentUser?: SafeUser | null;
}

function HeartButton({listingId,currentUser}):React.FC<HeartButtonProps> {

    const {hasFavourited,toggleFavourite} = useFavourite({
      listingId,currentUser
    })

  return (
    <div
    onClick={toggleFavourite}
    className="
    relative
    hover:opacity-80
    transition
    cursor-pointer
    "
    >
       <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]"/>

       <AiFillHeart size={24} className={
        `
        ${hasFavourited ? 'fill-rose-500':'fill-neutral-500/70'}
        `
       }/>
    </div>
  )
}

export default HeartButton