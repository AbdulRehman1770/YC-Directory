import { auth } from '@/auth';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import UserStartups from '@/components/UserStartups';
import { Suspense } from 'react';
import { StartupCardSkeleton } from '@/components/StartupCard';

const page = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const session = await auth();

    const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
    if (!user) return notFound();

    return (
        <>
            <section className='w-full pb-10 pt-20 px-6 max-w-7xl mx-auto lg:flex-row flex-col flex gap-10'>
                <div className='w-80 px-6 pb-6 pt-20 flex flex-col justify-center items-center bg-[#EE2B69] border-[5px] border-black shadow-100 rounded-[30px] relative z-0 h-fit max-lg:w-full'>
                    <div className='w-11/12 bg-white border-[5px] border-black rounded-[20px] px-5 py-3 absolute -top-9 after:absolute after:content-[""] after:-top-1 after:right-0 after:-skew-y-6 after:bg-black after:-z-[1] after:rounded-[20px] after:w-full after:h-[60px] before:absolute before:content-[""] before:-bottom-1 before:left-0  before:-skew-y-6 before:w-full before:h-[60px] before:bg-black  before:-z-[1] before:rounded-[20px] shadow-100'>

                        <h3 className='text-24-black uppercase text-center line-clamp-1'>
                            {user.name}

                        </h3>
                    </div>

                    <Image
                        src={user.image}
                        width={220}
                        height={220}
                        alt={user.name}
                        className='rounded-full object-cover border-[3px] border-black'
                    />

                    <p className='text-2xl text-[#FFE8F0] font-extrabold mt-7 '>
                        @{user?.username}
                    </p>

                    <p className='mt-1 text-center text-[#FFE8F0] text-xl font-normal'>
                        {user?.bio}
                    </p>
                </div>

                <div className='flex flex-1 flex-col gap-5 lg:mt-5 '>
                    <p className='text-3xl font-bold'>
                        {session?.id == id ? "Your" : "ALL"} Startups
                    </p>

                    <ul className='grid sm:grid-cols-2 gap-5'>
                        {/* USERSTARTUPS */}
                        <Suspense fallback={<StartupCardSkeleton/>}>
                        <UserStartups id={id}/>
                        </Suspense>
                        
                    </ul>
                </div>
            </section>
        </>
    );
};

export default page;