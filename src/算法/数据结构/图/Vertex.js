export default function Vertex(name) {
  this.name = name;
  this.edges = [];
  // 入度
  this.inDegree = 0;
  this.visited = false;

  // 距离
  this.distance = Infinity;
  // 前节点
  this.prev = null;
}
