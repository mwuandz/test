"use client";

import { useEffect, useState } from "react";
import { formatMoney } from "../../lib/money";
import "./locket-gold.css";

const PLANS = [
  {
    id: "locket-gold-1m",
    name: "1 Tháng",
    duration: "1 tháng",
    price: 39000,
    popular: false,
    badge: "",
    features: ["Quay video 15 giây", "Gửi ảnh từ thư viện", "Xem ai đã xem", "Đổi icon app", "Huy hiệu Gold"],
  },
  {
    id: "locket-gold-3m",
    name: "3 Tháng",
    duration: "3 tháng",
    price: 99000,
    popular: true,
    badge: "🔥 Phổ biến",
    features: ["Quay video 15 giây", "Gửi ảnh từ thư viện", "Xem ai đã xem", "Đổi icon app", "Huy hiệu Gold", "Tiết kiệm 18,000đ"],
  },
  {
    id: "locket-gold-1y",
    name: "1 Năm",
    duration: "1 năm",
    price: 299000,
    popular: false,
    badge: "💎 Giá tốt",
    features: ["Quay video 15 giây", "Gửi ảnh từ thư viện", "Xem ai đã xem", "Đổi icon app", "Huy hiệu Gold", "Tiết kiệm 169,000đ"],
  },
];

const FEATURES = [
  { icon: "🎬", title: "Quay video dài hơn", desc: "Quay và gửi video lên đến 15 giây kèm âm thanh cho bạn bè." },
  { icon: "🖼️", title: "Gửi ảnh từ thư viện", desc: "Gửi ảnh và video có sẵn từ Camera Roll mà không cần chụp trực tiếp." },
  { icon: "👀", title: "Xem ai đã xem", desc: "Biết chính xác ai đã xem Locket của bạn với Stalker độc quyền." },
  { icon: "🎨", title: "Đổi icon ứng dụng", desc: "Tùy chỉnh biểu tượng Locket trên màn hình chính theo style riêng." },
  { icon: "⭐", title: "Huy hiệu Gold", desc: "Hiển thị huy hiệu Gold độc quyền, nổi bật giữa bạn bè." },
  { icon: "🔒", title: "An toàn & bảo mật", desc: "Chỉ cần Username Locket. Không yêu cầu mật khẩu hay iCloud." },
];

const STEPS = [
  { num: 1, icon: "📝", title: "Nhập Username", desc: "Điền Username Locket vào form bên dưới. Không cần mật khẩu." },
  { num: 2, icon: "💳", title: "Chọn gói & thanh toán", desc: "Chọn gói phù hợp, thanh toán qua VietQR tự động xác nhận." },
  { num: 3, icon: "⚡", title: "Kích hoạt tự động", desc: "Hệ thống kích hoạt Gold cho tài khoản trong 1-5 phút." },
];

const FAQS = [
  { q: "Nâng cấp Locket Gold có an toàn không?", a: "Hoàn toàn an toàn. Chỉ cần Username Locket công khai, không yêu cầu mật khẩu, Apple ID hay iCloud." },
  { q: "Locket Gold kích hoạt trong bao lâu?", a: "Thường từ 1-5 phút sau khi thanh toán thành công. Trong giờ cao điểm có thể mất đến 15 phút." },
  { q: "Nếu Locket Gold bị mất thì sao?", a: "Shop bảo hành trong suốt thời gian sử dụng. Nếu gặp sự cố, liên hệ Zalo để được hỗ trợ kích hoạt lại." },
  { q: "Tôi có thể nâng cấp cho bạn bè không?", a: "Có, bạn chỉ cần biết Username Locket của người muốn nâng cấp." },
  { q: "Hỗ trợ cả iOS lẫn Android?", a: "Có, dịch vụ hỗ trợ cả hai nền tảng iOS và Android." },
];

