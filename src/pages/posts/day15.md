---
setup: |
  import Layout from '../../layouts/DayPost.astro'
  import Day from '../../components/day15/App.vue'
day: 15
title2: Chiton
publishDate: 10 Mar 2022 18:00
description:  A little Dijkstra
---

This one is straightforward [ Djikstras algorithm ](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm). 
Being annoyed of having to manually find the minimum element I had a little extra fun implementing a [Heap](https://en.wikipedia.org/wiki/Binary_heap)  in JavaScript.  
Suppose there would be some room improving it - but I'm happy already.

The visualization for part 2 gets laggy on and is too large for the screen. I had it update a range of candidates simultanously - but in general it just updates only once or twice for the huge sample array - and is finished after a minute or so.

<Day client:visible />

