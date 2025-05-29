'use client'

import Image from "next/image";
import arrowRight from "@/assets/arrow-right.svg";
import Placeholder from "@/assets/placeholder.svg";
import Link from "next/link";

export const Navbar = () => {
    return (
        <div className="sticky top-0">
            <div className="flex justify-center items-center w-screen py-5 px-10 bg-black text-white text-sm gap-3">
                <p className="text-white/60 md:block hidden">
                    This page is still under development process.
                </p>
                <div className="inline-flex gap-1 items-center">
                    <p>Thank you for trusting our service.</p>
                    <Image src={arrowRight} alt="Arrow icon" width={20} height={20} />
                </div>
            </div>

            <div className="py-5 bg-white text-black">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-4">
                            <Image src={Placeholder} alt="Logo" width={40} height={40} />
                            <span className="text-xl font-extrabold hidden md:inline">Realty Registry</span>
                        </Link>
                        <Link href="/" className="md:hidden">
                            <Image src={Placeholder} alt="Logo mobile" width={20} height={20} className="md:hidden" />
                        </Link>
                        <nav className="flex gap-10 items-center">
                            <Link href="/">Properties</Link>
                            <Link href="/registry-manager">Registry Manager</Link>
                            <Link href="/approval-manager">Approval Manager</Link>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};