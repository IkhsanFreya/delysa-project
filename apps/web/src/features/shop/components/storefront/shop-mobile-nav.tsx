import { AtSign, LogIn, MapPin, Phone, UserPlus, XIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "~/components/ui/dialog";
import { Separator } from "~/components/ui/separator";
import { DELYSA_CONTACT } from "~/features/shop/data/storefront";
import type { ShopNavItem, ShopNavTo } from "./shop-header";

const MOBILE_NAV_ACTIVE_CLASS =
  "flex min-h-11 w-full items-center rounded-lg bg-[#FDF2F8] px-3 text-[15px] font-bold text-[#9D174D]";
const MOBILE_NAV_IDLE_CLASS =
  "flex min-h-11 w-full items-center rounded-lg px-3 text-[15px] font-medium text-[#57534E] hover:bg-[#FAF7F5] hover:text-[#1C1917]";

/**
 * Drawer navigasi seluler: sheet modal dari kiri berisi daftar link toko,
 * akses masuk/daftar, dan kontak resmi Delysa Florist.
 */
export function ShopMobileNav({
  open,
  onOpenChange,
  links,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  links: ShopNavItem[];
  activeTo: ShopNavTo | null;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        id="mobile-nav"
        showCloseButton={false}
        className="top-0 left-0 flex h-dvh w-[85vw] max-w-80 translate-x-0 translate-y-0 flex-col gap-0 rounded-none bg-white p-0 text-left shadow-xl duration-300 ease-out sm:max-w-80 data-open:slide-in-from-left data-closed:slide-out-to-left data-closed:animate-out data-closed:fade-out-0 motion-reduce:animate-none"
      >
        <div className="flex items-center justify-between gap-2 border-b border-[#EAE2DE] px-4 py-3">
          <DialogTitle className="inline-flex items-center gap-2 text-sm font-extrabold tracking-tight text-[#1C1917]">
            <img
              src="/logo-delysa.jpg"
              alt=""
              width={32}
              height={32}
              className="size-8 rounded-full object-cover ring-1 ring-[#EAE2DE]"
            />
            <span>
              DELYSA <span className="text-[#BE185D]">FLORIST</span>
            </span>
          </DialogTitle>
          <DialogClose
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Tutup menu"
                className="size-11 shrink-0 rounded-full"
              />
            }
          >
            <XIcon aria-hidden="true" />
          </DialogClose>
        </div>

        <nav
          aria-label="Navigasi seluler"
          className="min-h-0 flex-1 overflow-y-auto px-2 py-2"
        >
          <ul className="flex flex-col gap-0.5">
            {links.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: true, includeSearch: false }}
                  activeProps={{ className: MOBILE_NAV_ACTIVE_CLASS }}
                  inactiveProps={{ className: MOBILE_NAV_IDLE_CLASS }}
                  className="focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BE185D]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Separator className="my-3" />

          <div className="grid grid-cols-2 gap-2 px-2">
            <Link
              to="/sign-in"
              className={buttonVariants({
                size: "sm",
                className:
                  "h-10 rounded-lg bg-[#BE185D] text-xs font-semibold text-white hover:bg-[#9D174D]",
              })}
            >
              <LogIn size={14} aria-hidden="true" />
              Masuk
            </Link>
            <Link
              to="/sign-up"
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className:
                  "h-10 rounded-lg border-[#EAE2DE] bg-white text-xs font-semibold text-[#1C1917] hover:bg-[#FDF2F8]",
              })}
            >
              <UserPlus size={14} aria-hidden="true" />
              Daftar
            </Link>
          </div>

          <Separator className="my-3" />

          <ul className="flex flex-col gap-0.5 px-3 pb-4 text-[13px] text-[#57534E]">
            <li>
              <a
                href={DELYSA_CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 hover:text-[#BE185D]"
              >
                <MapPin size={14} aria-hidden="true" />{" "}
                {DELYSA_CONTACT.shortLocation}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${DELYSA_CONTACT.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 hover:text-[#BE185D]"
              >
                <Phone size={14} aria-hidden="true" />{" "}
                {DELYSA_CONTACT.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={DELYSA_CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 hover:text-[#BE185D]"
              >
                <AtSign size={14} aria-hidden="true" />{" "}
                {DELYSA_CONTACT.instagramHandle}
              </a>
            </li>
          </ul>
        </nav>
      </DialogContent>
    </Dialog>
  );
}
