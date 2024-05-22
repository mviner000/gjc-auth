import { Metadata } from 'next'
import React from 'react'
import Simeon from './simeon'
import { StaticSidebar } from '@/components/static-sidebar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
    title: "GJCLibrary - About",
    description: "The About Page of GJCLibrary",
}


const AboutPage = () => {
    return (
        <>

            <div className="col-span-3 lg:col-span-4 lg:border-l p-10">
                <div className='grid grid-cols-1 md:grid-cols-2 mb-8'>



                    <div className="text-black dark:text-white text-left mt-7 ml-12 mr-12">
                        <p className="font-medium text-6xl mb-7">About</p>
                        <div className="max-w-4xl mx-auto rounded-lg mb-0.5">
                            <h2 className="text-orange-400 text-2xl">General Objective.</h2>
                            <p className="text-black dark:text-white text-lg">This website presents the catalogue of books available at the GJC Library. Here, you may time-in or time-out your library attendance, and plan (in advance) to take-out any book that you need to borrow. You may also post your own reviews of the books you have read, and engage in dialogue with fellow readers.</p>
                        </div>
                        <div className="max-w-4xl mx-auto rounded-lg mb-6">
                            <h2 className="text-orange-400 text-2xl">Library Services</h2>
                            <p className="text-black dark:text-white">To give quality services by providing information and resources that will enhance the realization of the vision, mission, and philosophy of the college. The GJC Library recognizes its vital role as an indispensable and functional instrument for quality instruction and research. The library aims to support instruction provided by the faculty and enriches learning of students in terms of assigned tasks and research works. Its organization, facilities, and library resources are geared towards dynamic and quality services to its clients.</p>
                        </div>
                        <button type="button" className="text-black dark:text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex hover:bg-blue-700 focus:ring-blue-800">
                            Explore GJCLIBRARY
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button>

                    </div>
                    <div>
                        <Simeon />
                    </div>
                </div>
                <details className="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg" open>
                    <summary className="text-lg max-w-40 text-slate-900 dark:text-white font-semibold select-none">
                        <span className=''>Did you know?</span>
                    </summary>
                    <div className="p-10 text-base leading-6 text-slate-600 dark:text-slate-400">
                        <p><strong>The school, founded in 1946,</strong> initially occupied a rented building that was once the residence of the Moreno family. It had 6 rooms, with one serving as the Principal’s Office and Teachers’ Room.
                            Adjacent to it were the library and laboratory, separated by a thin sawali partition. The library was far from being conducive to study because it was used as a classNameroom. What with the crowded space and the noise of the recitations going on, students had no other alternatives but do the studying and reading elsewhere. The other three rooms were classNamerooms. Like the library and laboratory, they were separated from each other by sawali partitions that served not even to muffle the voices in each className.

                        </p>
                        <p className='mt-8'>
                            After 5 years, the new building of General de Jesus Academy sprawled on A. Vallarta St. in San Isidro, Nueva Ecija upon its own lot. The building frontage by a new shingle with the Silver Star, Torch, and Book – our pledge to the institution and her trust to us – served as the main features. When formerly the school had six rooms, now she has nine (9). Interesting to all are the laboratory and library. In the former is gathered costly instruments and chemicals, chart, and specimens – the joy of any eager scientist. The library occupying a corner room with windows on both outward sides, literally overflows with maps and charts. Sets of encyclopedias, classNameical and modern literature, magazines, and newspapers – all these, the delight of any literary enthusiast the library has. And now, the library is in the true sense of a library. It is devoted solely to reading and study.

                            GJC recognizes the vital role of the library in fulfilling the educational requirements of the students; hence, it continues to be a part of the online learning community even during the pandemic. With the resuming of face-face learning, the library will continue to serve its clientele with a hyflex (hybrid-flexible) learning. This is a combination of onsite and offsite access to available library resources.
                        </p>
                    </div>
                </details>
            </div>

            <Footer />
        </>

    )
}

export default AboutPage