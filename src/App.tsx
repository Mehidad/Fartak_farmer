import { useState } from "react";
import AppShell from "@/components/app/AppShell";
import AppHeader from "@/components/app/AppHeader";
import WelcomeSection from "@/components/app/WelcomeSection";
import DrawerMenu from "@/components/home/DrawerMenu";
import StageChecklist from "@/components/home/StageChecklist";
import QuickActions from "@/components/home/QuickActions";
import RequestFormPage from "@/components/request/RequestFormPage";

/* ────────────────────────────────────────────────────────────────
   App — گام ۵ (+ جابه‌جایی بین صفحه‌ها)

   مفهوم تازه: نمایش شرطیِ صفحه‌ها (conditional rendering)

   page دو مقدار می‌تواند داشته باشد:
   - "home"          ← داشبورد (همان صفحهٔ قبلی)
   - "request-form"  ← فرم درخواست تولید (جدید)

   هدر اپ و منوی کشویی «مشترک» هر دو صفحه‌اند، پس بیرون از
   ternary رسم می‌شوند — دقیقاً مثل عکس طراح که بالای فرم هم
   همان نوار لوگو و آیکون‌ها هست. فقط «محتوای وسط» عوض می‌شود.

   دکمه‌های فرزند نمی‌دانند «صفحه» چیست؛ فقط خبر می‌دهند:
   - WelcomeSection و QuickActions می‌گویند: «فرم را باز کن»
   - RequestFormPage می‌گوید: «برگرد خانه»
   تصمیم و اجرا همه در App است — همان الگوی «بردن state بالا».
   ──────────────────────────────────────────────────────────────── */

/* اسم صفحه‌ها یک‌جا این‌جا تعریف شده تا غلط تایپی ممکن نباشد */
type PageName = "home" | "request-form";

export default function App() {
  /* state منوی کشویی (برای هر دو صفحه مشترک است) */
  const [menuOpen, setMenuOpen] = useState(false);
  /* کدام صفحه دیده شود؟ پیش‌فرض: خانه */
  const [page, setPage] = useState<PageName>("home");

  /* این تابع را به همهٔ دکمه‌هایی می‌دهیم که فرم درخواست را باز می‌کنند */
  const openRequestForm = () => {
    setMenuOpen(false); // اگر منو باز بود، ببند
    setPage("request-form");
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
      ) : (
        /* ─── صفحهٔ فرم درخواست ─── */
        <RequestFormPage
          onBack={() => setPage("home")}
          onSubmitted={() => setPage("home")}
        />
      )}

      {/* منوی کشویی مشترک؛ همیشه در صفحه است، فقط با open جابه‌جا می‌شود */}
      <DrawerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </AppShell>
  );
}
