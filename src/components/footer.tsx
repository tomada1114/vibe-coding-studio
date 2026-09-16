import { PlusGrid, PlusGridItem, PlusGridRow } from "@/components/plus-grid"
import { SpectrumBeam } from "@/components/spectrum-beam"
import { DISCORD_INVITE_URL, SOCIAL_LINKS } from "@/lib/constants"
import { Button } from "./button"
import { Container } from "./container"
import { Link } from "./link"
import { Logo } from "./logo"
import { Subheading } from "./text"

function CallToAction() {
  return (
    <div className="relative pt-20 pb-16 text-center sm:py-24">
      <hgroup>
        <Subheading className="justify-center">COMMUNITY</Subheading>
        <p className="mt-6 text-3xl font-medium tracking-tight text-gray-950 sm:text-3xl">
          AI駆動開発を一緒に学びませんか？
        </p>
      </hgroup>
      <p className="mx-auto mt-6 max-w-xs text-sm/6 text-gray-500">
        Discordコミュニティで、最新のAI駆動開発情報を発見・共有しましょう。
      </p>
      <div className="mt-6">
        <Button
          className="w-full sm:w-auto"
          href={DISCORD_INVITE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Discordに参加する
        </Button>
      </div>
    </div>
  )
}

function SitemapHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm/6 font-medium text-gray-950/50">{children}</h3>
}

function SitemapLinks({ children }: { children: React.ReactNode }) {
  return <ul className="mt-6 space-y-4 text-sm/6">{children}</ul>
}

function SitemapLink(props: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <li>
      <Link
        {...props}
        className="font-medium text-gray-950 data-hover:text-gray-950/75"
      />
    </li>
  )
}

function Sitemap() {
  return (
    <>
      <div>
        <SitemapHeading>サイト</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="/">ホーム</SitemapLink>
          <SitemapLink href="/docs">学習</SitemapLink>
          <SitemapLink href="/videos">動画</SitemapLink>
          <SitemapLink href="/community">コミュニティ</SitemapLink>
          <SitemapLink href="/coupons">クーポン</SitemapLink>
          <SitemapLink href="/founder">運営者</SitemapLink>
        </SitemapLinks>
      </div>
      <div>
        <SitemapHeading>コミュニティ</SitemapHeading>
        <SitemapLinks>
          <SitemapLink
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </SitemapLink>
        </SitemapLinks>
      </div>
    </>
  )
}

function SocialIconX(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M12.6 0h2.454l-5.36 6.778L16 16h-4.937l-3.867-5.594L2.771 16H.316l5.733-7.25L0 0h5.063l3.495 5.114L12.6 0zm-.86 14.376h1.36L4.323 1.539H2.865l8.875 12.837z" />
    </svg>
  )
}

function SocialIconFacebook(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8.05C16 3.603 12.418 0 8 0S0 3.604 0 8.05c0 4.016 2.926 7.346 6.75 7.95v-5.624H4.718V8.05H6.75V6.276c0-2.017 1.194-3.131 3.022-3.131.875 0 1.79.157 1.79.157v1.98h-1.008c-.994 0-1.304.62-1.304 1.257v1.51h2.219l-.355 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.95z"
      />
    </svg>
  )
}

function SocialIconLinkedIn(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M14.82 0H1.18A1.169 1.169 0 000 1.154v13.694A1.168 1.168 0 001.18 16h13.64A1.17 1.17 0 0016 14.845V1.15A1.171 1.171 0 0014.82 0zM4.744 13.64H2.369V5.996h2.375v7.644zm-1.18-8.684a1.377 1.377 0 11.52-.106 1.377 1.377 0 01-.527.103l.007.003zm10.075 8.683h-2.375V9.921c0-.885-.015-2.025-1.234-2.025-1.218 0-1.425.966-1.425 1.968v3.775H6.233V5.997H8.51v1.05h.032c.317-.601 1.09-1.235 2.246-1.235 2.405-.005 2.851 1.578 2.851 3.63v4.197z" />
    </svg>
  )
}

