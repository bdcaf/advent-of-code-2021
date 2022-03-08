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
      done1: false,
      done2: false,
      answer1: NaN,
      answer2: NaN,
      polymer: [],
      show1: false,
      show2: false,
      step1: 0,
      doShow: true,
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

      this.rules = {};
      inputList[1]
        .split(/\r?\n/)
        .map((x) => x.match(/^(\w\w) *-> *(\w)$/))
        .forEach((pat) => {
          this.rules[pat[1]] = pat[1][0] + pat[2] + pat[1][1];
        });
      console.log(inputList, this.rules);

      this.step1 = 0;
      this.done1 = false;
      this.done2 = false;
    },

    run1() {
      clearInterval(this.interval);
      this.parseInput();
      this.done1 = false;
      this.done2 = false;
      this.show1 = true;
      this.show2 = false;
      //const score = this.calcScore();
      //this.answer1 = score;
      //this.answer2 = score;

      const dur = 1000;
      this.interval = setInterval(this.move1, dur);
    },
    stop() {
      clearInterval(this.interval);
    },
    move1() {
      if (this.step1 >= 10) {
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
          .map((key) => (key in this.rules ? this.rules[key] : key))
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
      //console.log(agg, max, min, max - min);
    },
    fold() {
      const curr = this.folds[this.activeFold];
      const pos = curr[2];
      const axis = curr[1] == "y" ? 1 : 0;
      const arrNew = this.coords.filter((x) => x[axis] < pos);
      const posHelp = 2 * pos;
      const arrRem = this.coords
        .filter((x) => x[axis] > pos)
        .map((x) => {
          x[axis] = posHelp - x[axis];
          return x;
        })
        .filter((x) => !arrNew.some((y) => y[0] == x[0] && y[1] == x[1]));
      this.coords = arrNew.concat(arrRem);
    },
  },
};
