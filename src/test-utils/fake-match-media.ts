/**
 * `window.matchMedia` のフェイク（テスト専用）
 *
 * jsdom は matchMedia を持たない。一致状態を途中で切り替えて `change` を
 * 発火できるようにし、「設定が途中で変わったとき」の振る舞いを検証できるようにする。
 */

type Listener = (event: MediaQueryListEvent) => void

export type FakeMatchMedia = {
  /** 一致状態を切り替え、購読者に `change` を通知する */
  set(query: string, matches: boolean): void
  restore(): void
}

export function installFakeMatchMedia(matching: string[] = []): FakeMatchMedia {
  const original = window.matchMedia
  const state = new Map<string, boolean>(matching.map(query => [query, true]))
  const listeners = new Map<string, Set<Listener>>()

  window.matchMedia = (query: string) => {
    const subscribers = listeners.get(query) ?? new Set<Listener>()
    listeners.set(query, subscribers)
    return {
      get matches() {
        return state.get(query) ?? false
      },
      media: query,
      onchange: null,
      addEventListener: (_: string, listener: Listener) => {
        subscribers.add(listener)
      },
      removeEventListener: (_: string, listener: Listener) => {
        subscribers.delete(listener)
      },
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    } as unknown as MediaQueryList
  }

  return {
    set(query, matches) {
      state.set(query, matches)
      listeners
        .get(query)
        ?.forEach(listener =>
          listener({ matches, media: query } as MediaQueryListEvent)
        )
    },
    restore() {
      window.matchMedia = original
    },
  }
}
