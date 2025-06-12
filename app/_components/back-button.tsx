import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackButton() {
  return (
    <div className="flex items-center pt-6 px-4 md:px-10 max-w-7xl mx-auto mb-4">
      <Link
        href="/"
        className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </Link>
    </div>
  );
}
