"use client";
import React from 'react'
import { Social } from "./social"

const cardClass = "transition duration-300 ease-in-out hover:scale-110 object-cover w-full h-full";

const TeamCard = () => {
    return (
        <div>
            <div className="p-4 grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-4 xs:gap-3 gap-4 ">
                <div className="bg-white shadow-md rounded-lg overflow-hidden p-[3px]">
                    <div className="aspect-w-16 aspect-h-9">
                        <img src="https://i.imgur.com/s3MQXGV.jpg" alt="Melvin Nogoy" className={cardClass} />
                    </div>
                    <div className="p-4 text-center text-white bg-teal-500">
                        <p className="text-lg font-bold">Melvin E. Nogoy</p>
                        <Social githubUrl="https://github.com/mviner000/"
                            facebookUrl="https://facebook.com/mviner000" />
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden p-[3px]">
                    <div className="aspect-w-16 aspect-h-9">
                        <img src="https://i.imgur.com/YtxdFt4.jpg" alt="Jethro Mabeza" className={cardClass} />
                    </div>
                    <div className="p-4 text-center text-white bg-teal-500">
                        <p className="text-lg font-bold">Jethro Mabeza</p>

                        <Social githubUrl="https://github.com/j3thzki"
                            facebookUrl="https://facebook.com/jethromabeza" />
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden p-[3px]">
                    <div className="aspect-w-16 aspect-h-9">
                        <img src="https://i.imgur.com/yB3fdBK.jpg" alt="Janzen De Asis" className={cardClass} />
                    </div>
                    <div className="p-4 text-center text-white bg-teal-500">
                        <p className="text-lg font-bold">Janzen De Asis</p>
                        <Social githubUrl="https://github.com/paizen"
                            facebookUrl="https://facebook.com/zen.ponce.de.asis" />
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden p-[3px]">
                    <div className="aspect-w-16 aspect-h-9">
                        <img src="https://i.imgur.com/L4tIPCd.jpg" alt="Jonn Esternon" className={cardClass} />
                    </div>
                    <div className="p-4 text-center text-white bg-teal-500">
                        <p className="text-lg font-bold">Jonn Esternon</p>
                        <Social githubUrl="https://github.com/esternonjonn"
                            facebookUrl="https://facebook.com/jonn.esternon" />
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden p-[3px]">
                    <div className="aspect-w-16 aspect-h-9">
                        <img src="https://i.imgur.com/YusSTZt.jpg" alt="John Miguel Macabagdal" className={cardClass} />
                    </div>
                    <div className="p-4 text-center text-white bg-teal-500">
                        <p className="text-lg font-bold mx-[0px] md:mx-[0px] lg:mx-[-30px]">Miguel Macabagdal</p>

                        <Social githubUrl="https://github.com/"
                            facebookUrl="https://facebook.com/miguel.macabagdal" />
                    </div>
                </div>
            </div></div>
    )
}

export default TeamCard