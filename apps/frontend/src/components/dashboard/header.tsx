import React from "react";
import DynamicBreadcrumb from "./breadcrumbs";

export default async function Header() {

    return (
        <>
            <nav className="flex items-center justify-between px-4 py-4 gap-2 w-full">
                <div className="hidden md:flex md:flex-1 items-center">
                    <DynamicBreadcrumb separator={"/"} />
                </div>
            </nav>
        </>
    );
}
