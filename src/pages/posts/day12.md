---
setup: |
  import Layout from '../../layouts/BlogPost.astro'
  import Day from '../../components/day12/App.vue'
title: Day 12 - Caves
publishDate: 9 Jan 2022
description: slow depth first 
---

[Description]( https://adventofcode.com/2021/day/11 )

Had problems with the visualization there - used vis.js - but data updates were so slow so it wasn't really visible.
I approached this problem as depth first traversal of the path with the specified rules, relying that the data would not include any infinite cycles.

Anyway the final problem data proved to have quite few paths (some 1000s for the first part, 100.000 for the second part).
I went from visualizing each visited node to visualizing each found path and it still took too long.
I had to seriously tone down what I displayed and stored and it still takes quite some toll on resources.
I never appear to get more than a few paths visualized per second so the 2nd part takes a good part of an hour - curious why.

Having spent so much time on the visualization I did not feel like reimplementing the algorithm to directly solve the problem.
I suppose there's a clever representation of this problem using matrices where one could simultanously investigate multiple paths at once instead or recursing. 



<Day client:visible />

