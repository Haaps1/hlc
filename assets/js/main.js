/* =========================================================
   Veinex Health — site interactions
   Edit CONFIG to change phone / WhatsApp number everywhere.
   ========================================================= */
const CONFIG = {
  phone: "+919876543210",          // placeholder — replace with real number
  whatsapp: "919876543210",        // country code + number, no "+"
  clinic: "Veinex Health"
};

const SERVICES = [
  { slug: "piles", name: "Piles (Hemorrhoids)", icon: "fa-notes-medical", href: "piles-treatment-in-bangalore.html" },
  { slug: "fissure", name: "Anal Fissure", icon: "fa-bandage", href: "fissure-treatment-in-bangalore.html" },
  { slug: "fistula", name: "Fistula-in-Ano", icon: "fa-syringe", href: "fistula-treatment-in-bangalore.html" },
  { slug: "pilonidal-sinus", name: "Pilonidal Sinus", icon: "fa-kit-medical", href: "pilonidal-sinus-treatment-in-bangalore.html" },
  { slug: "varicose-veins", name: "Varicose Veins", icon: "fa-heart-pulse", href: "varicose-veins-treatment-in-bangalore.html" },
  { slug: "diabetic-foot", name: "Diabetic Foot", icon: "fa-shoe-prints", href: "diabetic-foot-treatment-in-bangalore.html" },
  { slug: "hernia", name: "Hernia", icon: "fa-shield-heart", href: "hernia-surgery-in-bangalore.html" },
  { slug: "gallbladder-stones", name: "Gallbladder Stones", icon: "fa-gem", href: "gallbladder-stone-treatment-in-bangalore.html" },
  { slug: "liposuction", name: "Liposuction", icon: "fa-weight-scale", href: "liposuction-in-bangalore.html" },
  { slug: "appendicitis", name: "Appendicitis", icon: "fa-truck-medical", href: "appendicitis-surgery-in-bangalore.html" },
  { slug: "hydrocele", name: "Hydrocele", icon: "fa-droplet", href: "hydrocele-surgery-in-bangalore.html" },
  { slug: "lipoma", name: "Lipoma", icon: "fa-circle-nodes", href: "lipoma-removal-in-bangalore.html" },
  { slug: "circumcision", name: "Circumcision", icon: "fa-user-doctor", href: "circumcision-surgery-in-bangalore.html" }
];

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const serviceName = slug => (SERVICES.find(s => s.slug === slug) || {}).name || "";

/* ---------- Preloader ---------- */
window.addEventListener("load", () => {
  setTimeout(() => {
    $(".preloader")?.classList.add("done");
    document.body.classList.add("loaded");
    splitReveal();
  }, 350);
});
// safety net if load never fires (slow images)
setTimeout(() => $(".preloader")?.classList.add("done"), 3500);

/* ---------- Page transitions ---------- */
document.addEventListener("click", e => {
  const a = e.target.closest("a[href]");
  if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin || !/\.html$|\/$/.test(url.pathname)) return;
  if (url.pathname === location.pathname && url.hash) return;
  if (reduceMotion) return;
  e.preventDefault();
  document.body.classList.add("leaving");
  setTimeout(() => (location.href = a.href), 420);
});
window.addEventListener("pageshow", e => { if (e.persisted) document.body.classList.remove("leaving"); });

/* ---------- Fill phone / WhatsApp links ---------- */
$$("[data-tel]").forEach(a => (a.href = `tel:${CONFIG.phone}`));
$$("[data-wa]").forEach(a => {
  const msg = a.dataset.wa || `Hi ${CONFIG.clinic}, I'd like to book a consultation.`;
  a.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  a.target = "_blank"; a.rel = "noopener";
});
$$("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));

/* ---------- Service <select> options ---------- */
$$("select[data-services]").forEach(sel => {
  SERVICES.forEach(s => sel.insertAdjacentHTML("beforeend", `<option value="${s.slug}">${s.name}</option>`));
  sel.insertAdjacentHTML("beforeend", `<option value="other">Other / Not sure</option>`);
});
const qsService = new URLSearchParams(location.search).get("service");
if (qsService) $$("select[data-services]").forEach(sel => (sel.value = qsService));

/* ---------- Header, progress, back-to-top ---------- */
const header = $(".header"), progress = $(".scroll-progress"), toTop = $(".to-top"), mCta = $(".mobile-cta");
function onScroll() {
  const y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
  header?.classList.toggle("scrolled", y > 20);
  if (progress) progress.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
  toTop?.classList.toggle("show", y > 600);
  mCta?.classList.toggle("show", y > 500);
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();
toTop?.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

/* ---------- Active nav / tab ---------- */
const page = document.body.dataset.page;
$$(`[data-nav="${page}"]`).forEach(a => a.classList.add("active"));
if (document.body.dataset.group === "services") $$('[data-nav="services"]').forEach(a => a.classList.add("active"));

/* ---------- Reveal on scroll ---------- */
$$("[data-stagger]").forEach(parent => {
  const step = parseFloat(parent.dataset.stagger) || 0.08;
  [...parent.children].forEach((child, i) => {
    if (!child.hasAttribute("data-reveal")) child.setAttribute("data-reveal", parent.dataset.anim || "up");
    child.style.setProperty("--d", `${(i % 8) * step}s`);
  });
});
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add("in");
    if (en.target.dataset.count !== undefined) countUp(en.target);
    io.unobserve(en.target);
  });
}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
$$("[data-reveal], [data-count], .process, .rec, .hero-img").forEach(el => io.observe(el));

