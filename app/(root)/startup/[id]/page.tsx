import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client"
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries"
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from 'markdown-it'
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import { PLAYLIST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

const md = markdownit();

export const experimental_ppr = true
export default async function Details({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;

    // Correct parallel fetching implementation
    const [post, playlist] = await Promise.all([
        client.fetch(STARTUP_BY_ID_QUERY, { id }),
        client.fetch(PLAYLIST_BY_SLUG_QUERY, {
            slug: 'editor-picks-new',
            _: Date.now() // Cache buster
        })
    ]);

    const editorPosts = playlist?.select || [];

    if (!post) return notFound();

    const parsedContent = md.render(post?.pitch || '');

    return (
        <>
            <section className="w-full bg-[#EE2B69] min-h-[230px] pattern flex justify-center items-center flex-col py-10 px-6">
                <p className="bg-secondary px-6 py-3 font-work-sans font-bold rounded-sm uppercase relative tag-tri">{formatDate(post?._createdAt)} </p>
                <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">{post.title}</h1>
                <p className="font-medium text-[20px] text-white max-w-5xl text-center break-words">{post.description}</p>
            </section>

            <section className="px-6 py-10 max-w-7xl mx-auto">
                <Image
                    src={post.image}
                    alt="thumbnail"
                    width={1200}  // Set appropriate width
                    height={630}  // Set appropriate height
                    className="w-full h-auto rounded-xl"
                    priority
                />
                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex justify-between items-center gap-5">
                        <Link href={`/user/${post.author?._id}`}
                            className="flex gap-2 items-center mb-3">
                            <Image
                                src={post.author.image}
                                alt="avatar"
                                width={64}
                                height={64}
                                className="rounded-full drop-shadow-lg"
                            />
                            <div>
                                <p className="text-xl font-medium">
                                    {post.author.name}
                                </p>
                                <p className="text-lg font-medium text-[#7D8087]">
                                    @{post.author.username}
                                </p>
                            </div>
                        </Link>
                        <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-full">{post.category}</p>
                    </div>

                    <h3 className="text-3xl font-bold">Startup Details</h3>
                    {parsedContent ? (
                        <article
                            className="prose max-w-4xl font-work-sans break-all"
                            dangerouslySetInnerHTML={{ __html: parsedContent }}
                        />
                    ) : (
                        <p className="text-black-[#333333] text-sm font-normal">
                            No Details Provided
                        </p>
                    )}
                </div>

                <hr className="border-dotted bg-zinc-400 max-w-4xl my-10 mx-auto" />

                {editorPosts?.length > 0 && (
                    <div className="max-w-4xl mx-auto">
                        <p className="text-3xl font-semibold">
                            Editor Picks
                        </p>
                        <ul className="mt-7 grid sm:grid-cols-2 gap-5">
                            {editorPosts.map((post: StartupTypeCard, i: number) => (
                                <StartupCard key={i} post={post} />
                            ))}
                        </ul>
                    </div>
                )}

                <Suspense fallback={<Skeleton className="bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3" />}>
                    <View id={id} />
                </Suspense>
            </section>
        </>
    )
}