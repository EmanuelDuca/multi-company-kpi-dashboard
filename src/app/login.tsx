export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 rounded-xl border bg-card p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Multi-Company KPI Dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to access your dashboard
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            />
          </div>
          <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
