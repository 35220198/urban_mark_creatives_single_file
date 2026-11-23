/* ==========================================================================
   Urban Mark Creatives — app.js
   Pure vanilla JavaScript. No frameworks, no build step.

   Responsibilities
   1.  Data layer: load data.json, merge localStorage overrides, expose store
   2.  Renderers: bind content into every page section
   3.  UI: nav, mobile menu, theme, scroll progress, cookie bar, toasts
   4.  Portfolio: filter, search, case-study modal
   5.  Testimonials slider, FAQ accordion
   6.  Forms: honest WhatsApp / email handoff (no fake "sent" states)
   7.  Tracking: Meta Pixel events + dynamic GA4 / TikTok / LinkedIn injection
   8.  Admin: glassmorphism login, full CRUD, save-to-localStorage, export JSON
   ========================================================================== */
(function () {
  "use strict";

  /* ========================================================================
     0. SMALL HELPERS
     ====================================================================== */
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var digits = function (s) { return String(s || "").replace(/\D/g, ""); };
  var money = function (n) {
    return "KES " + Math.round(n).toLocaleString("en-KE");
  };
  var slug = function (s) {
    return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  };
  var initials = function (name) {
    return String(name || "?")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(function (w) { return w[0].toUpperCase(); })
      .join("");
  };

  /* ========================================================================
     1. DATA LAYER
     ====================================================================== */
  var STORE_KEY = "umc_data_v1";
  var THEME_KEY = "umc_theme";
  var COOKIE_KEY = "umc_cookie";
  var AUTH_KEY = "umc_admin_session";
  var PASS_KEY = "umc_admin_pass";

  var DEFAULT_PASS = "urbanmarkcreatives2026";

  var UMC = {
    data: null,
    published: null,
    isAdmin: false
  };
  window.UMC = UMC;

  function readLocal() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function writeLocal(obj) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(obj));
      return true;
    } catch (e) {
      return false;
    }
  }

  function clearLocal() {
    try { localStorage.removeItem(STORE_KEY); } catch (e) {}
  }

  /* Deep merge: local overrides win, but missing keys fall back to published */
  function mergeDeep(base, over) {
    if (Array.isArray(base)) return Array.isArray(over) ? over : base;
    if (base && typeof base === "object") {
      var out = {};
      var k;
      for (k in base) if (Object.prototype.hasOwnProperty.call(base, k)) out[k] = base[k];
      if (over && typeof over === "object") {
        for (k in over) {
          if (!Object.prototype.hasOwnProperty.call(over, k)) continue;
          out[k] = (k in base) ? mergeDeep(base[k], over[k]) : over[k];
        }
      }
      return out;
    }
    return over === undefined ? base : over;
  }

  function loadData() {
    return fetch("data.json", { cache: "no-cache" })
      .then(function (r) {
        if (!r.ok) throw new Error("data.json " + r.status);
        return r.json();
      })
      .then(function (json) {
        UMC.published = json;
        var local = readLocal();
        UMC.data = local ? mergeDeep(json, local) : json;
        return UMC.data;
      })
      .catch(function (err) {
        console.error("[UMC] Could not load data.json:", err);
        UMC.data = UMC.published = null;
        return null;
      });
  }

  /* ========================================================================
     2. TRACKING
     ====================================================================== */
  var Tracking = {
    ready: false,

    init: function (data) {
      if (!data || !data.tracking) return;
      var t = data.tracking;

      /* Meta Pixel base is already in each page's <head>; just confirm */
      if (t.metaPixelId && typeof window.fbq === "function") {
        this.ready = true;
      }

      /* Google Analytics 4 / Google Ads — injected only when an ID exists */
      if (t.googleTagId && !document.getElementById("umc-gtag")) {
        var g = document.createElement("script");
        g.id = "umc-gtag";
        g.async = true;
        g.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(t.googleTagId);
        document.head.appendChild(g);
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag("js", new Date());
        window.gtag("config", t.googleTagId);
      }

      /* TikTok Pixel — injected only when an ID exists */
      if (t.tiktokPixelId && !document.getElementById("umc-ttq")) {
        var tt = document.createElement("script");
        tt.id = "umc-ttq";
        tt.textContent =
          "!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];" +
          "ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie'];" +
          "ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};" +
          "for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);" +
          "ttq.load=function(e,n){var r='https://analytics.tiktok.com/i18n/pixel/events.js';" +
          "ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;" +
          "ttq._o=ttq._o||{};ttq._o[e]=n||{};var o=d.createElement('script');o.type='text/javascript';" +
          "o.async=!0;o.src=r+'?sdkid='+e+'&lib='+t;var a=d.getElementsByTagName('script')[0];" +
          "a.parentNode.insertBefore(o,a)};ttq.load('" + t.tiktokPixelId + "');ttq.page();}(window,document,'ttq');";
        document.head.appendChild(tt);
      }

      /* LinkedIn Insight Tag — injected only when a partner ID exists */
      if (t.linkedinPartnerId && !document.getElementById("umc-li")) {
        window._linkedin_partner_id = t.linkedinPartnerId;
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(t.linkedinPartnerId);
        var li = document.createElement("script");
        li.id = "umc-li";
        li.async = true;
        li.textContent =
          "(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};" +
          "window.lintrk.q=[]}var s=document.getElementsByTagName('script')[0];" +
          "var b=document.createElement('script');b.type='text/javascript';b.async=true;" +
          "b.src='https://snap.licdn.com/li.lms-analytics/insight.min.js';" +
          "s.parentNode.insertBefore(b,s)})(window.lintrk);";
        document.head.appendChild(li);
      }
    },

    /* Fire a standard event across every configured platform */
    event: function (name, params) {
      params = params || {};
      try {
        if (typeof window.fbq === "function") window.fbq("track", name, params);
      } catch (e) {}
      try {
        if (typeof window.gtag === "function") {
          var gaMap = { Lead: "generate_lead", Contact: "contact", ViewContent: "view_item" };
          window.gtag("event", gaMap[name] || name.toLowerCase(), params);
        }
      } catch (e) {}
      try {
        if (window.ttq && typeof window.ttq.track === "function") {
          var ttMap = { Lead: "SubmitForm", Contact: "Contact", ViewContent: "ViewContent" };
          window.ttq.track(ttMap[name] || name, params);
        }
      } catch (e) {}
      try {
        if (window.lintrk) window.lintrk("track", { conversion_id: name });
      } catch (e) {}
    }
  };
  UMC.Tracking = Tracking;

  /* ========================================================================
     3. UI PRIMITIVES
     ====================================================================== */
  function toast(msg, isError) {
    var t = $("#toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      t.className = "toast";
      t.setAttribute("role", "status");
      t.setAttribute("aria-live", "polite");
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.className = "toast show" + (isError ? " err" : "");
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.className = "toast"; }, 5200);
  }
  UMC.toast = toast;

  function waLink(data, message) {
    var c = (data && data.contact) || {};
    var num = digits(c.whatsapp);
    var text = message || c.wa_message || "Hello Urban Mark Creatives";
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(text);
  }
  UMC.waLink = waLink;

  /* ========================================================================
     4. RENDERERS
     ====================================================================== */
  var Render = {};

  /* ---- Brand / logo / nav / footer ---- */
  Render.chrome = function (d) {
    var s = d.site || {};

    $$("[data-brand-name]").forEach(function (el) { el.textContent = s.brand || ""; });
    $$("[data-brand-tagline]").forEach(function (el) { el.textContent = s.tagline || ""; });
    $$("[data-brand-logo]").forEach(function (el) {
      if (s.logo) { el.src = s.logo; el.alt = (s.brand || "") + " logo"; }
    });

    /* Nav links */
    var navHost = $("[data-nav]");
    if (navHost && d.nav) {
      var page = document.body.getAttribute("data-page") || "home";
      navHost.innerHTML = d.nav.map(function (n) {
        var active = (n.href || "").indexOf(page === "home" ? "index" : page) > -1;
        return '<a href="' + esc(n.href) + '"' + (active ? ' aria-current="page"' : "") + ">" +
          esc(n.label) + "</a>";
      }).join("");
    }

    /* Mobile menu links */
    var mobHost = $("[data-mobile-nav]");
    if (mobHost && d.nav) {
      mobHost.innerHTML = d.nav.map(function (n) {
        return '<a href="' + esc(n.href) + '">' + esc(n.label) + "</a>";
      }).join("") +
        '<a class="btn btn-full" href="contact.html">Get a free quote</a>';
    }

    /* Topbar contact */
    var c = d.contact || {};
    $$("[data-phone]").forEach(function (el) {
      el.textContent = c.phone || "";
      if (el.tagName === "A") el.href = "tel:+" + digits(c.phone);
    });
    $$("[data-email]").forEach(function (el) {
      el.textContent = c.email || "";
      if (el.tagName === "A") el.href = "mailto:" + (c.email || "");
    });
    $$("[data-whatsapp]").forEach(function (el) {
      el.textContent = c.whatsapp || "";
      if (el.tagName === "A") el.href = waLink(d);
    });
    $$("[data-location]").forEach(function (el) { el.textContent = c.location || ""; });
    $$("[data-hours]").forEach(function (el) { el.textContent = c.hours || ""; });

    /* Footer */
    var f = d.footer || {};
    $$("[data-footer-about]").forEach(function (el) { el.textContent = f.about || ""; });
    $$("[data-copyright]").forEach(function (el) { el.textContent = f.copyright || ""; });
    var credit = $("[data-credit]");
    if (credit) {
      if (f.credit_show) { credit.textContent = f.credit_text || ""; credit.hidden = false; }
      else credit.hidden = true;
    }

    /* Socials */
    $$("[data-socials]").forEach(function (host) {
      host.innerHTML = (d.socials || []).map(function (so) {
        return '<a href="' + esc(so.url) + '" target="_blank" rel="noopener" aria-label="' +
          esc(so.label) + '"><i class="' + esc(so.icon || "fa-solid fa-link") + '"></i></a>';
      }).join("");
    });

    /* Footer quick links + services + legal */
    var ql = $("[data-footer-links]");
    if (ql && d.nav) {
      ql.innerHTML = d.nav.map(function (n) {
        return '<a href="' + esc(n.href) + '">' + esc(n.label) + "</a>";
      }).join("");
    }
    var fs = $("[data-footer-services]");
    if (fs && d.services) {
      fs.innerHTML = d.services.slice(0, 5).map(function (sv) {
        return '<a href="services.html">' + esc(sv.title) + "</a>";
      }).join("");
    }
    var fl = $("[data-footer-legal]");
    if (fl && d.pages) {
      fl.innerHTML = d.pages.map(function (p) {
        return '<a href="' + esc(p.slug) + '.html">' + esc(p.title) + "</a>";
      }).join("");
    }

    /* Floating WhatsApp */
    $$("[data-wa-float]").forEach(function (el) { el.href = waLink(d); });
  };

  /* ---- Hero ---- */
  Render.hero = function (d) {
    var h = d.hero || {};

    /* Service choices are shared by the homepage and standalone enquiry forms. */
    $$('[data-service-options]').forEach(function (sel) {
      sel.innerHTML = '<option value="">Select a service</option>' +
        (d.services || []).map(function (service) {
          return '<option value="' + esc(service.title) + '">' + esc(service.title) + '</option>';
        }).join("") +
        '<option value="General enquiry">General enquiry</option>';
    });

    var host = $("[data-hero]");
    if (!host) return;

    var eyebrow = $("[data-hero-eyebrow]", host);
    if (eyebrow) eyebrow.innerHTML = '<span class="dot"></span>' + esc(h.eyebrow || "");

    var title = $("[data-hero-title]", host);
    if (title) title.textContent = h.title || "";

    var lead = $("[data-hero-lead]", host);
    if (lead) lead.textContent = h.lead || "";

    var cta = $("[data-hero-cta]", host);
    if (cta) { cta.textContent = h.cta || "View our work"; cta.href = h.ctaHref || "portfolio.html"; }

    var bg = $("[data-hero-bg]", host);
    if (bg && h.image) { bg.src = h.image; bg.alt = ""; }

    /* Rotating words */
    var rot = $(".rotw", host);
    if (rot && h.words) {
      var words = h.words.split(",").map(function (w) { return w.trim(); }).filter(Boolean);
      if (words.length) {
        rot.textContent = words[0];
        rot.setAttribute("data-words", words.join("|"));
        if (words.length > 1) {
          var i = 0;
          setInterval(function () {
            rot.classList.add("out");
            setTimeout(function () {
              i = (i + 1) % words.length;
              rot.textContent = words[i];
              rot.classList.remove("out");
            }, 300);
          }, 2600);
        }
      }
    }

    /* Quote form title */
    var qt = $("[data-quote-title]", host);
    if (qt) qt.textContent = h.formTitle || "Get a free quote";
    var ql = $("[data-quote-lead]", host);
    if (ql) ql.textContent = h.formLead || "";

  };

  /* ---- Stats ---- */
  Render.stats = function (d) {
    var host = $("[data-stats]");
    if (!host || !d.stats) return;
    host.innerHTML = d.stats.map(function (s) {
      var m = String(s.value).match(/^(\D*)(\d+)(.*)$/);
      var inner = m
        ? '<b data-count="' + m[2] + '" data-pre="' + esc(m[1]) + '" data-suf="' + esc(m[3]) + '">' + esc(s.value) + "</b>"
        : "<b>" + esc(s.value) + "</b>";
      return '<div class="stat">' + inner + "<span>" + esc(s.label) + "</span></div>";
    }).join("");
  };

  /* ---- Services ---- */
  Render.services = function (d, opts) {
    opts = opts || {};
    var host = $("[data-services]");
    if (!host || !d.services) return;
    var limit = opts.limit || d.services.length;

    host.innerHTML = d.services.slice(0, limit).map(function (s, i) {
      var feats = (s.features || []).map(function (f) {
        return '<li><i class="fa-solid fa-check"></i>' + esc(f) + "</li>";
      }).join("");
      return (
        '<article class="svc-card reveal reveal-d' + ((i % 3) + 1) + '" data-tilt>' +
          '<div class="svc-media">' +
            (s.image
              ? '<img src="' + esc(s.image) + '" alt="' + esc(s.title) + '" loading="lazy" width="1200" height="750">'
              : "") +
            '<span class="svc-icon"><i class="' + esc(s.icon || "fa-solid fa-star") + '"></i></span>' +
          "</div>" +
          '<div class="svc-body">' +
            "<h3>" + esc(s.title) + "</h3>" +
            (s.price ? '<span class="svc-price">' + esc(s.price) + "</span>" : "") +
            "<p>" + esc(s.desc) + "</p>" +
            (feats ? '<ul class="svc-features">' + feats + "</ul>" : "") +
            '<a class="link-arrow" href="contact.html">Get a quote <i class="fa-solid fa-arrow-right"></i></a>' +
          "</div>" +
        "</article>"
      );
    }).join("");
  };

  /* ---- Portfolio ---- */
  var PF = { filter: "*", query: "", limit: 9 };

  Render.portfolio = function (d) {
    var host = $("[data-portfolio]");
    if (!host || !d.portfolio) return;

    var cats = [];
    d.portfolio.forEach(function (p) {
      if (p.category && cats.indexOf(p.category) === -1) cats.push(p.category);
    });

    var pills = $("[data-pf-pills]");
    if (pills) {
      pills.innerHTML = '<button type="button" class="on" data-filter="*">All</button>' +
        cats.map(function (c) {
          return '<button type="button" data-filter="' + esc(c) + '">' + esc(c) + "</button>";
        }).join("");
    }

    host.innerHTML = d.portfolio.map(function (p, i) {
      var search = (p.title + " " + p.category + " " + (p.client || "") + " " + (p.tags || []).join(" ")).toLowerCase();
      return (
        '<article class="pf-card reveal reveal-d' + ((i % 3) + 1) + '" data-tilt ' +
          'data-cat="' + esc(p.category) + '" data-q="' + esc(search) + '" data-index="' + i + '" ' +
          'tabindex="0" role="button" aria-label="Open case study: ' + esc(p.title) + '">' +
          '<div class="pf-media">' +
            (p.image
              ? '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + ' — ' + esc(p.category) + ' project" loading="lazy" width="1200" height="900">'
              : "") +
            '<span class="pf-zoom"><i class="fa-solid fa-expand"></i></span>' +
            '<div class="pf-overlay">' +
              '<span class="cat">' + esc(p.category) + "</span>" +
              "<h3>" + esc(p.title) + "</h3>" +
              "<p>" + esc(p.desc) + "</p>" +
            "</div>" +
          "</div>" +
          '<div class="pf-meta">' +
            "<div><h3>" + esc(p.title) + "</h3><small>" + esc(p.client || "") + "</small></div>" +
            '<span class="tag">' + esc(p.category) + "</span>" +
          "</div>" +
        "</article>"
      );
    }).join("");

    applyPortfolio();
  };

  function applyPortfolio() {
    var host = $("[data-portfolio]");
    if (!host) return;
    var cards = $$(".pf-card", host);
    var shown = 0;
    var total = 0;

    cards.forEach(function (card) {
      var cat = card.getAttribute("data-cat");
      var q = card.getAttribute("data-q") || "";
      var matchCat = PF.filter === "*" || cat === PF.filter;
      var matchQ = !PF.query || q.indexOf(PF.query) > -1;
      if (matchCat && matchQ) {
        total++;
        if (shown < PF.limit) { card.hidden = false; shown++; }
        else card.hidden = true;
      } else {
        card.hidden = true;
      }
    });

    var empty = $("[data-pf-empty]");
    if (empty) empty.hidden = total > 0;

    var count = $("[data-pf-count]");
    if (count) {
      count.textContent = total
        ? "Showing " + Math.min(shown, total) + " of " + total + " projects"
        : "";
    }
    var more = $("[data-pf-more]");
    if (more) more.hidden = total <= PF.limit;
  }

  /* ---- Process ---- */
  Render.process = function (d) {
    var host = $("[data-process]");
    if (!host || !d.process) return;
    host.innerHTML = d.process.map(function (p, i) {
      return (
        '<div class="step reveal reveal-d' + ((i % 3) + 1) + '">' +
          '<div class="step-num">' + (i + 1) + "</div>" +
          "<h3>" + esc(p.title) + "</h3>" +
          "<p>" + esc(p.text) + "</p>" +
        "</div>"
      );
    }).join("");
  };

  /* ---- Team ---- */
  Render.team = function (d) {
    var host = $("[data-team]");
    if (!host || !d.team) return;
    host.innerHTML = d.team.map(function (m, i) {
      var soc = m.socials || {};
      var links = Object.keys(soc).filter(function (k) { return soc[k]; }).map(function (k) {
        var icon = k === "linkedin" ? "fa-brands fa-linkedin-in"
          : k === "behance" ? "fa-brands fa-behance"
          : k === "github" ? "fa-brands fa-github"
          : "fa-solid fa-link";
        return '<a href="' + esc(soc[k]) + '" target="_blank" rel="noopener" aria-label="' +
          esc(m.name) + " on " + esc(k) + '"><i class="' + icon + '"></i></a>';
      }).join("");

      return (
        '<figure class="team-card reveal reveal-d' + ((i % 2) + 1) + '">' +
          '<div class="team-photo">' +
            (m.image
              ? '<img src="' + esc(m.image) + '" alt="' + esc(m.name) + ' — ' + esc(m.role) + '" loading="lazy" width="928" height="1152">'
              : "") +
          "</div>" +
          '<figcaption class="team-body">' +
            "<h3>" + esc(m.name) + "</h3>" +
            '<span class="team-role">' + esc(m.role) + "</span>" +
            "<p>" + esc(m.bio || "") + "</p>" +
            (links ? '<div class="team-socials">' + links + "</div>" : "") +
          "</figcaption>" +
        "</figure>"
      );
    }).join("");
  };

  /* ---- About ---- */
  Render.about = function (d) {
    var a = d.about || {};
    $$("[data-about-title]").forEach(function (el) { el.textContent = a.title || ""; });
    $$("[data-about-text1]").forEach(function (el) { el.textContent = a.text1 || ""; });
    $$("[data-about-text2]").forEach(function (el) { el.textContent = a.text2 || ""; });
    $$("[data-about-image]").forEach(function (el) {
      if (a.image) { el.src = a.image; el.alt = "Inside the Urban Mark Creatives studio"; }
    });

    var vh = $("[data-about-values]");
    if (vh && a.values) {
      var icons = ["fa-solid fa-layer-group", "fa-solid fa-file-invoice-dollar",
                   "fa-solid fa-magnifying-glass-chart", "fa-solid fa-headset"];
      vh.innerHTML = a.values.map(function (v, i) {
        return (
          '<div class="value-item reveal reveal-d' + ((i % 4) + 1) + '">' +
            '<span class="vi-icon"><i class="' + icons[i % icons.length] + '"></i></span>' +
            "<div><h4>" + esc(v.title) + "</h4><p>" + esc(v.text) + "</p></div>" +
          "</div>"
        );
      }).join("");
    }
  };

  /* ---- Testimonials ---- */
  var Testi = { index: 0, timer: null, count: 0 };

  Render.testimonials = function (d) {
    var host = $("[data-testimonials]");
    if (!host || !d.testimonials) return;

    Testi.count = d.testimonials.length;
    host.innerHTML = d.testimonials.map(function (t, i) {
      var stars = "";
      for (var s = 0; s < (t.rating || 5); s++) stars += '<i class="fa-solid fa-star"></i>';
      var av = t.photo
        ? '<img src="' + esc(t.photo) + '" alt="' + esc(t.name) + '" loading="lazy">'
        : esc(initials(t.name));
      return (
        '<div class="testi-slide' + (i === 0 ? " active" : "") + '" data-slide="' + i + '">' +
          '<div class="testi-stars">' + stars + "</div>" +
          '<blockquote class="testi-quote">&ldquo;' + esc(t.quote) + "&rdquo;</blockquote>" +
          '<div class="testi-person">' +
            '<span class="testi-avatar">' + av + "</span>" +
            "<span><b>" + esc(t.name) + "</b><small>" + esc(t.role) + "</small></span>" +
          "</div>" +
        "</div>"
      );
    }).join("");

    var dots = $("[data-testi-dots]");
    if (dots) {
      dots.innerHTML = d.testimonials.map(function (t, i) {
        return '<button type="button" data-dot="' + i + '"' + (i === 0 ? ' class="on"' : "") +
          ' aria-label="Show testimonial ' + (i + 1) + '"></button>';
      }).join("");
    }

    Testi.index = 0;
    startTesti();
  };

  function showTesti(n) {
    var slides = $$("[data-slide]");
    if (!slides.length) return;
    Testi.index = (n + slides.length) % slides.length;
    slides.forEach(function (s, i) { s.classList.toggle("active", i === Testi.index); });
    $$("[data-dot]").forEach(function (dot, i) { dot.classList.toggle("on", i === Testi.index); });
  }

  function startTesti() {
    clearInterval(Testi.timer);
    if (Testi.count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    Testi.timer = setInterval(function () { showTesti(Testi.index + 1); }, 6500);
  }

  /* ---- FAQ ---- */
  Render.faq = function (d) {
    var host = $("[data-faq]");
    if (!host || !d.faq) return;
    host.innerHTML = d.faq.map(function (f, i) {
      return (
        '<div class="faq-item' + (i === 0 ? " open" : "") + '">' +
          '<button class="faq-q" type="button" aria-expanded="' + (i === 0) + '">' +
            "<span>" + esc(f.q) + "</span>" +
            '<i class="fa-solid fa-plus"></i>' +
          "</button>" +
          '<div class="faq-a"><div><p>' + esc(f.a) + "</p></div></div>" +
        "</div>"
      );
    }).join("");
  };

  /* ---- Pricing ---- */
  Render.pricing = function (d) {
    var host = $("[data-pricing]");
    if (!host || !d.pricing) return;
    host.innerHTML = d.pricing.map(function (p, i) {
      return (
        '<a class="price-card reveal reveal-d' + ((i % 4) + 1) + '" href="' + esc(p.link || "contact.html") + '">' +
          "<h3>" + esc(p.name) + "</h3>" +
          '<span class="amount">' + esc(p.price) + "</span>" +
          "<p>" + esc(p.desc) + "</p>" +
          '<span class="link-arrow">See options <i class="fa-solid fa-arrow-right"></i></span>' +
        "</a>"
      );
    }).join("");
  };

  /* ---- Sectors ---- */
  Render.sectors = function (d) {
    var host = $("[data-sectors]");
    if (!host || !d.sectors) return;
    host.innerHTML = d.sectors.map(function (s, i) {
      return (
        '<div class="sector reveal reveal-d' + ((i % 3) + 1) + '">' +
          "<b>" + esc(s.title) + "</b>" +
          "<span>" + esc(s.desc) + "</span>" +
          '<a class="link-arrow" href="' + esc(s.link || "contact.html") + '">' +
            esc(s.link_label || "Talk to us") + ' <i class="fa-solid fa-arrow-right"></i></a>' +
        "</div>"
      );
    }).join("");
  };

  /* ---- Contact page ---- */
  Render.contact = function (d) {
    var c = d.contact || {};
    var host = $("[data-contact-list]");
    if (host) {
      host.innerHTML =
        '<div class="contact-item"><span class="ci-icon"><i class="fa-solid fa-phone"></i></span>' +
          "<div><b>Phone</b><a href=\"tel:+" + digits(c.phone) + "\">" + esc(c.phone) + "</a></div></div>" +
        '<div class="contact-item"><span class="ci-icon"><i class="fa-brands fa-whatsapp"></i></span>' +
          "<div><b>WhatsApp</b><a href=\"" + esc(waLink(d)) + "\" target=\"_blank\" rel=\"noopener\">" + esc(c.whatsapp) + "</a></div></div>" +
        '<div class="contact-item"><span class="ci-icon"><i class="fa-solid fa-envelope"></i></span>' +
          "<div><b>Email</b><a href=\"mailto:" + esc(c.email) + "\">" + esc(c.email) + "</a></div></div>" +
        '<div class="contact-item"><span class="ci-icon"><i class="fa-solid fa-location-dot"></i></span>' +
          "<div><b>Studio</b><span>" + esc(c.location) + "</span></div></div>" +
        '<div class="contact-item"><span class="ci-icon"><i class="fa-regular fa-clock"></i></span>' +
          "<div><b>Hours</b><span>" + esc(c.hours) + "</span></div></div>";
    }
  };

  /* ---- Legal pages ---- */
  Render.legal = function (d) {
    var host = $("[data-legal]");
    if (!host) return;
    var which = document.body.getAttribute("data-legal");
    var page = (d.pages || []).filter(function (p) { return p.slug === which; })[0];
    if (!page) return;
    var title = $("[data-legal-title]");
    if (title) title.textContent = page.title;
    document.title = page.title + " | " + (d.site.brand || "");
    host.innerHTML = String(page.body || "").split(/\n{2,}/).map(function (para) {
      return "<p>" + esc(para).replace(/\n/g, "<br>") + "</p>";
    }).join("");
  };

  /* ---- SEO meta (per page, from data.json) ---- */
  Render.seo = function (d) {
    var s = d.seo || {};
    var page = document.body.getAttribute("data-page") || "home";
    var overrides = {
      about: {
        title: "About Us | Kiambu Design & Software Studio | Urban Mark Creatives",
        desc: "Meet the team behind Urban Mark Creatives — a Kiambu-based design and software studio serving clients across Kenya and worldwide."
      },
      services: {
        title: "Services | Web Design, Branding, Apps & SEO | Urban Mark Creatives",
        desc: "Website design, mobile apps, brand identity, graphic design, digital marketing, hosting and AI automation for businesses in Kenya and beyond."
      },
      portfolio: {
        title: "Portfolio & Case Studies | Urban Mark Creatives",
        desc: "Selected logos, brand systems, print campaigns and websites delivered by Urban Mark Creatives for clients in Kenya and worldwide."
      },
      contact: {
        title: "Contact Us | Get a Free Quote | Urban Mark Creatives",
        desc: "Talk to Urban Mark Creatives about your website, branding or print project. Call +254 106 027 162, WhatsApp us, or send a free quote request."
      }
    };
    var o = overrides[page];
    if (o) {
      var t = $('meta[name="description"]');
      if (t) t.setAttribute("content", o.desc);
      var ogt = $('meta[property="og:title"]');
      if (ogt) ogt.setAttribute("content", o.title);
      var ogd = $('meta[property="og:description"]');
      if (ogd) ogd.setAttribute("content", o.desc);
      var twt = $('meta[name="twitter:title"]');
      if (twt) twt.setAttribute("content", o.title);
      var twd = $('meta[name="twitter:description"]');
      if (twd) twd.setAttribute("content", o.desc);
    }
    if (s.ogImage) {
      $$('meta[property="og:image"], meta[name="twitter:image"]').forEach(function (m) {
        m.setAttribute("content", s.ogImage);
      });
    }
  };

  /* Prefill the contact form when the visitor brings an estimate from Services. */
  function prefillLeadFormsFromQuery() {
    var params;
    try { params = new URLSearchParams(window.location.search); } catch (e) { return; }
    var service = params.get("service");
    var details = params.get("details");
    if (!service && !details) return;
    var form = $("form[data-lead-form]");
    if (!form) return;
    var serviceField = $('[name="service"]', form);
    var detailsField = $('[name="details"]', form);
    if (serviceField && service) serviceField.value = service;
    if (detailsField && details) {
      detailsField.value = [detailsField.value.trim(), details].filter(Boolean).join("\n\n");
    }
  }

  /* ---- Render everything present on this page ---- */
  function renderAll(d) {
    if (!d) return;
    Render.chrome(d);
    Render.seo(d);
    Render.hero(d);
    Render.stats(d);
    Render.services(d, { limit: document.body.getAttribute("data-svc-limit") || undefined });
    Render.portfolio(d);
    Render.process(d);
    Render.team(d);
    Render.about(d);
    Render.testimonials(d);
    Render.faq(d);
    Render.pricing(d);
    Render.sectors(d);
    Render.contact(d);
    Render.legal(d);
    prefillLeadFormsFromQuery();

    /* Re-run art hooks for freshly injected nodes */
    if (window.UMCArt) {
      window.UMCArt.bootReveal();
      window.UMCArt.bootTilt();
      window.UMCArt.bootCounters();
    }
  }
  UMC.renderAll = renderAll;

  /* Instant Project Cost Calculator */
  function initProjectCalculator() {
    var widget = $("[data-project-calculator]");
    if (!widget) return;

    var rates = {
      website: { title: "Website Design & Development", unit: "page", unitLabel: "Number of pages", base: 15000, step: 5000, first: "First page included" },
      app: { title: "Mobile App Development", unit: "feature", unitLabel: "Number of app features", base: 100000, step: 12000, first: "Core app build included" },
      branding: { title: "Graphic Design & Brand Identity", unit: "brand asset", unitLabel: "Number of brand assets", base: 1000, step: 2000, first: "Base identity setup included" },
      marketing: { title: "Digital Marketing & SEO", unit: "marketing channel", unitLabel: "Number of marketing channels", base: 20000, step: 5000, first: "Monthly base management included", period: "per month" },
      automation: { title: "AI Consultancy & Business Automation", unit: "workflow", unitLabel: "Number of automation workflows", base: 35000, step: 10000, first: "Initial workflow setup included" }
    };
    var kesPerUsd = 130;
    var serviceField = $("[data-calculator-service]", widget);
    var unitsField = $("[data-calculator-units]", widget);
    var unitsLabel = $("[data-calculator-units-label]", widget);
    var estimate = $("[data-calculator-estimate]", widget);
    var breakdown = $("[data-calculator-breakdown]", widget);
    var periodLabel = $("[data-calculator-period]", widget);
    var currencyButtons = $$('[data-calc-currency]', widget);
    var submit = $("[data-calculator-submit]", widget);
    var currency = "KES";
    var current = null;
    var viewTracked = false;

    function number(value) {
      return new Intl.NumberFormat(currency === "KES" ? "en-KE" : "en-US", { maximumFractionDigits: 0 }).format(value);
    }
    function trackView() {
      if (viewTracked) return;
      viewTracked = true;
      Tracking.event("ViewContent", { content_name: "Instant Project Cost Calculator", content_category: "Project estimate" });
    }
    function calculate() {
      var config = rates[serviceField.value] || rates.website;
      var quantity = Math.max(1, Math.min(50, parseInt(unitsField.value, 10) || 1));
      unitsField.value = quantity;
      var totalKes = config.base + ((quantity - 1) * config.step);
      var displayed = currency === "KES" ? totalKes : totalKes / kesPerUsd;
      var suffix = config.period ? " / month" : "";
      var perLabel = config.unit + (quantity === 1 ? "" : "s");
      if (unitsLabel) unitsLabel.textContent = config.unitLabel;
      if (estimate) estimate.textContent = (currency === "KES" ? "KES " : "USD ") + number(displayed) + suffix;
      if (breakdown) breakdown.textContent = quantity + " " + perLabel + " • " + config.first + (config.period ? " • monthly retainer" : "");
      if (periodLabel) periodLabel.textContent = config.period ? "Estimated monthly budget" : "Estimated project total";
      current = { config: config, quantity: quantity, totalKes: totalKes, displayed: displayed, currency: currency };
      return current;
    }

    if (!serviceField || !unitsField || !estimate || !submit) return;
    serviceField.addEventListener("change", calculate);
    unitsField.addEventListener("input", calculate);
    currencyButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        currency = button.getAttribute("data-calc-currency") === "USD" ? "USD" : "KES";
        currencyButtons.forEach(function (item) {
          var active = item === button;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        calculate();
      });
    });

    submit.addEventListener("click", function () {
      var result = calculate();
      trackView();
      var config = result.config;
      var estimateText = (result.currency === "KES" ? "KES " : "USD ") + number(result.displayed) + (config.period ? " per month" : "");
      var quoteDetails = "Instant calculator estimate: " + estimateText + " for " + result.quantity + " " + config.unit + ". The estimate is indicative and subject to a confirmed brief.";
      var form = $("form[data-lead-form]");
      if (form) {
        var formService = $('[name="service"]', form);
        var detailsField = $('[name="details"]', form);
        if (formService) {
          var hasServiceOption = Array.prototype.some.call(formService.options || [], function (option) {
            return option.value === config.title;
          });
          if (!hasServiceOption) {
            var serviceOption = document.createElement("option");
            serviceOption.value = config.title;
            serviceOption.textContent = config.title;
            formService.appendChild(serviceOption);
          }
          formService.value = config.title;
        }
        if (detailsField) detailsField.value = [detailsField.value.trim(), quoteDetails].filter(Boolean).join("\n\n");
        form.scrollIntoView({ behavior: "smooth", block: "center" });
        if (detailsField) window.setTimeout(function () { detailsField.focus({ preventScroll: true }); }, 450);
        return;
      }
      var target = "contact.html?service=" + encodeURIComponent(config.title) +
        "&details=" + encodeURIComponent(quoteDetails);
      window.location.href = target;
    });

    calculate();
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            trackView();
            observer.disconnect();
          }
        });
      }, { threshold: [0.25, 0.5] });
      observer.observe(widget);
    } else {
      widget.addEventListener("focusin", trackView, { once: true });
      widget.addEventListener("pointerdown", trackView, { once: true });
    }
  }

  /* ========================================================================
     5. UI WIRING
     ====================================================================== */
  function bootChrome() {
    /* Theme */
    var savedTheme = null;
    try { savedTheme = localStorage.getItem(THEME_KEY); } catch (e) {}
    if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

    var themeBtn = $("#themeBtn");
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
        themeBtn.setAttribute("aria-label", "Switch to " + (next === "dark" ? "light" : "dark") + " theme");
      });
    }

    /* Sticky header shadow */
    var header = $(".site-header");
    var progress = $("#progress");
    var toTop = $("#toTop");

    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (header) header.classList.toggle("scrolled", y > 12);
      if (toTop) toTop.classList.toggle("show", y > 700);
      if (progress) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (toTop) {
      toTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    /* Mobile menu */
    var burger = $("#burger");
    var menu = $("#mobileMenu");
    var backdrop = $("#menuBackdrop");
    var closeBtn = $("#menuClose");

    function setMenu(open) {
      if (!menu) return;
      menu.classList.toggle("open", open);
      if (backdrop) backdrop.classList.toggle("show", open);
      if (burger) burger.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    }
    if (burger) burger.addEventListener("click", function () {
      setMenu(!menu.classList.contains("open"));
    });
    if (closeBtn) closeBtn.addEventListener("click", function () { setMenu(false); });
    if (backdrop) backdrop.addEventListener("click", function () { setMenu(false); });
    if (menu) menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });

    /* Cookie bar */
    var cookie = $("#cookieBar");
    if (cookie) {
      var seen = null;
      try { seen = localStorage.getItem(COOKIE_KEY); } catch (e) {}
      if (!seen) cookie.hidden = false;
      var ok = $("#cookieOk");
      if (ok) ok.addEventListener("click", function () {
        try { localStorage.setItem(COOKIE_KEY, "1"); } catch (e) {}
        cookie.hidden = true;
      });
    }

    /* FAQ accordion (delegated) */
    document.addEventListener("click", function (e) {
      var q = e.target.closest(".faq-q");
      if (!q) return;
      var item = q.parentElement;
      var isOpen = item.classList.contains("open");
      $$(".faq-item").forEach(function (it) {
        it.classList.remove("open");
        var b = $(".faq-q", it);
        if (b) b.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        q.setAttribute("aria-expanded", "true");
      }
    });

    /* Testimonial controls */
    document.addEventListener("click", function (e) {
      var prev = e.target.closest("[data-testi-prev]");
      var next = e.target.closest("[data-testi-next]");
      var dot = e.target.closest("[data-dot]");
      if (prev) { showTesti(Testi.index - 1); startTesti(); }
      if (next) { showTesti(Testi.index + 1); startTesti(); }
      if (dot) { showTesti(parseInt(dot.getAttribute("data-dot"), 10)); startTesti(); }
    });

    /* Pause the slider on hover */
    var tw = $(".testi-wrap");
    if (tw) {
      tw.addEventListener("mouseenter", function () { clearInterval(Testi.timer); });
      tw.addEventListener("mouseleave", startTesti);
    }

    /* Portfolio filters + search + load more */
    document.addEventListener("click", function (e) {
      var f = e.target.closest("[data-filter]");
      if (f) {
        $$("[data-filter]").forEach(function (b) { b.classList.toggle("on", b === f); });
        PF.filter = f.getAttribute("data-filter");
        PF.limit = 9;
        applyPortfolio();
      }
      var more = e.target.closest("[data-pf-more]");
      if (more) { PF.limit += 6; applyPortfolio(); }
    });

    var search = $("#pfSearch");
    if (search) {
      search.addEventListener("input", function () {
        PF.query = this.value.toLowerCase().trim();
        PF.limit = 9;
        applyPortfolio();
      });
    }

    /* Portfolio modal */
    document.addEventListener("click", function (e) {
      var card = e.target.closest(".pf-card");
      if (card) openCaseStudy(parseInt(card.getAttribute("data-index"), 10));
    });
    document.addEventListener("keydown", function (e) {
      var card = e.target.closest && e.target.closest(".pf-card");
      if (card && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        openCaseStudy(parseInt(card.getAttribute("data-index"), 10));
      }
      if (e.key === "Escape") closeCaseStudy();
    });

    /* Contact / quote forms — honest handoff, no fake success */
    $$("form[data-lead-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var fd = new FormData(form);
        if (fd.get("website")) return; /* honeypot */

        var name = String(fd.get("name") || "").trim();
        var phone = String(fd.get("phone") || "").trim();
        var email = String(fd.get("email") || "").trim();
        var service = String(fd.get("service") || "").trim();
        var details = String(fd.get("details") || "").trim();

        if (name.length < 2) { toast("Please enter your name.", true); return; }
        if (digits(phone).length < 7) { toast("Please enter a valid phone number.", true); return; }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          toast("Please enter a valid email address.", true);
          return;
        }

        var lines = [
          "New enquiry from the Urban Mark Creatives website",
          "",
          "Name: " + name,
          "Phone: " + phone,
          email ? "Email: " + email : "",
          service ? "Service: " + service : "",
          details ? "Details: " + details : ""
        ].filter(Boolean);

        var msg = lines.join("\n");
        var d = UMC.data || {};
        var wa = waLink(d, msg);
        var mail = "mailto:" + ((d.contact && d.contact.email) || "") +
          "?subject=" + encodeURIComponent("Website enquiry from " + name) +
          "&body=" + encodeURIComponent(msg);

        /* Fire the conversion event */
        Tracking.event("Lead", { content_name: service || "General enquiry", value: 0, currency: "KES" });

        /* Open WhatsApp — the real delivery channel for this static site */
        var win = window.open(wa, "_blank", "noopener");
        if (!win) {
          window.location.href = mail;
        }
        toast("Opening WhatsApp with your enquiry — press send there to reach us.");
        form.reset();
      });
    });

    /* WhatsApp / phone click tracking */
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="tel:"], a[href*="wa.me"], a[href^="mailto:"]');
      if (a) Tracking.event("Contact", { method: a.getAttribute("href").split(":")[0] });
    });

    initProjectCalculator();
  }

  /* ---- Case study modal ---- */
  function openCaseStudy(index) {
    var d = UMC.data;
    if (!d || !d.portfolio || isNaN(index)) return;
    var p = d.portfolio[index];
    if (!p) return;

    var modal = $("#caseModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "caseModal";
      modal.className = "modal";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.innerHTML =
        '<div class="modal-card">' +
          '<button class="modal-close" type="button" aria-label="Close case study"><i class="fa-solid fa-xmark"></i></button>' +
          '<div class="modal-media"><img alt=""></div>' +
          '<div class="modal-body">' +
            '<span class="cat"></span>' +
            "<h2></h2>" +
            '<span class="client"></span>' +
            "<p></p>" +
            '<div class="modal-tags"></div>' +
            '<div class="btn-row"><a class="btn" href="contact.html">Start a similar project <i class="fa-solid fa-arrow-right"></i></a>' +
            '<a class="btn btn-outline modal-live" target="_blank" rel="noopener" hidden>View live project</a></div>' +
          "</div>" +
        "</div>";
      document.body.appendChild(modal);

      modal.addEventListener("click", function (e) {
        if (e.target === modal || e.target.closest(".modal-close")) closeCaseStudy();
      });
    }

    $(".modal-media img", modal).src = p.image || "";
    $(".modal-media img", modal).alt = p.title + " case study";
    $(".cat", modal).textContent = p.category || "";
    $("h2", modal).textContent = p.title || "";
    $(".client", modal).textContent = p.client || "";
    $(".modal-body > p", modal).textContent = p.desc || "";
    $(".modal-tags", modal).innerHTML = (p.tags || []).map(function (t) {
      return "<span>" + esc(t) + "</span>";
    }).join("");

    var live = $(".modal-live", modal);
    if (p.link) { live.href = p.link; live.hidden = false; }
    else live.hidden = true;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";

    /* ViewContent conversion */
    Tracking.event("ViewContent", { content_name: p.title, content_category: p.category });
  }

  function closeCaseStudy() {
    var modal = $("#caseModal");
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  /* ========================================================================
     6. ADMIN
     ====================================================================== */
  var Admin = {
    tab: "site",
    draft: null,

    boot: function () {
      UMC.isAdmin = true;
      var gate = $("#adminGate");
      var app = $("#adminApp");
      if (!gate || !app) return;

      var authed = false;
      try { authed = sessionStorage.getItem(AUTH_KEY) === "1"; } catch (e) {}

      if (authed) { gate.hidden = true; app.hidden = false; this.start(); }
      else { gate.hidden = false; app.hidden = true; }

      this.wireLogin(gate, app);
    },

    wireLogin: function (gate, app) {
      var form = $("#loginForm");
      var err = $("#loginError");
      var eye = $("#togglePass");
      var pass = $("#loginPass");

      if (eye && pass) {
        eye.addEventListener("click", function () {
          var show = pass.type === "password";
          pass.type = show ? "text" : "password";
          eye.setAttribute("aria-label", show ? "Hide password" : "Show password");
          eye.innerHTML = '<i class="fa-solid fa-eye' + (show ? "-slash" : "") + '"></i>';
        });
      }

      if (form) {
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          var user = String($("#loginUser").value || "").trim();
          var pw = String(pass.value || "");
          var stored = null;
          try { stored = localStorage.getItem(PASS_KEY); } catch (e2) {}
          var expected = stored || DEFAULT_PASS;

          if (user.toLowerCase() === "admin" && pw === expected) {
            try { sessionStorage.setItem(AUTH_KEY, "1"); } catch (e3) {}
            if (err) err.hidden = true;
            gate.hidden = true;
            app.hidden = false;
            Admin.start();
          } else {
            if (err) { err.hidden = false; err.textContent = "Incorrect username or password."; }
            pass.value = "";
            pass.focus();
          }
        });
      }

      var logout = $("#logoutBtn");
      if (logout) logout.addEventListener("click", function () {
        try { sessionStorage.removeItem(AUTH_KEY); } catch (e) {}
        location.reload();
      });
    },

    start: function () {
      var self = this;
      var d = UMC.data;
      if (!d) { toast("Could not load data.json", true); return; }

      this.draft = JSON.parse(JSON.stringify(d));

      /* Tabs */
      $$("[data-tab]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          /* Capture the outgoing tab's edits BEFORE its DOM is replaced */
          self.collect();
          self.tab = btn.getAttribute("data-tab");
          $$("[data-tab]").forEach(function (b) { b.classList.toggle("on", b === btn); });
          self.renderTab();
        });
      });

      /* Save & preview */
      var save = $("#saveBtn");
      if (save) save.addEventListener("click", function () {
        self.collect();
        if (writeLocal(self.draft)) {
          toast("Saved. Reloading the live site with your changes…");
          setTimeout(function () { window.open("index.html", "_blank"); }, 700);
        } else {
          toast("Could not save — browser storage is full or blocked.", true);
        }
      });

      /* Export data.json */
      var exp = $("#exportBtn");
      if (exp) exp.addEventListener("click", function () {
        self.collect();
        var blob = new Blob([JSON.stringify(self.draft, null, 2)], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "data.json";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
        toast("data.json downloaded. Upload it to your GitHub repo to publish for everyone.");
      });

      /* Reset */
      var reset = $("#resetBtn");
      if (reset) reset.addEventListener("click", function () {
        if (!confirm("Discard all local changes and restore the published data.json?")) return;
        clearLocal();
        location.reload();
      });

      /* Change password */
      var pwForm = $("#passForm");
      if (pwForm) pwForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var np = String($("#newPass").value || "");
        if (np.length < 8) { toast("Use at least 8 characters.", true); return; }
        try { localStorage.setItem(PASS_KEY, np); } catch (e2) {}
        toast("Admin password updated on this browser.");
        pwForm.reset();
      });

      this.renderTab();
      this.renderStatus();
    },

    renderStatus: function () {
      var el = $("#adminStatus");
      if (!el) return;
      var local = readLocal();
      el.innerHTML = local
        ? '<i class="fa-solid fa-circle-check"></i> Local draft active — the live site is showing your saved changes on this browser.'
        : '<i class="fa-solid fa-circle-info"></i> Showing the published data.json. No local changes yet.';
      el.className = "admin-status" + (local ? " active" : "");
    },

    /* ---- Tab renderers ---- */
    renderTab: function () {
      var host = $("#tabBody");
      if (!host) return;
      var d = this.draft;
      var t = this.tab;

      if (t === "site") host.innerHTML = this.tplSite(d);
      else if (t === "hero") host.innerHTML = this.tplHero(d);
      else if (t === "services") host.innerHTML = this.tplList("services", d.services, [
        { k: "title", l: "Service title" },
        { k: "desc", l: "Description", type: "textarea" },
        { k: "price", l: "Price label" },
        { k: "image", l: "Image path" },
        { k: "icon", l: "Font Awesome icon class" }
      ]);
      else if (t === "portfolio") host.innerHTML = this.tplList("portfolio", d.portfolio, [
        { k: "title", l: "Project title" },
        { k: "category", l: "Category" },
        { k: "client", l: "Client" },
        { k: "desc", l: "Description", type: "textarea" },
        { k: "image", l: "Mockup image path" },
        { k: "link", l: "Live link (optional)" }
      ]);
      else if (t === "team") host.innerHTML = this.tplList("team", d.team, [
        { k: "name", l: "Full name" },
        { k: "role", l: "Title / role" },
        { k: "bio", l: "Short bio", type: "textarea" },
        { k: "image", l: "Portrait image path" }
      ]);
      else if (t === "testimonials") host.innerHTML = this.tplList("testimonials", d.testimonials, [
        { k: "name", l: "Client name" },
        { k: "role", l: "Role / company" },
        { k: "quote", l: "Testimonial", type: "textarea" },
        { k: "rating", l: "Star rating (1–5)", type: "number" }
      ]);
      else if (t === "faq") host.innerHTML = this.tplList("faq", d.faq, [
        { k: "q", l: "Question" },
        { k: "a", l: "Answer", type: "textarea" }
      ]);
      else if (t === "pricing") host.innerHTML = this.tplList("pricing", d.pricing, [
        { k: "name", l: "Package name" },
        { k: "price", l: "Price" },
        { k: "desc", l: "Description", type: "textarea" },
        { k: "link", l: "Link" }
      ]);
      else if (t === "contact") host.innerHTML = this.tplContact(d);
      else if (t === "seo") host.innerHTML = this.tplSeo(d);
      else if (t === "tracking") host.innerHTML = this.tplTracking(d);
      else if (t === "account") host.innerHTML = this.tplAccount();

      this.wireTab();
    },

    tplSite: function (d) {
      var s = d.site || {};
      var f = d.footer || {};
      return (
        '<div class="admin-panel"><h2>Brand &amp; site</h2>' +
        '<p class="admin-hint">These values drive the logo, tagline and footer across every page.</p>' +
        '<div class="admin-grid">' +
          this.inp("site.brand", "Brand name", s.brand) +
          this.inp("site.tagline", "Tagline", s.tagline) +
          this.inp("site.logo", "Logo path", s.logo) +
          this.inp("site.url", "Live site URL", s.url) +
          this.inp("site.primary", "Accent colour", s.primary, "color") +
          this.inp("site.navy", "Navy colour", s.navy, "color") +
        "</div>" +
        '<h3 class="admin-sub">Footer</h3>' +
        '<div class="admin-grid">' +
          this.inp("footer.about", "Footer description", f.about, "textarea") +
          this.inp("footer.copyright", "Copyright line", f.copyright) +
          this.inp("footer.credit_text", "Credit line", f.credit_text) +
        "</div></div>"
      );
    },

    tplHero: function (d) {
      var h = d.hero || {};
      return (
        '<div class="admin-panel"><h2>Hero section</h2>' +
        '<p class="admin-hint">The first thing every visitor reads. Keep the headline under 12 words.</p>' +
        '<div class="admin-grid">' +
          this.inp("hero.eyebrow", "Eyebrow label", h.eyebrow) +
          this.inp("hero.title", "Headline", h.title, "textarea") +
          this.inp("hero.lead", "Description", h.lead, "textarea") +
          this.inp("hero.cta", "Button label", h.cta) +
          this.inp("hero.ctaHref", "Button link", h.ctaHref) +
          this.inp("hero.words", "Rotating words (comma separated)", h.words) +
          this.inp("hero.image", "Background image path", h.image) +
          this.inp("hero.formTitle", "Quote form title", h.formTitle) +
          this.inp("hero.formLead", "Quote form subtitle", h.formLead, "textarea") +
        "</div></div>"
      );
    },

    tplList: function (key, arr, fields) {
      arr = arr || [];
      var self = this;
      var rows = arr.map(function (item, i) {
        var inputs = fields.map(function (f) {
          return self.inp(key + "." + i + "." + f.k, f.l, item[f.k], f.type);
        }).join("");
        return (
          '<div class="admin-item" data-item="' + i + '">' +
            '<div class="admin-item-head">' +
              "<b>" + esc(item[fields[0].k] || "Untitled") + "</b>" +
              '<button type="button" class="admin-del" data-del="' + key + '" data-i="' + i + '" aria-label="Delete">' +
                '<i class="fa-solid fa-trash"></i></button>' +
            "</div>" +
            '<div class="admin-grid">' + inputs + "</div>" +
          "</div>"
        );
      }).join("");

      return (
        '<div class="admin-panel"><h2>' + esc(key.charAt(0).toUpperCase() + key.slice(1)) + "</h2>" +
        '<p class="admin-hint">' + arr.length + " item" + (arr.length === 1 ? "" : "s") +
        ". Add, edit or delete — then Save &amp; Preview.</p>" +
        '<div class="admin-list">' + rows + "</div>" +
        '<button type="button" class="btn btn-sm" data-add="' + key + '">' +
          '<i class="fa-solid fa-plus"></i> Add item</button>' +
        "</div>"
      );
    },

    tplContact: function (d) {
      var c = d.contact || {};
      return (
        '<div class="admin-panel"><h2>Contact &amp; socials</h2>' +
        '<p class="admin-hint">Used in the header, footer, contact page and every WhatsApp button.</p>' +
        '<div class="admin-grid">' +
          this.inp("contact.phone", "Phone", c.phone) +
          this.inp("contact.whatsapp", "WhatsApp number", c.whatsapp) +
          this.inp("contact.email", "Email", c.email) +
          this.inp("contact.location", "Location", c.location) +
          this.inp("contact.hours", "Opening hours", c.hours) +
          this.inp("contact.wa_message", "Default WhatsApp message", c.wa_message, "textarea") +
        "</div>" +
        '<h3 class="admin-sub">Social links</h3>' +
        '<div class="admin-list">' +
          (d.socials || []).map(function (s, i) {
            return (
              '<div class="admin-item"><div class="admin-item-head"><b>' + esc(s.label) + "</b>" +
              '<button type="button" class="admin-del" data-del="socials" data-i="' + i + '">' +
              '<i class="fa-solid fa-trash"></i></button></div>' +
              '<div class="admin-grid">' +
                Admin.inp("socials." + i + ".label", "Label", s.label) +
                Admin.inp("socials." + i + ".url", "URL", s.url) +
                Admin.inp("socials." + i + ".icon", "Icon class", s.icon) +
              "</div></div>"
            );
          }).join("") +
        "</div>" +
        '<button type="button" class="btn btn-sm" data-add="socials"><i class="fa-solid fa-plus"></i> Add social link</button>' +
        "</div>"
      );
    },

    tplSeo: function (d) {
      var s = d.seo || {};
      return (
        '<div class="admin-panel"><h2>SEO manager</h2>' +
        '<p class="admin-hint">Titles and descriptions for search engines and social preview cards. ' +
        "Keep titles under 60 characters and descriptions under 160.</p>" +
        '<div class="admin-grid">' +
          this.inp("seo.title", "Homepage title", s.title, "textarea") +
          this.inp("seo.description", "Meta description", s.description, "textarea") +
          this.inp("seo.keywords", "Keywords", s.keywords, "textarea") +
          this.inp("seo.ogImage", "Social share image", s.ogImage) +
          this.inp("seo.favicon", "Favicon path", s.favicon) +
          this.inp("seo.twitterHandle", "Twitter handle", s.twitterHandle) +
        "</div>" +
        '<div class="admin-note"><b>Per-page SEO</b> is set in each HTML file\'s &lt;head&gt;. ' +
        "The values above drive the homepage and the social preview image used site-wide.</div>" +
        "</div>"
      );
    },

    tplTracking: function (d) {
      var t = d.tracking || {};
      return (
        '<div class="admin-panel"><h2>Tracking &amp; pixels</h2>' +
        '<p class="admin-hint">Meta Pixel is pre-filled and active. Add the others only if you have the IDs — ' +
        "each script is injected only when its field is filled.</p>" +
        '<div class="admin-grid">' +
          this.inp("tracking.metaPixelId", "Meta Pixel ID", t.metaPixelId) +
          this.inp("tracking.googleTagId", "Google tag ID (GA4 / Ads)", t.googleTagId) +
          this.inp("tracking.tiktokPixelId", "TikTok Pixel ID", t.tiktokPixelId) +
          this.inp("tracking.linkedinPartnerId", "LinkedIn Partner ID", t.linkedinPartnerId) +
        "</div>" +
        '<div class="admin-note"><b>Events fired automatically:</b><br>' +
        "• <code>Lead</code> — quote or enquiry form submitted<br>" +
        "• <code>Contact</code> — WhatsApp, phone or email link clicked<br>" +
        "• <code>ViewContent</code> — portfolio case study opened</div>" +
        "</div>"
      );
    },

    tplAccount: function () {
      return (
        '<div class="admin-panel"><h2>Account</h2>' +
        '<p class="admin-hint">This dashboard runs entirely in your browser. The password below is stored ' +
        "in this browser only — it is a convenience gate, not server-side security.</p>" +
        '<form id="passForm" class="admin-form">' +
          '<label class="field"><span>New password</span>' +
          '<input type="password" id="newPass" minlength="8" placeholder="At least 8 characters" required></label>' +
          '<button class="btn btn-sm" type="submit">Update password</button>' +
        "</form>" +
        '<div class="admin-note"><b>Publishing workflow</b><br>' +
        "1. Edit anything in the tabs on the left.<br>" +
        "2. Click <b>Save &amp; Preview Live</b> — the site updates instantly in this browser.<br>" +
        "3. Click <b>Export data.json</b> and upload the file to your GitHub repository.<br>" +
        "4. GitHub Pages redeploys in about a minute and every visitor sees the change.</div>" +
        "</div>"
      );
    },

    inp: function (path, label, value, type) {
      var id = "f_" + path.replace(/\./g, "_");
      var v = value == null ? "" : value;
      var helper = "";
      if (/^hero\.image$/.test(path)) helper = "Recommended: 1920×1080px (16:9) WebP, max 800KB";
      else if (/^services\.\d+\.image$/.test(path)) helper = "Recommended: 1200×750px (8:5) WebP, max 500KB";
      else if (/^portfolio\.\d+\.image$/.test(path)) helper = "Recommended: 1200×800px (3:2) WebP, max 500KB";
      else if (/^team\.\d+\.image$/.test(path)) helper = "Recommended: 800×800px (1:1) WebP/PNG, max 500KB";
      else if (path === "site.logo") helper = "Recommended: 1000×680px transparent PNG or SVG, max 300KB";
      else if (path === "seo.ogImage") helper = "Recommended: 1200×630px (1.91:1) WebP/JPG, max 500KB";
      else if (path === "seo.favicon") helper = "Recommended: 512×512px (1:1) PNG, max 100KB";
      var helperHtml = helper ? '<small class="admin-field-help">' + esc(helper) + '</small>' : '';
      if (type === "textarea") {
        return '<label class="field field-full"><span>' + esc(label) + "</span>" +
          '<textarea id="' + id + '" data-path="' + esc(path) + '" rows="3">' + esc(v) + "</textarea>" + helperHtml + "</label>";
      }
      if (type === "color") {
        return '<label class="field"><span>' + esc(label) + "</span>" +
          '<input type="color" id="' + id + '" data-path="' + esc(path) + '" value="' + esc(v || "#000000") + '"></label>';
      }
      return '<label class="field"><span>' + esc(label) + "</span>" +
        '<input type="' + (type || "text") + '" id="' + id + '" data-path="' + esc(path) + '" value="' + esc(v) + '">' + helperHtml + '</label>';
    },

    wireTab: function () {
      var self = this;

      /* Add item */
      $$("[data-add]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var key = btn.getAttribute("data-add");
          self.collect();
          var blank = {
            services: { title: "New service", desc: "", price: "", image: "", icon: "fa-solid fa-star", features: [] },
            portfolio: { title: "New project", category: "Websites", client: "", desc: "", image: "", link: "", tags: [] },
            team: { name: "New team member", role: "", bio: "", image: "", socials: {} },
            testimonials: { name: "New client", role: "", quote: "", photo: "", rating: 5 },
            faq: { q: "New question", a: "" },
            pricing: { name: "New package", price: "", desc: "", link: "contact.html" },
            socials: { label: "New link", icon: "fa-solid fa-link", url: "" }
          }[key];
          if (!blank) return;
          self.draft[key] = self.draft[key] || [];
          self.draft[key].push(blank);
          self.renderTab();
        });
      });

      /* Delete item */
      $$("[data-del]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var key = btn.getAttribute("data-del");
          var i = parseInt(btn.getAttribute("data-i"), 10);
          if (!confirm("Delete this item?")) return;
          self.collect();
          self.draft[key].splice(i, 1);
          self.renderTab();
        });
      });
    },

    /* Read every input back into the draft */
    collect: function () {
      var d = this.draft;
      $$("[data-path]").forEach(function (el) {
        var path = el.getAttribute("data-path").split(".");
        var val = el.value;
        var cur = d;
        for (var i = 0; i < path.length - 1; i++) {
          var k = path[i];
          if (cur[k] == null) cur[k] = /^\d+$/.test(path[i + 1]) ? [] : {};
          cur = cur[k];
        }
        var last = path[path.length - 1];
        if (el.type === "number") val = parseFloat(val) || 0;
        cur[last] = val;
      });
    }
  };
  UMC.Admin = Admin;

  /* ========================================================================
     7. BOOT
     ====================================================================== */
  function boot() {
    var page = document.body.getAttribute("data-page");

    loadData().then(function (d) {
      if (d) {
        Tracking.init(d);
        if (page === "admin") {
          Admin.boot();
        } else {
          renderAll(d);
        }
      } else if (page === "admin") {
        Admin.boot();
      }
    });

    bootChrome();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
