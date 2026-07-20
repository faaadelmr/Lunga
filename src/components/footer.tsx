import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-card py-2 px-6 h-10 flex items-center shrink-0">
      <div className="w-full">
        <div className="flex flex-row justify-between items-center text-xs text-muted-foreground">
          <div>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-medium text-yellow-500">CV-lization</span>. All rights reserved.
          </div>
          <div className="flex items-center space-x-1">
            <span>Crafted by</span>
            <Link
              href="https://faaadelmr.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline transition-colors font-medium"
            >
              faaadelmr
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
