import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <>
            <div className="bg-black pt-3 pb-5 px-2 ">
                <div className="lg:mx-32 lg:pb-12">
                    <div className=" grid grid-cols-2 ">
                        <div className="text-white mx-5 my-3 md:mx-10 md:my-7">
                            <ul>
                                <li className="inline-block">
                                    <Image
                                        priority={true}
                                        className="inline-block ml-[-4px] mr-1 mt-[-7px]"
                                        width={22}
                                        height={22}
                                        src="https://i.imgur.com/yyuB3s5.png"
                                        alt="General De Jesus Logo"
                                    />
                                    <span className="font-bold">GJC</span>
                                </li>
                                <li><Link className="hover:text-blue-500" href="/static/about">About</Link></li>
                                <li><Link className="hover:text-blue-500" href="/static/faqs">FAQs</Link></li>
                                <li><Link className="hover:text-blue-500" href="/static/terms">Terms & Agreements</Link></li>

                            </ul>
                        </div>
                        <div className="text-white mx-5 my-3 md:my-7">
                            <ul>
                                <li><Link className="hover:text-blue-500" href="/static/contacts">Contacts</Link></li>
                                <li><Link className="hover:text-blue-500" href="/static/teams">Team</Link></li>
                                <li><Link className="hover:text-blue-500" href="/">Landing Page</Link></li>
                            </ul></div>
                    </div>
                    <div className="text-white w-full justify-center text-center">
                        <span className="text-white font-semibold">❤️ Made with love from GJC.</span>
                        <span> Hope You Liked It. Buy us a coffee ☕</span>
                        {/* <p> ©️ Copyright</p> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;