import { Heap } from "../heap.js";
export class Cave {
  constructor() {
    this.map = [];
    this.candidates = new Heap();
    this.xMax = 0;
    this.yMax = 0;
  }
  setMap(map) {
    this.map = map;
    this.xMax = this.map[0].length;
    this.yMax = this.map.length;
    this.map.forEach((l) => l.forEach((m) => m.setCave(this)));
  }
  get(p) {
    return this.map[p.y][p.x];
  }
  contains(p) {
    return this.containsY(p.y) && this.containsX(p.x);
  }
  unvisited(p) {
    return !this.map[p.y][p.x].visited;
  }
  containsY(y) {
    return y >= 0 && y < this.yMax;
  }
  containsX(x) {
    return x >= 0 && x < this.xMax;
  }
  startSearch() {
    const first = this.map[0][0];
    first.cost = 0;
    console.log(first);
    this.candidates.clear();
    this.candidates.enqueue(first);
  }
  nextNode() {
    const res = this.candidates.dequeue();
    res.visited = true;
    const neighbors = res.getNeighbors();
    neighbors.forEach((n) => {
      const c2 = res.cost + n.value;
      if (c2 < n.cost) {
        n.cost = c2;
        n.parent = res;
        this.candidates.enqueue(n);
      }
    });
    return res;
  }
}
export class Node {
  constructor(val, y, x) {
    this.value = val;
    this.y = y;
    this.x = x;
    this.visited = false;
    this.onPath = false;
    this.cost = Infinity;
    this.parent = null;
    this.cave = null;
  }
  setCave(cave) {
    this.cave = cave;
  }
  getNeighbors() {
    const res = [
      { x: this.x - 1, y: this.y },
      { x: this.x + 1, y: this.y },
      { x: this.x, y: this.y - 1 },
      { x: this.x, y: this.y + 1 },
    ]
      .filter((p) => this.cave.contains(p) && this.cave.unvisited(p))
      .map((p) => this.cave.get(p));

    return res;
  }
}
