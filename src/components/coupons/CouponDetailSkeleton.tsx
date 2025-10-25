export function CouponDetailSkeleton() {
  return (
    <div className="mx-auto max-w-5xl">
      {/* Back link skeleton */}
      <div className="mb-8 h-5 w-32 animate-pulse rounded-lg bg-zinc-200" />

      <div className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-zinc-950/5">
        {/* Header section skeleton */}
        <div className="relative overflow-hidden bg-gradient-to-br from-zinc-50 via-white to-blue-50/30 p-10">
          <div className="relative z-10">
            {/* Title skeleton */}
            <div className="mb-6 h-10 w-3/4 animate-pulse rounded-lg bg-zinc-200" />

            {/* Status badges skeleton */}
            <div className="flex gap-3">
              <div className="h-8 w-24 animate-pulse rounded-full bg-zinc-200" />
              <div className="h-8 w-20 animate-pulse rounded-full bg-zinc-200" />
              <div className="h-8 w-32 animate-pulse rounded-full bg-zinc-200" />
            </div>
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="space-y-10 p-10">
          {/* Tech stack skeleton */}
          <div>
            <div className="mb-5 h-4 w-24 animate-pulse rounded bg-zinc-200" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-14 animate-pulse rounded-2xl bg-zinc-100"
                />
              ))}
            </div>
          </div>

          {/* Description skeleton */}
          <div>
            <div className="mb-5 h-6 w-48 animate-pulse rounded bg-zinc-200" />
            <div className="rounded-2xl bg-zinc-50/50 p-6">
              <div className="space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-zinc-200" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-200" />
                <div className="h-4 w-4/6 animate-pulse rounded bg-zinc-200" />
              </div>
            </div>
          </div>

          {/* Price card skeleton */}
          <div className="h-64 animate-pulse rounded-3xl bg-gradient-to-br from-zinc-200 to-zinc-300" />

          {/* CTA skeleton */}
          <div className="rounded-3xl bg-zinc-50/50 p-8">
            <div className="mb-8 space-y-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="mx-auto h-5 w-48 animate-pulse rounded bg-zinc-200"
                />
              ))}
            </div>
            <div className="mx-auto h-14 w-64 animate-pulse rounded-full bg-blue-200" />
          </div>
        </div>
      </div>
    </div>
  )
}
