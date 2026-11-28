import { ArrowLeft, Leaf, Sprout, X } from "lucide-react";
import { appVersion, menuItems, supportPromo } from "@/data/mock";

/* ────────────────────────────────────────────────────────────────
   منوی کشویی (Drawer) — بازطراحی مطابق عکس طراح

   ساختار از بالا به پایین:
   ۱) سربرگ: لوگو فرتاک (راست) + دکمه ضربدر خاکستری (چپ)
   ۲) کپشن «پنل کشاورز»
   ۳) آیتم‌های منو؛ آیتمِ صفحه فعلی داخل «قرص» سبز روشن است
   ۴) کارت کرم‌رنگ پشتیبانی (با mt-auto می‌چسبد به پایین)
   ۵) ردیف نسخه

   ترفند انیمیشن (مثل قبل، بدون کتابخانه): منو همیشه در صفحه است
   ولی وقتی بسته است با translate-x-full بیرونِ قاب پارک شده و
   چون قاب گوشی overflow-hidden دارد، دیده نمی‌شود.
   ──────────────────────────────────────────────────────────────── */

type DrawerMenuProps = {
  open: boolean; // باز است یا بسته؟
  onClose: () => void; // هر جای منو خواستیم ببندیم، این را صدا می‌زنیم
  onSelectItem?: (title: string) => void; // اختیاری: کلیک روی هر آیتم را به App خبر می‌دهد
};

export default function DrawerMenu({
  open,
  onClose,
  onSelectItem,
}: DrawerMenuProps) {
  return (
    <>
      {/* پرده تیره پشت منو؛ کلیک روی آن یعنی «ببند» */}
      <div
        onClick={onClose}
        className={
          "absolute inset-0 z-40 bg-forest-950/40 transition-opacity duration-300 " +
          (open ? "opacity-100" : "pointer-events-none opacity-0")
        }
      />

      {/* خود منو — از سمت راستِ قاب باز می‌شود */}
      <aside
        className={
          "absolute inset-y-0 right-0 z-50 flex w-[300px] max-w-[88%] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out " +
          (open ? "translate-x-0" : "translate-x-full")
        }
      >
        {/* سربرگ: لوگو سمت راست، ضربدر سمت چپ */}
        <div className="flex items-center justify-between px-5 pt-6">
          <div className="flex items-center gap-1.5">
            <Sprout size={22} strokeWidth={2.4} className="text-gold-500" />
            <span className="text-lg font-extrabold text-forest-900 tracking-tight">
              فرتاک
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن منو"
            className="grid size-10 place-items-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-forest-50 hover:text-forest-800"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>

        <p className="mt-1.5 px-5 text-xs text-muted-foreground">
          پنل کشاورز
        </p>

        {/* آیتم‌های منو؛ آیکون اول است تا در RTL سمت راست بیفتد */}
        <nav className="mt-4 flex flex-col gap-1 px-3">
          {menuItems.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() => onSelectItem?.(item.title)}
              /* با «?.» می‌گوییم: اگر App تابعی نداده بود، فقط onClose اجرا شود */
              className={
                "flex items-center gap-3 rounded-2xl px-3.5 py-3 text-right transition-colors " +
                (item.active ? "bg-forest-100" : "hover:bg-muted")
              }
            >
              <item.icon
                size={19}
                strokeWidth={2}
                className={
                  item.active ? "text-forest-700" : "text-muted-foreground"
                }
              />
              <span
                className={
                  "text-sm " +
                  (item.active
                    ? "font-extrabold text-forest-900"
                    : "font-bold text-foreground/80")
                }
              >
                {item.title}
              </span>
              {/* بج قرمز شمارنده، مثل «۲» روی درخواست‌ها */}
              {item.badge ? (
                <span className="grid size-6 place-items-center rounded-full bg-destructive text-[11px] font-extrabold text-white">
                  {item.badge.toLocaleString("fa-IR")}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        {/* کارت پشتیبانی؛ mt-auto آن را می‌چسباند به پایین منو */}
        <div className="mx-4 mt-auto rounded-3xl bg-gold-50 p-4">
          <span className="grid size-9 place-items-center rounded-xl bg-white text-forest-600 shadow-sm">
            <Leaf size={18} strokeWidth={2.2} />
          </span>
          <h4 className="mt-3 text-sm font-extrabold text-forest-950">
            {supportPromo.title}
          </h4>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {supportPromo.desc}
          </p>
          <button
            type="button"
            className="mt-3 text-sm font-extrabold text-forest-700 transition-colors hover:text-forest-900"
          >
            {supportPromo.cta}
          </button>
        </div>

        {/* ردیف پایین: دایره ؟ + آپدیت جدید + نسخه + فلش */}
        <div className="flex items-center gap-3 px-5 py-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-forest-50 text-sm font-extrabold text-forest-800">
            ؟
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-extrabold text-forest-950">
              آپدیت جدید
            </span>
            <span className="text-[10px] font-bold text-muted-foreground">
              نسخه: {appVersion}
            </span>
          </div>
          <ArrowLeft size={18} className="ms-auto text-muted-foreground" />
        </div>
      </aside>
    </>
  );
}
