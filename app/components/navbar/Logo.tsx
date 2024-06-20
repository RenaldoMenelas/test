"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

function Logo({}: Props) {
  const router = useRouter();

  return (
    <div style={{ display: 'flex', fontWeight: 'bold', fontSize:"20px"}} onClick={() => router.push("/")}>
      cosp
         <span>
      <Image
        alt="logo"
        className="hidden md:block cursor-pointer"
        height="100"
        width="50"
        src="/assets/logo3.png"
      />
      </span>
      ce
    </div>
  );
}
export default Logo;