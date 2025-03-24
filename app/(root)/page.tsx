import SearchItem from "../../components/searchForm";
import StartupCard , { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";


export default async function Home({searchParams} : {searchParams : Promise<{query : string}>}) {

  const query = (await searchParams).query;

  // For Searching 
  const params = {search: query || null}

  const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params})

  // extract author id from sanity using session 

  const session = await auth()
  console.log(session)

  return (
    <div >
      <section className="w-full bg-[#EE2B69] min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6;">

        <h1  className="uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5;" >
          Pitch Your Startup, <br /> Connect With Enterpreneurs
        </h1>

        <p className="font-medium text-[20px] text-white max-w-2xl text-center break-words ">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <SearchItem query={query}/>
      </section>

      {/* Card Section */}

      <section className="px-6 py-10 max-w-7xl mx-auto">
          <p className="font-semibold text-[30px] text-black">
            {query ? `Search Results for "${query}"` : 'All Startups'}
          </p>

          <ul className="mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5">
            {posts?.length > 0 ? (
              posts.map((post: StartupTypeCard) =>(
                <StartupCard key={post?._id} post={post}/>
              ))
            ) : (
              <p className="text-black-100 text-sm font-normal">No Startup found </p>
            ) }
          </ul>
      </section>
      <SanityLive/>
    </div>
  );
}
