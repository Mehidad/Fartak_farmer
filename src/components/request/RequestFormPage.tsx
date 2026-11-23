import { useState, type FormEvent, type ReactNode } from "react";
import { ChevronDown, Plus } from "lucide-react";
import {
  colorOptions,
  nozzleItems,
  operationOptions,
  partAOptions,
  partBOptions,
  partCOptions,
  partDOptions,
} from "@/data/mock";

/* ══════════════════════════════════════════════════════════════
   صفحهٔ «فرم درخواست تولید» — گام ۵ (بازنویسی مطابق عکس طراح)

   ساختار مو‌به‌مو مثل عکس طراح:
   ۱) هدر استاندارد اپ (در App رسم می‌شود) + بنر کرم‌رنگ با
      «مرحله ۲ از ۴» (راست)، «بازگشت به لیست» سبز (چپ)،
      تیتر بزرگ سبز و توضیح کوچک
   ۲) کارت ۱ — اطلاعات کلی: نام و نام خانوادگی / کد ملی /
      شماره تماس / آدرس محل سکونت
   ۳) کارت ۲ — مشخصات فیزیکی و فنی محصول: دو input، دو select
      و یک textarea
   ۴) کارت ۳ — قطعات و متعلقات مجاز: چهار select
   ۵) کارت ۴ — «چه مواردی در قطعات نازل مجاز است؟»: ۹ ردیف
      آیکون‌دار (۳ ردیف اول سبز = انتخاب‌شده، بقیه سفید)؛ با
      کلیک روی هر ردیف، انتخابش برمی‌گردد/برداشته می‌شود.
      + «نکات مهم سفارش» و textarea، داخل همان کارت
   ۶) دو دکمه پایانی: سبز «ثبت سفارشات و ثبت نهایی» (راست) و
      سفید «ذخیره در پیش‌نویس» (چپ)

   مفهوم تازه ۱ — فرم کنترل‌شده: مقدار هر input به state وصل است
   (value + onChange) و همهٔ فیلدها در یک آبجکت FormState هستند.

   مفهوم تازه ۲ — state آرایه‌ای برای ردیف‌های قابل انتخاب:
     const [selected, setSelected] = useState<string[]>(...)
   موقع کلیک: اگر عنوان داخل آرایه بود با filter حذفش می‌کنیم،
   وگرنه با سه‌نقطه [...selected, title] اضافه‌اش می‌کنیم.

   مفهوم تازه ۳ — ترفند آپلود/تیک: input نامرئی داخل label؛
   کلیک روی label = کلیک روی خود input.
   ══════════════════════════════════════════════════════════════ */

/* شکل همهٔ فیلدهای متنی فرم */
type FormState = {
  // کارت ۱ — اطلاعات کلی
  fullName: string;
  nationalId: string;
  phone: string;
  address: string;
  // کارت ۲ — مشخصات فیزیکی و فنی محصول
  productName: string;
  productModel: string;
  color: string;
  operation: string;
  productDescription: string;
  // کارت ۳ — قطعات و متعلقات مجاز
  partA: string;
  partB: string;
  partC: string;
  partD: string;
  // کارت ۴ — نکات مهم سفارش
  notes: string;
};

type RequestFormPageProps = {
  onBack: () => void; // «بازگشت به لیست» بالای فرم
  onSubmitted: () => void; // بعد از ثبت موفق، App برمی‌گردد به خانه
};

/* کلاس‌های مشترک ورودی‌ها — یک‌بار تعریف، همه‌جا استفاده */
const inputClass =
  "h-11 w-full rounded-xl border border-input bg-white px-3 text-sm " +
  "outline-none transition-colors placeholder:text-muted-foreground/60 " +
  "focus:border-forest-500 focus:ring-2 focus:ring-forest-100";
const labelClass = "text-xs font-bold text-muted-foreground";

/* ─── سربرگ هر کارت: بج سبز شماره‌دار + تیتر سبز + توضیح کوچک ─── */
function FormSection({
  num,
  title,
  desc,
  children,
}: {
  num: string;
  title: string;
  desc: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-white p-4">
      <div className="flex items-start gap-2.5">
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-forest-600 text-sm font-extrabold text-white">
          {num}
        </span>
        <div>
          <h3 className="text-sm font-extrabold text-forest-800">{title}</h3>
          <p className="mt-0.5 text-[11px] text-muted-foreground">{desc}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-3">{children}</div>
    </section>
  );
}

/* ─── فیلد کشویی (select) با فلش سفارشی ─── */
function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className={labelClass}>{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass + " appearance-none"}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
      </div>
    </label>
  );
}

