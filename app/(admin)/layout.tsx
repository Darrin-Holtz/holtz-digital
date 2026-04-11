import { redirect } from "next/navigation";
import { Suspense } from "react";
import { api } from "@/convex/_generated/api";
import { convexAuth } from "@/lib/auth-server";
import { AdminNavbar } from "@/components/admin/admin-navbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </Suspense>
  );
}

async function AdminLayoutContent({
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

  return (
    <>
      <AdminNavbar />
      {children}
    </>
  );
}