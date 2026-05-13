"use client";

import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  mobile?: boolean;
  onCloseMobile?: () => void;
}

export function NavbarAuthButtons({ mobile = false, onCloseMobile }: Props) {
  const session = authClient.useSession();
  const isAuthenticated = Boolean(session.data?.user);
  const isLoading = session.isPending;
  const router = useRouter();

  const handleSignOut = () =>
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Successfully signed out.");
          router.push("/");
        },
        onError: (error) => {
          toast.error(error.error.message);
        },
      },
    });

  if (!isAuthenticated || isLoading) return null;

  if (mobile) {
    return (
      <button
        className="text-white text-2xl font-medium hover:text-blue-400 transition-colors"
        onClick={() => {
          onCloseMobile?.();
          handleSignOut();
        }}
      >
        Logout
      </button>
    );
  }

  return (
    <Button className="hidden md:inline-flex" onClick={handleSignOut}>
      Logout
    </Button>
  );
}
