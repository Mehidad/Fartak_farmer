import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import {
  coopBanner,
  coopFilterInputs,
  coopFilterLevels,
  coopFooter,
  coopHeader,
  coopPathLink,
  coopSteps,
} from "@/data/mock";

/* ══════════════════════════════════════════════════════════════
   صفحهٔ «تکمیل شرایط همکاری» — گام ۷

   ساختار مو‌به‌مو مثل عکس طراح:
   ۱) نوار چیپ‌ها + جداکنندهٔ عمودی + لینک سادهٔ انتها
   ۲) سرصفحه: بج طلایی «سطح ۲ از ۴» سمت چپ + متن ریز سمت راست
   ۳) تیتر بزرگ «تکمیل شرایط همکاری» + زیرتیتر
   ۴) بنر سبز موفقیت: دایرهٔ تیک راست + دکمهٔ سفید تمام‌عرض
   ۵) چهار کارت گام — از آرایهٔ coopSteps با map
   ۶) دکمهٔ سبز پایانی با فلش (در RTL فلشِ «ادامه» به چپ است)

   مفهوم تازه — کامپوننتِ داخل دیتا: هر آیتم coopSteps یک
   کامپوننت آیکون دارد (icon: User) و این‌جا با <step.icon />
   رندرش می‌کنیم. JSX هر عبارتی که با حرف بزرگ شروع شود یا نقطه
   داشته باشد را «کامپوننت» می‌داند؛ پس step.icon جواب می‌دهد.
   ══════════════════════════════════════════════════════════════ */

type CooperationPageProps = {
  onViewRequest: () => void; // «مشاهدهٔ درخواست» → صفحهٔ زمان‌بندی بازدید
};

export default function CooperationPage({
  onViewRequest,
}: CooperationPageProps) {
  /* اسم چیپ فعال — پیش‌فرض «سطح ۲» مثل عکس طراح */
  const [activeFilter, setActiveFilter] = useState("سطح ۲");

  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      {/* ─── ۱) نوار چیپ‌ها — ثابت زیر هدر، افقی قابل اسکرول ─── */}
      <div className="shrink-0 border-b border-border bg-white">
        <div className="flex items-center gap-2 overflow-x-auto px-3 py-2.5">
          {/* چیپ اول (نهاده‌ها) — همیشه سفید */}
          <button
            type="button"
            className="shrink-0 rounded-xl border border-border bg-white px-3.5 py-2 text-xs font-bold text-muted-foreground hover:bg-muted"
          >
            {coopFilterInputs}
          </button>

          {/* جداکنندهٔ عمودی بین دو گروه چیپ */}
          <span className="h-6 w-px shrink-0 bg-border" />

          {/* چیپ‌های سطح ۴ تا ۱ — فعال سبز، بقیه سفید */}
          {coopFilterLevels.map((title) => (
            <button
              key={title}
              type="button"
              onClick={() => setActiveFilter(title)}
              className={
                "shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors " +
                (title === activeFilter
                  ? "bg-forest-700 text-white"
                  : "bg-white text-muted-foreground hover:bg-muted")
              }
            >
              {title}
            </button>
          ))}

          {/* لینک سادهٔ انتهای نوار — بدون جعبه */}
          <button
            type="button"
            className="shrink-0 whitespace-nowrap px-1 text-xs text-muted-foreground/80"
          >
            {coopPathLink}
          </button>
        </div>
      </div>

      {/* ─── بدنهٔ اسکرول‌شونده ─── */}
      <div className="flex-1 overflow-y-auto px-4 pb-8 pt-4">
        {/* ─── ۲) سرصفحه: بج طلا «چپ» + متن ریز «راست» ───
            بج اول است تا در RTL به لبهٔ چپ بیفتد (همان اصلاح
            صفحهٔ قبل) */}
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-gold-100 px-3 py-1 text-[11px] font-extrabold text-gold-600">
            {coopHeader.level}
          </span>
          <p className="text-[11px] text-muted-foreground">
            {coopHeader.report}
          </p>
        </div>

        {/* ─── ۳) تیتر و زیرتیتر ─── */}
        <h2 className="mt-3 text-2xl font-extrabold text-forest-950">
          {coopHeader.title}
        </h2>
        <p className="mt-2 text-xs leading-6 text-muted-foreground">
          {coopHeader.subtitle}
        </p>

        {/* ─── ۴) بنر سبز موفقیت ─── */}
        <section className="mt-4 rounded-3xl bg-forest-50 p-4">
          {/* دایرهٔ تیک اول است تا در RTL سمت راست بیفتد */}
          <div className="flex items-start gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-forest-600">
              <Check size={22} strokeWidth={3} className="text-white" />
            </span>
            <div className="flex-1 pt-0.5">
              <h3 className="text-base font-extrabold text-forest-950">
                {coopBanner.title}
              </h3>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {coopBanner.desc}
              </p>
            </div>
          </div>

          {/* دکمهٔ سفید تمام‌عرض → برمی‌گردد به صفحهٔ بازدید */}
          <button
            type="button"
            onClick={onViewRequest}
            className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-white text-[13px] font-extrabold text-forest-800 shadow-sm transition-colors hover:bg-forest-100/50"
          >
            {coopBanner.cta}
          </button>
        </section>

        {/* ─── ۵) چهار کارت گام‌ها — map روی آرایهٔ coopSteps ─── */}
        <section className="mt-4 flex flex-col gap-4">
          {coopSteps.map((step) => (
            <article
              key={step.number}
              className="rounded-3xl border border-border bg-white p-4 shadow-sm"
            >
              {/* ردیف بالا: آیکون راست + شمارهٔ کم‌رنگ چپ */}
              <div className="flex items-start justify-between">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-forest-50 text-forest-700">
                  <step.icon size={24} strokeWidth={2} />
                </span>
                <span className="text-3xl font-extrabold text-forest-950/20">
                  {step.number}
                </span>
              </div>

              <h3 className="mt-5 text-base font-extrabold text-forest-950">
                {step.title}
              </h3>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {step.desc}
              </p>

              {/* دکمهٔ سفید با حاشیه — هر گام یک پیام دمو */}
              <button
                type="button"
                onClick={() =>
                  alert(`گام «${step.title}» در نسخهٔ دمو فعال نیست.`)
                }
                className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl border border-border bg-white text-[13px] font-extrabold text-forest-800 transition-colors hover:bg-forest-50"
              >
                {step.cta}
              </button>
            </article>
          ))}
        </section>

        {/* ─── ۶) دکمهٔ سبز پایانی؛ فلش آخر است تا در RTL چپ بیفتد ─── */}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() =>
              alert("اطلاعات ثبت شد و به سطح ۳ رفتید (نسخهٔ دمو).")
            }
            className="flex h-12 items-center gap-2 rounded-2xl bg-forest-800 px-7 text-[13px] font-extrabold text-white transition-transform duration-150 hover:bg-forest-900 active:scale-[0.98]"
          >
            {coopFooter.cta}
            <ArrowLeft size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </main>
  );
}
