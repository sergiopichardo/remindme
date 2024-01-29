"use client";

import { Collection, Task } from "@prisma/client";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { useMemo, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CollectionColor, CollectionColors } from "@/lib/constants";
import { CaretDownIcon, CaretUpIcon, TrashIcon } from "@radix-ui/react-icons";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import PlusIcon from "./icons/PlusIcon";
import { 
    AlertDialog, 
    AlertDialogTrigger, 
    AlertDialogContent, 
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogTitle
} from "./ui/alert-dialog";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { deleteCollection } from "@/actions/collection";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import CreateTaskDialog from "./CreateTaskDialog";
import TaskCard from "./TaskCard";


interface CollectionCardProps {
    collection: Collection & {
        tasks: Task[]
    },
}

function CollectionCard({ collection }: CollectionCardProps) {

    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();
    const [isLoading, startTransition] = useTransition();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const tasks = collection.tasks;

    const removeCollection = async () => {
        try {
            await deleteCollection(collection.id);

            toast({
                title: "Success",
                description: "Collection deleted successfully"
            });

            router.refresh();
        } catch (error) {
            toast({
                title: "Error",
                description: "Cannot delete collection",
                variant: "destructive"
            })
        }
    };

    const tasksDone = useMemo(() => {
        return collection.tasks.filter(task => task.done).length;
    }, [collection.tasks]);
    
    const tasksTotal = tasks.length;
    const completedTaskRate = (tasksDone / tasksTotal) * 100;
    const progress = collection.tasks.length === 0 ? 0 : completedTaskRate;


    return (
        <>
            <CreateTaskDialog 
                open={showCreateModal}
                setOpen={setShowCreateModal}
                collection={collection}
            />
            <Collapsible 
                open={isOpen} 
                onOpenChange={setIsOpen}
            >
                <CollapsibleTrigger asChild>
                    <Button
                        variant="ghost"
                        className={cn("flex w-full justify-between p-6", 
                            CollectionColors[collection.color as CollectionColor],
                            isOpen && "rounded-b-none"
                        )}
                    >
                        <span className="text-white font-bold">
                            {collection.name}
                        </span>
                        {!isOpen && <CaretDownIcon className="h-6 w-6" />}
                        {isOpen && <CaretUpIcon className="h-6 w-6" />}
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent
                    className="flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg"
                >
                    {tasks.length === 0 && (
                        <Button 
                            className="flex items-center justify-center gap-1 p-8 py-12 rounded-none" 
                            variant="ghost"
                            onClick={() => setShowCreateModal(true)}
                        >
                            <p>There are no tasks yet:</p>
                            <span 
                                className={cn(
                                    "text-sm bg-clip-text text-transparent",
                                    CollectionColors[collection.color as CollectionColor]
                                )}
                            >
                                Create one
                            </span>
                        </Button>
                    )}

                    {tasks.length > 0 && (
                        <>
                            <Progress 
                                className="rounded-none"
                                value={progress}
                            />
                            <div className="p-4 gap-3 flex flex-col">
                                {tasks.map(task => (
                                    <TaskCard key={task.id} task={task}/>
                                ))}
                            </div>
                        </>
                    )}
                    <Separator />
                    <footer className="h-[40px] px-4 p-[2px] text-xs text-neutral-500 flex justify-between items-center">
                        <p>Created at {collection.createdAt.toDateString()}</p>
                        {isLoading && <div>Deleting...</div>}
                        {!isLoading && (
                            <div>
                                <Button 
                                    size="icon" 
                                    variant="ghost"
                                    onClick={() => setShowCreateModal(true)}
                                >
                                    <PlusIcon />
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button 
                                            size="icon" 
                                            variant="ghost"
                                            onClick={() => {
                                                startTransition(removeCollection)
                                            }}    
                                        >
                                            <TrashIcon />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogTitle>
                                            Are you absolutely sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your collection and all tasks inside it.
                                        </AlertDialogDescription>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction>
                                                Proceed
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        )}
                    </footer>
                </CollapsibleContent>
            </Collapsible >
        </>
    );
}

export default CollectionCard;