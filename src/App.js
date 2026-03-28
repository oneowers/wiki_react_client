import React, { useContext, useEffect } from "react";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter.js";
import NavBar from "./components/NavBar.js";
import Footer from "./components/Footer.js";
import MobileBottomNav from "./components/MobileBottomNav.js";
import { observer } from "mobx-react-lite";
import { Context } from "./index.js";
import { check } from "./http/userApi.js";
import { toast } from "react-toastify";

const shellClass =
  "relative mx-auto flex min-h-screen w-full max-w-[390px] flex-col px-0 shadow-[0_20px_60px_rgba(15,23,42,0.12)] " +
  "md:max-w-[min(100%,1280px)] md:px-6 lg:max-w-[1360px] lg:px-10 xl:max-w-[1440px] " +
  "md:rounded-[32px] md:border md:border-[var(--color-border)] md:bg-[var(--color-surface)] md:shadow-[0_32px_100px_rgba(15,23,42,0.1)]";

const App = observer(() => {
  const { user } = useContext(Context);

  useEffect(() => {
    check(user)
      .then((data) => {
        if (data && data.success) {
          toast.success("Session restored · welcome back");
        }
      })
      .catch(() => {
        toast.error("Session could not be restored");
      })
      .finally(() => {
        setTimeout(() => user.setLoading(false), 800);
      });
  }, [user]);

  if (user.loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[var(--color-bg)] font-sans">
        <div
          className="pointer-events-none absolute inset-0 opacity-50 luxury-noise"
          aria-hidden
        />
        <div className="relative flex max-w-[240px] flex-col items-center gap-6 text-center animate-fade-in">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            Preparing your vault
          </p>
          <div className="h-1 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-1/2 animate-loading-shimmer bg-gradient-to-r from-[var(--color-accent-soft)] to-[var(--color-accent)]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] font-sans text-[var(--color-text-primary)] selection:bg-[var(--color-accent-soft)] selection:text-[var(--color-accent-deep)]">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(255,255,255,0.95),transparent),radial-gradient(ellipse_80%_50%_at_100%_50%,rgba(219,234,254,0.5),transparent),radial-gradient(ellipse_60%_40%_at_0%_80%,rgba(241,245,249,0.9),transparent)]"
        aria-hidden
      />
      <div className={shellClass}>
        <BrowserRouter>
          <NavBar />
          <main className="min-h-[70vh] flex-1 pb-28 md:pb-14">
            <AppRouter />
          </main>
          <Footer />
          <MobileBottomNav />
        </BrowserRouter>
      </div>
    </div>
  );
});

export default App;
