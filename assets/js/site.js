(function () {
  "use strict";

  var shell = document.getElementById("main");
  var viewport = document.getElementById("page-content");
  var nav = Array.from(document.querySelectorAll(".primary-nav a[href]"));
  if (!shell || !viewport || !nav.length) return;

  var status = document.getElementById("page-status");
  var routes = nav.map(function (link) { return new URL(link.href).pathname; });
  var homePath = routes[0];
  var cache = new Map();
  var positions = new Map();
  var current = new URL(window.location.href);
  var inFlight = new Map();
  var requestNumber = 0;
  var scrollFrame = 0;
  var pageAnimations = [];
  var outgoingOverlay;
  var navigation = document.querySelector(".primary-nav");
  var indicator = document.createElement("span");
  var indicatorAnimation;
  var indicatorPath;
  var indicatorFrame = 0;
  indicator.className = "primary-nav__indicator";
  indicator.setAttribute("aria-hidden", "true");
  navigation.prepend(indicator);
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var headSelector = 'link[rel="canonical"], meta[property="og:title"], meta[property="og:description"], meta[property="og:url"], meta[name="description"], meta[name="twitter:title"], meta[name="twitter:description"], meta[name="twitter:url"]';
  var legacySections = {
    "#-publications": "/publications/", "#publications": "/publications/",
    "#-internships": "/experience/#internships", "#internships": "/experience/#internships",
    "#-educations": "/experience/#education", "#educations": "/experience/#education",
    "#-honors-and-awards": "/honors-talks/#honors-and-awards", "#honors-and-awards": "/honors-talks/#honors-and-awards",
    "#-invited-talks": "/honors-talks/#invited-talks", "#invited-talks": "/honors-talks/#invited-talks",
    "#-news": "/#recent-news", "#news": "/#recent-news"
  };

  function key(url) { return url.pathname + url.search; }

  function destination(url) {
    if (url.pathname === homePath && legacySections[url.hash]) {
      return new URL(shell.dataset.baseurl + legacySections[url.hash], url.origin);
    }
    return url;
  }

  function snapshot(doc) {
    var article = doc.querySelector("#page-content > .page");
    if (!article) throw new Error("Page content unavailable");
    return {
      article: article.cloneNode(true),
      title: doc.title,
      head: Array.from(doc.querySelectorAll(headSelector)).map(function (node) { return node.cloneNode(true); })
    };
  }

  function moveIndicator(path, animate) {
    var link = nav.find(function (item) { return new URL(item.href).pathname === path; });
    if (!link) return;
    indicatorPath = path;
    var previous = indicator.getBoundingClientRect();
    var bounds = navigation.getBoundingClientRect();
    var target = link.getBoundingClientRect();
    var x = target.left - bounds.left;
    var y = target.top - bounds.top;
    var end = "translate3d(" + x + "px," + y + "px,0) scale(1,1)";
    if (indicatorAnimation) indicatorAnimation.cancel();
    indicator.style.width = target.width + "px";
    indicator.style.height = target.height + "px";
    indicator.style.transform = end;
    navigation.classList.add("primary-nav--motion");
    var distance = Math.abs(previous.left - target.left) + Math.abs(previous.top - target.top) + Math.abs(previous.width - target.width);
    if (animate && !reducedMotion.matches && indicator.animate && previous.width && distance > 0.5) {
      indicatorAnimation = indicator.animate([
        { transform: "translate3d(" + (previous.left - bounds.left) + "px," + (previous.top - bounds.top) + "px,0) scale(" + (previous.width / target.width) + "," + (previous.height / target.height) + ")" },
        { transform: end }
      ], { duration: 280, easing: "cubic-bezier(.16,1,.3,1)" });
      indicatorAnimation.finished.catch(function () {});
    }
  }

  function syncIndicator() {
    if (indicatorFrame) cancelAnimationFrame(indicatorFrame);
    indicatorFrame = requestAnimationFrame(function () {
      indicatorFrame = 0;
      var pending = nav.find(function (link) { return link.hasAttribute("data-pending"); });
      moveIndicator(pending ? new URL(pending.href).pathname : current.pathname, false);
    });
  }

  function stopTransition() {
    pageAnimations.forEach(function (animation) { animation.cancel(); });
    pageAnimations = [];
    if (outgoingOverlay) outgoingOverlay.remove();
    outgoingOverlay = null;
  }

  function captureOutgoing() {
    var article = viewport.firstElementChild;
    if (reducedMotion.matches || !article || !article.animate) return null;
    var frame = viewport.getBoundingClientRect();
    var shellFrame = shell.getBoundingClientRect();
    var content = article.getBoundingClientRect();
    var overlay = document.createElement("div");
    overlay.className = "page-transition-outgoing";
    overlay.setAttribute("aria-hidden", "true");
    overlay.setAttribute("inert", "");
    overlay.style.left = (frame.left - shellFrame.left) + "px";
    overlay.style.top = (frame.top - shellFrame.top) + "px";
    overlay.style.width = viewport.clientWidth + "px";
    overlay.style.height = viewport.clientHeight + "px";
    var clone = article.cloneNode(true);
    clone.removeAttribute("id");
    clone.querySelectorAll("[id]").forEach(function (node) { node.removeAttribute("id"); });
    clone.style.position = "absolute";
    clone.style.left = (content.left - frame.left) + "px";
    clone.style.top = (content.top - frame.top) + "px";
    clone.style.width = content.width + "px";
    overlay.appendChild(clone);
    shell.appendChild(overlay);
    outgoingOverlay = overlay;
    return overlay;
  }

  function transitionContent(overlay, direction) {
    var article = viewport.firstElementChild;
    if (reducedMotion.matches || !article.animate) {
      if (overlay) overlay.remove();
      outgoingOverlay = null;
      return;
    }
    var incoming = article.animate([
      { opacity: 0, transform: "translate3d(" + (18 * direction) + "px,0,0)" },
      { opacity: 1, transform: "translate3d(0,0,0)" }
    ], { duration: 300, easing: "cubic-bezier(.16,1,.3,1)" });
    pageAnimations = [incoming];
    if (overlay) {
      var outgoing = overlay.animate([
        { opacity: 1, transform: "translate3d(0,0,0)" },
        { opacity: 0, transform: "translate3d(" + (-10 * direction) + "px,0,0)" }
      ], { duration: 140, easing: "cubic-bezier(.4,0,1,1)" });
      pageAnimations.push(outgoing);
      outgoing.finished.catch(function () {}).then(function () {
        overlay.remove();
        if (outgoingOverlay === overlay) outgoingOverlay = null;
      });
    }
    incoming.finished.catch(function () {}).then(function () {
      if (pageAnimations[0] === incoming) pageAnimations = [];
    });
  }

  function loadPage(url) {
    var routeKey = key(url);
    if (cache.has(routeKey)) return Promise.resolve(cache.get(routeKey));
    if (inFlight.has(routeKey)) return inFlight.get(routeKey);
    var request = fetch(url.pathname + url.search, {
      credentials: "same-origin",
      cache: "no-cache",
      headers: { "Accept": "text/html" }
    }).then(function (response) {
      if (!response.ok || new URL(response.url).origin !== url.origin) throw new Error("Page unavailable");
      return response.text();
    }).then(function (html) {
      var page = snapshot(new DOMParser().parseFromString(html, "text/html"));
      cache.set(routeKey, page);
      return page;
    }).finally(function () { inFlight.delete(routeKey); });
    inFlight.set(routeKey, request);
    return request;
  }

  function canPrefetch() {
    var connection = navigator.connection;
    return !connection || (!connection.saveData && !/slow-2g|2g|3g/.test(connection.effectiveType || ""));
  }

  function prefetch(url) {
    if (canPrefetch() && key(url) !== key(current)) loadPage(url).catch(function () {});
  }

  function enhance(root) {
    root.querySelectorAll("a[href]").forEach(function (link) {
      if (/^https?:$/.test(link.protocol) && link.host !== window.location.host) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    });
    var $ = window.jQuery;
    if ($ && $.fn.magnificPopup) {
      $(root).find(".publication__figure").magnificPopup({
        type: "image",
        gallery: { enabled: true, navigateByImgClick: true, preload: [0, 1] },
        image: { tError: 'The figure could not be loaded. <a href="%url%">Open the image</a>.' },
        closeOnContentClick: false,
        midClick: false,
        removalDelay: 0
      });
    }
    if ($ && $.fn.fitVids) $(root).fitVids();
    if (window.MathJax && window.MathJax.Hub) {
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, root]);
    }
  }

  function savePosition() {
    positions.set(key(current), viewport.scrollTop);
    // popstate already points location at the destination entry.
    if (window.location.href === current.href) {
      history.replaceState(Object.assign({}, history.state, { profileScroll: viewport.scrollTop }), "", current.href);
    }
  }

  function positionFor(url, restored) {
    if (Number.isFinite(restored)) return restored;
    if (url.hash) {
      var id;
      try { id = decodeURIComponent(url.hash.slice(1)); } catch (_) { return 0; }
      var target = document.getElementById(id);
      if (target && viewport.contains(target)) {
        return viewport.scrollTop + target.getBoundingClientRect().top - viewport.getBoundingClientRect().top - 28;
      }
      return 0;
    }
    return positions.get(key(url)) || 0;
  }

  function setPending(url) {
    viewport.setAttribute("aria-busy", "true");
    status.textContent = "Loading page…";
    navigation.setAttribute("aria-busy", "true");
    nav.forEach(function (link) {
      link.toggleAttribute("data-pending", new URL(link.href).pathname === url.pathname);
    });
    if (indicatorPath !== url.pathname) moveIndicator(url.pathname, true);
  }

  function clearPending() {
    viewport.removeAttribute("aria-busy");
    navigation.removeAttribute("aria-busy");
    nav.forEach(function (link) { link.removeAttribute("data-pending"); });
  }

  function updateNav(url) {
    nav.forEach(function (link) {
      if (new URL(link.href).pathname === url.pathname) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    if (indicatorPath !== url.pathname) moveIndicator(url.pathname, true);
  }

  async function navigate(input, options) {
    options = options || {};
    var url = destination(input);
    var number = ++requestNumber;
    stopTransition();
    savePosition();

    if (key(url) === key(current)) {
      if (options.pop || options.replace) history.replaceState(history.state, "", url.href);
      else if (url.href !== current.href) history.pushState({}, "", url.href);
      current = url;
      clearPending();
      updateNav(url);
      status.textContent = "";
      viewport.scrollTop = positionFor(url, options.scroll);
      savePosition();
      if (options.focus) viewport.focus({ preventScroll: true });
      return;
    }

    cache.set(key(current), snapshot(document));
    setPending(url);
    try {
      var page = await loadPage(url);
      if (number !== requestNumber) return;

      var direction = routes.indexOf(url.pathname) < routes.indexOf(current.pathname) ? -1 : 1;
      var moveFocus = options.focus || viewport.contains(document.activeElement);
      var overlay = captureOutgoing();
      if (options.pop || options.replace) history.replaceState(history.state, "", url.href);
      else history.pushState({}, "", url.href);
      current = url;
      viewport.replaceChildren(document.importNode(page.article, true));
      shell.dataset.home = String(url.pathname === homePath);
      document.title = page.title;
      document.querySelectorAll(headSelector).forEach(function (node) { node.remove(); });
      page.head.forEach(function (node) { document.head.appendChild(node.cloneNode(true)); });
      updateNav(url);
      enhance(viewport);
      viewport.scrollTop = positionFor(url, options.scroll);
      savePosition();
      if (moveFocus) viewport.focus({ preventScroll: true });
      transitionContent(overlay, direction);
      clearPending();
      status.textContent = document.getElementById("page-title").textContent + " page loaded.";
      document.dispatchEvent(new CustomEvent("site:pagechange", { detail: { url: url.href } }));
    } catch (error) {
      if (number !== requestNumber) return;
      // Static Jekyll URLs remain the fallback when enhancement cannot load.
      if (options.pop || options.replace) window.location.replace(url.href);
      else window.location.assign(url.href);
    }
  }

  enhance(document);
  cache.set(key(current), snapshot(document));
  history.scrollRestoration = "manual";
  moveIndicator(current.pathname, false);
  nav.forEach(function (link) {
    function prepare() { prefetch(new URL(link.href)); }
    link.addEventListener("pointerenter", prepare);
    link.addEventListener("pointerdown", prepare, { passive: true });
    link.addEventListener("focus", prepare);
  });
  if (window.ResizeObserver) new ResizeObserver(syncIndicator).observe(navigation);
  else window.addEventListener("resize", syncIndicator);
  if (document.fonts) document.fonts.ready.then(syncIndicator);
  if (reducedMotion.addEventListener) reducedMotion.addEventListener("change", function () {
    stopTransition();
    syncIndicator();
  });
  function warmNavigation() {
    if (!canPrefetch() || document.hidden) return;
    routes.reduce(function (previous, path) {
      return previous.then(function () {
        var url = new URL(path, window.location.origin);
        if (key(url) !== key(current)) return loadPage(url).catch(function () {});
      });
    }, Promise.resolve());
  }
  if (window.requestIdleCallback) window.requestIdleCallback(warmNavigation, { timeout: 2000 });
  else window.setTimeout(warmNavigation, 1200);

  document.addEventListener("click", function (event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var link = event.target.closest("a[href]");
    if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
    if (link.classList.contains("skip-link")) {
      event.preventDefault();
      viewport.focus({ preventScroll: true });
      return;
    }
    var url = destination(new URL(link.href));
    if (url.origin !== window.location.origin || routes.indexOf(url.pathname) === -1) return;
    event.preventDefault();
    navigate(url, { focus: event.detail === 0 });
  });

  viewport.addEventListener("scroll", function () {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(function () { scrollFrame = 0; savePosition(); });
  }, { passive: true });
  window.addEventListener("popstate", function (event) {
    navigate(new URL(window.location.href), { pop: true, scroll: event.state && event.state.profileScroll });
  });
  window.addEventListener("hashchange", function () {
    // History traversal also fires hashchange; popstate owns that request.
    if (window.location.href !== current.href && !viewport.hasAttribute("aria-busy")) {
      navigate(new URL(window.location.href), { replace: true });
    }
  });
  window.addEventListener("pagehide", savePosition);

  var initial = destination(current);
  if (initial.href !== current.href) navigate(initial, { replace: true });
  else {
    var initialScroll = history.state && history.state.profileScroll;
    var placeInitial = function () {
      if (!requestNumber) {
        viewport.scrollTop = positionFor(current, initialScroll);
        savePosition();
      }
    };
    if (document.fonts) document.fonts.ready.then(placeInitial);
    else requestAnimationFrame(placeInitial);
  }
}());