/* ─── یک ردیف قابل انتخاب از «قطعات نازل» ───
   انتخاب‌شده = سبز روشن، انتخاب‌نشده = سفید؛ آیکون سمت راست */
function ItemRow({
  selected,
  title,
  onClick,
}: {
  selected: boolean;
  title: string;
  onClick: () => void;
}) {
  const Icon = nozzleItems.find((item) => item.title === title)!.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-right transition-colors " +
        (selected
          ? "border-forest-300 bg-forest-50 text-forest-800"
          : "border-border bg-white text-foreground/75 hover:bg-muted/60")
      }
    >
      {/* آیکون اول است تا در RTL سمت راست بیفتد */}
      <Icon
        size={17}
        strokeWidth={2.2}
        className={selected ? "text-forest-700" : "text-muted-foreground"}
      />
      <span className="text-sm font-bold">{title}</span>
    </button>
  );
}

/* ═══════════════ خود صفحهٔ فرم ═══════════════ */
export default function RequestFormPage({
  onBack,
  onSubmitted,
}: RequestFormPageProps) {
  /* همهٔ فیلدهای متنی در یک آبجکت؛ مقدار اولیهٔ select ها
     همان مقداری است که در عکس طراح داخل کادرها دیده می‌شود */
  const [form, setForm] = useState<FormState>({
    fullName: "",
    nationalId: "",
    phone: "",
    address: "",
    productName: "",
    productModel: "",
    color: colorOptions[0],
    operation: operationOptions[0],
    productDescription: "",
    partA: partAOptions[0],
    partB: partBOptions[0],
    partC: partCOptions[0],
    partD: partDOptions[0],
    notes: "",
  });

  /* ردیف‌های انتخاب‌شدهٔ کارت ۴ — در عکس طراح ۳ ردیف اول سبزند */
  const [selected, setSelected] = useState<string[]>(
    nozzleItems.slice(0, 3).map((item) => item.title),
  );

  /* کلیک روی ردیف: اگر انتخاب شده بود حذف، وگرنه اضافه */
  const toggleItem = (title: string) => {
    setSelected((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title],
    );
  };

  /* ثبت نهایی: اول چک می‌کنیم، بعد «ارسال» (فعلاً alert؛ بعداً API) */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // جلوی رفرش‌شدن صفحه (رفتار پیش‌فرض فرم) را بگیر

    if (form.fullName.trim() === "") {
      alert("نام و نام خانوادگی را کامل کنید.");
      return;
    }
    if (form.nationalId.trim() === "") {
      alert("کد ملی را وارد کنید.");
      return;
    }
    if (form.phone.trim() === "") {
      alert("شماره تماس را وارد کنید.");
      return;
    }

    alert(
      "سفارش شما ثبت شد!\n" + "کارشناس فرتاک مراحل بعدی را پیگیری می‌کند.",
    );
    onSubmitted(); // برگرد به صفحهٔ اصلی
  };

  return (
    <main className="flex-1 overflow-y-auto">
      {/* ─── بنر کرم‌رنگ بالای فرم — مثل عکس طراح ─── */}
      <div className="mx-4 mt-4 rounded-2xl bg-gold-50 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* در RTL اولین فرزند سمت راست می‌افتد: «مرحله ۲ از ۴» */}
          <span className="text-[11px] text-muted-foreground">
            مرحله ۲ از ۴
          </span>
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1 text-xs font-extrabold text-forest-700 transition-colors hover:text-forest-900"
          >
            <Plus size={13} strokeWidth={2.6} />
            بازگشت به لیست
          </button>
        </div>
        <h2 className="mt-1.5 text-lg font-extrabold text-forest-800">
          فرم درخواست تولید
        </h2>
        <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
          لطفاً برای تکمیل ثبت و پیگیری سفارشات، اطلاعات زیر را کامل کنید
        </p>
      </div>

      {/* onSubmit روی خود <form> است؛ دکمهٔ submit هر جای فرم باشد
          کار می‌کند و Enter هم فرم را ارسال می‌کند */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 px-4 pb-6 pt-4"
      >
        {/* کارت ۱ — اطلاعات کلی */}
        <FormSection num="۱" title="اطلاعات کلی مالی" desc="مشخصات مربوط به کاربر">
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>نام و نام خانوادگی</span>
            <input
              type="text"
              placeholder="محمد پامنی"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>کد ملی</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="۱۰۳۴۵۶۷۸۹۰"
              value={form.nationalId}
              onChange={(e) =>
                setForm({ ...form, nationalId: e.target.value })
              }
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>شماره تماس</span>
            <input
              type="tel"
              inputMode="tel"
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>آدرس محل سکونت</span>
            <input
              type="text"
              placeholder="شهر ...، استان ..."
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className={inputClass}
            />
          </label>
        </FormSection>

        {/* کارت ۲ — مشخصات فیزیکی و فنی محصول */}
        <FormSection
          num="۲"
          title="مشخصات فیزیکی و فنی محصول"
          desc="دربارهٔ محصول مدنظر خود و مدل آن"
        >
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>مشخصات کلی محصول</span>
            <input
              type="text"
              placeholder="موتور آب رباتیک"
              value={form.productName}
              onChange={(e) =>
                setForm({ ...form, productName: e.target.value })
              }
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>مدل یا برند محصول</span>
            <input
              type="text"
              placeholder="ماترو رباتیک"
              value={form.productModel}
              onChange={(e) =>
                setForm({ ...form, productModel: e.target.value })
              }
              className={inputClass}
            />
          </label>
          <SelectField
            label="مشخصه رنگی"
            value={form.color}
            onChange={(v) => setForm({ ...form, color: v })}
            options={colorOptions}
          />
          <SelectField
            label="نام عملکرد"
            value={form.operation}
            onChange={(v) => setForm({ ...form, operation: v })}
            options={operationOptions}
          />
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>توضیحات تکمیلی محصول</span>
            <textarea
              rows={3}
              placeholder="ابعاد، مشخصات فنی، مواد ساخت، رعایت جزئیات..."
              value={form.productDescription}
              onChange={(e) =>
                setForm({ ...form, productDescription: e.target.value })
              }
              className={
                "w-full rounded-xl border border-input bg-white px-3 py-2.5 text-sm " +
                "outline-none transition-colors placeholder:text-muted-foreground/60 " +
                "focus:border-forest-500 focus:ring-2 focus:ring-forest-100 " +
                "resize-none"
              }
            />
          </label>
        </FormSection>

        {/* کارت ۳ — قطعات و متعلقات مجاز */}
        <FormSection
          num="۳"
          title="قطعات و متعلقات مجاز"
          desc="کدام قطعات به آن نیاز دارید؟"
        >
          <SelectField
            label="پیگیری اولویت"
            value={form.partA}
            onChange={(v) => setForm({ ...form, partA: v })}
            options={partAOptions}
          />
          <SelectField
            label="نوع پایپ"
            value={form.partB}
            onChange={(v) => setForm({ ...form, partB: v })}
            options={partBOptions}
          />
          <SelectField
            label="آلیاژ بدنه"
            value={form.partC}
            onChange={(v) => setForm({ ...form, partC: v })}
            options={partCOptions}
          />
          <SelectField
            label="نوع اتصال"
            value={form.partD}
            onChange={(v) => setForm({ ...form, partD: v })}
            options={partDOptions}
          />
        </FormSection>

        {/* کارت ۴ — چه مواردی در قطعات نازل مجاز است؟ */}
        <FormSection
          num="۴"
          title="چه مواردی در قطعات نازل مجاز است؟"
          desc="شرایط مورد تایید شما چیست؟"
        >
          {/* map روی لیست ردیف‌ها؛ selected بودن هرکدام را از
              آرایهٔ selected می‌فهمیم (includes) */}
          {nozzleItems.map((item) => (
            <ItemRow
              key={item.title}
              title={item.title}
              selected={selected.includes(item.title)}
              onClick={() => toggleItem(item.title)}
            />
          ))}

          {/* نکات مهم سفارش — مثل عکس، داخل همین کارت */}
          <div className="mt-2 flex flex-col gap-1.5">
            <span className={labelClass}>نکات مهم سفارش</span>
            <textarea
              rows={3}
              placeholder="مثلاً: سیم‌کشی، شلنگ، شیر برقی، فن..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className={
                "w-full rounded-xl border border-input bg-white px-3 py-2.5 text-sm " +
                "outline-none transition-colors placeholder:text-muted-foreground/60 " +
                "focus:border-forest-500 focus:ring-2 focus:ring-forest-100 " +
                "resize-none"
              }
            />
          </div>
        </FormSection>

        {/* ─── دکمه‌های پایانی — سبز (راست) + سفید (چپ) ─── */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="submit"
            className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-forest-800 text-[13px] font-extrabold text-white transition-transform duration-150 hover:bg-forest-900 active:scale-[0.98]"
          >
            <Plus size={17} strokeWidth={2.6} />
            ثبت سفارشات و ثبت نهایی
          </button>
          <button
            type="button"
            onClick={() => alert("پیش‌نویس ذخیره شد (نسخهٔ دمو).")}
            className="h-12 rounded-2xl border border-border bg-white text-[13px] font-extrabold text-forest-900 transition-colors hover:bg-muted"
          >
            ذخیره در پیش‌نویس
          </button>
        </div>
      </form>
    </main>
  );
}