/* ---------- Split heading words ---------- */
function splitReveal() {
  $$("[data-split]").forEach(el => {
    if (el.dataset.done) return;
    el.dataset.done = 1;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(w => {
            if (!w.trim()) return frag.appendChild(document.createTextNode(w));
            const o = document.createElement("span"); o.className = "split-line";
            const i = document.createElement("span"); i.textContent = w; o.appendChild(i); frag.appendChild(o);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && !n.classList.contains("typed")) {
          walk(n);
          if (n.classList.contains("grad-text")) { n.classList.remove("grad-text"); $$(".split-line > span", n).forEach(s => s.classList.add("grad-text")); }
        }
      });
    };
    walk(el);
    $$(".split-line > span", el).forEach((s, i) => s.style.setProperty("--d", `${i * 0.06}s`));
    splitIO.observe(el);
  });
}

/* ---------- Counters ---------- */
function countUp(el) {
  const target = parseFloat(el.dataset.count), dec = (el.dataset.count.split(".")[1] || "").length;
  const suffix = el.dataset.suffix || "", dur = 1800, t0 = performance.now();
  const tick = now => {
    const p = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - p, 4);
    el.textContent = (target * e).toLocaleString("en-IN", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ---------- Typed words ---------- */
$$("[data-typed]").forEach(el => {
  const words = el.dataset.typed.split("|");
  let w = 0, c = words[0].length, del = true;
  el.textContent = words[0];
  if (reduceMotion) return;
  const loop = () => {
    const word = words[w];
    c += del ? -1 : 1;
    el.textContent = word.slice(0, c);
    let wait = del ? 45 : 90;
    if (!del && c === word.length) { del = true; wait = 1800; }
    else if (del && c === 0) { del = false; w = (w + 1) % words.length; wait = 300; }
    setTimeout(loop, wait);
  };
  setTimeout(loop, 2200);
});

/* ---------- Tilt + magnetic (desktop only) ---------- */
if (finePointer && !reduceMotion) {
  $$("[data-tilt]").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-8px)`;
    });
    card.addEventListener("mouseleave", () => (card.style.transform = ""));
  });
  $$(".btn-magnetic").forEach(b => {
    b.addEventListener("mousemove", e => {
      const r = b.getBoundingClientRect();
      b.style.setProperty("--bx", `${(e.clientX - r.left - r.width / 2) * .25}px`);
      b.style.setProperty("--by", `${(e.clientY - r.top - r.height / 2) * .35}px`);
    });
    b.addEventListener("mouseleave", () => { b.style.setProperty("--bx", "0px"); b.style.setProperty("--by", "0px"); });
  });
  const hero = $(".hero");
  hero?.addEventListener("mousemove", e => {
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    $$("[data-depth]", hero).forEach(el => {
      const d = parseFloat(el.dataset.depth);
      el.style.translate = `${x * d}px ${y * d}px`;
    });
  });
}

/* ---------- Service search ---------- */
$$("[data-search]").forEach(box => {
  const input = $("input", box), list = $(".search-results", box);
  let idx = -1;
  const render = () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { list.classList.remove("show"); return; }
    const hits = SERVICES.filter(s => s.name.toLowerCase().includes(q) || s.slug.includes(q));
    idx = -1;
    list.innerHTML = hits.length
      ? hits.map(s => `<a href="${s.href || "#"}" data-slug="${s.slug}"><i class="fa-solid ${s.icon}"></i>${s.name}</a>`).join("")
      : `<div class="empty">No match — <a href="contact.html" style="display:inline;padding:0;color:var(--primary)">ask our doctor</a></div>`;
    list.classList.add("show");
  };
  input.addEventListener("input", render);
  input.addEventListener("focus", render);
  input.addEventListener("keydown", e => {
    const items = $$("a[data-slug]", list);
    if (!items.length) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      idx = (idx + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      items.forEach((it, i) => it.classList.toggle("hl", i === idx));
    } else if (e.key === "Enter") {
      e.preventDefault(); (items[idx] || items[0]).click();
    }
  });
  list.addEventListener("click", e => {
    const a = e.target.closest("a[data-slug]");
    if (!a || a.getAttribute("href") !== "#") return;
    e.preventDefault(); list.classList.remove("show"); openBooking(a.dataset.slug);
  });
  $("button", box)?.addEventListener("click", () => { input.focus(); render(); });
  document.addEventListener("click", e => { if (!box.contains(e.target)) list.classList.remove("show"); });
});

