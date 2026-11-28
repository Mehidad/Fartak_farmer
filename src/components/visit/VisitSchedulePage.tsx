import { useState } from "react";
import { CalendarDays, Check,  Phone } from "lucide-react";
import FarmMap from "@/components/visit/FarmMap";
import {
  appVersion,
  farmLandPolygon,
  proposedVisit,
  visitChecks,
  visitExpert,
  visitFilters,
  visitNotes,
} from "@/data/mock";

/* ══════════════════════════════════════════════════════════════
   صفحهٔ «زمان‌بندی بازدید مزرعه» — گام ۶

   ساختار مو‌به‌مو مثل عکس طراح:
   ۱) زیر هدر مشترک، نوار چیپ‌های فیلتر (افقی و قابل اسکرول)
   ۲) دو بج وضعیت: سبز «منتظر تایید شما» + طلایی «سطح ۱ از ۴»
   ۳) تیتر بزرگ «زمان‌بندی بازدید مزرعه» + توضیح کوچک
   ۴) کارت ۱ — کارشناس: آواتار + نقش و اسم و تجربه + ردیف
      «مشاوره تلفنی» + جعبهٔ طلایی زمان پیشنهادی + چک‌لیست
      بازدید + دو دکمهٔ پایانی (سبز و سفید)
   ۵) کارت ۲ — ناحیهٔ نقشه (placeholder سبز روشن) + «نکات قبل
      از بازدید»

   مفهوم تازه ۱ — صفحهٔ دو تکه: نوار چیپ‌ها «ثابت» زیر هدر
   می‌ماند و فقط بدنه اسکرول می‌شود. main حالت flex-col دارد،
   چیپ‌ها shrink-0 هستند و بدنه flex-1 + overflow-y-auto.

   مفهوم تازه ۲ — کلاس شرطی برای چیپ فعال: state فقط «اسم چیپ
   فعال» را نگه می‌دارد؛ در className با ternary انتخاب می‌کنیم
   رنگ سبز بگذاریم یا سفید. React با هر کلیک خودش دوباره رسم
   می‌کند — بدون هیچ دست‌کاری DOM از سمت ما.

   مفهوم تازه ۳ — چرخهٔ درخواست: در App بعد از ثبت موفق فرم،
   دیگر به خانه برنمی‌گردیم؛ مستقیم می‌آییم همین‌جا تا کاربر
   کل مسیر «ثبت درخواست ← تایید بازدید» را یک‌جا ببیند.
   ══════════════════════════════════════════════════════════════ */

type VisitSchedulePageProps = {
  onConfirmed: () => void; // بعد از تایید زمان، App برمی‌گرداند به خانه
};

