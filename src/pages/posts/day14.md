---
setup: |
  import Layout from '../../layouts/DayPost.astro'
  import Day from '../../components/day14/App.vue'
day: 14
title2: polymerization
publishDate: 8 Mar 2022 18:00
description:  brute force was enough
---


After some break I come back for more. Needed to get back to speed and finally  learnt the JavaScript Maps object. So far I got by just (ab)using objects.

<details>

_Part 1_ was  straight forward - I split the input into overlapping pairs and expanded them according to rules. Obviously the string got large and I noticed I had to expand the same pair multiple times.

For *Part 2* I noticed that I could replace the 3 character string of expanded pairs with just two pairs. e.g. `CH -> CBH` - could be written as `CH -> [CB, BH]` (note that, new pairs would never be created). So instead I could just keep tabs on the pairs that I observed and update that. I recalled that I might get even more speedup if I would create custom rules for repeated application - that would significantly speed things up - but as code ran fast enough I skipped it.
</details>

<Day client:visible />