/* ---------- Service cards: go to page or open booking ---------- */
$$(".svc-card").forEach(card => {
  card.addEventListener("click", e => {
    if (e.target.closest("a")) return;
    if (card.dataset.href) location.href = card.dataset.href;
    else if (card.dataset.service) openBooking(card.dataset.service);
    else $("a", card)?.click();
  });
});

/* ---------- Filter chips + search on services page ---------- */
const filterBar = $(".filter-bar[data-filter]");
if (filterBar) {
  const cards = $$(".svc-card[data-cat]"), search = $("#svcSearch");
  let cat = "all";
  const apply = () => {
    const q = (search?.value || "").trim().toLowerCase();
    let shown = 0;
    cards.forEach(c => {
      const ok = (cat === "all" || c.dataset.cat.includes(cat)) && (!q || c.textContent.toLowerCase().includes(q));
      c.classList.toggle("hide", !ok);
      if (ok) { shown++; c.classList.remove("in"); requestAnimationFrame(() => c.classList.add("in")); }
    });
    $$(".svc-group").forEach(g => (g.hidden = !$(".svc-card[data-cat]:not(.hide)", g)));
    $("#noResults")?.toggleAttribute("hidden", shown > 0);
  };
  filterBar.addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    $$(".chip", filterBar).forEach(c => c.classList.toggle("active", c === chip));
    cat = chip.dataset.cat; apply();
    chip.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  });
  search?.addEventListener("input", apply);
}

/* ---------- FAQ accordion ---------- */
$$(".faq-item").forEach(item => {
  const q = $(".faq-q", item), a = $(".faq-a", item);
  q.setAttribute("aria-expanded", "false");
  q.addEventListener("click", () => {
    const open = item.classList.contains("open");
    $$(".faq-item.open", item.parentElement).forEach(o => {
      o.classList.remove("open"); $(".faq-a", o).style.maxHeight = null; $(".faq-q", o).setAttribute("aria-expanded", "false");
    });
    if (!open) { item.classList.add("open"); a.style.maxHeight = a.scrollHeight + "px"; q.setAttribute("aria-expanded", "true"); }
  });
});

/* ---------- Tabs ---------- */
$$(".tabs").forEach(tabs => {
  const btns = $$(".tab-btns button", tabs), panels = $$(".tab-panel", tabs);
  btns.forEach((b, i) => b.addEventListener("click", () => {
    btns.forEach(x => x.classList.toggle("active", x === b));
    panels.forEach((p, j) => p.classList.toggle("active", j === i));
  }));
});

/* ---------- Testimonial slider ---------- */
$$(".slider").forEach(slider => {
  const track = $(".slider-track", slider), slides = [...track.children];
  const wrap = slider.parentElement, dotsWrap = $(".dots", wrap);
  let i = 0, timer;
  const perView = () => (innerWidth <= 900 ? 1 : 3);
  const max = () => Math.max(0, slides.length - perView());
  const buildDots = () => {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    for (let d = 0; d <= max(); d++) {
      const b = document.createElement("button"); b.setAttribute("aria-label", `Slide ${d + 1}`);
      b.addEventListener("click", () => go(d)); dotsWrap.appendChild(b);
    }
  };
  const go = n => {
    i = n > max() ? 0 : n < 0 ? max() : n;
    const w = slides[0].getBoundingClientRect().width + 24;
    track.style.transform = `translateX(${-i * w}px)`;
    $$("button", dotsWrap).forEach((d, k) => d.classList.toggle("active", k === i));
  };
  const auto = () => { clearInterval(timer); if (!reduceMotion) timer = setInterval(() => go(i + 1), 5000); };
  $(".prev", wrap)?.addEventListener("click", () => { go(i - 1); auto(); });
  $(".next", wrap)?.addEventListener("click", () => { go(i + 1); auto(); });
  let sx = 0;
  track.addEventListener("touchstart", e => (sx = e.touches[0].clientX), { passive: true });
  track.addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) { go(i + (dx < 0 ? 1 : -1)); auto(); }
  });
  slider.addEventListener("mouseenter", () => clearInterval(timer));
  slider.addEventListener("mouseleave", auto);
  addEventListener("resize", () => { buildDots(); go(Math.min(i, max())); });
  buildDots(); go(0); auto();
});