function SocialIconYouTube(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M15.841 4.8s-.156-1.103-.636-1.587c-.608-.636-1.29-.638-1.602-.676-2.237-.162-5.594-.162-5.594-.162h-.007s-3.357 0-5.594.162c-.311.038-.994.04-1.602.676C.327 3.697.171 4.8.171 4.8S.015 6.09.015 7.382v1.216c0 1.291.156 2.582.156 2.582s.156 1.103.635 1.587c.608.636 1.407.616 1.762.683 1.279.123 5.436.161 5.436.161s3.362-.005 5.599-.167c.312-.039.994-.041 1.602-.677.48-.484.636-1.587.636-1.587s.156-1.291.156-2.582V7.382c0-1.292-.156-2.582-.156-2.582zM6.352 10.059V4.993l4.322 2.539-4.322 2.527z" />
    </svg>
  )
}

function SocialIconQiita(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M3.57 8.343a3.653 3.653 0 0 0-1.376.269 3.585 3.585 0 0 0-1.14.738 3.503 3.503 0 0 0-.773 1.102A3.297 3.297 0 0 0 0 11.814a3.28 3.28 0 0 0 .281 1.357 3.535 3.535 0 0 0 .775 1.107A3.636 3.636 0 0 0 3.6 15.29a3.731 3.731 0 0 0 .987-.13 3.657 3.657 0 0 0 .888-.374l.687.698a.579.579 0 0 0 .824 0 .58.58 0 0 0 0-.817l-.624-.624a3.533 3.533 0 0 0 .613-1.022 3.282 3.282 0 0 0 .226-1.208 3.297 3.297 0 0 0-.282-1.362 3.488 3.488 0 0 0-.775-1.102A3.614 3.614 0 0 0 5 8.612a3.657 3.657 0 0 0-1.398-.27 3.653 3.653 0 0 0-.031 0zm11.306.185v1.484h-.765v1.063h.765v2.142c0 .419.053.761.159 1.028a1.56 1.56 0 0 0 .433.63 1.511 1.511 0 0 0 .643.317 2.676 2.676 0 0 0 .694.086h.853v-1.013h-.736a1.25 1.25 0 0 1-.352-.048.713.713 0 0 1-.291-.169.81.81 0 0 1-.2-.324 1.575 1.575 0 0 1-.074-.519v-2.13h1.666v-1.063h-1.66V8.528zM9.4 8.856a.69.69 0 0 0-.69.691.69.69 0 0 0 .69.69.69.69 0 0 0 .691-.69.69.69 0 0 0-.69-.691zm2.771 0a.69.69 0 0 0-.69.691.69.69 0 0 0 .69.69.69.69 0 0 0 .691-.69.69.69 0 0 0-.69-.691zm-8.6.538a2.324 2.324 0 0 1 .03 0 2.35 2.35 0 0 1 .93.187 2.346 2.346 0 0 1 1.264 1.28 2.463 2.463 0 0 1 .186.957 2.444 2.444 0 0 1-.186.957 2.384 2.384 0 0 1-.506.767 2.363 2.363 0 0 1-1.688.698 2.324 2.324 0 0 1-.93-.186 2.376 2.376 0 0 1-.755-.512 2.427 2.427 0 0 1-.699-1.723 2.44 2.44 0 0 1 .699-1.727 2.384 2.384 0 0 1 .756-.511 2.324 2.324 0 0 1 .898-.187zm17.648.773a2.69 2.69 0 0 0-1.02.201 2.49 2.49 0 0 0-.815.552 2.432 2.432 0 0 0-.525.814 2.678 2.678 0 0 0-.186.998 2.644 2.644 0 0 0 .186.997 2.485 2.485 0 0 0 .525.814 2.436 2.436 0 0 0 .815.546 2.697 2.697 0 0 0 1.059.2 2.42 2.42 0 0 0 .518-.056 2.524 2.524 0 0 0 .46-.146 2.426 2.426 0 0 0 .394-.213 2.394 2.394 0 0 0 .329-.263l.065.53H24v-4.829h-.976l-.068.533a2.498 2.498 0 0 0-.322-.26 2.25 2.25 0 0 0-.394-.217 2.616 2.616 0 0 0-.462-.145 2.404 2.404 0 0 0-.521-.056 2.69 2.69 0 0 0-.038 0zm-12.375.844v4.138h1.113V11.01zm2.77 0v4.138h1.114V11.01zm9.72.145a1.592 1.592 0 0 1 .024 0 1.557 1.557 0 0 1 1.098.445 1.495 1.495 0 0 1 .334.495 1.61 1.61 0 0 1 .121.631 1.632 1.632 0 0 1-.121.64 1.551 1.551 0 0 1-.331.498 1.47 1.47 0 0 1-.49.324 1.642 1.642 0 0 1-1.207 0 1.502 1.502 0 0 1-.493-.324 1.52 1.52 0 0 1-.333-.5 1.64 1.64 0 0 1-.122-.638 1.628 1.628 0 0 1 .12-.637 1.524 1.524 0 0 1 .328-.495 1.474 1.474 0 0 1 .49-.323 1.592 1.592 0 0 1 .581-.116z" />
    </svg>
  )
}

