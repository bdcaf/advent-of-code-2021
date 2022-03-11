import { Stream, score1, execute } from "./helper.js";
import PacketNode from "./PacketNode.vue";

const defaultInput = `
EE00D40C823060
`.trim();

export default {
  name: "App",
  components: {
    PacketNode,
  },
  mounted() {
    this.parseInput();
  },
  data() {
    return {
      input: defaultInput,
      node: null,
      done1: false,
      done2: false,
      answer1: NaN,
      answer2: NaN,
      show1: false,
      show2: false,
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

      const inArr = this.input
        .split("")
        .map((c) => parseInt(c, 16).toString(2).padStart(4, "0"))
        .join("");

      const str = new Stream(inArr);
      this.node = str.parse();
      this.answer1 = score1(this.node);
      this.answer2 = execute(this.node);

      this.done1 = false;
      this.done2 = false;
    },
  },
};
