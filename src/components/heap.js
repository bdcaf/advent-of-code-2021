export class Heap {
  constructor() {
    this.pos = 0;
    this.length = -1;
    this.heap = [];
  }
  clear() {
    this.pos = 0;
    this.length = -1;
    this.heap = [];
  }
  isEmpty() {
    return this.length < 0;
  }
  compare(p, q) {
    return this.heap[p].cost < this.heap[q].cost;
  }
  swap(p, q) {
    const tmp = this.heap[p];
    this.heap[p] = this.heap[q];
    this.heap[q] = tmp;
  }
  enqueue(el) {
    this.heap[this.pos] = el;
    this.upheap(this.pos);
    this.pos++;
    this.length++;
  }
  upheap(p) {
    if (p == 0) return;
    const parent = Math.floor((p - 1) / 2);
    if (this.compare(p, parent)) {
      this.swap(p, parent);
      this.upheap(parent);
    }
  }
  dequeue() {
    if (this.isEmpty()) return null;
    const res = this.heap[0];
    const ov = this.heap.pop();
    this.heap[0] = ov;
    this.downheap(0);
    this.pos--;
    this.length--;
    return res;
  }
  downheap(p) {
    const left = p * 2 + 1;
    const right = p * 2 + 2;
    if (left < this.length) {
      let nextP;
      if (right < this.length) {
        nextP = this.compare(left, right) ? left : right;
      } else {
        nextP = left;
      }
      if (this.compare(nextP, p)) {
        this.swap(p, nextP);
        this.downheap(nextP);
      }
    }
  }
}
