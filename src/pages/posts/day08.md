---
setup: |
  import Layout from '../../layouts/BlogPost.astro'
  import Day from '../../components/day08/App.vue'
title: Day 8 - Segment search
publishDate: 29 Dec 2021
description: Some logic
---

[Description]( https://adventofcode.com/2021/day/8 )

This required some logic figuring out how the digits interacted. 
Again I don't think talking about the logic helps.

I uses some logic like this
```javascript
  const v6 = undecided
    .filter(z=>overlap(z,v8)==6)
    .filter(z=>overlap(z,v1)==1)[0]
  undecided = undecided.filter(z=>z!=v6)
```
and it quickly discriminated the digits. But does not make a nice visualization. This logic skips identifying the individual segments.

I have visualization that deduces the deduction of the segments in the detail section that can be run via a button.
Keep in mind on the challenge input this takes forever ;)

<Day client:visible />

