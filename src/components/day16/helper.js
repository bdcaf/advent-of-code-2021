export function score1(packet) {
  let score = packet.version;
  if (Array.isArray(packet.res)) {
    packet.res.forEach((m) => {
      score += score1(m);
    });
  }
  return score;
}

export function execute(packet) {
  if (packet.type == "literal") {
    return packet.res;
  }
  const values = packet.res.map((p) => execute(p));
  switch (packet.operation) {
    case "sum":
      return values.reduce((a, v) => a + v, 0);
    case "product":
      return values.reduce((a, v) => a * v, 1);
    case "maximum":
      return values.reduce((a, v) => Math.max(a, v), values[0]);
    case "minimum":
      return values.reduce((a, v) => Math.min(a, v), values[0]);
    case "greater than":
      return values[0] > values[1] ? 1 : 0;
    case "less than":
      return values[0] < values[1] ? 1 : 0;
    case "equal to":
      return values[0] == values[1] ? 1 : 0;
  }
}

export class Stream {
  constructor(str) {
    this.stream = str;
  }
  getN(n) {
    const v = this.stream.slice(0, n);
    this.stream = this.stream.slice(n);
    return v;
  }
  getVersion() {
    return parseInt(this.getN(3), 2);
  }
  getId() {
    return parseInt(this.getN(3), 2);
  }
  parse() {
    const ver = this.getVersion();
    const id = this.getId();
    let res;
    let operation;
    switch (id) {
      case 4:
        res = this.parseLiteral();
        return {
          version: ver,
          id: id,
          res: res,
          type: "literal",
        };
      case 0:
        operation = "sum";
        break;
      case 1:
        operation = "product";
        break;
      case 2:
        operation = "minimum";
        break;
      case 3:
        operation = "maximum";
        break;
      case 5:
        operation = "greater than";
        break;
      case 6:
        operation = "less than";
        break;
      case 7:
        operation = "equal to";
        break;
    }
    res = this.parseOperator();
    return {
      version: ver,
      id: id,
      type: "operator",
      res: res,
      operation: operation,
    };
  }
  parseLiteral() {
    const literals = [];
    let more = true;
    while (more) {
      const bits = this.getN(5);
      more = bits.slice(0, 1) == "1";
      literals.push(bits.slice(1));
    }
    return parseInt(literals.join(""), 2);
  }
  parseOperator() {
    const operator = [];
    const lengthId = this.getN(1);
    if (lengthId == "0") {
      const totalLength = parseInt(this.getN(15), 2);
      const rem = this.getN(totalLength);
      const subStream = new Stream(rem);
      console.log("ss", subStream);
      while (subStream.stream.length > 0) {
        const sp = subStream.parse();
        console.log("sp", sp);
        operator.push(sp);
      }
    } else {
      const nSubPackets = parseInt(this.getN(11), 2);

      for (let i = 0; i < nSubPackets; i++) {
        const sp = this.parse();
        operator.push(sp);
      }
    }
    return operator;
  }
}
