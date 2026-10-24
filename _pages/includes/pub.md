<p class="page-note">&dagger; indicates the corresponding author.</p>
{% assign authorship_roles = 'first-author,corresponding-author,other' | split: ',' %}
{% for role in authorship_roles %}
  {% assign role_papers = site.data.publications | where: 'authorship', role %}
  {% if role_papers.size > 0 %}
  <section class="publication-group" aria-labelledby="{{ role }}-publications">
    <h2 id="{{ role }}-publications">{% case role %}{% when 'first-author' %}First-author Publications{% when 'corresponding-author' %}Corresponding-author Publications{% else %}Other Publications{% endcase %}</h2>
    {% assign year_groups = role_papers | group_by: 'year' | sort: 'name' | reverse %}
    {% for year_group in year_groups %}
      {% for paper in year_group.items %}
        {% include publication.html paper=paper %}
      {% endfor %}
    {% endfor %}
  </section>
  {% endif %}
{% endfor %}
