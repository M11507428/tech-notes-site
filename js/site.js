(function () {
  "use strict";
  const articles = Array.isArray(window.ARTICLES) ? window.ARTICLES : [];
  const $ = (selector, parent = document) => parent.querySelector(selector);

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function articleUrl(article) {
    return "article.html?slug=" + encodeURIComponent(article.slug);
  }

  function makeCard(article, index) {
    const link = element("a", "article-card");
    link.href = articleUrl(article);
    link.setAttribute("aria-label", "閱讀：" + article.title);

    const top = element("div", "article-card-top");
    const icon = element("span", "article-icon", article.icon);
    icon.setAttribute("aria-hidden", "true");
    icon.style.backgroundColor = article.accent;
    icon.style.color = article.iconColor;
    top.append(icon, element("span", "article-number", String(index + 1).padStart(2, "0")));

    const category = element("span", "card-category", article.category + " / " + article.tags[0]);
    const title = element("h3", "", article.title);
    const desc = element("p", "", article.description);
    const footer = element("div", "card-footer");
    footer.append(element("span", "", "約 " + article.readTime + " 分鐘閱讀"), element("span", "card-arrow", "↗"));
    link.append(top, category, title, desc, footer);
    return link;
  }

  function initHome() {
    const grid = $("#article-grid");
    if (!grid) return;
    const search = $("#search-input");
    const count = $("#result-count");
    const empty = $("#empty-state");
    let activeCategory = "全部";
    const total = $("#article-count");
    if (total) total.textContent = String(articles.length);

    function render() {
      const keyword = search.value.trim().toLocaleLowerCase();
      const filtered = articles.filter(article => {
        const categoryMatch = activeCategory === "全部" || article.category === activeCategory;
        const text = [article.title, article.description, article.category, ...article.tags].join(" ").toLocaleLowerCase();
        return categoryMatch && text.includes(keyword);
      });
      grid.replaceChildren(...filtered.map(article => makeCard(article, articles.indexOf(article))));
      empty.hidden = filtered.length > 0;
      count.textContent = "共 " + filtered.length + " 篇";
    }

    search.addEventListener("input", render);
    document.querySelectorAll("[data-filter]").forEach(button => {
      button.addEventListener("click", () => {
        activeCategory = button.dataset.filter;
        document.querySelectorAll("[data-filter]").forEach(chip => {
          const selected = chip === button;
          chip.classList.toggle("selected", selected);
          chip.setAttribute("aria-pressed", String(selected));
        });
        render();
      });
    });
    $("#reset-search").addEventListener("click", () => {
      search.value = "";
      document.querySelector('[data-filter="全部"]').click();
      search.focus();
    });
    render();
  }

  function initArticle() {
    const root = $("#article-root");
    if (!root) return;
    const slug = new URLSearchParams(window.location.search).get("slug");
    const article = articles.find(item => item.slug === slug);
    if (!article) {
      root.replaceChildren();
      const notFound = element("div", "not-found");
      notFound.append(element("h1", "", "找不到這篇文章"), element("p", "", "連結可能有誤，或是文章已經移動。"));
      const back = element("a", "primary-button", "回到所有主題 ↗");
      back.href = "index.html#topics";
      notFound.append(back);
      root.append(notFound);
      document.title = "找不到文章｜生活科技小百科";
      return;
    }

    document.title = article.title + "｜生活科技小百科";
    const descriptionMeta = $('meta[name="description"]');
    if (descriptionMeta) descriptionMeta.content = article.description;
    $("#crumb-category").textContent = article.category;
    $("#crumb-title").textContent = article.title;

    const heading = element("header", "article-heading");
    heading.append(element("span", "article-kicker", article.category.toUpperCase() + " / TECH NOTES"));
    heading.append(element("h1", "", article.title));
    heading.append(element("p", "", article.description));
    const meta = element("div", "article-meta");
    meta.append(element("span", "", "約 " + article.readTime + " 分鐘閱讀"), element("span", "", "·"), element("span", "", article.tags.join("・")));
    heading.append(meta);

    const banner = element("div", "article-banner");
    banner.style.background = "linear-gradient(125deg," + article.accent + ",#f4f6ff)";
    const bannerIcon = element("span", "banner-icon", article.icon);
    bannerIcon.style.color = article.iconColor;
    bannerIcon.setAttribute("aria-hidden", "true");
    banner.append(bannerIcon);

    const layout = element("div", "article-layout");
    const body = element("div", "article-body");
    const summary = element("section", "article-summary");
    summary.append(element("h2", "", "這篇先記住三件事"));
    const summaryList = element("ul");
    article.highlights.forEach(item => summaryList.append(element("li", "", item)));
    summary.append(summaryList);
    body.append(summary);

    const sidebar = element("aside", "article-sidebar");
    const toc = element("nav", "toc-box");
    toc.setAttribute("aria-label", "文章段落");
    toc.append(element("h2", "", "文章目錄"));

    article.sections.forEach((section, index) => {
      const sectionNode = element("section", "article-section");
      sectionNode.id = "section-" + (index + 1);
      sectionNode.append(element("h2", "", section.heading));
      (section.paragraphs || []).forEach(paragraph => sectionNode.append(element("p", "", paragraph)));
      if (section.bullets && section.bullets.length) {
        const ul = element("ul");
        section.bullets.forEach(item => ul.append(element("li", "", item)));
        sectionNode.append(ul);
      }
      if (section.note) {
        const note = element("div", "article-note");
        note.append(element("b", "", "小提醒"), element("span", "", section.note));
        sectionNode.append(note);
      }
      body.append(sectionNode);
      const anchor = element("a", "", String(index + 1).padStart(2, "0") + "　" + section.heading);
      anchor.href = "#" + sectionNode.id;
      toc.append(anchor);
    });
    sidebar.append(toc);
    const back = element("a", "back-link", "← 回到所有主題");
    back.href = "index.html#topics";
    sidebar.append(back);
    layout.append(body, sidebar);
    root.replaceChildren(heading, banner, layout);

    const related = articles.filter(item => item.slug !== article.slug && item.category === article.category).slice(0, 2);
    const fallback = articles.filter(item => item.slug !== article.slug && !related.includes(item));
    const recommendations = [...related, ...fallback].slice(0, 3);
    $("#related-grid").replaceChildren(...recommendations.map(item => makeCard(item, articles.indexOf(item))));
    $("#more-section").hidden = false;
  }

  // 只由資料驅動內容；新增文章時不需要修改這段程式。
  initHome();
  initArticle();
})();
