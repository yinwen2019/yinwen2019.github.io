---
permalink: /
title: "Home"
excerpt: "Wen Yin's research in affective computing, unified multimodal understanding and generation, and empathetic human–AI interaction."
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

<div id="about-me" class="intro" markdown="1">
{% include_relative includes/intro.md %}
</div>

{% include recent-news.html %}

<section class="home-section" aria-labelledby="selected-publications">
  <div class="section-heading">
    <h2 id="selected-publications">Selected Publications</h2>
    <a class="section-link" href="{{ '/publications/' | relative_url }}">View all publications <span aria-hidden="true">&rarr;</span></a>
  </div>
  {% assign selected_papers = site.data.publications | where: 'selected', true | sort: 'selected_order' %}
  {% for paper in selected_papers %}
    {% include publication.html paper=paper featured=true %}
  {% endfor %}
</section>
