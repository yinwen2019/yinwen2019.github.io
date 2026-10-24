# Bing 收录排查

检查日期：2026-10-24。站点：https://yinwen2019.github.io/

## 线上检查结果

- 首页、`/robots.txt` 和 `/sitemap.xml` 均返回 HTTP 200。
- 首页规范地址为 `https://yinwen2019.github.io/`。
- 首页未设置禁止收录的 robots 标签，响应头也未发现 X-Robots-Tag。
- robots.txt 提供了 sitemap 地址，没有禁止 Bingbot 抓取的规则。
- 首页已有 `msvalidate.01` 验证标签。这只说明部署了一个验证字符串，无法证明当前 Bing 账号已经验证成功或页面已经收录。
- 使用 Bingbot 的 User-Agent 请求首页，返回 HTTP 200，内容与普通请求一致。这不能替代真正的 Bingbot 抓取测试。
- 线上 sitemap 包含首页，也包含 `_pages/includes/` 下的内容片段及 `docs/README-zh/`。其中 `pub_short` 是模板遗留的其他作者论文列表，不应作为本人的独立页面参与收录。
- 线上网站与当前本地改版不同。本地修改发布后，线上结果才会变化。

## 本地修复

- 为 `_pages/includes/` 设置 `sitemap: false`，避免内容片段进入网站地图。
- 为这些片段的独立页面输出 `noindex, follow`。它们被嵌入正式页面时不会携带该标签，不影响首页及其他正式页面的收录。
- 为正式页面输出 HTML description，并让 Open Graph description 同样使用已有的页面摘要或站点简介。
- Bing 后台明确提示原验证值与当前账号要求的值不同；已将 `bing_site_verification` 更新为用户提供的 `4B202EE60D3723AA47FB1428D3258764`。模板会在首页及其他正式页面的 `<head>` 中输出该值，部署后需要在 Bing 再次点击 Verify。
- 保留规范地址和 sitemap 插件；现有配置已将 `docs/` 排除在发布内容之外。

本地构建与检查已通过：sitemap 仅保留首页、Publications、Experience 和 Honors & Talks 四个正式页面；八个片段的独立页面均输出 `noindex, follow`；四个正式页面的规范地址、摘要及 Bing 验证标签正常，正文未改变（忽略构建时自动变化的脚本缓存时间戳）。`git diff --check` 通过。

## 必须在 Bing 站长工具确认的事项

1. 登录 [Bing Webmaster Tools](https://www.bing.com/webmasters/)，选择或添加 `https://yinwen2019.github.io/`。如果已经在 Google Search Console 验证过这个站点，可以选择从那里导入；Google 能搜到网站本身不代表已完成 Search Console 验证。
2. 核对站点所有权验证状态。如果 Bing 要求的新 meta 验证值与 `_config.yml` 的 `bing_site_verification` 不同，使用当前账号提供的值，部署后再次验证。GitHub Pages 子域名适合使用 meta 标签或验证文件，不需要操作 github.io 的 DNS。
3. 在 URL Inspection 中检查首页，并运行 Live URL 测试。记录索引状态、上次抓取时间以及具体错误。它能区分未发现、抓取失败、已抓取未收录和已收录等情况。
4. 本地修复发布后，在 Sitemaps 中提交 `https://yinwen2019.github.io/sitemap.xml`，并为首页请求索引。
5. 站长工具若显示已收录，但搜索姓名仍找不到，继续检查 Search Performance 中的查询词与展现情况；这时应按排名和查询匹配问题处理。
6. 可以先观察一到两周。此时间只是复查窗口，不是 Bing 的收录承诺。若持续未收录且 Live URL 抓取正常，根据站长工具给出的原因修复，必要时通过其支持渠道提交首页地址和诊断结果。无需每日反复提交同一 URL。

正式的 GitHub 个人资料、学校或实验室成员页、论文项目页可以自然链接到该主页，帮助发现和确认身份。不要购买垃圾外链或堆砌关键词。IndexNow 可用于后续更新通知，但不保证收录，也不是这次排查的前置条件。

## 官方参考

- [URL Inspection](https://www.bing.com/webmasters/help/URL-Inspection-55a30305)
- [Add and Verify Site](https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b)
- [Sitemaps](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed)
- [URL Submission](https://www.bing.com/webmasters/help/URL-Submission-62f2860b)
- [Webmaster Support](https://www.bing.com/webmasters/help/webmaster-support-24ab5ebf)
