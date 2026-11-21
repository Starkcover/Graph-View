/**
 * Each algorithm returns an array of animation steps:
 *   { n: [[nodeId, color]], e: [[edgeIdx, color|null]], d: {node: dist}, msg }
 * E = [{u, v, w}], N = Set of node ids.
 */
function dijkstra(N, E, s, directed) {
  const d = {}, pe = {}, done = new Set(), steps = [];
  N.forEach(n => d[n] = Infinity);
  d[s] = 0;
  while (true) {
    let u = null;
    N.forEach(n => { if (!done.has(n) && d[n] < Infinity && (u === null || d[n] < d[u])) u = n; });
    if (u === null) break;
    done.add(u);
    steps.push({ n: [[u, '#ffd54f']], d: { ...d }, msg: `Pick ${u} (dist ${d[u]})` });
    E.forEach((e, i) => {
      const pairs = directed ? [[e.u, e.v]] : [[e.u, e.v], [e.v, e.u]];
      for (const [a, b] of pairs) {
        if (a !== u || done.has(b)) continue;
        const nd = d[u] + e.w, better = nd < d[b], ev = [];
        if (better) {
          if (pe[b] !== undefined) ev.push([pe[b], null]);
          d[b] = nd; pe[b] = i; ev.push([i, '#43a047']);
        } else ev.push([i, '#e53935']);
        steps.push({ e: ev, d: { ...d }, msg: `Relax ${u}→${b}: ${nd}${better ? ' ✓ updated' : ' ✗ no gain'}` });
        if (!better) steps.push({ e: [[i, null]], msg: '' });
      }
    });
    steps.push({ n: [[u, '#81c784']], d: { ...d }, msg: `${u} finalized (dist ${d[u]})` });
  }
  return steps;
}

function prim(N, E, s) {
  const inT = new Set([s]), steps = [{ n: [[s, '#81c784']], msg: `Start at ${s}` }];
  let total = 0;
  while (inT.size < N.size) {
    const cand = [];
    E.forEach((e, i) => { if (inT.has(e.u) !== inT.has(e.v)) cand.push(i); });
    if (!cand.length) break;
    steps.push({ e: cand.map(i => [i, '#fb8c00']), msg: `Candidate edges: ${cand.length}` });
    const b = cand.reduce((x, y) => E[y].w < E[x].w ? y : x);
    const e = E[b], nw = inT.has(e.u) ? e.v : e.u;
    inT.add(nw); total += e.w;
    steps.push({
      e: [...cand.map(i => [i, null]), [b, '#43a047']],
      n: [[nw, '#81c784']],
      msg: `Add ${e.u}–${e.v} (w=${e.w}), MST total ${total}`
    });
  }
  return steps;
}
