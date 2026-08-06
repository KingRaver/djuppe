import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <div>
        <p className="section-kicker">404 / Drawing not registered</p>
        <h1 className="display text-[clamp(6rem,24vw,18rem)]">No object.</h1>
        <Link className="mono border-b border-white/40 pb-2" href="/">Return to the foundry ↙</Link>
      </div>
    </main>
  );
}
