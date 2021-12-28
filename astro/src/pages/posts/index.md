---
setup: |
  import Layout from '../../layouts/BlogPost.astro'
  import Cool from '../../components/Author.astro'
title: Hello world!
publishDate: 01 Dec 2021
value: 128
description: Starting Advent Of Code 2021
---

Having worked at an internet firm for some time now I want to solve AOC 2021 with the new tools I learnt.

The plan is to not only solve the challenges, but also in a way that visualizes some of the algorithm.

<Cool name={frontmatter.name} href="https://twitter.com/n_moore" client:load />

**TODO - remove **
This is so cool!

Do variables work {frontmatter.value * 2}?
