let count = 0;

const minDistance = (distance, visitedNodes) => {
  let min = Number.MAX_VALUE;
  let min_index = -1;
  for (let i = 0; i < distance.length; i++) {
    if (visitedNodes[i] === false && distance[i] <= min) {
      min = distance[i];
      min_index = i;
    }
  }
  return min_index;
};

const printPath = (parent, j, output) => {
  if (parent[j] === -1) {
    output[count++] = j;
    return;
  }
  printPath(parent, parent[j], output);
  output[count++] = j;
};

const printSolution = (distance) => {
  console.log("Vertex \t\t Distance from Source");
  for (let i = 0; i < distance.length; i++) {
    console.log(i + " \t\t " + distance[i]);
  }
};

const dijkstra = (graph, src, dest, output) => {
  const len = graph.length;
  let distance = new Array(len);
  let visitedNodes = new Array(len);
  let parent = new Array(len);

  if (src < 0 || src >= len || dest < 0 || dest >= len)
    return console.log("Invalid Source or Destination");

  for (let i = 0; i < len; i++) {
    distance[i] = Number.MAX_VALUE;
    visitedNodes[i] = false;
  }

  distance[src] = 0;
  parent[src] = -1;

  for (let count = 0; count < len - 1; count++) {
    let vn = minDistance(distance, visitedNodes);
    visitedNodes[vn] = true;

    for (let i = 0; i < len; i++) {
      if (
        !visitedNodes[i] &&
        graph[vn][i] !== 0 &&
        distance[vn] !== Number.MAX_VALUE &&
        distance[vn] + graph[vn][i] < distance[i]
      ) {
        distance[i] = distance[vn] + graph[vn][i];
        parent[i] = vn;
      }
    }
  }
  printPath(parent, dest, output);
};

const shortestPath = (graph, src, dest, count) => {
  const output = {};
  dijkstra(graph, src, dest, output);
  return Object.values(output);
};

const graph = [
  [0, 4, 0, 0, 0, 0, 0, 8, 0],
  [4, 0, 8, 0, 0, 0, 0, 11, 0],
  [0, 8, 0, 7, 0, 4, 0, 0, 2],
  [0, 0, 7, 0, 9, 14, 0, 0, 0],
  [0, 0, 0, 9, 0, 10, 0, 0, 0],
  [0, 0, 4, 14, 10, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 2, 0, 1, 6],
  [8, 11, 0, 0, 0, 0, 1, 0, 7],
  [0, 0, 2, 0, 0, 0, 6, 7, 0],
];
const sourceNode = 0;
const destinationNode = 4;

// console.log(shortestPath(graph, sourceNode, destinationNode));

module.exports = {
  SHORTESTPATH: shortestPath,
};
