import "leaflet/dist/leaflet.css"; // استایل پایهٔ خود نقشه — بدون این، نقشه به‌هم می‌ریزد
import { divIcon } from "leaflet";
import { MapContainer, Marker, Polygon, TileLayer } from "react-leaflet";
import { farmLandCenter, farmLandPolygon } from "@/data/mock";

/* ══════════════════════════════════════════════════════════════
   FarmMap — نقشهٔ واقعی زمین مزرعه

   - MapContainer ← خودِ نقشه (جعبه‌ای که همه‌چیز داخلش است)
   - TileLayer    ← تصاویر نقشه از سرور OpenStreetMap (رایگان)
   - Polygon      ← محدودهٔ زمین کشاورز (همان چندضلعی در mock)
   - Marker       ← پینِ مرکز زمین

   چرا divIcon؟ آیکون پیش‌فرض Leaflet موقع build با Vite خراب
   می‌شود؛ پس به‌جایش یک پین SVG سبزِ هم‌سبکِ فرتاک می‌سازیم.
   ══════════════════════════════════════════════════════════════ */

/* پین سفارشی: SVG سبز با حلقهٔ سفید — مثل پین‌های اپ‌های نقشه */
const landPin = divIcon({
  className: "", // استایل جعبهٔ سفیدِ پیش‌فرض Leaflet را خاموش می‌کند
  html: `
    <svg width="30" height="38" viewBox="0 0 30 38">
      <ellipse cx="15" cy="35" rx="6" ry="2.5" fill="rgba(14,42,31,0.25)"/>
      <path d="M15 2C8.4 2 3 7.3 3 13.8 3 22.6 15 33 15 33s12-10.4 12-19.2C27 7.3 21.6 2 15 2Z"
            fill="#1b4a36" stroke="#ffffff" stroke-width="2.5"/>
      <circle cx="15" cy="13.8" r="4.2" fill="#ffffff"/>
    </svg>
  `,
  iconSize: [30, 38],
  iconAnchor: [15, 34], // نوکِ پین دقیقاً روی مختصات مرکز زمین می‌افتد
});

export default function FarmMap() {
  return (
    /* dir="ltr": کنترل‌های نقشه استاندارد می‌مانند و با RTL صفحه
       قاطی نمی‌شوند */
    <div
      dir="ltr"
      className="h-64 w-full overflow-hidden rounded-2xl border border-border"
    >
      <MapContainer
        /* مرکز نقشه = مرکز پولیگون زمین */
        center={[farmLandCenter.lat, farmLandCenter.lng]}
        zoom={15}
        /* اسکرول ماوس روی نقشه زوم نکند تا اسکرول صفحه به‌هم
           نریزد؛ کاربر با دکمه‌های + و − یا درگ زوم می‌کند */
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        {/* کاشی‌های رایگان OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* محدودهٔ زمین کشاورز — چندضلعی سبزِ نیمه‌شفاف */}
        <Polygon
          positions={farmLandPolygon.map(
            (p) => [p.lat, p.lng] as [number, number],
          )}
          pathOptions={{
            color: "#245c44", // خط دور: forest-700
            weight: 2,
            fillColor: "#3c8763", // پرکننده: forest-500
            fillOpacity: 0.18,
          }}
        />

        {/* پین مرکز زمین */}
        <Marker
          position={[farmLandCenter.lat, farmLandCenter.lng]}
          icon={landPin}
        />
      </MapContainer>
    </div>
  );
}