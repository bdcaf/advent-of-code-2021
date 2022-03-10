import { Cave, Node } from "./chiton.js";
import { Heap } from "../heap.js";

const defaultInput = `
1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581
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
      cave: new Cave(),
      done1: false,
      done2: false,
      answer1: NaN,
      answer2: NaN,
      polymer: [],
      show1: false,
      show2: false,
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

      this.inArr = this.input
        .trim()
        .split(/\r?\n/)
        .map((s) => s.split("").map((t) => parseInt(t)));
      this.chiton = this.inArr.map((s, y) =>
        s.map((t, x) => new Node(t, y, x))
      );
      console.log(this.inArr, this.chiton);

      this.done1 = false;
      this.done2 = false;
    },
    stop() {
      clearInterval(this.interval);
    },
    run1() {
      clearInterval(this.interval);
      this.done1 = false;
      this.show1 = true;
      this.show2 = false;

      this.cave.setMap(this.chiton);
      this.cave.startSearch();

      this.scoreFun = (x) => {
        this.answer1 = x;
      };
      this.finalFun = () => (this.done1 = true);
      const dur = Math.ceil(500 / this.cave.xMax / this.cave.xMax);
      this.interval = setInterval(this.move1, dur);
    },
    move1() {
      if (this.cave.candidates.isEmpty()) {
        clearInterval(this.interval);
        return;
      }
      const block = (this.cave.xMax * this.cave.yMax * this.cave.xMax) / 1000;
      for (let i = 0; i < block; i++) {
        let node = this.cave.nextNode();
        if (node.x == this.cave.xMax - 1 && node.y == this.cave.yMax - 1) {
          clearInterval(this.interval);
          this.scoreFun(node.cost);
          while (node) {
            node.onPath = true;
            node = node.parent;
          }
          this.finalFun();
          return;
        }
      }
    },
    run2() {
      clearInterval(this.interval);
      this.done2 = false;
      this.show1 = false;
      this.show2 = true;

      const wip = this.inArr.map((l) => {
        let a2 = [];
        for (let i = 0; i < 5; i++) {
          a2 = a2.concat(l.map((v) => v + i));
        }
        return a2;
      });
      let w2 = [];
      for (let i = 0; i < 5; i++) {
        const l2 = wip.map((l) => l.map((v) => ((v + i - 1) % 9) + 1));
        w2 = w2.concat(l2);
      }

      const bigMap = w2.map((s, y) => s.map((t, x) => new Node(t, y, x)));
      //const a2 = this.inArr.map((s, y) => s.map((t, x) => new Node(t, y, x)));
      this.cave.setMap(bigMap);
      this.cave.startSearch();

      this.scoreFun = (x) => {
        this.answer2 = x;
      };
      this.finalFun = () => (this.done2 = true);
      const dur = 500 / this.cave.xMax / this.cave.xMax;
      this.interval = setInterval(this.move1, dur);
    },
  },
};
