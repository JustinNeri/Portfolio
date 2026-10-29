"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Must match the inline script in app/layout.tsx. */
const STORAGE_KEY = "theme";

function applyTheme(next: "light" | "dark") {
  document.documentElement.classList.toggle("dark", next === "dark");
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Storage can be unavailable (private mode); the switch still works for this visit.
  }
}

/**
 * Switches between dark and light mode and remembers the choice. The current
 * theme is the `dark` class on <html>, so the icons are swapped with CSS and
 * the button renders the same on the server and in the browser.
 *
 * Where view transitions are supported, the page crossfades to the new theme
 * (see `.theme-switching` in globals.css); otherwise, and for reduced motion,
 * it switches at once.
 */
export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";

    if (
      typeof document.startViewTransition !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      applyTheme(next);
      return;
    }

    root.classList.add("theme-switching");
    const transition = document.startViewTransition(() => applyTheme(next));
    transition.finished.finally(() => root.classList.remove("theme-switching"));
  }

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      onClick={toggle}
      aria-label="Switch between dark and light mode"
      className={className}
    >
      <Sun aria-hidden="true" className="hidden size-5 dark:block" />
      <Moon aria-hidden="true" className="size-5 dark:hidden" />
    </Button>
  );
}
