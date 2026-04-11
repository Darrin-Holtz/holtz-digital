import BackButton from '@/components/admin/BackButton';
import PostForm from '@/components/admin/PostForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { fetchQuery } from 'convex/nextjs';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
	const { id } = await params;
    await connection();

    const post = await fetchQuery(api.posts.getPostById, {
        postId: id as Id<"posts">,
    });

    if (!post) {
        redirect('/dashboard/posts');
    }

	return (
        <>  
            <BackButton text='Back To Posts' link='/dashboard/posts' />
            <h3 className='text-2xl mb-4'>Edit Post</h3>
            <Card className="w-full max-w-xl mx-auto">
                <CardHeader>
                <CardTitle>Edit Blog Article</CardTitle>
                <CardDescription>
                    Edit your blog article and update the content as needed.
                </CardDescription>
                </CardHeader>

                <CardContent>
                  <PostForm
                    mode='edit'
                    postId={post._id}
                    initialTitle={post.title}
                    initialContent={post.body}
                  />
                </CardContent>
            </Card>
        </>
    )
}
