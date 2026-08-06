import { site } from "@/data/site";

export function ContactSection() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-content container-wide">
        <p className="section-kicker">06 / Start a conversation</p>
        <h2 id="contact-title" className="contact-heading display">
          Bring a drawing, a problem, or something that should not yet exist.
        </h2>
        <a className="contact-link" href={`mailto:${site.email}`}>
          <span>{site.email}</span><span className="contact-arrow" aria-hidden="true">↗</span>
        </a>
        <div className="contact-meta mono">
          <div>Base<br />{site.location}</div>
          <div>Signal<br /><a href={site.instagram}>{site.instagramLabel}</a></div>
          <div>Availability<br />{site.availability}</div>
        </div>
        <footer className="site-footer mono">
          <span>DJUPPE / Metal, given intent</span>
          <span>Objects carry the record of their making.</span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>
    </section>
  );
}
