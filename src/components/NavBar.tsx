"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getAllCategories } from "@/constants/category";
import {
  siteInstagramUrl,
  siteXUrl,
  siteYouTubeUrl,
  siteName,
} from "@/constants/meta";
import { useDropdownMenu } from "@/hooks/useDropdownMenu";

const categories = getAllCategories();

const externalLinks = [
  { label: "X", href: siteXUrl },
  { label: "Instagram", href: siteInstagramUrl },
  { label: "YouTube", href: siteYouTubeUrl },
];

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    isOpen: isCategoryOpen,
    setIsOpen: setCategoryOpen,
    menuRef: categoryMenuRef,
    buttonRef: categoryButtonRef,
    itemRefs: categoryItemRefs,
    handleButtonKeyDown: handleCategoryButtonKeyDown,
    handleMenuKeyDown: handleCategoryMenuKeyDown,
  } = useDropdownMenu(categories.length);

  const {
    isOpen: isLinksOpen,
    setIsOpen: setLinksOpen,
    menuRef: linksMenuRef,
    buttonRef: linksButtonRef,
    itemRefs: linksItemRefs,
    handleButtonKeyDown: handleLinksButtonKeyDown,
    handleMenuKeyDown: handleLinksMenuKeyDown,
  } = useDropdownMenu(externalLinks.length);

  return (
    <nav className="sticky top-0 z-50 border-b border-stone-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto max-w-4xl px-4 py-3">
        {/* PC: 横並び / スマホ: タイトル + ハンバーガー */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-75"
          >
            <Image
              src="/icon.png"
              alt={siteName}
              width={36}
              height={36}
              className="rounded-sm"
            />
            <span className="text-base font-bold tracking-wider text-stone-800">
              {siteName}
            </span>
          </Link>

          {/* ハンバーガーボタン（スマホのみ） */}
          <button
            className="sm:hidden p-1 text-stone-600 hover:text-stone-900"
            aria-label="メニューを開く"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>

          {/* PCナビ（sm以上で表示） */}
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/"
              className="text-stone-600 transition-colors hover:text-stone-900"
            >
              Home
            </Link>
            <div
              ref={categoryMenuRef}
              className="relative"
              onMouseEnter={() => setCategoryOpen(true)}
              onMouseLeave={() => {
                if (
                  !categoryMenuRef.current?.contains(document.activeElement)
                ) {
                  setCategoryOpen(false);
                }
              }}
            >
              <button
                ref={categoryButtonRef}
                aria-expanded={isCategoryOpen}
                aria-haspopup="menu"
                onClick={() => setCategoryOpen((prev) => !prev)}
                onKeyDown={handleCategoryButtonKeyDown}
                className="text-stone-600 transition-colors hover:text-stone-900"
              >
                Category
              </button>
              <div
                className={`absolute left-0 top-full z-50 pt-2 transition-all ${
                  isCategoryOpen ? "visible opacity-100" : "invisible opacity-0"
                }`}
              >
                <ul
                  role="menu"
                  onKeyDown={handleCategoryMenuKeyDown}
                  className="min-w-40 border border-stone-200 bg-white py-1 shadow-md"
                >
                  {categories.map((category, index) => (
                    <li key={category.slug} role="none">
                      <Link
                        ref={(el) => {
                          categoryItemRefs.current[index] = el;
                        }}
                        role="menuitem"
                        tabIndex={-1}
                        href={`/category/${category.slug}`}
                        onClick={() => setCategoryOpen(false)}
                        className="block px-4 py-2 text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-900"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              ref={linksMenuRef}
              className="relative"
              onMouseEnter={() => setLinksOpen(true)}
              onMouseLeave={() => {
                if (!linksMenuRef.current?.contains(document.activeElement)) {
                  setLinksOpen(false);
                }
              }}
            >
              <button
                ref={linksButtonRef}
                aria-expanded={isLinksOpen}
                aria-haspopup="menu"
                onClick={() => setLinksOpen((prev) => !prev)}
                onKeyDown={handleLinksButtonKeyDown}
                className="text-stone-600 transition-colors hover:text-stone-900"
              >
                Links
              </button>
              <div
                className={`absolute left-0 top-full z-50 pt-2 transition-all ${
                  isLinksOpen ? "visible opacity-100" : "invisible opacity-0"
                }`}
              >
                <ul
                  role="menu"
                  onKeyDown={handleLinksMenuKeyDown}
                  className="min-w-40 border border-stone-200 bg-white py-1 shadow-md"
                >
                  {externalLinks.map(({ label, href }, index) => (
                    <li key={label} role="none">
                      <a
                        ref={(el) => {
                          linksItemRefs.current[index] = el;
                        }}
                        role="menuitem"
                        tabIndex={-1}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label}（新しいタブで開く）`}
                        onClick={() => setLinksOpen(false)}
                        className="block px-4 py-2 text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-900"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link
              href="/about"
              className="text-stone-600 transition-colors hover:text-stone-900"
            >
              about
            </Link>
            <Link
              href="/contact"
              className="text-stone-600 transition-colors hover:text-stone-900"
            >
              contact
            </Link>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMobileMenuOpen && (
          <div className="sm:hidden mt-3 flex flex-col gap-1 border-t border-stone-200 pt-3 text-sm font-medium">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-2 py-2 text-stone-600 transition-colors hover:text-stone-900"
            >
              Home
            </Link>
            <div className="px-2 py-2 text-stone-500 text-xs font-semibold uppercase tracking-wider">
              Category
            </div>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 text-stone-600 transition-colors hover:text-stone-900"
              >
                {category.name}
              </Link>
            ))}
            <div className="px-2 py-2 text-stone-500 text-xs font-semibold uppercase tracking-wider">
              Links
            </div>
            {externalLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label}（新しいタブで開く）`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 text-stone-600 transition-colors hover:text-stone-900"
              >
                {label}
              </a>
            ))}
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-2 py-2 text-stone-600 transition-colors hover:text-stone-900"
            >
              about
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-2 py-2 text-stone-600 transition-colors hover:text-stone-900"
            >
              contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
