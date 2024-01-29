"use client";

import { useState } from "react"
import { Button } from "./ui/button"
import CreateCollectionSheet from "./CreateCollectionSheet";

export default async function CreateCollectionBtn() {
    const [open, setOpen] = useState(false)

    const handleOpenChange = (open: boolean) => setOpen(open);

    return (
        <div className="w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-px">
            <Button
                variant="outline"
                className="dark:txt-white w-full dark:bg-neutral-950 bg-white"
                onClick={() => setOpen(true)}
            >
                <span className="bg-gradient-to-r from-red-500 to-orange-500 hover:to-orange-800 bg-clip-text text-transparent">
                    Create Collections
                </span>
            </Button>
            
            <CreateCollectionSheet open={open} onOpenChange={handleOpenChange} />
        </div>
    )
}