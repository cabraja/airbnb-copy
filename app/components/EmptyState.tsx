'use client'

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps{
    title?:string;
    subtitle?:string;
    showReset?:boolean;
}

function EmptyState({title='No exact matches', subtitle='Try changing some of the filters', showReset}):React.FC<EmptyStateProps> {

    const router = useRouter();

  return (
    <div className="
    h-[60vh]
    flex
    flex-col
    gap-2
    justify-center
    items-center
    ">
        <Heading title={title} subtitle={subtitle} center={true}/>

        <div className="w-48 mt-4">
            {
                showReset && (
                    <Button 
                        outline={true}
                        label={"Remove all filters"}
                        onClick={() => router.push('/')}
                    />
                )
            }
        </div>
    </div>
  )
}

export default EmptyState