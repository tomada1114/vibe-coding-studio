export default function CouponsLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 inline-flex h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="text-zinc-600">クーポン情報を読み込み中...</p>
      </div>
    </div>
  )
}
