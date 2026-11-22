import AppShell from "@/components/app/AppShell";
import AppHeader from "@/components/app/AppHeader";
import WelcomeSection from "@/components/app/WelcomeSection";
import { Sprout } from "lucide-react";

/* ────────────────────────────────────────────────────────────────
   صفحه اصلی داشبورد کشاورز — گام ۲

   ├─ هدر                                        ← آماده (گام ۱)
   ├─ بخش خوش‌آمد + کارت سبز تیره فرتاک          ← واقعی (گام ۲)
   ├─ چک‌لیست «برای تکمیل این مرحله»             ← اسکلت (گام ۳)
   └─ سه کارت: درخواست جدید / جدول مالی / راهنما  ← اسکلت (گام ۳)
   ──────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <AppShell>
      <AppHeader />

      {/* محتوای قابل اسکرول داخل قاب گوشی */}
      <main className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 pb-6">
          {/* گام ۲: بخش خوش‌آمد — واقعی */}
          <WelcomeSection />

          {/* کادر وضعیت ساخت — بعد از گام ۳ حذف می‌شود */}
          <div className="mx-4 border-2 border-dashed border-forest-200 rounded-2xl p-5 text-center">
            <Sprout size={32} className="mx-auto text-forest-300" />
            <p className="mt-2 text-sm font-bold text-forest-800">
              گام ۲ تمام شد: بخش خوش‌آمد واقعی شد
            </p>
            <p className="mt-1 text-xs text-muted-foreground leading-6">
              چک‌لیست «برای تکمیل این مرحله» و سه کارت پایین صفحه هنوز
              اسکلت هستند — در گام ۳ واقعی می‌شوند.
            </p>
          </div>

          {/* اسکلت چک‌لیست (جای‌گزار گام ۳) */}
          <div className="mx-4 rounded-2xl border border-border bg-white p-5 flex flex-col gap-4">
            <div className="h-4 w-40 rounded-full bg-forest-100" />
            {[1, 2, 3, 4].map((row) => (
              <div key={row} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-forest-100" />
                <div className="h-3 flex-1 rounded-full bg-muted" />
              </div>
            ))}
          </div>

          {/* اسکلت سه کارت پایین (جای‌گزار گام ۳) */}
          <div className="mx-4 flex flex-col gap-3">
            {[1, 2, 3].map((card) => (
              <div
                key={card}
                className="rounded-2xl border border-border bg-white p-4 flex items-center justify-between"
              >
                <div className="flex flex-col gap-2">
                  <div className="h-3.5 w-28 rounded-full bg-forest-100" />
                  <div className="h-2.5 w-44 rounded-full bg-muted" />
                </div>
                <div className="h-10 w-10 rounded-xl bg-forest-50" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </AppShell>
  );
}
