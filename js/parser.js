/**
 * Parses graph input into rows of [u, v, w?].
 *  - LeetCode style (single line): [[0,1,4],[1,2,3]]
 *  - CP style (multiline):          n m \n u v [w] ...
 */
function parseGraph(text) {
  const t = text.trim();
  let rows;
  if (t[0] === '[') {
    rows = JSON.parse(t);
  } else {
    rows = t.split('\n').slice(1).map(l => l.trim().split(/\s+/).map(Number));
  }
  return rows.filter(r => r.length >= 2 && !r.some(isNaN));
}
