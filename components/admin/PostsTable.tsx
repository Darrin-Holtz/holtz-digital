import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow,TableCaption,} from '@/components/ui/table';
import PostActions from './PostActions';
import { Id } from '@/convex/_generated/dataModel';

interface PostRow {
  _id: Id<'posts'>;
    title: string;
    authorId: string;
    _creationTime: number;
  slug?: string;
}

interface PostsTableProps {
    posts: PostRow[];
    limit?: number;
    title?: string;
}

const PostsTable = ({ posts, limit, title }: PostsTableProps) => {
  const shownPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <div className="mt-10">
      <h3 className='text-2xl mb-4 font-semibold'>{ title ? title : "Latest Posts" }</h3>
      <Table>
        <TableCaption>A list of recent posts</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className='hidden md:table-cell'>Author</TableHead>
                <TableHead className='hidden md:table-cell text-right'>Date</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {shownPosts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className='text-center text-muted-foreground'>
                No posts found.
              </TableCell>
            </TableRow>
          ) : shownPosts.map((post) => (
            <TableRow key={post._id}>
              <TableCell>{post.title}</TableCell>
              <TableCell className='hidden md:table-cell'>{post.authorId}</TableCell>
              <TableCell className='hidden md:table-cell text-right'>
                {new Date(post._creationTime).toLocaleDateString()}
              </TableCell>
              <TableCell className='text-right'>
                <PostActions postId={post._id} slug={post.slug} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>        
      </Table>
    </div>
  );
};

export default PostsTable;
