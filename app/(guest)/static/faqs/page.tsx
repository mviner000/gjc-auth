import Footer from '@/components/footer'
import { StaticSidebar } from '@/components/static-sidebar'

import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: "GJCLibrary - FAQs",
    description: "The FAQs Page of GJCLibrary",
}

const FaqsPage = () => {
    return (
        <> <div className="">

            <div className="text-black dark:text-white text-center">

                <div className="grid lg:grid-cols-5 ">
                    <StaticSidebar className="hidden lg:block" />

                    <div className="col-span-3 lg:col-span-4 lg:border-l p-10">
                        <div className="">
                            <div className="text-black dark:text-white text-left mt-7 ml-12 mr-12">
                                <p className="font-medium text-6xl mb-7">FAQs</p>
                                <p className="text-2xl text-orange-400 mt-6">What are the conveniences of using this website?</p>
                                <p className="font-medium">Using this website, you no longer need to physically look for a book in the library shelves. By borrowing books thru this website in advance, our library staff will be able to prepare the books you need right away. In this way, borrowing a book will be fast and sleek.</p>
                                <p className="text-2xl text-orange-400 mt-6">Can I avail a PDF version of the books in the library?</p>
                                <p className="font-medium">Nope, not a single PDF version of any book is available at the moment.</p>
                            </div>
                            <div>
                                <button className="rounded-md mt-7 m-12 px-4 py-2 bg-orange-400 hover:bg-cyan-200 focus:outline-none
        focus:bg-green-950"> Submit a question<i className="fas fa-arrow-right ml-2"></i></button>
                            </div>
                            <div className="text-black dark:text-white text-left mt-1 ml-12 mr-12">
                                <p className="text-2xl text-orange-400 mt-6">How can I borrow a book?</p>
                                <p className="font-medium">At the home page of this website, click the borrow a book button.</p>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
            <Footer />
        </>
    )
}

export default FaqsPage