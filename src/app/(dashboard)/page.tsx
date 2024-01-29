import SadFace from "@/components/icons/SadFace";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { wait } from "@/lib/wait";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import prisma from "@/lib/prisma"
import CreateCollectionBtn from "@/components/CreateCollectionButton";
import CollectionCard from "@/components/CollectionCard";


export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomeMsg />
      </Suspense>

      <Suspense fallback={<div>Loading collections...</div>}>
        <CollectionList />
      </Suspense>
    </>
  )
  
}

async function WelcomeMsg() {
  const user = await currentUser();
  // await wait(6000) 

  if (!user) {
    return (
      <div>error</div>
    )
  }

  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        Welcome, <br /> {user.firstName} {user.lastName}
      </h1>
    </div>
  );
}


function WelcomeMsgFallback() {
  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        <Skeleton className="w-[150px] h-[36px]" />
        <Skeleton className="w-[150px] h-[36px]" />
      </h1>
    </div>
  )
}



async function CollectionList() {
  const user = await currentUser(); 

  console.log("User:", user);

  const collections = await prisma?.collection.findMany({
    include: {
      tasks: true,
    },
    where: {
      userId: user?.id,
    }
  });


  if (collections?.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <Alert>
          <SadFace />
          <AlertTitle>
            There are no collections yet!
          </AlertTitle>
          <AlertDescription>
            Create a collection to get started
          </AlertDescription>
        </Alert>

        <CreateCollectionBtn />
      </div>
    )
  }

  return (
    <>
      <CreateCollectionBtn />

      Collections: {collections.length}
      <div className="flex flex-col gap-4 mt-6">
        {collections.map(collection => (
          <CollectionCard 
            key={collection.id} 
            collection={collection} 
          />
        ))}
      </div>
    </>
  )
}
