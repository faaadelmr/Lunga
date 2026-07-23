import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full flex justify-center pb-4 pt-2 px-4 pointer-events-none">
      <div className="pointer-events-auto bg-card/80 backdrop-blur-md border border-border/50 shadow-lg rounded-full py-1.5 px-5 transition-all duration-300 hover:shadow-xl hover:bg-card hover:border-yellow-500/30">
        <div className="flex flex-row items-center gap-4 text-xs text-muted-foreground">
          <div>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-primary-500">Lunga</span>. All rights reserved.
          </div>
          <span className="text-border">|</span>
          <div className="flex items-center space-x-1">
            <span>Crafted by</span>
            <Link
              href="https://faaadelmr.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:underline transition-colors font-medium"
            >
              faaadelmr
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

