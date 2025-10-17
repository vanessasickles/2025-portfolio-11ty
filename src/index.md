---
layout: layouts/home.html
---

# Vanessa Sickles
A multi-discipline, people-first front-end engineer with a keen design sense and a passion for developing responsive, accessible, and scalable user interfaces.

## Skills
test

## Projects
<ul>
    {%- for project in collections.project -%}
    <li>
        <a href="{{ project.url }}">{{ project.data.title }}</a>
        {%- for tech in project.data.tech -%}
            {{ tech }}
        {%- endfor -%}
    </li>
    {%- endfor -%}
</ul>

## Blog
test