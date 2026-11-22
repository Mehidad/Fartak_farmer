import { Bell, Menu, Sprout } from "lucide-react";

/* ────────────────────────────────────────────────────────────────
   هدر اپ فرتاک (نوار بالای صفحه)

   مطابق طرح طراح:
   - سمت راست: لوگوی فرتاک (آیکون جوانه طلایی + نوشته سبز تیره)
   - سمت چپ: دکمه اعلان‌ها و دکمه منو (منو در گام ۴ به کشوی کناری
     وصل می‌شود؛ فعلاً فقط ظاهر دارند)

   نکته آموزشی: چون صفحه RTL است، اولین المانِ داخل flex
   به سمتِ راست می‌رود؛ برای همین لوگو را اول نوشته‌ایم.
   ──────────────────────────────────────────────────────────────── */
export default function AppHeader() {
  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-3 bg-white border-b border-border">
      {/* لوگو */}
      <div className="flex items-center gap-1.5 ps-1">
        <Sprout size={24} strokeWidth={2.4} className="text-gold-500" />
        <span className="text-xl font-extrabold text-forest-900 tracking-tight">
          فرتاک
        </span>
      </div>

      {/* دکمه‌های اعلان و منو */}
      <div className="flex items-center gap-0.5">
        <button
          type="button"
          aria-label="اعلان‌ها"
          className="h-10 w-10 grid place-items-center rounded-full text-foreground/70 hover:bg-forest-50 hover:text-forest-800 transition-colors"
        >
          <Bell size={20} strokeWidth={2} />
        </button>
        <button
          type="button"
          aria-label="منو"
          className="h-10 w-10 grid place-items-center rounded-full text-foreground/70 hover:bg-forest-50 hover:text-forest-800 transition-colors"
        >
          <Menu size={22} strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}
