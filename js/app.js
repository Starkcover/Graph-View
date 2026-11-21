const $ = id => document.getElementById(id);
const DEF = '#848484';
let nodes, edges, E = [], N = new Set(), timer;

function draw() {
  stop();
  const weighted = $('w').checked;
  try {
    E = parseGraph($('in').value).map(r => ({ u: r[0], v: r[1], w: weighted ? (r[2] ?? 1) : 1 }));
  } catch (err) { $('msg').textContent = 'Parse error: ' + err.message; return; }

  N = new Set(E.flatMap(e => [e.u, e.v]));
  nodes = new vis.DataSet([...N].map(id => ({ id, label: String(id) })));
  edges = new vis.DataSet(E.map((e, i) => ({
    id: i, from: e.u, to: e.v,
    label: weighted ? String(e.w) : '',
    arrows: $('d').checked ? 'to' : ''
  })));
  new vis.Network($('g'), { nodes, edges }, {
    nodes: { shape: 'circle', color: { background: '#cfe3ff', border: '#3b6fd4' }, font: { color: '#000' } },
    edges: { color: { color: DEF }, font: { align: 'middle', color: '#000' }, smooth: false }
  });
  $('msg').textContent = `${N.size} nodes, ${E.length} edges`;
}

function resetView() {
  if (!nodes) return;
  nodes.update([...N].map(id => ({ id, label: String(id), color: { background: '#cfe3ff', border: '#3b6fd4' } })));
  edges.update(E.map((_, id) => ({ id, color: { color: DEF }, width: 1 })));
  $('msg').textContent = '';
}

function apply(s) {
  if (s.msg) $('msg').textContent = s.msg;
  (s.n || []).forEach(([id, c]) => nodes.update({ id, color: { background: c, border: '#3b6fd4' } }));
  (s.e || []).forEach(([id, c]) => edges.update({ id, color: { color: c || DEF }, width: c ? 3 : 1 }));
  if (s.d) nodes.update([...N].map(id => ({ id, label: id + '\n' + (s.d[id] === Infinity ? '∞' : s.d[id]) })));
}

function run(steps) {
  if (!nodes || !N.size) return;
  stop(); resetView();
  let i = 0;
  timer = setInterval(() => (i >= steps.length ? stop() : apply(steps[i++])), +$('sp').value);
}
function stop() { clearInterval(timer); }

function source() {
  const s = Number($('s').value);
  return N.has(s) ? s : [...N][0];
}

function calc() {
  try {
    const { xor, or, and } = bitwise($('a').value, $('b').value);
    $('bit').textContent =
      `XOR ${xor} | OR ${or} | AND ${and}  (bin: ${xor.toString(2)} | ${or.toString(2)} | ${and.toString(2)})`;
  } catch { $('bit').textContent = 'enter integers'; }
}

$('draw').onclick = draw;
$('dijkstra').onclick = () => run(dijkstra(N, E, source(), $('d').checked));
$('prim').onclick = () => run(prim(N, E, source()));
$('reset').onclick = () => { stop(); resetView(); };
$('a').oninput = $('b').oninput = calc;

draw(); calc();
