import { ArrowLeft, Sprout } from "lucide-react";

/* ────────────────────────────────────────────────────────────────
   بخش خوش‌آمد صفحه اصلی — گام ۲ (مطابق طرح طراح)

   ساختار:
   ۱) سطر بالا: متن کوچک «شروع همکاری با فرتاک» راست
      + بج طلایی «سطح ۱ از ۴» چپ
   ۲) تیتر «خوش آمدید!...» و زیرتیتر
   ۳) کارت سبز تیره با:
      - مربع طلایی آیکون جوانه + لیبل «قدم اول» (سمت راست)
      - تیتر سفید بزرگ
      - توضیح دو خطی
      - دکمه سفید تمام‌عرض با فلش

   نکته RTL: در justify-between اولین المانِ DOM می‌رود سمت راست؛
   برای همین «شروع همکاری...» را اول نوشته‌ایم.

   گام ۵: دکمهٔ «تکمیل فرم درخواست» واقعی شد — با کلیک روی آن،
   App صفحهٔ فرم را نشان می‌دهد. خود این کامپوننت نمی‌داند «صفحه»
   چیست؛ فقط با صدا زدن onNewRequest خبر می‌دهد.
   ──────────────────────────────────────────────────────────────── */

type WelcomeSectionProps = {
  onNewRequest: () => void; // کلیک روی دکمهٔ سفید کارت
};

export default function WelcomeSection({ onNewRequest }: WelcomeSectionProps) {
  return (
    <section className="px-4 pt-2">
      {/* سطر بالا: متن کوچک + بج سطح */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">شروع همکاری با فرتاک</p>
        <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-bold text-gold-600">
          سطح ۱ از ۴
        </span>
      </div>

      {/* تیتر و زیرتیتر بخش */}
      <h1 className="mt-2.5 text-lg font-extrabold text-foreground">
        خوش آمدید! درخواست خود را تکمیل کنید
      </h1>
      <p className="mt-1.5 text-xs leading-6 text-muted-foreground">
        شما در سطح ۱ هستید؛ اطلاعات مزرعه و نیازمندی‌های موردنیاز را ثبت
        کنید.
      </p>

      {/* ─── کارت سبز تیره فرتاک ─── */}
      <div
        className="
          mt-4 rounded-3xl bg-forest-800 p-5
          bg-[radial-gradient(90%_80%_at_15%_95%,rgba(63,135,99,0.5)_0%,transparent_60%)]
        "
      >
        {/* ردیف اول: مربع طلایی جوانه + لیبل «قدم اول» */}
        <div className="flex items-center gap-2.5">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-400">
            <Sprout size={26} strokeWidth={2.2} className="text-forest-900" />
          </div>
          <span className="text-sm font-medium text-white/75">قدم اول</span>
        </div>

        {/* تیتر کارت */}
        <h2 className="mt-4 text-xl font-extrabold text-white">
          فرتاک درخواست شما را پیدا می‌کند
        </h2>

        {/* توضیح کارت */}
        <p className="mt-2 text-sm leading-7 text-white/70">
          مساحت و موقعیت زمین، وضعیت خاک و آب و نیازهایی مثل بذر و کود و
          خدمات را مشخص کنید.
        </p>

        {/* دکمه سفید تمام‌عرض — در RTL «جهت جلو» سمت چپ است
            گام ۵: با کلیک، App صفحهٔ فرم درخواست را باز می‌کند */}
        <button
          type="button"
          onClick={onNewRequest}
          className="
            mt-5 h-12 w-full flex items-center justify-center gap-2
            rounded-2xl bg-white text-base font-bold text-forest-900
            transition-transform duration-150
            hover:scale-[1.02] active:scale-[0.98]
          "
        >
          تکمیل فرم درخواست
          <ArrowLeft size={18} strokeWidth={2.4} />
        </button>
      </div>
    </section>
  );
}
