import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";

interface BackButtonProps {
    text: string;
    link: string;
}

const BackButton = ({ text, link }: BackButtonProps) => {
  return (
    <Link href={link} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors">
      <ArrowLeftCircle className="size-5" />
      {text}
    </Link>
  );
};

export default BackButton;