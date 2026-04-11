import PostForm from "@/components/admin/PostForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
export default function CreateRoute() {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Create Post
        </h1>
        <p className="text-lg text-muted-foreground pt-4">
          Share your thoughts with the world
        </p>
      </div>

      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>
            Create a new blog article and share your thoughts.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <PostForm mode="create" />
        </CardContent>
      </Card>
    </div>
  );
}