export default function VisitSchedulePage({
  onConfirmed,
}: VisitSchedulePageProps) {
  /* اسم چیپ فعال — پیش‌فرض: اولین چیپ یعنی «درخواست فعال» */
  const [activeFilter, setActiveFilter] = useState(visitFilters[0]);

  /* تایید زمان: اول پیام موفقیت، بعد برگشت به خانه */
  const handleConfirm = () => {
    alert(
      "زمان بازدید تایید شد!\n" +
        "کارشناس فرتاک در زمان مقرر به مزرعه شما سر می‌زند.",
    );
    onConfirmed();
  };

  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      {/* ─── ۱) نوار چیپ‌ها — ثابت زیر هدر، افقی قابل اسکرول ───
          overflow-x-auto یعنی «اگر چیپ‌ها جا نشدند، افقی اسکرول
          کن»؛ shrink-0 هم اجازه نمی‌دهد چیپ‌ها له شوند */}
      <div className="shrink-0 border-b border-border bg-white">
        <div className="flex gap-2 overflow-x-auto px-3 py-2.5">
          {visitFilters.map((title) => (
            <button
              key={title}
              type="button"
              onClick={() => setActiveFilter(title)}
              className={
                "shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors " +
                (title === activeFilter
                  ? "bg-forest-700 text-white"
                  : "border border-border bg-white text-muted-foreground hover:bg-muted")
              }
            >
              {title}
            </button>
          ))}
        </div>
      </div>

      {/* ─── بدنهٔ اسکرول‌شونده ─── */}
      <div className="flex-1 overflow-y-auto px-4 pb-8 pt-4">
        {/* ─── ۲) بج‌های وضعیت — در RTL اولین فرزند سمت راست است ─── */}
       <div className="flex items-center justify-end gap-2">
          <span className="rounded-full bg-forest-100 px-3 py-1 text-[11px] font-extrabold text-forest-700">
            منتظر تایید شما
          </span>
          <span className="rounded-full bg-gold-100 px-3 py-1 text-[11px] font-extrabold text-gold-600">
            سطح ۱ از ۴
          </span>
        </div>

        {/* ─── ۳) تیتر و توضیح ─── */}
        <p className="mt-3 text-[11px] text-muted-foreground">
          درخواست فعال شما
        </p>
        <h2 className="mt-1 text-2xl font-extrabold text-forest-950">
          زمان‌بندی بازدید مزرعه
        </h2>
        <p className="mt-2 text-xs leading-6 text-muted-foreground">
          کارشناس زمان پیشنهادی را ثبت کرده است؛ در صورت تایید یا درخواست
          تغییر، بازدید در زمان مقرر انجام خواهد شد.
        </p>

        {/* ─── ۴) کارت کارشناس و زمان بازدید ─── */}
        <section className="mt-4 rounded-3xl border border-border bg-white p-4 shadow-sm">
          {/* ردیف کارشناس: آواتار اول است تا در RTL سمت راست بیفتد */}
          <div className="flex items-center gap-3">
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-forest-100 text-lg font-extrabold text-forest-700">
              {visitExpert.initial}
            </span>
            <div>
              <p className="text-[11px] text-muted-foreground">
                {visitExpert.role}
              </p>
              <h3 className="mt-0.5 text-base font-extrabold text-forest-950">
                {visitExpert.name}
              </h3>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {visitExpert.experience}
              </p>
            </div>
          </div>

          {/* ردیف «مشاوره تلفنی» — مثل عکس، کادر سفید تمام‌عرض */}
          <button
            type="button"
            onClick={() =>
              alert("تماس با کارشناس — در نسخهٔ دمو فعال نیست.")
            }
            className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-white text-sm font-extrabold text-forest-800 transition-colors hover:bg-forest-50"
          >
            <Phone size={15} strokeWidth={2.2} className="text-forest-600" />
            مشاوره تلفنی
          </button>

          <div className="my-4 h-px bg-border" />

          {/* جعبهٔ طلایی زمان پیشنهادی؛ آیکون آخر است تا در RTL
              سمت چپ بیفتد */}
          <div className="flex items-center gap-3 rounded-2xl bg-gold-50 p-4">
            <div className="flex-1">
              <p className="text-[11px] text-gold-600">
                {proposedVisit.label}
              </p>
              <p className="mt-1 text-lg font-extrabold text-forest-950">
                {proposedVisit.date}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {proposedVisit.hours}
              </p>
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white shadow-sm">
              <CalendarDays
                size={22}
                strokeWidth={2.1}
                className="text-gold-500"
              />
            </span>
          </div>

          {/* چک‌لیست بازدید — map روی visitChecks */}
          <p className="mt-4 text-sm font-extrabold text-forest-950">
            در این بازدید موارد زیر بررسی می‌شود:
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {visitChecks.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <Check
                  size={16}
                  strokeWidth={2.6}
                  className="shrink-0 text-forest-600"
                />
                <span className="text-[13px] text-foreground/75">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="my-4 h-px bg-border" />

          {/* دو دکمهٔ پایانی — سبز روی سفید، هر دو تمام‌عرض */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleConfirm}
              className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-forest-800 text-[13px] font-extrabold text-white transition-transform duration-150 hover:bg-forest-900 active:scale-[0.98]"
            >
              <Check size={16} strokeWidth={2.8} />
              تایید زمان بازدید
            </button>
            <button
              type="button"
              onClick={() =>
                alert("درخواست تغییر زمان برای کارشناس ارسال شد (نسخهٔ دمو).")
              }
              className="h-12 rounded-2xl border border-border bg-white text-[13px] font-extrabold text-forest-900 transition-colors hover:bg-muted"
            >
              درخواست تغییر زمان
            </button>
          </div>
        </section>

        {/* ─── ۵) کارت نقشه و نکات ─── */}
        <section className="mt-4 rounded-3xl border border-border bg-white p-4 shadow-sm">
          {/* ناحیهٔ نقشه فعلاً placeholder است؛ کلیک روی آن پیام دمو */}
          <button
            type="button"
            onClick={() =>
              alert("نمایش روی نقشه در گام‌های بعدی اضافه می‌شود (نسخهٔ دمو).")
            }
            className="flex h-64 w-full flex-col items-center justify-center gap-2 rounded-2xl bg-forest-50 transition-colors hover:bg-forest-100/60"
          >
            <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-extrabold text-forest-950">
              {farmLandPolygon.title}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {farmLandPolygon.updated}
            </span>
          </div>
          </button>

          <h4 className="mt-4 text-sm font-extrabold text-forest-950">
            {visitNotes.title}
          </h4>
          <p className="mt-1.5 text-[11px] leading-5 text-muted-foreground">
            {visitNotes.body}
          </p>
        </section>

        <p className="mt-6 text-center text-[10px] font-bold text-muted-foreground/70">
          پنل کشاورز فرتاک — نسخه {appVersion}
        </p>
      </div>
    </main>
  );
}
