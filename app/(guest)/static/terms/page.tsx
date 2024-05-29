import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "GJCLibrary - FAQs",
    description: "The FAQs Page of GJCLibrary",
}

const TermsPage = () => {
    return (
        <>

            <div className="col-span-3 lg:col-span-4 lg:border-l p-10">
                <div className="">
                    <div className="text-black dark:text-white text-left mt-7 ml-12 mr-12">
                        <p className="font-medium text-6xl mb-7">Terms and Agreements</p>
                        <p className='text-black dark:text-slate-300 '>Welcome to General De Jesus Library! To ensure a smooth and productive experience for all users, please read and agree to the following terms and conditions before registering for our library services.</p>

                        <h2 className="text-black dark:text-slate-300 font-semibold mt-4">1. General Terms</h2>
                        <h3 className="text-black dark:text-slate-300  font-semibold mt-2">1.1. Eligibility</h3>
                        <p className='text-black dark:text-slate-300 '>Students: Must be currently enrolled at General De Jesus College.</p>
                        <p className='text-black dark:text-slate-300'>Non-Students: Must be approved by library administration and may include faculty, staff, alumni, and other community members.</p>

                        <h3 className="text-black dark:text-slate-300 font-semibold mt-2">1.2. Library Card Issuance</h3>
                        <p className='text-black dark:text-slate-300'>A valid library card will be issued upon successful registration.</p>
                        <p className='text-black dark:text-slate-300'>The card must be presented to borrow materials or access certain services.</p>

                        <h2 className="text-black dark:text-slate-300 font-semibold mt-4">2. User Responsibilities</h2>
                        <h3 className="text-black dark:text-slate-300 font-semibold mt-2">2.1. Care of Library Materials</h3>
                        <p className='text-black dark:text-slate-300'>Users are responsible for the care and timely return of all borrowed items.</p>
                        <p className='text-black dark:text-slate-300'>Any damage or loss of library materials must be reported immediately.</p>

                        <h3 className="text-black dark:text-slate-300 font-semibold mt-2">2.2. Fines and Fees</h3>
                        <p className='text-black dark:text-slate-300'>Late returns are subject to fines as outlined in the library fee schedule.</p>
                        <p className='text-black dark:text-slate-300'>Users must settle any outstanding fines or fees before borrowing additional materials.</p>

                        <h3 className="text-black dark:text-slate-300 font-semibold mt-2">2.3. Library Conduct</h3>
                        <p className='text-black dark:text-slate-300'>Respectful behavior towards staff and other patrons is expected at all times.</p>
                        <p className='text-black dark:text-slate-300'>Noise levels should be kept to a minimum to maintain a conducive study environment.</p>

                        <h3 className="text-black dark:text-slate-300 font-semibold mt-2">2.4. Use of Library Facilities</h3>
                        <p className='text-black dark:text-slate-300'>Facilities are to be used for academic and research purposes.</p>
                        <p className='text-black dark:text-slate-300'>Unauthorized use or damage to library property may result in penalties.</p>

                        <h2 className="text-black dark:text-slate-300 font-semibold mt-4">3. Borrowing Policies</h2>
                        <h3 className="text-black dark:text-slate-300 font-semibold mt-2">3.1. Loan Periods</h3>
                        <p className='text-black dark:text-slate-300'>Standard loan periods for books, multimedia, and other materials are as follows:</p>
                        <ul className="list-disc list-inside">
                            <li className='text-black dark:text-slate-300'>Books: 2 weeks (renewable once if not reserved by another user)</li>
                            <li className='text-black dark:text-slate-300'>Multimedia: 1 week (non-renewable)</li>
                            <li className='text-black dark:text-slate-300'>Reference materials: In-library use only</li>
                        </ul>

                        <h3 className="text-black dark:text-slate-300 font-semibold mt-2">3.2. Renewals and Holds</h3>
                        <p className='text-black dark:text-slate-300'>Materials may be renewed online or at the library desk, subject to certain conditions.</p>
                        <p className='text-black dark:text-slate-300'>Holds can be placed on items currently checked out.</p>

                        <h2 className="text-black dark:text-slate-300 font-semibold mt-4">4. Digital Resources and Computer Use</h2>
                        <h3 className="text-black dark:text-slate-300 font-semibold mt-2">4.1. Access to Digital Resources</h3>
                        <p className='text-black dark:text-slate-300'>Access to digital resources (e-books, databases, etc.) is provided to registered users.</p>
                        <p className='text-black dark:text-slate-300'>Users must comply with licensing agreements and copyright laws.</p>

                        <h3 className="text-black dark:text-slate-300 font-semibold mt-2">4.2. Computer and Internet Use</h3>
                        <p className='text-black dark:text-slate-300'>Computers are available for academic and research purposes.</p>
                        <p className='text-black dark:text-slate-300'>Misuse of computers, including accessing inappropriate content or violating network policies, is prohibited.</p>

                        <h2 className="text-black dark:text-slate-300 font-semibold mt-4">5. Privacy and Data Protection</h2>
                        <h3 className="text-black dark:text-slate-300 font-semibold mt-2">5.1. User Data</h3>
                        <p className='text-black dark:text-slate-300'>Personal information collected during registration is protected in accordance with General De Jesus College privacy policy.</p>
                        <p className='text-black dark:text-slate-300'>User data will not be shared with third parties without consent, except as required by law.</p>

                        <h3 className="text-black dark:text-slate-300 font-semibold mt-2">5.2. Usage Monitoring</h3>
                        <p className='text-black dark:text-slate-300'>The library reserves the right to monitor usage of its resources and facilities to ensure compliance with these terms.</p>

                        <h2 className="text-black dark:text-slate-300 font-semibold mt-4">6. Termination of Privileges</h2>
                        <h3 className="text-black dark:text-slate-300 font-semibold mt-2">6.1. Violations</h3>
                        <p className='text-black dark:text-slate-300'>Violations of these terms may result in suspension or termination of library privileges.</p>
                        <p className='text-black dark:text-slate-300'>Serious offenses may be referred to school administration for further action.</p>

                        <h3 className="text-black dark:text-slate-300 font-semibold mt-2">6.2. Appeals</h3>
                        <p className='text-black dark:text-slate-300'>Users may appeal decisions regarding suspension or termination of privileges to the library administration.</p>

                        <p className="mt-4 text-black dark:text-slate-300">By registering for the General De Jesus Library Management System, you acknowledge that you have read, understood, and agree to abide by these terms and conditions.</p>

                    </div>
                </div>

            </div>
        </>
    )
}

export default TermsPage