export default function LocketGoldPage() {
  const [username, setUsername] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(PLANS[1].id);
  const [loading, setLoading] = useState(false);
  const [faqOpen, setFaqOpen] = useState<string | null>(null);

  const plan = PLANS.find((p) => p.id === selectedPlan) || PLANS[1];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ productId: plan.id, quantity: 1 }],
        customerName: username.trim(),
        customerContact: `Locket: @${username.trim()}`,
        customerNote: `Nâng cấp Locket Gold - Gói ${plan.duration} - Username: ${username.trim()}`,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok && data.order) {
      window.location.href = `/checkout/${data.order.id}`;
    } else {
      alert(data.error || "Không tạo được đơn hàng. Vui lòng thử lại.");
    }
  }

  return (
    <main className="lg-page">
      {/* ───── Hero ───── */}
      <section className="lg-hero">
        <div className="lg-hero-bg">
          <div className="lg-orb lg-orb-1" />
          <div className="lg-orb lg-orb-2" />
          <div className="lg-orb lg-orb-3" />
        </div>
        <div className="lg-wrap">
          <div className="lg-hero-grid">
            <div className="lg-hero-copy">
              <div className="lg-badge-pill">
                <span>👑</span> LOCKET GOLD
              </div>
              <h1>
                Nâng cấp{" "}
                <span className="lg-gold-text">Locket Gold</span>
                <br />
                Uy tín · Giá rẻ
              </h1>
              <p>
                Mở khóa toàn bộ tính năng Premium — quay video dài, gửi ảnh từ thư viện,
                xem ai đã xem và nhiều hơn nữa. Kích hoạt nhanh chỉ 1-5 phút.
              </p>

              <div className="lg-trust-row">
                <div className="lg-trust">
                  <b>🚫</b>
                  <span>Không cần iCloud</span>
                </div>
                <div className="lg-trust">
                  <b>🔒</b>
                  <span>Không cần mật khẩu</span>
                </div>
                <div className="lg-trust">
                  <b>📱</b>
                  <span>Không cần app thứ 3</span>
                </div>
              </div>

              <div className="lg-stats-row">
                <div className="lg-stat-box">
                  <strong>1-5 phút</strong>
                  <span>Kích hoạt</span>
                </div>
                <div className="lg-stat-box">
                  <strong>100%</strong>
                  <span>An toàn</span>
                </div>
                <div className="lg-stat-box">
                  <strong>24/7</strong>
                  <span>Hỗ trợ</span>
                </div>
              </div>

              <div className="lg-hero-actions">
                <a className="lg-btn lg-btn-gold" href="#order">
                  👑 Nâng cấp ngay
                </a>
                <a className="lg-btn lg-btn-ghost" href="#features">
                  Xem tính năng
                </a>
              </div>
            </div>

            <div className="lg-hero-visual">
              <div className="lg-phone">
                <div className="lg-phone-notch" />
                <div className="lg-phone-screen">
                  <div className="lg-phone-top">
                    <span className="lg-phone-gold">👑 Gold Member</span>
                  </div>
                  <div className="lg-widget-ring">
                    <span>💛</span>
                  </div>
                  <p className="lg-widget-label">Locket Widget</p>
                  <div className="lg-phone-chips">
                    <span>🎬 Video 15s</span>
                    <span>🖼️ Thư viện</span>
                    <span>👀 Stalker</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Features ───── */}
      <section className="lg-section" id="features">
        <div className="lg-wrap">
          <div className="lg-section-head">
            <span className="lg-eyebrow">✨ TÍNH NĂNG GOLD</span>
            <h2>Mọi thứ bạn nhận được với Locket Gold</h2>
            <p>Mở khóa toàn bộ tính năng cao cấp chỉ với một lần nâng cấp</p>
          </div>
          <div className="lg-features-grid">
            {FEATURES.map((f) => (
              <article className="lg-feature" key={f.title}>
                <div className="lg-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Steps ───── */}
      <section className="lg-section lg-section-alt">
        <div className="lg-wrap">
          <div className="lg-section-head">
            <span className="lg-eyebrow">📋 HƯỚNG DẪN</span>
            <h2>Nâng cấp chỉ trong 3 bước</h2>
            <p>Quy trình đơn giản, nhanh chóng và an toàn</p>
          </div>
          <div className="lg-steps-grid">
            {STEPS.map((s) => (
              <article className="lg-step" key={s.num}>
                <div className="lg-step-num">{s.num}</div>
                <div className="lg-step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Pricing + Order ───── */}
      <section className="lg-section" id="order">
        <div className="lg-wrap">
          <div className="lg-section-head">
            <span className="lg-eyebrow">💰 BẢNG GIÁ</span>
            <h2>Chọn gói Locket Gold phù hợp</h2>
            <p>Thanh toán nhanh qua VietQR, kích hoạt tự động</p>
          </div>

          <div className="lg-plans">
            {PLANS.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`lg-plan${selectedPlan === p.id ? " lg-plan-active" : ""}${p.popular ? " lg-plan-pop" : ""}`}
                onClick={() => setSelectedPlan(p.id)}
              >
                {p.badge && <div className="lg-plan-badge">{p.badge}</div>}
                <h3>{p.name}</h3>
                <div className="lg-plan-price">
                  <b>{formatMoney(p.price)}</b>
                  <span>/ {p.duration}</span>
                </div>
                <ul>
                  {p.features.map((f) => (
                    <li key={f}>✅ {f}</li>
                  ))}
                </ul>
                <div className={`lg-plan-cta${selectedPlan === p.id ? " chosen" : ""}`}>
                  {selectedPlan === p.id ? "✓ Đã chọn" : "Chọn gói này"}
                </div>
              </button>
            ))}
          </div>

          {/* Order form */}
          <form className="lg-order" onSubmit={handleSubmit} id="activate">
            <div className="lg-order-card">
              <div className="lg-order-head">
                <span className="lg-order-icon">👑</span>
                <div>
                  <h3>Nhập Username để kích hoạt</h3>
                  <p>Chỉ cần username, không cần mật khẩu hay iCloud</p>
                </div>
              </div>

              <label className="lg-field">
                <span>Username Locket</span>
                <div className="lg-input-box">
                  <span className="lg-at">@</span>
                  <input
                    type="text"
                    placeholder="username_cua_ban"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <small>Mở app Locket → Profile → Copy username</small>
              </label>

              <div className="lg-summary">
                <div className="lg-sum-row">
                  <span>Gói đã chọn</span>
                  <b>{plan.name}</b>
                </div>
                <div className="lg-sum-row">
                  <span>Thời hạn</span>
                  <b>{plan.duration}</b>
                </div>
                <div className="lg-sum-row lg-sum-total">
                  <span>Tổng thanh toán</span>
                  <b>{formatMoney(plan.price)}</b>
                </div>
              </div>

              <button className="lg-btn lg-btn-gold lg-btn-full" type="submit" disabled={loading || !username.trim()}>
                {loading ? "Đang tạo đơn..." : `Thanh toán ${formatMoney(plan.price)}`}
              </button>

              <div className="lg-order-badges">
                <span>🔒 Không cần mật khẩu</span>
                <span>⚡ Kích hoạt 1-5 phút</span>
                <span>🛡️ Bảo hành trọn gói</span>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="lg-section lg-section-alt">
        <div className="lg-wrap">
          <div className="lg-section-head">
            <span className="lg-eyebrow">❓ FAQ</span>
            <h2>Câu hỏi thường gặp</h2>
          </div>
          <div className="lg-faqs">
            {FAQS.map((f) => (
              <button
                key={f.q}
                type="button"
                className={`lg-faq${faqOpen === f.q ? " open" : ""}`}
                onClick={() => setFaqOpen(faqOpen === f.q ? null : f.q)}
              >
                <div className="lg-faq-q">
                  <span>{f.q}</span>
                  <span className="lg-faq-icon">{faqOpen === f.q ? "−" : "+"}</span>
                </div>
                {faqOpen === f.q && <div className="lg-faq-a">{f.a}</div>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Footer ───── */}
      <footer className="lg-footer">
        <div className="lg-wrap lg-footer-inner">
          <div>
            <b>👑 Locket Gold</b> <span>by Minh Wuan Store</span>
          </div>
          <div className="lg-footer-links">
            <a href="/">← Về trang chủ</a>
            <a href="https://zalo.me/0359868717" target="_blank">💬 Zalo hỗ trợ</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
