// 张杰文个人主页 - 交互脚本
(function () {
    "use strict";

    // ===== 导航栏滚动效果 =====
    var navbar = document.getElementById("navbar");
    var backTop = document.getElementById("backTop");
    var navLinks = document.querySelectorAll(".nav-links a");
    var sections = ["hero", "about", "hobbies", "gallery", "contact"]
        .map(function (id) { return document.getElementById(id); })
        .filter(Boolean);

    function onScroll() {
        var y = window.scrollY;
        // 导航栏阴影
        if (navbar) navbar.classList.toggle("scrolled", y > 10);
        // 返回顶部
        if (backTop) backTop.classList.toggle("show", y > 600);
        // 当前激活的导航
        var current = sections[0] && sections[0].id;
        for (var i = 0; i < sections.length; i++) {
            if (sections[i].offsetTop - 120 <= y) current = sections[i].id;
        }
        navLinks.forEach(function (link) {
            var href = link.getAttribute("href") || "";
            link.classList.toggle("active", href === "#" + current);
        });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // ===== 移动端菜单切换 =====
    var navToggle = document.getElementById("navToggle");
    var navLinksEl = document.getElementById("navLinks");
    if (navToggle && navLinksEl) {
        navToggle.addEventListener("click", function () {
            navToggle.classList.toggle("open");
            navLinksEl.classList.toggle("open");
        });
        navLinksEl.querySelectorAll("a").forEach(function (a) {
            a.addEventListener("click", function () {
                navToggle.classList.remove("open");
                navLinksEl.classList.remove("open");
            });
        });
    }

    // ===== 滚动渐入（IntersectionObserver） =====
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    // 技能进度条动画
                    var fills = entry.target.querySelectorAll(".skill-fill");
                    fills.forEach(function (fill) {
                        var v = fill.getAttribute("data-fill");
                        if (v) fill.style.width = v + "%";
                    });
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
        reveals.forEach(function (el) { io.observe(el); });
    } else {
        // 老浏览器降级
        reveals.forEach(function (el) { el.classList.add("visible"); });
        document.querySelectorAll(".skill-fill").forEach(function (fill) {
            var v = fill.getAttribute("data-fill");
            if (v) fill.style.width = v + "%";
        });
    }

    // ===== 返回顶部 =====
    if (backTop) {
        backTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ===== 留言表单（前端演示） =====
    var form = document.getElementById("contactForm");
    var tip = document.getElementById("formTip");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var name = form.querySelector("#name").value.trim();
            var email = form.querySelector("#email").value.trim();
            var message = form.querySelector("#message").value.trim();
            if (!name || !email || !message) {
                if (tip) {
                    tip.hidden = false;
                    tip.textContent = "⚠️ 请把表单填写完整";
                    tip.style.color = "#ff7a59";
                }
                return;
            }
            if (tip) {
                tip.hidden = false;
                tip.textContent = "✅ 留言已记录（本站为静态演示，留言仅在前端展示）";
                tip.style.color = "#2ecc71";
            }
            form.reset();
        });
    }

    // ===== 兴趣卡片轻微视差 =====
    var cards = document.querySelectorAll(".hobby-card");
    cards.forEach(function (card) {
        card.addEventListener("mousemove", function (e) {
            var rect = card.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width - 0.5;
            var y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform =
                "translateY(-6px) rotateX(" + (-y * 4) + "deg) rotateY(" + (x * 4) + "deg)";
        });
        card.addEventListener("mouseleave", function () {
            card.style.transform = "";
        });
    });

    // ===== 当前年份（footer 自适应） =====
    // 已在 HTML 中硬编码 2026，此处不修改以避免与本课程时间不符
})();
