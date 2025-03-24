import { cn, formatDate } from "@/lib/utils"
import { EyeIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Skeleton } from "./ui/skeleton"
import { Author, Startup } from "@/sanity/types"

export type StartupTypeCard = Omit<Startup, "author"> & {author? : Author}

// export default function StartupCard({ post }: { post: StartupTypeCard }) {
//     const { _createdAt, views, author, title, category, _id, image, description } = post
//     return (
//         <li className="bg-white border-[5px] border-black py-6 px-5 rounded-[22px] shadow-200 hover:border-[#EE2B69] transition-all duration-500 hover:shadow-300 hover:bg-[#FFE8F0] group">

//             <div className="flex items-center justify-between">
//                 {/* Date */}
//                 <p className="font-medium text-[16px] bg-[FFE8F0]-100 py-2 rounded-full group-hover:bg-white-100">
//                     {formatDate(_createdAt)}
//                 </p>

//                 {/* Eye Icon and Views */}
//                 <div className="flex items-center gap-1.5">
//                     <EyeIcon className="size-6 text-[#EE2B69]" />
//                     <span>{views}</span>
//                 </div></div>

//             <div className="flex justify-between mt-5 gap-5">
//                 <div className="flex-1">
//                     <Link href={`/user/${author?._id}`}>
//                         <p className="text-lg font-medium line-clamp-1">{author?.name}</p>
//                     </Link>
//                     <Link href={`/startup/${_id}`}>
//                         <h3 className="text-2xl font-semibold line-clamp-1">{title}</h3>
//                     </Link>
//                 </div>

//                 <Link href={`/user/${author?._id}`}>
//                     <Image src={author?.image!} alt={author?.name!} width={48} height={48}
//                         className="rounded-full" />
//                 </Link>
//             </div>

//             <Link href={`/startup/${_id}`}>
//                 <p className="font-normal text-[16px] line-clamp-2 my-3 text-black-100 break-all">
//                     {description}
//                 </p>

//                 <img src={image} alt="placeholder" className="w-full h-[164px] rounded-[10px] object-cover;" />
//             </Link>

//             <div className="flex items-center justify-between gap-3 mt-5">
//                 <Link href={`/?query=${category?.toLowerCase()}`}>
//                     <p className="text-xl font-medium">{category}</p>
//                 </Link>

//                 {/* <button className="rounded-full bg-black-200 font-medium text-[16px] text-white px-5 py-3" asChild>
//                     <Link href={`/startup/${_id}`}>
//                     Details 
//                     </Link>
//                 </button> */}

//                 <Link href={`/startup/${_id}`} className="inline-block">
//                     <button className="rounded-full bg-gray-800 font-medium text-[16px] text-white px-5 py-3">
//                         Details
//                     </button>
//                 </Link>

//             </div>



//         </li>
//     )
// };

export default function StartupCard({ post }: { post: StartupTypeCard }) {
    const { _createdAt, views, author, title, category, _id, image, description } = post
    return (
        <li className="bg-white border-[5px] border-black py-6 px-5 rounded-[22px] shadow-200 hover:border-[#EE2B69] transition-all duration-500 hover:shadow-300 hover:bg-[#FFE8F0] group">
            <div className="flex items-center justify-between">
                <p className="font-medium text-[16px] bg-[FFE8F0]-100 py-2 rounded-full group-hover:bg-white-100">
                    {formatDate(_createdAt)}
                </p>
                <div className="flex items-center gap-1.5">
                    <EyeIcon className="size-6 text-[#EE2B69]" />
                    <span>{views}</span>
                </div>
            </div>

            <div className="flex justify-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${author?._id}`}>
                        <p className="text-lg font-medium line-clamp-1">{author?.name}</p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className="text-2xl font-semibold line-clamp-1">{title}</h3>
                    </Link>
                </div>

                <Link href={`/user/${author?._id}`}>
                    {author?.image && (
                        <Image 
                            src={author.image} 
                            alt={author.name || 'Author image'} 
                            width={48} 
                            height={48}
                            className="rounded-full" 
                        />
                    )}
                </Link>
            </div>

            <Link href={`/startup/${_id}`}>
                <p className="font-normal text-[16px] line-clamp-2 my-3 text-black-100 break-all">
                    {description}
                </p>

                {image && (
                    <Image 
                        src={image} 
                        alt="Startup image" 
                        width={500} 
                        height={164}
                        className="w-full h-[164px] rounded-[10px] object-cover"
                    />
                )}
            </Link>

            <div className="flex items-center justify-between gap-3 mt-5">
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className="text-xl font-medium">{category}</p>
                </Link>
                <Link href={`/startup/${_id}`} className="inline-block">
                    <button className="rounded-full bg-gray-800 font-medium text-[16px] text-white px-5 py-3">
                        Details
                    </button>
                </Link>
            </div>
        </li>
    )
}

export const StartupCardSkeleton = () => (
    <>
    {[0, 1, 2, 3, 4].map((index: number) => (
        <li key={cn('skeleton', index)}>
            <Skeleton className="w-full h-96 rounded-[22px] bg-zinc-400"/>

        </li>
    )
    )}
    </>
)