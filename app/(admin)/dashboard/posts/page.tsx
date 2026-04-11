import PostsTable from '@/components/admin/PostsTable';
import BackButton from '@/components/admin/BackButton';
import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';
import { connection } from 'next/server';
import PostsPagination from '@/components/admin/PostsPagination';

export default async function PostsPage() {
  await connection();

  const posts = await fetchQuery(api.posts.getPosts);

  return (
    <>
      <BackButton text="Go Back" link="/dashboard" />
      <PostsTable posts={posts} title="All Posts" />
      <PostsPagination />
    </>

  );
}