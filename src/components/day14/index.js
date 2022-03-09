const defaultInput = `
NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`.trim();

export default {
  name: "App",
  components: {},
  mounted() {
    this.parseInput();
  },
  data() {
    return {
      input: defaultInput,
      basin: [],
      part1N: 10,
      part2N: 40,
      done1: false,
      done2: false,
      answer1: NaN,
      answer2: NaN,
      polymer: [],
      show1: false,
      show2: false,
      step1: 0,
      doShow: true,
      length2: 0,
      extreme2: [{}, {}],
    };
  },
  methods: {
    resetInput() {
      this.input = defaultInput;
      this.parseInput();
    },
    parseInput() {
      // reset
      clearInterval(this.interval);

      const inputList = this.input.trim().split(/\r?\n\r?\n/);
      this.polymer = inputList[0];

      this.rules = new Map();
      this.rulesPat = new Map();
      inputList[1]
        .split(/\r?\n/)
        .map((x) => x.match(/^(\w\w) *-> *(\w)$/))
        .forEach((pat) => {
          const target = pat[1][0] + pat[2] + pat[1][1];
          this.rules.set(pat[1], target);
          this.rulesPat.set(pat[1], [pat[1][0] + pat[2], pat[2] + pat[1][1]]);
        });

      this.step1 = 0;
      this.done1 = false;
      this.done2 = false;
    },

    run1() {
      clearInterval(this.interval);
      this.parseInput();
      this.done1 = false;
      this.show1 = true;
      this.show2 = false;
      //const score = this.calcScore();
      //this.answer1 = score;
      //this.answer2 = score;

      const dur = 1000;
      this.interval = setInterval(this.move1, dur);
    },
    run2() {
      clearInterval(this.interval);
      this.parseInput();
      this.done2 = false;
      this.show1 = false;
      this.show2 = true;
      const polyBricks = new Map();
      Array(this.polymer.length - 1)
        .fill()
        .map((_, id) => this.polymer[id] + this.polymer[id + 1])
        .forEach((x) => {
          polyBricks.set(x, polyBricks.has(x) ? polyBricks.get(x) + 1 : 1);
        });
      this.polyBricks = polyBricks;
      this.calcScore2();
      const dur = 200;
      this.interval = setInterval(this.move2, dur);
    },
    stop() {
      clearInterval(this.interval);
    },
    move1() {
      if (this.step1 >= this.part1N) {
        clearInterval(this.interval);
        this.done1 = true;
        return;
      }
      this.step1++;

      const next =
        this.polymer[0] +
        Array(this.polymer.length - 1)
          .fill()
          .map((_, id) => this.polymer[id] + this.polymer[id + 1])
          .map((key) => (this.rules.has(key) ? this.rules.get(key) : key))
          .map((x) => x.substring(1))
          .join("");

      this.polymer = next;
      this.calcScore();
    },
    calcScore() {
      const agg = {};
      for (let i = 0; i < this.polymer.length; i++) {
        const char = this.polymer[i];
        agg[char] = (agg[char] || 0) + 1;
      }

      let max = 0;
      let min = this.polymer.length;
      for (const key in agg) {
        max = Math.max(max, agg[key]);
        min = Math.min(min, agg[key]);
      }
      this.answer1 = max - min;
    },
    move2() {
      if (this.step1 >= this.part2N) {
        clearInterval(this.interval);
        this.done2 = true;
        return;
      }
      this.step1++;

      const next = new Map();
      this.polyBricks.forEach((val, key) => {
        if (this.rulesPat.has(key)) {
          this.rulesPat.get(key).forEach((kn) => {
            next.set(kn, next.has(kn) ? next.get(kn) + val : val);
          });
        } else {
          next.set(key, next.has(key) ? next.get(key) + val : val);
        }
      });
      this.polyBricks = next;

      this.calcScore2();
    },
    calcScore2() {
      let len = 1;
      const stat = new Map();
      stat.set(this.polymer[0], 1);
      this.polyBricks.forEach((v, k) => {
        len += v;
        const kv = k[1];
        stat.set(kv, stat.has(kv) ? stat.get(kv) + v : v);
      });
      this.length2 = len;

      let max = 0;
      let min = len;
      stat.forEach((v, k) => {
        if (v > max) {
          max = v;
          this.extreme2[0] = [k, v];
        }
        if (v < min) {
          min = v;
          this.extreme2[1] = [k, v];
        }
      });
      this.answer2 = max - min;
    },
  },
};
