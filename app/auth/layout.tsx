"use client";

import { cn } from "@/lib/utils"

import localFont from 'next/font/local'


// Font files can be colocated inside of `pages`
const myFont = localFont({ src: './../fonts/MonotypeOldEnglish.woff2' })


const AuthLayout = ({ 
    children 
}:{ 
    children: React.ReactNode
}) => {

  return (
    <div className="pt-2 pb-5 h-full bg-gradient-to-t from-emerald-600 via-50% to-emerald-700 to-70%">
      <div className="text-white flex flex-col items-center justify-center ">
      {/* <img className="border-4 border-double border-white rounded-full" width="128" height="128" src="https://i.imgur.com/yyuB3s5.png" alt="gjc_logo"/> */}
      <h1 className={cn(
          "text-5xl ",
          myFont.className
          )}>General De Jesus College
          </h1>
            <h1>Vallarta St., Poblacion, San Isidro, Nueva Ecija</h1>
        </div>
    <div className=" flex items-center justify-center mt-5">
        {children}
    </div>
    </div>
  )
}

export default AuthLayout