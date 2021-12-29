---
setup: |
  import Layout from '../../layouts/BlogPost.astro'
  import Day from '../../components/day07/App.vue'
title: Day 7 - Crabs and Whales
publishDate: 29 Dec 2021
description: no animation but a plot
---

[Description]( https://adventofcode.com/2021/day/7 )

Today I played with https://vue3charts.org/ for visualisation. 
Don't want to do animation for this one - suppose I could show the distance point by point, but that would totally break for the challenge input.

Not finding much documentation about vue3charts. 
Had to study the source to figure out how to remove points from the line (you have to use the undocumented `hideDot` switch).
I am still not too happy with the looks.
There really need to be labels in the plot. Also the axis gets totally messed up for the challenge input.
But out of time for today. Will maybe come back at another challenge.

btw. maths again - the fuel consumption in part 2 is the triangle number formula.

<Day client:visible />

