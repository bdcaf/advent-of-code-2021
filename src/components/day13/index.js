const defaultInput = `
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
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
      paper: [],
      folds: [],
      coords: [],
      activeFold: NaN,
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
      this.coords = inputList[0]
        .split(/\r?\n/)
        .map((x) => x.split(/,/).map((y) => parseInt(y, 10)));
      this.folds = inputList[1]
        .split(/\r?\n/)
        .map((x) => x.match(/^fold along ([xy])=(\d+)/))
        .map((x) => {
          x[2] = parseInt(x[2], 10);
          return x;
        });

      this.done1 = false;
      this.done2 = false;
      this.visPaper();
    },
    visPaper() {
      const xmax =
        this.coords.map((x) => x[0]).reduce((p, v) => Math.max(p, v), 0) + 1;
      const ymax =
        this.coords.map((x) => x[1]).reduce((p, v) => Math.max(p, v), 0) + 1;
      if (xmax > 100 || ymax > 100) {
        this.doShow = false;
        return;
      }
      this.doShow = true;
      this.paper = new Array(ymax)
        .fill()
        .map(() => new Array(xmax).fill(false));

      console.log(this.coords);
      this.coords.forEach((x) => {
        this.paper[x[1]][x[0]] = true;
      });
    },

    run1() {
      this.parseInput();
      clearInterval(this.interval);
      this.done1 = false;
      this.done2 = false;
      this.activeFold = 0;
      const score = this.calcScore();
      this.answer1 = score;
      this.answer2 = score;

      const dur = 300;
      this.interval = setInterval(this.move1, dur);
    },
    stop() {
      clearInterval(this.interval);
    },
    move1() {
      this.fold();
      this.visPaper();
      const score = this.calcScore();
      if (this.activeFold == 0) {
        this.answer1 = score;
        this.done1 = true;
      }
      this.answer2 = score;
      this.activeFold++;
      if (this.activeFold >= this.folds.length) {
        clearInterval(this.interval);
        this.done1 = true;
        return;
      }
    },
    calcScore() {
      return this.coords.length;
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
      console.log("x", arrNew, arrRem, this.coords);
    },
  },
};
