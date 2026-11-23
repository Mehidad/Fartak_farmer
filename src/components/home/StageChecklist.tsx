import { Check } from "lucide-react";
import { checklistItems } from "@/data/mock";

/* ────────────────────────────────────────────────────────────────
   چک‌لیست «برای تکمیل این مرحله» — گام ۳، آپدیت گام ۴

   از گام ۴، دیتای چک‌لیست از فایل src/data/mock.ts می‌آید (import
   می‌شود) و این کامپوننت فقط «نشان می‌دهد»؛ دیتا را خودش نگه
   نمی‌دارد. مفهوم‌های map و key و ternary مثل قبل سر جایشان است.
   ──────────────────────────────────────────────────────────────── */

export default function StageChecklist() {
  /* چند مورد انجام شده؟ filter فقط موارد done=true را نگه می‌دارد */
  const doneCount = checklistItems.filter((item) => item.done).length;

  return (
    <section className="mx-4 rounded-2xl border border-border bg-white p-5">
      {/* سربرگ چک‌لیست: عنوان سمت راست، شمارنده سمت چپ */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-forest-950">
          برای تکمیل این مرحله
        </h3>
        <span className="text-xs font-bold text-muted-foreground">
          {doneCount.toLocaleString("fa-IR")} از{" "}
          {checklistItems.length.toLocaleString("fa-IR")}
        </span>
      </div>

      <ul className="mt-4 flex flex-col gap-3.5">
        {checklistItems.map((item) => (
          <li key={item.label} className="flex items-center gap-3">
            {/* دایره وضعیت: انجام‌شده = سبز پر با تیک سفید، انجام‌نشده = حلقه خالی */}
            <span
              className={
                "flex size-6 shrink-0 items-center justify-center rounded-full " +
                (item.done
                  ? "bg-forest-600 text-white"
                  : "border-2 border-forest-200 bg-forest-50")
              }
            >
              {item.done ? <Check size={14} strokeWidth={3} /> : null}
            </span>

            <span
              className={
                "text-sm font-bold " +
                (item.done ? "text-forest-900" : "text-muted-foreground")
              }
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
