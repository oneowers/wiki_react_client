import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  InformationCircleIcon,
  TicketIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeSolid,
  InformationCircleIcon as InfoSolid,
  TicketIcon as TicketSolid,
  ShoppingBagIcon as BagSolid,
  UserCircleIcon as UserSolid,
} from "@heroicons/react/24/solid";
import { Context } from "../index.js";
import {
  NEWS_ROUTE,
  ABOUT_ROUTE,
  PARTICIPANT_ROUTE,
  BASKET_ROUTE,
  PROFILE_ROUTE,
  LOGIN_ROUTE,
} from "../utils/consts.js";

const navShell =
  "fixed bottom-0 left-1/2 z-50 flex h-[72px] w-full max-w-[390px] -translate-x-1/2 items-stretch border-t border-[var(--color-border)] bg-white/90 px-2 shadow-[0_-8px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl backdrop-saturate-150 md:hidden";

export default function MobileBottomNav() {
  const { user } = useContext(Context);
  const profileTarget = user.isAuth ? PROFILE_ROUTE : LOGIN_ROUTE;

  const items = [
    {
      to: NEWS_ROUTE,
      label: "Home",
      Outline: HomeIcon,
      Solid: HomeSolid,
      end: true,
    },
    {
      to: ABOUT_ROUTE,
      label: "About",
      Outline: InformationCircleIcon,
      Solid: InfoSolid,
      end: true,
    },
    {
      to: PARTICIPANT_ROUTE,
      label: "Events",
      Outline: TicketIcon,
      Solid: TicketSolid,
    },
    {
      to: BASKET_ROUTE,
      label: "Cart",
      Outline: ShoppingBagIcon,
      Solid: BagSolid,
    },
    {
      to: profileTarget,
      label: user.isAuth ? "You" : "Sign in",
      Outline: UserCircleIcon,
      Solid: UserSolid,
      end: true,
    },
  ];

  return (
    <nav className={navShell} aria-label="Primary" style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}>
      <div className="pointer-events-none absolute inset-x-8 -top-3 h-6 rounded-full bg-[var(--color-accent)]/12 blur-xl animate-pulse-glow" />
      {items.map(({ to, label, Outline, Solid, end }) => (
        <NavLink
          key={to + label}
          to={to}
          end={!!end}
          className={({ isActive }) =>
            [
              "flex flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl py-2 transition-all duration-300",
              isActive
                ? "text-[var(--color-accent)] scale-[1.02]"
                : "text-[var(--color-text-muted)] active:scale-[0.98]",
            ].join(" ")
          }
        >
          {({ isActive }) => {
            const Icon = isActive ? Solid : Outline;
            return (
              <>
                <span
                  className={`rounded-full p-1 transition-all duration-300 ${
                    isActive
                      ? "bg-[var(--color-accent-soft)] ring-1 ring-[var(--color-accent)]/30"
                      : ""
                  }`}
                >
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em]">
                  {label}
                </span>
              </>
            );
          }}
        </NavLink>
      ))}
    </nav>
  );
}
