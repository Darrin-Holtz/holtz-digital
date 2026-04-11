import { DashboardCard } from "@/components/admin/DashboardCard";
import PostsTable from "@/components/admin/PostsTable";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { MessageCircle, Newspaper, User } from "lucide-react";
import { connection } from "next/server";

export default async function DashboardPage() {
  await connection();

  const [stats, posts] = await Promise.all([
    fetchQuery(api.stats.getDashboardStats),
    fetchQuery(api.posts.getPosts),
  ]);

  const latestPosts = posts.slice(0, 5);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <DashboardCard title="Posts" count={stats.postsCount} icon={<Newspaper className="text-slate-500" size={72} />} />
        <DashboardCard title="Users" count={stats.usersCount} icon={<User className="text-slate-500" size={72} />} />
        <DashboardCard title="Comments" count={stats.commentsCount} icon={<MessageCircle className="text-slate-500" size={72} />} />
      </div>
      <PostsTable posts={latestPosts} title="Latest Posts" />
    </>
  );
}