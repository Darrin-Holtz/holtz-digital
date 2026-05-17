import PostsTable from '@/components/admin/PostsTable';
import BackButton from '@/components/admin/BackButton';
import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';
import { connection } from 'next/server';
import PostsPagination from '@/components/admin/PostsPagination';
import GeneratePostButton from '@/components/admin/GeneratePostButton';

export default async function PostsPage() {
  await connection();

  const posts = await fetchQuery(api.posts.getPostsAdmin);

  return (
    <>
      <div className="flex items-center justify-between">
        <BackButton text="Go Back" link="/dashboard" />
        <GeneratePostButton />
      </div>
      <PostsTable posts={posts} title="All Posts" />
      <PostsPagination />
    </>

  );
}