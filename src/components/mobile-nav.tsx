"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { NavItem } from "@/components/site-header";

/**
 * Small-screen menu. The sheet is a modal dialog: focus is trapped while it
 * is open, Escape closes it, and focus returns to the menu button.
 */
export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={<Button variant="ghost" size="icon-lg" aria-label="Open menu" className="-mr-2" />}
        >
          <Menu aria-hidden="true" className="size-5" />
        </SheetTrigger>
        <SheetContent side="right" className="w-[min(20rem,85vw)] gap-0">
          <SheetHeader className="border-b border-rule px-6 py-5">
            <SheetTitle className="label text-muted-foreground">Menu</SheetTitle>
            <SheetDescription className="sr-only">Site navigation</SheetDescription>
          </SheetHeader>
          <nav aria-label="Mobile">
            <ul className="px-6 py-2">
              {items.map((item, i) => (
                <li key={item.href} className="border-b border-rule last:border-b-0">
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={close}
                      className="flex items-baseline gap-4 py-4 font-display text-2xl"
                    >
                      <span aria-hidden="true" className="label w-5 text-ink">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={close}
                      className="flex items-baseline gap-4 py-4 font-display text-2xl"
                    >
                      <span aria-hidden="true" className="label w-5 text-ink">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
