"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="nav">
        <div className="nav-inner container-wide">
          <Link className="wordmark" href="/" aria-label="Djuppe, home">DJUPPE</Link>
          <nav className="nav-links" aria-label="Primary navigation">
            {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          </nav>
          <div className="workshop-status" aria-label="Workshop status: active">
            <span className="status-dot" aria-hidden="true" />
            Workshop / active
          </div>
          <button
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
                <Link href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>
              </motion.div>
            ))}
            <div className="mobile-menu-meta mono">
              <span>Workshop / active</span><span>Athens / GR</span>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
