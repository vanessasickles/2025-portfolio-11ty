---
tags: project
title: Portfolio Site (using 11ty)
tech:
- 11ty
- Vite
- TailwindCSS
- React
---

# Building a Portfolio Site with 11ty, Tailwind CSS, Vite, and React
Over the years, I've heard a lot of good things about 11ty. I wanted to give it a shot for creating a lightning-fast portfolio site to showcase my development projects. I chose 11ty for its speed and its ease of deployment as a static site framework.

## Tech
<ul>
{%- for item in tech -%}
    <li>{{ item }}</li>
{%- endfor -%}
</ul>