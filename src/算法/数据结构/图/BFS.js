import Edge from "./Edge.js";
import Vertex from "./Vertex.js";

const v1 = new Vertex("v1");
const v2 = new Vertex("v2");
const v3 = new Vertex("v3");
const v4 = new Vertex("v4");
const v5 = new Vertex("v5");
const v6 = new Vertex("v6");

v1.edges = [new Edge(v3, 9), new Edge(v2, 7), new Edge(v6, 14)];
v2.edges = [new Edge(v4, 15)];
v3.edges = [new Edge(v4, 11), new Edge(v6, 2)];
v4.edges = [new Edge(v5, 6)];
v6.edges = [new Edge(v5, 9)];

// DFSRecursion(v1);

// 非递归调用
export function BFS(v) {
  const queue = [];
  queue.push(v);
  while (queue.length) {
    const shift = queue.shift();
    console.log(shift.name);
    for (let edge of shift.edges) {
      if (!edge.linked.visited) {
        queue.push(edge.linked);
        edge.linked.visited = true;
      }
    }
  }
}

BFS(v1);
