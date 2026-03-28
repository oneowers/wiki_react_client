import React, { useContext, useEffect, Fragment } from "react";
import { Context } from "../index.js";
import { Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronLeftIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  NEWS_ROUTE,
  PROFILE_ROUTE,
  ADMIN_ROUTE,
} from "../utils/consts.js";
import { fetchTypes } from "../http/deviceApi.js";
import { logout } from "../http/userApi.js";
import logo from "./logo.png";
import TopBanner from "./TopBanner.js";
import StatusBar from "./StatusBar.js";

const headerShell =
  "fixed top-0 left-1/2 z-50 w-full max-w-[390px] -translate-x-1/2 font-sans " +
  "md:max-w-[min(100%,1280px)] lg:max-w-[1360px] xl:max-w-[1440px]";

const NavBar = observer(() => {
  const { user, device } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
  }, [device]);

  const handleLogout = (close) => {
    logout(user);
    if (close) close();
    navigate(NEWS_ROUTE);
  };

  const showBack = location.pathname !== NEWS_ROUTE;
  const title =
    location.pathname === NEWS_ROUTE
      ? "Vault"
      : location.pathname === "/"
        ? "Story"
        : location.pathname.replace(/^\//, "").slice(0, 18) || "UzExpo";

  return (
    <>
      <TopBanner />
      <header className={headerShell}>
        <div className="overflow-hidden rounded-b-[28px] border-b border-[var(--color-border)] bg-white/85 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl backdrop-saturate-150 md:rounded-b-[24px]">
          <div className="md:hidden">
            <StatusBar />
          </div>
          <Popover as="nav" className="relative">
            {({ open, close }) => (
              <>
                <div className="flex h-14 items-center justify-between px-3 md:px-2">
                  <div className="flex min-w-0 flex-1 items-center gap-1">
                    {showBack ? (
                      <button
                        type="button"
                        onClick={() => {
                          if (location.pathname === "/") navigate(NEWS_ROUTE);
                          else navigate(-1);
                        }}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text-primary)] shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-[var(--color-accent)]/35 active:scale-[0.98]"
                        aria-label="Back"
                      >
                        <ChevronLeftIcon className="h-5 w-5" />
                      </button>
                    ) : (
                      <Link
                        to={NEWS_ROUTE}
                        className="flex shrink-0 items-center gap-2 rounded-full py-1 pr-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <img
                          className="h-8 w-8 rounded-full object-cover ring-2 ring-[var(--color-accent)]/25"
                          src={logo}
                          alt="UzExpo"
                        />
                      </Link>
                    )}
                    <div className="min-w-0 pl-1">
                      <p className="truncate font-display text-[15px] font-semibold tracking-tight text-[var(--color-text-primary)]">
                        {title}
                      </p>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                        UzExpo · Premium
                      </p>
                    </div>
                  </div>

                  <div className="hidden items-center gap-2 md:flex">
                    {user.isAuth ? (
                      <>
                        {user.user.role === "ADMIN" && (
                          <Link
                            to={ADMIN_ROUTE}
                            className="rounded-full border border-[var(--color-accent)]/35 bg-[var(--color-accent-soft)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-accent-deep)] transition-all hover:bg-[var(--color-accent)]/15"
                          >
                            Admin
                          </Link>
                        )}
                        <Link
                          to={PROFILE_ROUTE}
                          className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-text-primary)] shadow-sm transition-all hover:border-[var(--color-accent)]/40"
                        >
                          Profile
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleLogout()}
                          className="rounded-full border border-red-200 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-red-600 transition-all hover:bg-red-50"
                        >
                          Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to={REGISTRATION_ROUTE}
                          className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                        >
                          Join
                        </Link>
                        <Link
                          to={LOGIN_ROUTE}
                          className="rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-deep)] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-[0_10px_30px_rgba(37,99,235,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          Sign in
                        </Link>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-1 md:hidden">
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text-primary)] shadow-sm transition-all hover:border-[var(--color-accent)]/35"
                      aria-label="Alerts"
                    >
                      <BellAlertIcon className="h-5 w-5 text-[var(--color-accent)]" />
                    </button>
                    <Popover.Button className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text-primary)] shadow-sm outline-none transition-all hover:border-[var(--color-accent)]/35">
                      {open ? (
                        <XMarkIcon className="h-5 w-5" />
                      ) : (
                        <Bars3Icon className="h-5 w-5" />
                      )}
                    </Popover.Button>
                  </div>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition duration-200 ease-out"
                  enterFrom="opacity-0 -translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition duration-150 ease-in"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 -translate-y-1"
                >
                  <Popover.Panel className="absolute inset-x-0 top-full z-50 border-t border-[var(--color-border)] bg-white/95 px-4 pb-6 pt-3 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl md:hidden">
                    <div className="flex flex-col gap-3">
                      {user.isAuth ? (
                        <>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                            Signed in · {user.user.first_name || "Member"}
                          </p>
                          {user.user.role === "ADMIN" && (
                            <Link
                              to={ADMIN_ROUTE}
                              onClick={() => close()}
                              className="w-full rounded-2xl bg-[var(--color-accent)] py-3 text-center text-xs font-bold uppercase tracking-[0.15em] text-white"
                            >
                              Admin
                            </Link>
                          )}
                          <Link
                            to={PROFILE_ROUTE}
                            onClick={() => close()}
                            className="w-full rounded-2xl border border-[var(--color-border)] bg-white py-3 text-center text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-text-primary)] shadow-sm"
                          >
                            Profile
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleLogout(close)}
                            className="w-full rounded-2xl border border-red-200 py-3 text-xs font-bold uppercase tracking-[0.15em] text-red-600"
                          >
                            Sign out
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to={REGISTRATION_ROUTE}
                            onClick={() => close()}
                            className="w-full rounded-2xl border border-[var(--color-border)] py-3 text-center text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-text-primary)]"
                          >
                            Create account
                          </Link>
                          <Link
                            to={LOGIN_ROUTE}
                            onClick={() => close()}
                            className="w-full rounded-2xl bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-deep)] py-3 text-center text-xs font-bold uppercase tracking-[0.15em] text-white"
                          >
                            Sign in
                          </Link>
                        </>
                      )}
                    </div>
                  </Popover.Panel>
                </Transition>

                {open && (
                  <div
                    className="fixed inset-0 z-40 bg-slate-900/25 md:hidden"
                    aria-hidden="true"
                  />
                )}
              </>
            )}
          </Popover>
        </div>
      </header>
      <div className="h-24 md:h-16" />
    </>
  );
});

export default NavBar;
