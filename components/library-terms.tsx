"use client";

import { useEffect, useState } from 'react';
import Modal from '@/components/modal';

const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(date.getFullYear()).slice(2); // Get last two digits of the year
    return `${month}/${day}/${year}`;
};

const LibraryTerms: React.FC = () => {
    const [currentDate, setCurrentDate] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(true);
    const [checked, setChecked] = useState(true);

    useEffect(() => {
        const today = new Date();
        const formattedDate = formatDate(today);
        setCurrentDate(formattedDate);
    }, []);

    const handleChange = () => {
        setChecked(!checked);
        if (!checked) {

            alert("Thanks, you can proceed to registration now!");
        } else {
            // Proceed with registration logic

            alert("You cannot register to our website, sorry."); // Placeholder for successful registration logic
        }
    };


    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        console.log('Checkbox is checked:', isChecked); // Log the checkbox state
        setIsModalOpen(false);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // toggle the isChecked state
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleCloseModal(); // Call handleCloseModal to close the modal and log the checkbox value
        if (!isChecked) {
            alert("You cannot register to our website, sorry.");
        } else {
            // Proceed with registration logic
            alert("Registration successful!"); // Placeholder for successful registration logic
        }
    };

    return (
        <div>
            <p className="text-xs font-normal">
                By clicking Sign Up, you agree to our
                <a onClick={handleOpenModal} className="text-blue-700 cursor-pointer no-underline hover:underline"> Terms, Privacy Policy. </a>
                You may receive Email Notifications from us and can opt out any time.
            </p>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="General De Jesus Library Terms and Agreements">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <div className='items-center'>
                            <div className='flex-none'>
                                <h1 className="text-black text-lg font-bold mb-4">School Library Management System Registration: Terms and Agreement</h1>
                                <p className='text-black '>Welcome to General De Jesus Library! To ensure a smooth and productive experience for all users, please read and agree to the following terms and conditions before registering for our library services.</p>

                                <h2 className="text-black font-semibold mt-4">1. General Terms</h2>
                                <h3 className="text-black  font-semibold mt-2">1.1. Eligibility</h3>
                                <p className='text-black '>Students: Must be currently enrolled at General De Jesus College.</p>
                                <p className='text-black'>Non-Students: Must be approved by library administration and may include faculty, staff, alumni, and other community members.</p>

                                <h3 className="text-black font-semibold mt-2">1.2. Library Card Issuance</h3>
                                <p className='text-black'>A valid library card will be issued upon successful registration.</p>
                                <p className='text-black'>The card must be presented to borrow materials or access certain services.</p>

                                <h2 className="text-black font-semibold mt-4">2. User Responsibilities</h2>
                                <h3 className="text-black font-semibold mt-2">2.1. Care of Library Materials</h3>
                                <p className='text-black'>Users are responsible for the care and timely return of all borrowed items.</p>
                                <p className='text-black'>Any damage or loss of library materials must be reported immediately.</p>

                                <h3 className="text-black font-semibold mt-2">2.2. Fines and Fees</h3>
                                <p className='text-black'>Late returns are subject to fines as outlined in the library fee schedule.</p>
                                <p className='text-black'>Users must settle any outstanding fines or fees before borrowing additional materials.</p>

                                <h3 className="text-black font-semibold mt-2">2.3. Library Conduct</h3>
                                <p className='text-black'>Respectful behavior towards staff and other patrons is expected at all times.</p>
                                <p className='text-black'>Noise levels should be kept to a minimum to maintain a conducive study environment.</p>

                                <h3 className="text-black font-semibold mt-2">2.4. Use of Library Facilities</h3>
                                <p className='text-black'>Facilities are to be used for academic and research purposes.</p>
                                <p className='text-black'>Unauthorized use or damage to library property may result in penalties.</p>

                                <h2 className="text-black font-semibold mt-4">3. Borrowing Policies</h2>
                                <h3 className="text-black font-semibold mt-2">3.1. Loan Periods</h3>
                                <p className='text-black'>Standard loan periods for books, multimedia, and other materials are as follows:</p>
                                <ul className="list-disc list-inside">
                                    <li className='text-black'>Books: 2 weeks (renewable once if not reserved by another user)</li>
                                    <li className='text-black'>Multimedia: 1 week (non-renewable)</li>
                                    <li className='text-black'>Reference materials: In-library use only</li>
                                </ul>

                                <h3 className="text-black font-semibold mt-2">3.2. Renewals and Holds</h3>
                                <p className='text-black'>Materials may be renewed online or at the library desk, subject to certain conditions.</p>
                                <p className='text-black'>Holds can be placed on items currently checked out.</p>

                                <h2 className="text-black font-semibold mt-4">4. Digital Resources and Computer Use</h2>
                                <h3 className="text-black font-semibold mt-2">4.1. Access to Digital Resources</h3>
                                <p className='text-black'>Access to digital resources (e-books, databases, etc.) is provided to registered users.</p>
                                <p className='text-black'>Users must comply with licensing agreements and copyright laws.</p>

                                <h3 className="text-black font-semibold mt-2">4.2. Computer and Internet Use</h3>
                                <p className='text-black'>Computers are available for academic and research purposes.</p>
                                <p className='text-black'>Misuse of computers, including accessing inappropriate content or violating network policies, is prohibited.</p>

                                <h2 className="text-black font-semibold mt-4">5. Privacy and Data Protection</h2>
                                <h3 className="text-black font-semibold mt-2">5.1. User Data</h3>
                                <p className='text-black'>Personal information collected during registration is protected in accordance with General De Jesus College privacy policy.</p>
                                <p className='text-black'>User data will not be shared with third parties without consent, except as required by law.</p>

                                <h3 className="text-black font-semibold mt-2">5.2. Usage Monitoring</h3>
                                <p className='text-black'>The library reserves the right to monitor usage of its resources and facilities to ensure compliance with these terms.</p>

                                <h2 className="text-black font-semibold mt-4">6. Termination of Privileges</h2>
                                <h3 className="text-black font-semibold mt-2">6.1. Violations</h3>
                                <p className='text-black'>Violations of these terms may result in suspension or termination of library privileges.</p>
                                <p className='text-black'>Serious offenses may be referred to school administration for further action.</p>

                                <h3 className="text-black font-semibold mt-2">6.2. Appeals</h3>
                                <p className='text-black'>Users may appeal decisions regarding suspension or termination of privileges to the library administration.</p>

                                <p className="mt-4 text-black">By registering for the General De Jesus Library Management System, you acknowledge that you have read, understood, and agree to abide by these terms and conditions.</p>
                                <p className='text-black'>Date: {currentDate}</p>

                                <div className='justify-right mr-1 text-right'>
                                    <input
                                        type="checkbox"
                                        id="togglepwd"
                                        checked={checked}
                                        onChange={handleChange}
                                        className="w-3.5 h-3.5 border-gray-400"
                                    />
                                    <label
                                        htmlFor="togglepwd"
                                        className="text-gray-400 ml-1 text-xs font-normal leading-none"
                                    >
                                        I agree to these terms and agreements
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded"
                            type="submit"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default LibraryTerms;
