import { ConvexClientProvider } from "@/app/ConvexClientProvider";

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConvexClientProvider>{children}</ConvexClientProvider>;
}
