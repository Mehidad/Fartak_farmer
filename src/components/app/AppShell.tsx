import type { ReactNode } from "react";

/* ────────────────────────────────────────────────────────────────
   پوسته اپ (App Shell)

   این کامپوننت دو کار انجام می‌دهد:
   ۱) پس‌زمینه سبز-خاکستری روشن بیرونِ قاب را می‌سازد
   ۲) قاب گوشی را وسط صفحه قرار می‌دهد (مثل طرح‌های طراح)

   نکته آموزشی: «children» یعنی «هر چیزی که بین
   <AppShell> و </AppShell> نوشته شود، داخل این قاب رندر می‌شود».
   ──────────────────────────────────────────────────────────────── */
export default function AppShell({ children }: { children: ReactNode }) {
  return (
    // لایه بیرونی: کل صفحه مرورگر
    <div className="min-h-dvh bg-forest-100/70 flex justify-center sm:py-8 sm:px-4">
      {/* قاب گوشی: روی دسکتاپ عرض ثابت ۴۰۰px و گوشه‌های خیلی گرد؛
          روی موبایل واقعی تمام‌صفحه می‌شود */}
      <div
        className="
          relative w-full max-w-[400px] bg-white
          h-dvh sm:h-[860px]
          sm:rounded-[2.5rem]
          sm:shadow-[0_25px_60px_-15px_rgba(20,56,40,0.35)]
          sm:border sm:border-black/10
          flex flex-col overflow-hidden
        "
      >
        {children}
      </div>
    </div>
  );
}
