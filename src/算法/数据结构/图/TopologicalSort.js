import Edge from "./Edge.js";
import Vertex from "./Vertex.js";

export function TopologicalSort() {
  const v1 = new Vertex("网页基础");
  const v2 = new Vertex("Java基础");
  const v3 = new Vertex("JavaWeb");
  const v4 = new Vertex("Spring框架");
  const v5 = new Vertex("微服务框架");
  const v6 = new Vertex("数据库");
  const v7 = new Vertex("实战项目");

  v1.edges = [new Edge(v3)];
  v2.edges = [new Edge(v3)];
  v3.edges = [new Edge(v4)];
  v6.edges = [new Edge(v4)];
  v4.edges = [new Edge(v5)];
  v5.edges = [new Edge(v7)];
  v7.edges = [new Edge(v5)];

  // 计算出所有节点的入度
  const graph = [v1, v2, v3, v4, v5, v6, v7];
  for (let vertex of graph) {
    for (let edge of vertex.edges) {
      edge.linked.inDegree++;
    }
  }

  // 设置一个队列，放置入度为0的节点
  const queue = [];
  for (let vertex of graph) {
    if (vertex.inDegree === 0) {
      queue.push(vertex);
    }
  }

  // 队列中不断移除顶点，每移除一个顶点，将其link的顶点的入度-1，入度为0则放入队列
  const result = [];
  while (queue.length) {
    const shift = queue.shift();
    result.push(shift);
    console.log(shift.name);
    for (let edge of shift.edges) {
      edge.linked.inDegree--;
      if (edge.linked.inDegree === 0) {
        queue.push(edge.linked);
      }
    }
  }

  // 环检测
  if (result.length !== graph.length) {
    console.log("环状检测");
  }
}

TopologicalSort();