function SocialIconNote(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1-10h2v6H7V4zm0 7h2v2H7v-2z" />
    </svg>
  )
}

function SocialIconUdemy(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0L5.81 3.573v3.574l6.189-3.574 6.191 3.574V3.573zM5.81 10.148v8.144c0 1.85.589 3.243 1.741 4.234S10.177 24 11.973 24s3.269-.482 4.448-1.474c1.179-.991 1.768-2.439 1.768-4.314v-8.064h-3.242v7.85c0 2.036-1.509 3.055-2.948 3.055-1.428 0-2.947-.991-2.947-3.027v-7.878z" />
    </svg>
  )
}

// アイコンマッピング
const iconMap: Record<
  string,
  React.ComponentType<React.ComponentPropsWithoutRef<"svg">>
> = {
  twitter: SocialIconX,
  youtube: SocialIconYouTube,
  qiita: SocialIconQiita,
  note: SocialIconNote,
  udemy: SocialIconUdemy,
  facebook: SocialIconFacebook,
  linkedin: SocialIconLinkedIn,
}

function SocialLinks() {
  return (
    <>
      {SOCIAL_LINKS.map(link => {
        const IconComponent = iconMap[link.icon.toLowerCase()] || SocialIconX
        return (
          <Link
            key={link.name}
            href={link.url}
            {...(link.url.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            aria-label={`${link.name}を見る`}
            className="text-gray-950 data-hover:text-gray-950/75"
          >
            <IconComponent className="size-4" />
          </Link>
        )
      })}
    </>
  )
}

function Copyright() {
  return (
    <div className="text-sm/6 text-gray-950">
      &copy; {new Date().getFullYear()} Vibe Coding Studio.
    </div>
  )
}

export function Footer({
  hideCallToAction = false,
}: {
  hideCallToAction?: boolean
}) {
  return (
    <footer>
      <SpectrumBeam className="h-px" />
      <div className="relative bg-gray-50">
        <Container>
          {!hideCallToAction && <CallToAction />}
          <PlusGrid className="pb-16">
            <PlusGridRow>
              <div className="grid grid-cols-2 gap-y-10 pb-6 lg:grid-cols-6 lg:gap-8">
                <div className="col-span-2 flex">
                  <PlusGridItem className="pt-6 lg:pb-6">
                    <Logo variant="wide" className="h-9" />
                  </PlusGridItem>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-x-8 gap-y-12 lg:col-span-4 lg:grid-cols-subgrid lg:pt-6">
                  <Sitemap />
                </div>
              </div>
            </PlusGridRow>
            <PlusGridRow className="flex justify-between">
              <div>
                <PlusGridItem className="py-3">
                  <Copyright />
                </PlusGridItem>
              </div>
              <div className="flex">
                <PlusGridItem className="flex items-center gap-8 py-3">
                  <SocialLinks />
                </PlusGridItem>
              </div>
            </PlusGridRow>
          </PlusGrid>
        </Container>
      </div>
    </footer>
  )
}
