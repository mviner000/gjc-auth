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
                    className="inline-block ml-[-4px] mr-1 mt-[-7px]"
                        width={22}
                        height={22}
                        src="https://i.imgur.com/yyuB3s5.png" 
                        alt="General De Jesus Logo"
                        /> 
                <span className="font-bold">GJC</span>
                </li>
                <li>About</li>
                <li>Terms & Agreements</li>
            </ul>
        </div>
        <div className="text-white mx-5 my-3 md:my-7">
            <ul>
                <li>Teams</li>
                <li><Link className="hover:text-blue-500" href="/shop">Shop</Link></li>
                <li>Contacts</li>
            </ul></div>
       </div>
       <div className="text-white w-full justify-center text-center">
       <span className="text-white font-semibold">❤️ Made with love from GJC.</span> 
       <span> Hope You Liked It. Buy us a coffee ☕</span>
       <p> ©️ Copyright</p>
       </div>
       </div>
       </div>
       </>
    )
}

export default Footer;