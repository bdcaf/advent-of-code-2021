import { Network } from "vis-network";
import { DataSet } from "vis-data";

const defaultInput = `
start-A
start-b
A-c
A-b
b-d
A-end
b-end
`.trim();
const inputLonger = `
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`.trim();
const evenLonger = `
fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW
`.trim();

export default {
  name: "App",
  components: {},
  mounted() {
    const nodes = new DataSet([
      { id: 1, label: "Node 1" },
      { id: 2, label: "Node 2" },
      { id: 3, label: "Node 3" },
      { id: 4, label: "Node 4" },
      { id: 5, label: "Node 5" },
    ]);

    // create an array with edges
    const edges = new DataSet([
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 3 },
    ]);
    this.data = {
      nodes: nodes,
      edges: edges,
    };
    let container = document.getElementById("network");
    var options = {};
    this.graph = new Network(container, this.data, options);
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
      edges: {},
      visited: [],
      path: [],
      listOfPaths: [],
    };
  },
  methods: {
    resetInput() {
      this.input = defaultInput;
      this.parseInput();
    },
    resetLonger() {
      this.input = inputLonger;
      this.parseInput();
    },
    resetEvenLonger() {
      this.input = evenLonger;
      this.parseInput();
    },
    parseInput() {
      // reset
      clearInterval(this.interval);

      const inputList = this.input
        .trim()
        .split(/\r?\n/)
        .map((x) => x.split(/-/));
      this.edges = {};
      this.visited = [];
      let idc = 0;
      this.data.nodes.clear();
      inputList.forEach((x) => {
        //if (!this.edges.includes(x[0])) {
        //this.edges.push(x[0]);
        //}
        let id = this.data.nodes.get({ filter: (y) => y.label == x[0] });
        if (id.length == 0) {
          this.data.nodes.add({
            id: idc++,
            label: x[0],
            isLower: x[0] == x[0].toLowerCase(),
          });
        }
        id = this.data.nodes.get({ filter: (y) => y.label == x[1] });
        if (id.length == 0) {
          this.data.nodes.add({
            id: idc++,
            label: x[1],
            isLower: x[1] == x[1].toLowerCase(),
          });
        }
        this.edges[x[0]] = [];
        this.edges[x[1]] = [];
      });
      this.path = [];
      this.data.edges.clear();
      inputList.forEach((x) => {
        const ids = this.data.nodes.get({
          filter: (y) => x.includes(y.label),
        });
        this.data.edges.add({ from: ids[0].id, to: ids[1].id });
        this.edges[x[1]].push(x[0]);
      });

      this.done1 = false;
      this.done2 = false;
    },
    newCands() {},
    nextCand() {},
    downPath(node) {
      this.path.push(node);
      //this.visPath();
      if (node.label == "end") {
        const p0 = this.path.map((x) => x.label);
        if (this.listOfPaths.length < 101) {
          this.listOfPaths.push(p0);
        }
        this.pathStack.push([]);
        this.answer1++;
        return false;
      }
      const forbidden = this.path.filter((x) => x.isLower).map((x) => x.id);
      const cands = this.data.edges
        .get({
          filter: (x) =>
            (x.from == node.id && !forbidden.includes(x.to)) ||
            (x.to == node.id && !forbidden.includes(x.from)),
        })
        .map((x) => (x.from == node.id ? x.to : x.from))
        .map((x) => this.data.nodes.get(x));
      this.pathStack.push(cands);

      //node["color"] = "#ff2211";
      //this.data.nodes.update(node);
      return true;
    },
    downPath2(node) {
      this.path.push(node);
      //this.visPath();
      if (node.label == "end") {
        const p0 = this.path.map((x) => x.label);
        if (this.listOfPaths.length < 101) {
          this.listOfPaths.push(p0);
        }
        this.pathStack.push([]);
        this.answer2++;
        return false;
      }
      const forbidden0 = this.path.filter((x) => x.isLower).map((x) => x.id);
      let duplicates =
        forbidden0.filter((x) => forbidden0.filter((y) => x == y).length > 1)
          .length > 0;
      const forbidden = duplicates ? forbidden0 : [forbidden0[0]];
      //const forbidden = forbidden0.filter(
      //(x) => forbidden0.filter((y) => y == x).length > 1
      //);
      const cands = this.data.edges
        .get({
          filter: (x) =>
            (x.from == node.id && !forbidden.includes(x.to)) ||
            (x.to == node.id && !forbidden.includes(x.from)),
        })
        .map((x) => (x.from == node.id ? x.to : x.from))
        .map((x) => this.data.nodes.get(x));
      this.pathStack.push(cands);

      //node["color"] = "#ff2211";
      //this.data.nodes.update(node);
      return true;
    },
    upPath() {
      this.path.pop();
      this.pathStack.pop();
    },
    visPath() {
      const onPath = this.path.map((x) => x.id);
      this.data.nodes.get().forEach((x) => {
        if (onPath.includes(x.id)) {
          x.color = "#bb5555";
          this.data.nodes.update(x);
        } else {
          x.color = "#5555aa";
          this.data.nodes.update(x);
        }
      });
    },

    run1() {
      clearInterval(this.interval);
      this.done1 = false;
      this.answer1 = 0;
      this.pathStack = [];
      this.listOfPaths = [];

      const start = this.data.nodes.get({
        filter: (y) => y.label == "start",
      })[0];

      this.downPath(start);

      const dur = 10;
      this.interval = setInterval(this.move1, dur);
    },
    run2() {
      clearInterval(this.interval);
      this.done2 = false;
      this.answer2 = 0;
      this.pathStack = [];
      this.listOfPaths = [];

      const start = this.data.nodes.get({
        filter: (y) => y.label == "start",
      })[0];

      this.downPath2(start);

      const dur = 10;
      this.interval = setInterval(this.move2, dur);
    },
    stop() {
      clearInterval(this.interval);
    },
    move1() {
      if (this.pathStack.length == 0) {
        clearInterval(this.interval);
        this.done1 = true;
        return;
      }
      if (this.pathStack[this.pathStack.length - 1].length == 0) {
        this.upPath();
        this.move1();
      } else {
        const curr = this.pathStack[this.pathStack.length - 1].shift();
        if (this.downPath(curr)) {
          this.move1();
        }
      }
    },
    move2() {
      if (this.pathStack.length == 0) {
        clearInterval(this.interval);
        this.done2 = true;
        return;
      }
      if (this.pathStack[this.pathStack.length - 1].length == 0) {
        this.upPath();
        this.move2();
      } else {
        const curr = this.pathStack[this.pathStack.length - 1].shift();
        if (this.downPath2(curr)) {
          this.move2();
        }
      }
    },
  },
};
