import { useState } from "react";
import AppShell from "@/components/app/AppShell";
import AppHeader from "@/components/app/AppHeader";
import WelcomeSection from "@/components/app/WelcomeSection";
import DrawerMenu from "@/components/home/DrawerMenu";
import StageChecklist from "@/components/home/StageChecklist";
import QuickActions from "@/components/home/QuickActions";
import RequestFormPage from "@/components/request/RequestFormPage";
import VisitSchedulePage from "@/components/visit/VisitSchedulePage";
import CooperationPage from "@/components/coop/CooperationPage";

/* ────────────────────────────────────────────────────────────────
   App — گام ۶ (+ صفحهٔ سوم: زمان‌بندی بازدید مزرعه)

   page سه مقدار می‌تواند داشته باشد:
   - "home"           ← داشبورد
   - "request-form"   ← فرم درخواست تولید (گام ۵)
   - "visit-schedule" ← زمان‌بندی بازدید مزرعه (گام ۶ — جدید)

   چرخهٔ درخواست حالا کامل دیده می‌شود:
   ثبت فرم ← به‌جای برگشتن به خانه، مستقیم می‌رویم صفحهٔ
   زمان‌بندی بازدید (کارشناس وقت پیشنهادی داده) تا کاربر تاییدش
   کند و بعد برگردد خانه.

   چون دیگر سه صفحه داریم، به‌جای یک ternary از دو تا استفاده
   شده: اول چک می‌کنیم «home هست؟»، بعد «request-form هست؟»،
   وگرنه یعنی visit-schedule.
   ──────────────────────────────────────────────────────────────── */

/* اسم صفحه‌ها یک‌جا این‌جا تعریف شده تا غلط تایپی ممکن نباشد */
type PageName = "home" | "request-form" | "visit-schedule" | "cooperation";

export default function App() {
  /* state منوی کشویی (برای همهٔ صفحه‌ها مشترک است) */
  const [menuOpen, setMenuOpen] = useState(false);
  /* کدام صفحه دیده شود؟ پیش‌فرض: خانه */
  const [page, setPage] = useState<PageName>("home");

  /* این تابع را به دکمه‌هایی می‌دهیم که فرم درخواست را باز می‌کنند */
  const openRequestForm = () => {
    setMenuOpen(false); // اگر منو باز بود، ببند
    setPage("request-form");
  };

  /* گام ۶: باز کردن صفحهٔ زمان‌بندی بازدید (از منو و بعد از ثبت فرم) */
  const openVisitSchedule = () => {
    setMenuOpen(false);
    setPage("visit-schedule");
  };

  /* کلیک روی آیتم‌های منو؛ فعلاً فقط «درخواست‌ها» صفحه دارد */
  const handleMenuSelect = (title: string) => {
    if (title === "درخواست‌ها") {
      openVisitSchedule();
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <AppShell>
      {/* هدر مشترک: لوگو راست + اعلان و منو چپ */}
      <AppHeader onMenuClick={() => setMenuOpen(true)} />

      {page === "home" ? (
        /* ─── صفحهٔ خانه ─── */
        <main className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-4 pb-6">
            <WelcomeSection onNewRequest={openRequestForm} />
            <StageChecklist />
            <QuickActions onNewRequest={openRequestForm} />
          </div>
        </main>
      ) : page === "request-form" ? (
        /* ─── صفحهٔ فرم درخواست تولید ───
            بعد از ثبت موفق: مستقیم به زمان‌بندی بازدید (گام ۶) */
        <RequestFormPage
          onBack={() => setPage("home")}
          onSubmitted={openVisitSchedule}
        />
      ) : page === "visit-schedule" ? (
        /* ─── صفحهٔ زمان‌بندی بازدید مزرعه ───
            بعد از تایید زمان: به‌جای برگشتن به خانه، می‌رویم
            صفحهٔ «تکمیل شرایط همکاری» (گام ۷) */
        <VisitSchedulePage onConfirmed={() => setPage("cooperation")} />
      ) : (
        /* ─── صفحهٔ تکمیل شرایط همکاری ───
            دکمهٔ «مشاهدهٔ درخواست» برمی‌گرداند به صفحهٔ بازدید */
        <CooperationPage onViewRequest={() => setPage("visit-schedule")} />
      )}

      {/* منوی کشویی مشترک؛ همیشه در صفحه است، فقط با open جابه‌جا می‌شود */}
      <DrawerMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelectItem={handleMenuSelect}
      />
    </AppShell>
  );
}
