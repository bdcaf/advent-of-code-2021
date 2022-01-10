---
setup: |
  import Layout from '../../layouts/BlogPost.astro'
  import Day from '../../components/day13/App.vue'
title: Day 13 - folding
publishDate: 9 Jan 2022 18:00
description: little exercise
---

[Description]( https://adventofcode.com/2021/day/12 )

An easy problem, just had to realize I shouldn't render the large input. Keeping just the coordinates in memory did the trick.


<Day client:visible />