/* ---------- Gallery lightbox ---------- */
const lb = $(".lightbox");
if (lb) {
  $$(".gallery figure").forEach(f => f.addEventListener("click", () => {
    $("img", lb).src = $("img", f).src.replace(/w=\d+/, "w=1400"); lb.classList.add("show");
  }));
  lb.addEventListener("click", e => { if (e.target !== $("img", lb)) lb.classList.remove("show"); });
}

/* ---------- Bottom sheets (booking form + mobile menu) ---------- */
const sheet = $("#bookSheet"), menuSheet = $("#menuSheet");
function closeSheets() {
  $$(".sheet.open").forEach(s => { s.classList.remove("open"); const p = $(".sheet-panel", s); if (p) p.style.transform = ""; });
  document.body.style.overflow = "";
}
function openMenu() {
  if (!menuSheet) return;
  closeSheets(); menuSheet.classList.add("open"); document.body.style.overflow = "hidden";
}
function openBooking(slug) {
  if (!sheet) return;
  closeSheets();
  const sel = $("select", sheet);
  if (slug && sel) sel.value = slug;
  $("form", sheet).hidden = false;
  $(".success", sheet).classList.remove("show");
  sheet.classList.add("open");
  document.body.style.overflow = "hidden";
  setTimeout(() => $("input", sheet)?.focus({ preventScroll: true }), 450);
}
const closeBooking = closeSheets;
document.addEventListener("click", e => {
  const t = e.target.closest("[data-book]");
  if (t) { e.preventDefault(); openBooking(t.dataset.book || t.closest("[data-service]")?.dataset.service); }
  if (e.target.closest("[data-menu]")) openMenu();
  if (e.target.closest("[data-close]")) closeSheets();
});
addEventListener("keydown", e => { if (e.key === "Escape") { closeBooking(); lb?.classList.remove("show"); } });
// swipe-down to dismiss on mobile
$$(".sheet").forEach(sh => {
  const panel = $(".sheet-panel", sh), handle = $(".sheet-handle", sh);
  let sy = 0, dy = 0;
  handle?.addEventListener("touchstart", e => { sy = e.touches[0].clientY; panel.style.transition = "none"; }, { passive: true });
  handle?.addEventListener("touchmove", e => { dy = Math.max(0, e.touches[0].clientY - sy); panel.style.transform = `translateY(${dy}px)`; }, { passive: true });
  handle?.addEventListener("touchend", () => {
    panel.style.transition = ""; panel.style.transform = "";
    if (dy > 90) closeSheets(); dy = 0;
  });
});

