"use client";

import axios from "axios";

import { Sidebar } from "@/components/sidebar";
import { SideBarRight } from "@/components/sidebar-right";

import { playlists } from "@/actions/playlists"
import BookDetailsPage from "./book-details";


const appUrl = process.env.NEXT_PUBLIC_APP;

const BookDetails = () => {

    return (
        <div>


            <div className="px-10 mt-7">
                <div className="mt-3 h-full ">
                    <div className="grid lg:grid-cols-7">
                        <Sidebar playlists={playlists} className="hidden lg:block" />


                        <div className="m-2 col-span-3 lg:col-span-5 lg:border-l lg:border-r">
                            <BookDetailsPage />

                        </div>

                        <SideBarRight className="hidden lg:block" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const fetcher = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
};


export default BookDetails;