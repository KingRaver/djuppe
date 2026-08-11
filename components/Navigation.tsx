"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/#work", id: "work", label: "Work" },
  { href: "/#process", id: "process", label: "Process" },
  { href: "/#about", id: "about", label: "About" },
  { href: "/#contact", id: "contact", label: "Contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    menu?.querySelector<HTMLAnchorElement>("a[href]")?.focus();

    function close() {
      setOpen(false);
      toggleRef.current?.focus();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !menu) return;
      const focusable = Array.from(menu.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    // The panel and its toggle only exist below 900px; a resize past that would strand it open.
    const desktop = window.matchMedia("(min-width: 901px)");
    function handleBreakpoint() {
      if (desktop.matches) setOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleBreakpoint);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleBreakpoint);
    };
  }, [open]);

  useEffect(() => {
    if (pathname !== "/") return;
    const targets = links
      .map((link) => document.getElementById(link.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)[0];
        if (visible) setCurrent(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    targets.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  // The section links point back to the homepage, so nothing is "current" while off it.
  const currentSection = pathname === "/" ? current : null;

  return (
    <>
      <header className="nav">
        <div className="nav-inner container-wide">
          <Link className="wordmark" href="/" aria-label="Djuppe, home">DJUPPE</Link>
          <nav className="nav-links" aria-label="Primary navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href} aria-current={currentSection === link.id ? "location" : undefined}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="workshop-status" aria-label="Workshop status: active">
            <span className="status-dot" aria-hidden="true" />
            Workshop / active
          </div>
          <button
            ref={toggleRef}
            type="button"
            className={`menu-toggle ${open ? "is-open" : ""}`}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
          >
            <span /><span />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav
            ref={menuRef}
            id="mobile-navigation"
            className="mobile-menu"
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {links.map((link, index) => (
              <motion.div
                key={link.href}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.06 }}
              >
                <Link
                  href={link.href}
                  aria-current={currentSection === link.id ? "location" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="mobile-menu-meta mono">
              <span>Workshop / active</span><span>Lisbon / PT</span>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
