/* ==========================================================================
   Urban Mark Creatives — art.js
   Lightweight interactive canvas engine. No libraries.
   - Particle constellation fields that react to the cursor
   - Scroll reveal, animated counters, 3D card tilt, click sparkle
   All effects respect prefers-reduced-motion and pause when off-screen.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasHover = window.matchMedia("(hover: hover)").matches;

  /* ------------------------------------------------------------------------
     1. PARTICLE FIELD ENGINE
     One engine, many canvases. Each canvas gets its own field config.
     ---------------------------------------------------------------------- */
  function ParticleField(canvas, opts) {
    var ctx = canvas.getContext("2d");
    if (!ctx) return null;

    var cfg = {
      count: 46,
      linkDist: 130,
      speed: 0.28,
      dotColor: "232,102,26",
      lineColor: "255,255,255",
      lineAlpha: 0.16,
      dotAlpha: 0.75,
      dotSize: 1.9,
      repel: 110,
      attract: 0.02
    };
    for (var k in opts) if (Object.prototype.hasOwnProperty.call(opts, k)) cfg[k] = opts[k];

    var W = 0, H = 0, dpr = 1;
    var particles = [];
    var pointer = { x: -9999, y: -9999, active: false };
    var running = false;
    var rafId = null;
    var visible = true;

    function resize() {
      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function build() {
      var target = Math.max(14, Math.min(cfg.count, Math.round((W * H) / 16000)));
      particles = [];
      for (var i = 0; i < target; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * cfg.speed,
          vy: (Math.random() - 0.5) * cfg.speed,
          r: cfg.dotSize * (0.6 + Math.random() * 0.8)
        });
      }
    }

    function step() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        /* Cursor interaction: gentle repulsion inside the radius */
        if (pointer.active) {
          var dx = p.x - pointer.x;
          var dy = p.y - pointer.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < cfg.repel && dist > 0.01) {
            var force = (1 - dist / cfg.repel) * 0.9;
            p.vx += (dx / dist) * force * 0.12;
            p.vy += (dy / dist) * force * 0.12;
          }
        }

        /* Damp back toward base speed so it never runs away */
        p.vx *= 0.985;
        p.vy *= 0.985;
        var sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (sp < cfg.speed * 0.35) {
          p.vx += (Math.random() - 0.5) * 0.02;
          p.vy += (Math.random() - 0.5) * 0.02;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        if (p.y > H + 20) p.y = -20;

        /* Links */
        for (var j = i + 1; j < particles.length; j++) {
          var q = particles[j];
          var lx = p.x - q.x;
          var ly = p.y - q.y;
          var d2 = lx * lx + ly * ly;
          if (d2 < cfg.linkDist * cfg.linkDist) {
            var d = Math.sqrt(d2);
            var a = cfg.lineAlpha * (1 - d / cfg.linkDist);
            ctx.strokeStyle = "rgba(" + cfg.lineColor + "," + a.toFixed(3) + ")";
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        /* Cursor link highlight */
        if (pointer.active) {
          var px = p.x - pointer.x;
          var py = p.y - pointer.y;
          var pd = Math.sqrt(px * px + py * py);
          if (pd < cfg.repel * 1.5) {
            var pa = 0.34 * (1 - pd / (cfg.repel * 1.5));
            ctx.strokeStyle = "rgba(" + cfg.dotColor + "," + pa.toFixed(3) + ")";
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }

        /* Dot */
        ctx.fillStyle = "rgba(" + cfg.dotColor + "," + cfg.dotAlpha + ")";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(step);
    }

    function start() {
      if (running || reduceMotion) return;
      running = true;
      rafId = requestAnimationFrame(step);
    }

    function stop() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    }

    /* Pointer tracking, scoped to the canvas' parent section */
    var host = canvas.parentElement || canvas;
    host.addEventListener("pointermove", function (e) {
      var rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    }, { passive: true });
    host.addEventListener("pointerleave", function () {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    }, { passive: true });

    /* Pause when scrolled out of view */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) start(); else stop();
      }, { threshold: 0.02 }).observe(canvas);
    } else {
      start();
    }

    /* Resize handling, debounced */
    var rt = null;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(resize, 180);
    }, { passive: true });

    resize();
    if (visible) start();

    return { start: start, stop: stop, resize: resize };
  }

  /* Boot every canvas that declares a data-field config */
  function bootFields() {
    var canvases = document.querySelectorAll("canvas[data-field]");
    Array.prototype.forEach.call(canvases, function (c) {
      var preset = c.getAttribute("data-field");
      var opts = {};
      if (preset === "hero") {
        opts = { count: 58, linkDist: 150, speed: 0.3, dotAlpha: 0.8, lineAlpha: 0.2, repel: 130 };
      } else if (preset === "services") {
        /* Light section: navy links read on white, orange dots keep the brand */
        opts = { count: 34, linkDist: 120, speed: 0.2, dotAlpha: 0.55, lineAlpha: 0.13,
                 lineColor: "10,29,68", repel: 100 };
      } else if (preset === "portfolio") {
        opts = { count: 40, linkDist: 135, speed: 0.24, dotAlpha: 0.6, lineAlpha: 0.15,
                 lineColor: "10,29,68", repel: 115 };
      }
      ParticleField(c, opts);
    });
  }

  /* ------------------------------------------------------------------------
     2. SCROLL REVEAL
     ---------------------------------------------------------------------- */
  function bootReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(els, function (el) { el.classList.add("in"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------------
     3. ANIMATED COUNTERS
     ---------------------------------------------------------------------- */
  function bootCounters() {
    var nodes = document.querySelectorAll("[data-count]");
    if (!nodes.length) return;

    function animate(el) {
      var end = parseFloat(el.getAttribute("data-count"));
      var pre = el.getAttribute("data-pre") || "";
      var suf = el.getAttribute("data-suf") || "";
      if (isNaN(end)) return;
      if (reduceMotion) { el.textContent = pre + end + suf; return; }

      var start = null;
      var dur = 1500;
      function frame(t) {
        if (start === null) start = t;
        var p = Math.min(1, (t - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = pre + Math.round(end * eased) + suf;
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(nodes, animate);
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    Array.prototype.forEach.call(nodes, function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------------
     4. 3D CARD TILT (portfolio + service cards)
     ---------------------------------------------------------------------- */
  function bootTilt() {
    if (reduceMotion || !hasHover) return;

    var cards = document.querySelectorAll("[data-tilt]");
    Array.prototype.forEach.call(cards, function (card) {
      var raf = null;
      var target = { rx: 0, ry: 0 };
      var current = { rx: 0, ry: 0 };

      function loop() {
        current.rx += (target.rx - current.rx) * 0.14;
        current.ry += (target.ry - current.ry) * 0.14;
        card.style.transform =
          "perspective(1000px) rotateX(" + current.rx.toFixed(2) + "deg) rotateY(" +
          current.ry.toFixed(2) + "deg) translateY(-6px)";
        if (Math.abs(target.rx - current.rx) > 0.01 || Math.abs(target.ry - current.ry) > 0.01) {
          raf = requestAnimationFrame(loop);
        } else {
          raf = null;
        }
      }

      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        target.ry = px * 7;
        target.rx = -py * 7;
        if (!raf) raf = requestAnimationFrame(loop);
      }, { passive: true });

      card.addEventListener("pointerleave", function () {
        target.rx = 0;
        target.ry = 0;
        if (!raf) raf = requestAnimationFrame(loop);
      }, { passive: true });
    });
  }

  /* ------------------------------------------------------------------------
     5. CLICK SPARKLE (subtle, brand-coloured)
     ---------------------------------------------------------------------- */
  function bootSparkle() {
    if (reduceMotion) return;
    var colors = ["#e8661a", "#ff9a4d", "#1fb5b0", "#ffffff"];

    document.addEventListener("click", function (e) {
      /* Skip on form controls and links to avoid visual noise */
      if (e.target.closest("input, textarea, select, .no-sparkle")) return;
      var n = 10;
      for (var i = 0; i < n; i++) {
        var s = document.createElement("i");
        var angle = (Math.PI * 2 * i) / n + Math.random() * 0.5;
        var dist = 26 + Math.random() * 46;
        s.className = "spark";
        s.style.cssText =
          "position:fixed;left:" + e.clientX + "px;top:" + e.clientY + "px;" +
          "width:5px;height:5px;border-radius:50%;pointer-events:none;z-index:9999;" +
          "background:" + colors[i % colors.length] + ";" +
          "--tx:" + (Math.cos(angle) * dist).toFixed(1) + "px;" +
          "--ty:" + (Math.sin(angle) * dist).toFixed(1) + "px;" +
          "animation:sparkFly .62s cubic-bezier(.16,1,.3,1) forwards;";
        document.body.appendChild(s);
        (function (node) {
          node.addEventListener("animationend", function () { node.remove(); });
        })(s);
      }
    });
  }

  /* Inject the sparkle keyframes once */
  function injectSparkKeyframes() {
    if (document.getElementById("spark-kf")) return;
    var st = document.createElement("style");
    st.id = "spark-kf";
    st.textContent =
      "@keyframes sparkFly{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}" +
      "100%{opacity:0;transform:translate(calc(-50% + var(--tx)),calc(-50% + var(--ty))) scale(.2)}}";
    document.head.appendChild(st);
  }

  /* ------------------------------------------------------------------------
     6. BOOT
     ---------------------------------------------------------------------- */
  function boot() {
    injectSparkKeyframes();
    bootFields();
    bootReveal();
    bootCounters();
    bootTilt();
    bootSparkle();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  /* Expose the engine so app.js can re-init after dynamic rendering */
  window.UMCArt = {
    boot: boot,
    bootReveal: bootReveal,
    bootTilt: bootTilt,
    bootCounters: bootCounters,
    ParticleField: ParticleField
  };
})();
