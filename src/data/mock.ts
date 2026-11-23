/* ══════════════════════════════════════════════════════════════
   دیتای Mock (ساختگی) — گام ۴

   چرا فایل جدا؟ چون در پروژه‌های واقعی، دیتا و ظاهر باید جدا
   باشند: بعداً که API فرتاک آماده شد، فقط این فایل عوض می‌شود و
   هیچ‌کدام از کامپوننت‌ها دست نمی‌خورند.

   مفهوم تازه: export و import
   - «export» یعنی «این چیز از بیرونِ فایل قابل استفاده است»
   - هر کامپوننتی که این دیتا را لازم دارد، با «import ... from
     "@/data/mock"» آن را می‌گیرد.
   ══════════════════════════════════════════════════════════════ */

import {
  BookOpen,
  Calendar,
  ChartColumn,
  ClipboardPlus,
  Cog,
  Drill,
  FileText,
  House,
  Leaf,
  PenLine,
  Plug,
  Wallet,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─── انواع مشترک (شکلِ هر تیکه دیتا) ─── */

export type ChecklistItem = { label: string; done: boolean };

export type QuickAction = {
  title: string; // عنوان کارت
  hint: string; // توضیح کوتاه زیر عنوان
  icon: LucideIcon; // کامپوننت آیکون lucide
};

export type MenuItem = {
  title: string;
  icon: LucideIcon;
  active?: boolean; // اختیاری: فقط آیتمِ صفحه فعلی true است
  badge?: number; // اختیاری: شمارنده قرمز، مثل «۲» روی درخواست‌ها
};

/* ─── کاربر فعلی (فعلاً ثابت؛ بعداً از لاگین می‌آید) ─── */

export const farmer = {
  name: "علی محمدی",
  role: "کشاورز همکار فرتاک",
  initial: "ع", // حرف اول اسم برای آواتار
};

/* ─── چک‌لیست مرحله ۱ ─── */

export const checklistItems: ChecklistItem[] = [
  { label: "مساحت و موقعیت زمین", done: true },
  { label: "وضعیت خاک و آب", done: false },
  { label: "نیازها: بذر، کود و خدمات", done: false },
  { label: "ارسال درخواست به کارشناس", done: false },
];

/* ─── سه کارت میان‌بر پایین صفحه ─── */

export const quickActions: QuickAction[] = [
  {
    title: "درخواست جدید",
    hint: "ثبت مساحت، خاک و نیازها",
    icon: ClipboardPlus,
  },
  {
    title: "جدول مالی",
    hint: "اقلام، هزینه‌ها و تسویه",
    icon: Wallet,
  },
  {
    title: "راهنما",
    hint: "آموزش کار با پنل فرتاک",
    icon: BookOpen,
  },
];

/* ─── آیتم‌های منوی کشویی ─── */

/* آیتم‌ها دقیقاً مطابق عکس طراح */
export const menuItems: MenuItem[] = [
  { title: "صفحه اصلی", icon: House, active: true },
  { title: "برنامه کاشت", icon: Leaf },
  { title: "درخواست‌ها", icon: FileText, badge: 2 },
  { title: "یادداشت‌ها", icon: Calendar },
  { title: "مالی و تجهیزات", icon: ChartColumn },
];

/* ─── کارت پشتیبانی پایین منو ─── */

export const supportPromo = {
  title: "نیاز به راهنمایی داری؟",
  desc: "کارشناسان ما پشتیبان فرآیند کشت شما هستند.",
  cta: "تماس با پشتیبانی",
};

/* ─── شماره نسخه برای پایین منو ─── */

export const appVersion = "۰٫۱٫۰";

/* ─── گزینه‌های فرم درخواست — گام ۵ (مطابق عکس طراح) ───
   این لیست‌ها داخل select های صفحهٔ «فرم درخواست تولید» می‌ریزند.
   فعلاً ثابت‌اند؛ بعداً از API فرتاک می‌آیند. */

export const colorOptions = ["مشکی", "سفید", "خاکستری", "آبی", "سبز"];

export const operationOptions = [
  "موتور لوله رباتیک",
  "موتور تسمه‌ای",
  "موتور دنده‌ای",
  "بدون موتور",
];

export const partAOptions = ["الگوی نظارتی", "الگوی نصبی", "الگوی ترکیبی"];

export const partBOptions = ["پیپ", "شلنگ", "لوله پلی‌اتیلن"];

export const partCOptions = ["فلنجی", "پیچی", "جوشی"];

export const partDOptions = ["کلمپی", "پرسی", "رزوه‌ای"];

/* ─── ردیف‌های «چه مواردی در قطعات نازل مجاز است؟» ───
   در عکس طراح ۳ ردیف اول سبز (انتخاب‌شده) و ۶ ردیف بعدی
   سفید (انتخاب‌نشده) هستند؛ با کلیک، وضعیت هر ردیف عوض می‌شود.
   (متن چند ردیف در عکس اصلی خیلی ریز بود؛ اگر با نسخهٔ طراح
   فرق دارد فقط همین‌جا اسم‌ها را عوض کنید.) */

export type NozzleItem = { title: string; icon: LucideIcon };

export const nozzleItems: NozzleItem[] = [
  { title: "پرفکت شیرآلات", icon: Cog },
  { title: "کابل پایه سام", icon: Plug },
  { title: "مته روغن‌کاری", icon: Drill },
  { title: "آچار و متعلقات رابط", icon: Wrench },
  { title: "آمپرمتر مولتی‌متر", icon: PenLine },
  { title: "فلنج و متعلقات لوله", icon: PenLine },
  { title: "قطعات بوشن نازل", icon: PenLine },
  { title: "بوشن تجهیزات", icon: PenLine },
  { title: "آچار آلن", icon: PenLine },
];
