import { client } from "@/sanity/lib/client";
import Ping from "./ping";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

export default async function View({ id }: { id: string }) {
  // 1️⃣ Fetch Views
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  // 2️⃣ Update Views (Simple way, without unstable_after)
  updateViews(id, totalViews);

  return (
    <div className="flex justify-end items-center mt-5 fixed bottom-3 right-3">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="font-medium text-[16px] bg-[#FFE8F0] px-4 py-2 rounded-lg capitalize">
        <span className="font-black">{totalViews}</span>
      </p>
    </div>
  );
}

// ✅ Very Simple Function to Update Views
async function updateViews(id: string, currentViews: number) {
  try {
    await writeClient.patch(id).set({ views: currentViews + 1 }).commit();
  } catch (error) {
    console.error("Error updating views:", error);
  }
}
