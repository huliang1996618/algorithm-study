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

const graph = [v1, v2, v3, v4, v5, v6];

Dijkstra(graph, v1);

export function Dijkstra(graph, source) {
  // 未访问List
  const list = Array.from(graph);
  source.distance = 0;

  while (list.length) {
    // 选取最小距离的当前顶点
    const curr = chooseMinDistVertex(list);
    // 使用最小距离值更新当前顶点邻居距离
    updateNeighboursDist(curr, list);
    // 移除当前顶点
    remove(list, curr);
  }
}

function remove(arr, target) {
  const index = arr.findIndex((item) => item.name == target.name);
  arr.splice(index, 1);
}

function chooseMinDistVertex(list) {
  let min = list[0];
  for (let i = 1; i < list.length; i++) {
    if (list[i].distance < min.distance) {
      min = list[i];
    }
  }
  return min;
}

function updateNeighboursDist(curr, list) {
  for (let edge of curr.edges) {
    const link = edge.linked;
    if (list.includes(link)) {
      const distance = curr.distance + edge.weight;
      if (distance < link.distance) {
        link.prev = curr;
        link.distance = distance;
      }
    }
  }
}

for (let vertex of graph) {
  console.log(`${vertex.name}:${vertex.distance}:${vertex.prev?.name}`);
}
