import { DashboardCard } from "@/components/admin/DashboardCard";
import PostsTable from "@/components/admin/PostsTable";
import GeneratePostButton from "@/components/admin/GeneratePostButton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { MessageCircle, Newspaper, User, Inbox } from "lucide-react";
import { connection } from "next/server";
import Link from "next/link";

export default async function DashboardPage() {
  await connection();

  const [stats, posts] = await Promise.all([
    fetchQuery(api.stats.getDashboardStats),
    fetchQuery(api.posts.getPostsAdmin),
  ]);

  const latestPosts = posts.slice(0, 5);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        <DashboardCard title="Posts" count={stats.postsCount} icon={<Newspaper className="text-slate-500" size={72} />} />
        <DashboardCard title="Users" count={stats.usersCount} icon={<User className="text-slate-500" size={72} />} />
        <DashboardCard title="Comments" count={stats.commentsCount} icon={<MessageCircle className="text-slate-500" size={72} />} />
        <Link href="/dashboard/leads" className="block hover:opacity-90 transition-opacity">
          <DashboardCard
            title="Leads"
            count={stats.newInquiriesCount}
            icon={<Inbox className="size-[72px]" />}
            highlight={stats.newInquiriesCount > 0}
          />
        </Link>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Latest Posts</h2>
        <GeneratePostButton />
      </div>
      <PostsTable posts={latestPosts} title="" />
    </>
  );
}