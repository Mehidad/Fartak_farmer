import { quickActions } from "@/data/mock";

/* ────────────────────────────────────────────────────────────────
   سه کارت پایین صفحه: درخواست جدید / جدول مالی / راهنما
   گام ۳ + آپدیت گام ۴: دیتا از فایل src/data/mock.ts می‌آید.

   گام ۵: کارت «درخواست جدید» صفحهٔ واقعی فرم را باز می‌کند؛
   بقیه فعلاً alert هستند تا صفحه‌هایشان ساخته شود.
   مفهوم‌ها مثل قبل: آیکون به‌عنوان داده + map + onClick.
   ──────────────────────────────────────────────────────────────── */

type QuickActionsProps = {
  onNewRequest: () => void; // فقط کارت «درخواست جدید» این را صدا می‌زند
};

export default function QuickActions({ onNewRequest }: QuickActionsProps) {
  return (
    <div className="mx-4 flex flex-col gap-3">
      {quickActions.map((action) => (
        <button
          key={action.title}
          type="button"
          onClick={() =>
            action.title === "درخواست جدید"
              ? onNewRequest() // گام ۵: باز کردن صفحهٔ فرم درخواست
              : alert(
                  `«${action.title}» — در گام‌های بعدی صفحه واقعی خودش ساخته می‌شود`,
                )
          }
          className="
            w-full rounded-2xl border border-border bg-white p-4
            flex items-center justify-between text-right
            transition-transform duration-150
            hover:scale-[1.01] active:scale-[0.98]
          "
        >
          {/* متن‌ها: در RTL اولین فرزند سمت راست می‌افتد */}
          <span className="flex flex-col items-start gap-1">
            <span className="text-sm font-extrabold text-forest-950">
              {action.title}
            </span>
            <span className="text-xs text-muted-foreground">
              {action.hint}
            </span>
          </span>

          {/* مربع آیکون: سمت چپ */}
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest-50 text-forest-700">
            <action.icon size={20} strokeWidth={2.2} />
          </span>
        </button>
      ))}
    </div>
  );
}
