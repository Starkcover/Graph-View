# Graph-View

Interactive graph visualizer built with **JavaScript + [vis.js](https://visjs.github.io/vis-network/)**.
Renders directed/undirected and weighted/unweighted graphs and animates **Dijkstra** (shortest path) and **Prim** (MST) step by step.

## Features
- Directed / undirected, weighted / unweighted graphs
- Animated **Dijkstra** with live distance labels and relaxation highlights
- Animated **Prim** with candidate-edge highlights and running MST cost
- Dual input: LeetCode-style single line or CP-style multiline
- Built-in bitwise calculator (XOR / OR / AND) with binary output

## Input formats
```text
LeetCode:  [[0,1,4],[0,2,1],[2,1,2],[1,3,1],[2,3,5]]

CP:        4 5
           0 1 4
           0 2 1
           2 1 2
           1 3 1
           2 3 5
```
Weight is optional (defaults to 1).

## Run
No build step. Open `index.html` in a browser, or serve it:
```bash
npx serve .
```

## Structure
```text
graph-view/
├── index.html
├── css/style.css
└── js/
    ├── parser.js       # LeetCode + CP input parsing
    ├── algorithms.js   # Dijkstra, Prim -> animation steps
    ├── bitwise.js      # XOR / OR / AND
    └── app.js          # DOM wiring + vis.js rendering
```

## Complexity
- Dijkstra: O(V² + E) (array-based min selection); non-negative weights only
- Prim: O(V · E) (edge scan per step); treats the graph as undirected

## License
MIT
