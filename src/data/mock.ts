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

/* ══════════════════════════════════════════════════════════════
   گام ۶ — دیتای صفحهٔ «زمان‌بندی بازدید مزرعه»

   داستان: بعد از ثبت فرم درخواست، کارشناس یک زمان پیشنهادی برای
   بازدید مزرعه ثبت می‌کند. این صفحه همان پیشنهاد را نشان می‌دهد.
   همهٔ متن‌ها این‌جاست تا بعداً با API فرتاک فقط این فایل عوض شود.
   ══════════════════════════════════════════════════════════════ */

/* چیپ‌های فیلتر بالای صفحه؛ اولی (سبز) فعال است.
   (متن چند چیپ در عکس طراح خیلی ریز بود؛ اگر با نسخهٔ طراح
   فرق دارد فقط همین‌جا اسم‌ها را عوض کنید.) */
export const visitFilters = [
  "درخواست فعال",
  "همه درخواست‌های فعال",
  "سطح ۴",
  "سطح ۳",
  "سطح ۲",
  "سطح ۱",
  "املاک مستعد کشتایی",
];

/* کارت کارشناس */
export const visitExpert = {
  role: "کارشناس بهداشت گیاهی",
  name: "مهندس مصلی کرم‌ریمی",
  experience: "کارشناسی با بیش از ۸ سال تجربه",
  initial: "م", // حرف اول اسم برای آواتار
};

/* جعبهٔ طلایی زمان پیشنهادی */
export const proposedVisit = {
  label: "زمان پیشنهادی برای بازدید",
  date: "شنبه، ۳ آذر ۱۴۰۴",
  hours: "ساعت ۸:۳۰ تا ۱۰:۰۰",
};

/* چک‌لیست «در این بازدید موارد زیر بررسی می‌شود» */
export const visitChecks = [
  "وضعیت و بافت خاک",
  "منابع و کیفیت آب",
  "سلامت و تشخیص بیماری گیاه",
  "تجهیزات و امکانات موجود",
];

/* کارت نقشه مزرعه (فعلاً placeholder؛ بعداً نقشهٔ واقعی) */
export const farmLocation = {
  title: "موقعیت دقیق مزرعه",
  updated: "به‌روزشده: پنجشنبه، ۵ آذر",
};
/* ─── نقشهٔ واقعی زمین — چندضلعی (Polygon) مزرعه ───
   زمینِ کشاورز یک چندضلعی با مختصات جغرافیایی است؛ هر نقطه
   «عرض جغرافیایی (lat)» و «طول جغرافیایی (lng)» دارد.
   «farmLandCenter» = مرکز همین چندضلعی؛ یعنی میانگین مختصات
   نقاطش. همین نقطه است که با پین سبز روی نقشه دیده می‌شود.
   فعلاً ساختگی است؛ بعداً از GPS فرم یا API فرتاک پر می‌شود. */

export type LatLng = { lat: number; lng: number };

export const farmLandPolygon: LatLng[] = [
  { lat: 32.7071, lng: 51.0384 },
  { lat: 32.7121, lng: 51.0451 },
  { lat: 32.7087, lng: 51.0526 },
  { lat: 32.7032, lng: 51.0471 },
  { lat: 32.7048, lng: 51.0397 },
];

/* مرکز پولیگون = میانگینِ سادهٔ عرض و طول همهٔ نقاط */
export const farmLandCenter: LatLng = {
  lat:
    farmLandPolygon.reduce((sum, p) => sum + p.lat, 0) /
    farmLandPolygon.length,
  lng:
    farmLandPolygon.reduce((sum, p) => sum + p.lng, 0) /
    farmLandPolygon.length,
};
/* نکات قبل از بازدید */
export const visitNotes = {
  title: "نکات قبل از بازدید",
  body: "مدارک مالکیت یا اجارهٔ زمین و مجوز آبرسانی را، در صورت وجود، همراه داشته باشید.",
};
