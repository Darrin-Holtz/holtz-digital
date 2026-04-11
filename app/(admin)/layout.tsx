import { redirect } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { convexAuth } from "@/lib/auth-server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await convexAuth.isAuthenticated();

  if (!isAuthenticated) {
    redirect("/auth/login");
  }

  const profile = await convexAuth.fetchAuthQuery(api.profiles.getCurrentProfile);

  if (!profile || profile.role !== "admin") {
    redirect("/blog");
  }

  return <>{children}</>;
}