'use client'

import Image from "next/image";
import arrowRight from "@/assets/arrow-right.svg";

export const NavbarReg = () => {
    return (
        <div className="sticky top-0">
            <div className="flex justify-center items-center w-screen py-5 px-10 bg-black text-white text-sm gap-3">
                <p className="text-white/60 md:block hidden">
                    Should I just commit to the blockchain? No.
                </p>
                <div className="inline-flex gap-1 items-center">
                    <p>Let's change the world, with our own hands.</p>
                    <Image src={arrowRight} alt="Arrow icon" width={20} height={20} />
                </div>
            </div>

            <div className="py-5">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <Image src={arrowRight} alt="Logo" width={40} height={40} />
                        <Image src={arrowRight} alt="Logo mobile" width={20} height={20} className="md:hidden" />
                        <nav className="flex gap-10 items-center">
                            <a href="/">Home</a>
                            <a href="/property">Property</a>
                            <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight">
                                Sign In
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};