/* ---------- Lead forms → validate → WhatsApp ---------- */
function toast(msg) {
  let t = $(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.innerHTML = `<i class="fa-solid fa-circle-check"></i><span>${msg}</span>`;
  t.classList.add("show"); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 4200);
}
$$("form.lead-form").forEach(form => {
  form.setAttribute("novalidate", "");
  form.addEventListener("submit", e => {
    e.preventDefault();
    let ok = true;
    $$("[required]", form).forEach(f => {
      const g = f.closest(".form-group");
      let valid = f.value.trim() !== "";
      if (f.name === "phone") valid = /^(\+?91[\s-]?)?[6-9]\d{9}$/.test(f.value.replace(/[\s-]/g, ""));
      g?.classList.toggle("invalid", !valid);
      if (!valid) ok = false;
    });
    if (!ok) { $(".invalid .form-control", form)?.focus(); return; }

    const d = Object.fromEntries(new FormData(form));
    const lines = [
      `Hi ${CONFIG.clinic}, I'd like to book a consultation.`,
      `Name: ${d.name}`, `Phone: ${d.phone}`,
      d.service ? `Concern: ${serviceName(d.service) || d.service}` : "",
      d.date ? `Preferred date: ${d.date}` : "",
      d.message ? `Message: ${d.message}` : ""
    ].filter(Boolean).join("\n");
    const waURL = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(lines)}`;

    const success = form.parentElement.querySelector(".success");
    if (success) {
      form.hidden = true; success.classList.add("show");
      const btn = $("[data-wa-result]", success); if (btn) btn.href = waURL;
    } else {
      toast("Thank you! Opening WhatsApp to confirm your appointment…");
    }
    form.reset();
    if (qsService) $$("select[data-services]", form).forEach(s => (s.value = qsService));
    setTimeout(() => window.open(waURL, "_blank", "noopener"), 900);
  });
  $$(".form-control", form).forEach(f => f.addEventListener("input", () => f.closest(".form-group")?.classList.remove("invalid")));
});

/* ---------- Open-now badge (Mon–Sat 9–21, Sun 10–14) ---------- */
$$("[data-open-now]").forEach(el => {
  const n = new Date(), d = n.getDay(), h = n.getHours() + n.getMinutes() / 60;
  const open = d === 0 ? h >= 10 && h < 14 : h >= 9 && h < 21;
  el.textContent = open ? "Open now" : "Closed now";
  el.classList.toggle("closed", !open);
});

/* ---------- Min date on date pickers ---------- */
$$("input[type=date]").forEach(i => (i.min = new Date().toISOString().split("T")[0]));

/* =========================================================
   Extra motion layer (Veinex Health)
   ========================================================= */

/* ---------- Split headings animate when they scroll into view ---------- */
const splitIO = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add("split-in");
    splitIO.unobserve(en.target);
  });
}, { threshold: 0.2 });

/* ---------- Scroll parallax + scroll-speed effects ---------- */
const parallaxEls = $$("[data-parallax]");
const marquees = $$(".marquee");
let lastY = scrollY, velocity = 0, ticking = false;
function onMotionScroll() {
  const y = scrollY, vh = innerHeight;
  velocity += ((y - lastY) - velocity) * 0.2;
  lastY = y;
  if (!reduceMotion) {
    parallaxEls.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const off = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.parallax);
      el.style.translate = `0 ${off.toFixed(1)}px`;
    });
    const skew = Math.max(-8, Math.min(8, velocity * 0.25));
    marquees.forEach(m => {
      m.style.setProperty("--skew", `${-skew}deg`);
      const anim = $(".marquee-track", m)?.getAnimations()[0];
      if (anim) anim.playbackRate = 1 + Math.min(4, Math.abs(velocity) * 0.08);
    });
  }
  // hide header when scrolling down (desktop)
  if (innerWidth > 900 && header) {
    const down = velocity > 1 && y > 400, up = velocity < -1;
    if (down && !$(".has-mega:hover")) header.classList.add("hide");
    else if (up || y < 400) header.classList.remove("hide");
  }
  ticking = false;
}
addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onMotionScroll); } }, { passive: true });
// let velocity settle back to 0 so the marquee eases back to normal speed
setInterval(() => { if (Math.abs(velocity) > 0.05) { velocity *= 0.8; onMotionScroll(); } }, 60);
onMotionScroll();

/* ---------- Ripple on buttons ---------- */
document.addEventListener("pointerdown", e => {
  const b = e.target.closest(".btn, .chip, .sc-chip");
  if (!b || reduceMotion) return;
  const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height);
  const span = document.createElement("span");
  span.className = "ripple";
  span.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
  if (getComputedStyle(b).position === "static") b.style.position = "relative";
  b.style.overflow = "hidden";
  b.appendChild(span);
  setTimeout(() => span.remove(), 700);
});

/* ---------- Symptom self-check (treatment pages) ---------- */
$$(".self-check").forEach(box => {
  const chips = $$(".sc-chip", box), meter = $(".sc-meter i", box), text = $(".sc-text", box);
  const msgs = [0, 1, 2, 3].map(k => box.dataset["m" + k] || "");
  const update = () => {
    const score = chips.filter(c => c.classList.contains("on")).reduce((s, c) => s + +c.dataset.w, 0);
    meter.style.width = `${Math.min(100, score / 8 * 100)}%`;
    text.textContent = msgs[score === 0 ? 0 : score <= 2 ? 1 : score <= 4 ? 2 : 3];
  };
  chips.forEach(c => c.addEventListener("click", () => { c.classList.toggle("on"); c.setAttribute("aria-pressed", c.classList.contains("on")); update(); }));
});
