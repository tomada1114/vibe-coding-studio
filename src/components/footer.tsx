import { PlusGrid, PlusGridItem, PlusGridRow } from "@/components/plus-grid"
import { DISCORD_INVITE_URL, SOCIAL_LINKS } from "@/lib/constants"
import { Button } from "./button"
import { Container } from "./container"
import { Gradient } from "./gradient"
import { Link } from "./link"
import { Logo } from "./logo"
import { Subheading } from "./text"

function CallToAction() {
  return (
    <div className="relative pt-20 pb-16 text-center sm:py-24">
      <hgroup>
        <Subheading>コミュニティに参加</Subheading>
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
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3.5 11.5h-7v-7h7v7z" />
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
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm4.5 10.5c0 .83-.67 1.5-1.5 1.5H5c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5h6c.83 0 1.5.67 1.5 1.5v5z" />
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
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit us on ${link.name}`}
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
      <Gradient className="relative">
        <div className="absolute inset-2 rounded-4xl bg-white/80" />
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
      </Gradient>
    </footer>
  )
}
