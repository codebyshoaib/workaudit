"use client";

import { githubSignIn } from "@/lib/actions"; // <-- Now import your server action
import { Github } from "@/components/ui/github";

export function GithubSignIn() {
  return (
    <form action={githubSignIn}>
      <button
        className="w-full inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
        // variant="outline"
        type="submit"
      >
        <Github />
        Continue with GitHub
      </button>
    </form>
  );
}

