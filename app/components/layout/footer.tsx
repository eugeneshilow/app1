export default function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  )
} 