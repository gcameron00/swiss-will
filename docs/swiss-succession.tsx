import { useState, useMemo } from "react";

// ---------- styling ----------
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

:root{
  --paper:#EAE8E0; --card:#FBFAF7; --ink:#17150F; --muted:#6A675D;
  --rule:#D6D2C7; --rule2:#E3DFD5;
  --red:#CB2D24; --redsoft:#f3ddd9;
  --A:#2F5C8A; --B:#B07A2E; --C:#6E4E96; --S:#3F7A5F; --O:#8A867B;
  --display:'Space Grotesk',system-ui,sans-serif;
  --body:'Inter',system-ui,sans-serif;
  --mono:'IBM Plex Mono',ui-monospace,monospace;
}
*{box-sizing:border-box}
.ssx{background:var(--paper);color:var(--ink);font-family:var(--body);min-height:100%;
  font-size:15px;line-height:1.45;-webkit-font-smoothing:antialiased;padding:0 0 64px}
.ssx button{font-family:var(--body);cursor:pointer}
.ssx input{font-family:var(--body)}

.wrap{max-width:1180px;margin:0 auto;padding:0 22px}

/* header */
.hd{border-bottom:1.5px solid var(--ink);padding:30px 0 18px;margin-bottom:26px}
.eyebrow{font-family:var(--mono);font-size:11px;letter-spacing:.22em;text-transform:uppercase;
  color:var(--red);font-weight:600;display:flex;align-items:center;gap:9px}
.eyebrow:before{content:"";width:13px;height:13px;background:var(--red);
  display:inline-block;clip-path:polygon(40% 0,60% 0,60% 40%,100% 40%,100% 60%,60% 60%,60% 100%,40% 100%,40% 60%,0 60%,0 40%,40% 40%)}
.h1{font-family:var(--display);font-weight:600;font-size:clamp(28px,4.4vw,46px);
  line-height:1.02;letter-spacing:-.02em;margin:12px 0 8px}
.sub{color:var(--muted);max-width:62ch;font-size:14.5px}

/* layout */
.grid{display:grid;grid-template-columns:minmax(0,400px) minmax(0,1fr);gap:30px;align-items:start}
@media(max-width:880px){.grid{grid-template-columns:1fr;gap:24px}}

.panel{background:var(--card);border:1px solid var(--rule);border-radius:2px}
.sec{padding:18px 18px 20px}
.sec + .sec{border-top:1px solid var(--rule2)}
.legend{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;
  color:var(--muted);font-weight:600;margin:0 0 14px;display:flex;align-items:center;gap:8px}
.legend b{color:var(--ink);font-weight:600}
.tag{font-family:var(--mono);font-size:10px;color:var(--muted);border:1px solid var(--rule);
  border-radius:99px;padding:1px 7px;letter-spacing:.04em}

/* form rows */
.field{margin-bottom:13px}
.field:last-child{margin-bottom:0}
.lab{display:block;font-size:12.5px;color:var(--muted);margin-bottom:5px;font-weight:500}
.tin{display:flex;align-items:center;border:1px solid var(--rule);border-radius:2px;background:#fff;
  overflow:hidden;transition:border-color .15s}
.tin:focus-within{border-color:var(--ink)}
.tin .pre{font-family:var(--mono);font-size:11px;color:var(--muted);padding:0 0 0 10px;user-select:none}
.tin input{border:0;outline:0;background:transparent;padding:9px 10px;width:100%;font-size:14.5px;color:var(--ink)}
.tin input.num{font-family:var(--mono);text-align:right;letter-spacing:-.01em}
.namein{border:1px solid var(--rule);border-radius:2px;background:#fff;padding:9px 10px;width:100%;
  font-size:14.5px;outline:0;transition:border-color .15s}
.namein:focus{border-color:var(--ink)}

.two{display:grid;grid-template-columns:1fr 1fr;gap:11px}
.who{border:1px solid var(--rule);border-radius:2px;padding:12px;background:#fff}
.whohd{display:flex;align-items:center;gap:7px;margin-bottom:10px;font-weight:600;font-size:13px}
.dot{width:10px;height:10px;border-radius:99px;flex:none}

/* children */
.kid{display:flex;align-items:center;gap:9px;padding:9px 0;border-top:1px dashed var(--rule)}
.kid:first-of-type{border-top:0}
.kid .namein{flex:1;padding:7px 9px;font-size:13.5px}
.seg{display:inline-flex;border:1px solid var(--rule);border-radius:2px;overflow:hidden;background:#fff}
.seg button{border:0;background:transparent;padding:6px 9px;font-size:11px;font-weight:600;color:var(--muted);
  border-left:1px solid var(--rule);letter-spacing:.02em}
.seg button:first-child{border-left:0}
.seg button.on{color:#fff}
.xbtn{border:1px solid var(--rule);background:#fff;width:28px;height:28px;border-radius:2px;color:var(--muted);
  font-size:15px;line-height:1;flex:none;display:grid;place-items:center}
.xbtn:hover{border-color:var(--red);color:var(--red)}
.addk{margin-top:12px;border:1px dashed var(--rule);background:transparent;width:100%;padding:9px;
  border-radius:2px;font-size:12.5px;font-weight:600;color:var(--muted);letter-spacing:.02em}
.addk:hover{border-color:var(--ink);color:var(--ink)}

/* toggles */
.tog{display:flex;align-items:flex-start;gap:11px;padding:11px 0;border-top:1px solid var(--rule2)}
.tog:first-of-type{border-top:0;padding-top:2px}
.sw{width:38px;height:22px;border-radius:99px;border:1px solid var(--rule);background:#efece4;position:relative;
  flex:none;transition:background .18s,border-color .18s;margin-top:1px}
.sw:after{content:"";position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:99px;background:#fff;
  box-shadow:0 1px 2px rgba(0,0,0,.2);transition:left .18s}
.sw.on{background:var(--red);border-color:var(--red)}
.sw.on:after{left:18px}
.togtxt b{font-weight:600;font-size:13.5px;display:block}
.togtxt span{font-size:12px;color:var(--muted);display:block;margin-top:2px;max-width:42ch}

/* scenario tabs */
.tabs{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:18px}
.tab{border:1px solid var(--rule);background:var(--card);border-radius:2px;padding:9px 13px;font-size:12.5px;
  font-weight:600;color:var(--muted);display:flex;align-items:center;gap:7px;letter-spacing:.01em}
.tab .skull{width:9px;height:9px;border-radius:99px;background:var(--rule);flex:none}
.tab.on{border-color:var(--ink);color:var(--ink);background:#fff}
.tab.on .skull{background:var(--red)}

/* result */
.rsum{font-family:var(--display);font-size:19px;font-weight:500;letter-spacing:-.01em;margin:0 0 4px}
.rsub{color:var(--muted);font-size:13.5px;margin-bottom:16px}

.banner{display:flex;gap:11px;align-items:flex-start;border:1px solid var(--red);background:var(--redsoft);
  border-radius:2px;padding:12px 14px;margin-bottom:18px}
.banner .bdot{width:14px;height:14px;border-radius:2px;background:var(--red);flex:none;margin-top:2px}
.banner b{font-size:13px}
.banner p{margin:3px 0 0;font-size:12.5px;color:#6b3530}

/* events */
.event{border:1px solid var(--rule);border-radius:2px;background:#fff;margin-bottom:11px;overflow:hidden}
.evhd{display:flex;align-items:baseline;justify-content:space-between;gap:10px;padding:11px 13px;
  border-bottom:1px solid var(--rule2);background:#fbf6f5}
.evhd .who2{display:flex;align-items:center;gap:8px;font-weight:600;font-size:13.5px}
.evhd .rd{width:11px;height:11px;border-radius:2px;background:var(--red);flex:none}
.evhd .est{font-family:var(--mono);font-size:13px}
.evnote{font-size:11.5px;color:var(--muted);padding:8px 13px 2px}
.recip{display:flex;align-items:center;gap:10px;padding:8px 13px;border-top:1px dashed var(--rule2)}
.recip .nm{display:flex;align-items:center;gap:8px;min-width:0}
.recip .nm b{font-weight:600;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.recip .role{font-size:11px;color:var(--muted)}
.recip .amt{font-family:var(--mono);font-size:13px;margin-left:auto;white-space:nowrap}

/* final holdings -- signature */
.final{border:1.5px solid var(--ink);border-radius:2px;background:var(--card);padding:16px 16px 18px;margin-top:6px}
.hrow{padding:12px 0;border-top:1px solid var(--rule2)}
.hrow:first-child{border-top:0;padding-top:4px}
.htop{display:flex;align-items:center;gap:9px;margin-bottom:7px}
.htop b{font-weight:600;font-size:14.5px}
.htop .role{font-size:11.5px;color:var(--muted)}
.htop .amt{font-family:var(--mono);font-size:14.5px;margin-left:auto;font-weight:500}
.bar{height:9px;border-radius:2px;background:#e6e2d8;overflow:hidden;display:flex}
.bar i{display:block;height:100%}
.src{display:flex;gap:6px;margin-top:7px;flex-wrap:wrap}
.chip{font-family:var(--mono);font-size:10.5px;color:var(--muted);display:inline-flex;align-items:center;gap:5px}
.chip i{width:8px;height:8px;border-radius:2px;display:inline-block}

/* insights */
.ins{margin-top:18px}
.icard{border-left:3px solid var(--rule);padding:9px 0 9px 13px;margin-bottom:11px}
.icard.warn{border-color:var(--red)}
.icard.good{border-color:var(--S)}
.icard b{font-size:12px;font-family:var(--mono);letter-spacing:.04em;text-transform:uppercase;display:block;margin-bottom:3px}
.icard.warn b{color:var(--red)} .icard.good b{color:var(--S)}
.icard p{margin:0;font-size:13px}

/* footer */
.notes{margin-top:34px;border-top:1px solid var(--rule);padding-top:18px}
.notes summary{font-family:var(--mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;
  color:var(--muted);cursor:pointer;font-weight:600}
.notes ul{margin:12px 0 0;padding-left:18px;color:var(--muted);font-size:12.5px;max-width:80ch}
.notes li{margin-bottom:6px}
.k{font-family:var(--mono);color:var(--ink)}
`;

// ---------- helpers ----------
const fmt = (n) => {
  const neg = n < -0.5;
  let r = Math.round(Math.abs(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u2019");
  return (neg ? "\u2212" : "") + r;
};
const lineColor = { A: "var(--A)", B: "var(--B)", common: "var(--C)", spouse: "var(--S)", other: "var(--O)", own: "var(--S)" };

export default function App() {
  const [a, setA] = useState({ name: "Anna", assets: 200000 });
  const [b, setB] = useState({ name: "Beat", assets: 100000 });
  const [shared, setShared] = useState(600000);
  const [kids, setKids] = useState([
    { id: "k1", name: "Clara", parent: "common" },
    { id: "k2", name: "Andrin", parent: "A" },
    { id: "k3", name: "Bruno", parent: "B" },
  ]);
  const [willToSpouse, setWillToSpouse] = useState(false);
  const [clause, setClause] = useState(false);
  const [scenario, setScenario] = useState("A_first");

  const names = { A: a.name || "Spouse A", B: b.name || "Spouse B" };
  const num = (v) => (isNaN(parseFloat(v)) ? 0 : parseFloat(v));

  const addKid = () =>
    setKids((k) => [...k, { id: "k" + Date.now(), name: "", parent: "common" }]);
  const setKid = (id, patch) =>
    setKids((k) => k.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const delKid = (id) => setKids((k) => k.filter((c) => c.id !== id));

  // ---------- engine ----------
  const result = useMemo(() => {
    const estateA = a.assets + shared / 2;
    const estateB = b.assets + shared / 2;
    const willMode = willToSpouse ? "maxSpouse" : "intestate";

    // recipient fractions of an estate
    const fracs = (deceased, spouseAlive) => {
      const other = deceased === "A" ? "B" : "A";
      const desc = kids.filter((c) => c.parent === "common" || c.parent === deceased);
      const out = [];
      if (spouseAlive) {
        if (desc.length) {
          const [sF, dF] = willMode === "maxSpouse" ? [0.75, 0.25] : [0.5, 0.5];
          out.push({ id: "sp-" + other, name: names[other], line: "spouse", role: "surviving spouse", frac: sF });
          desc.forEach((c) => out.push({ id: c.id, name: c.name || "Child", line: c.parent, role: roleK(c.parent), frac: dF / desc.length }));
        } else {
          out.push({ id: "sp-" + other, name: names[other], line: "spouse", role: "surviving spouse (no descendants)", frac: 1 });
        }
      } else {
        if (desc.length) {
          desc.forEach((c) => out.push({ id: c.id, name: c.name || "Child", line: c.parent, role: roleK(c.parent), frac: 1 / desc.length }));
        } else {
          out.push({ id: "oth-" + deceased, name: "Other heirs", line: "other", role: "parents / siblings / canton", frac: 1 });
        }
      }
      return out;
    };
    function roleK(p) {
      return p === "common" ? "child of both" : p === "A" ? `${names.A}\u2019s child` : `${names.B}\u2019s child`;
    }

    const apply = (recips, srcMap) => {
      const total = (srcMap.A || 0) + (srcMap.B || 0) + (srcMap.own || 0);
      return recips.map((r) => ({
        ...r,
        amount: r.frac * total,
        bySource: { A: r.frac * (srcMap.A || 0), B: r.frac * (srcMap.B || 0), own: r.frac * (srcMap.own || 0) },
      }));
    };

    // final holdings accumulator
    const holdMap = {};
    const add = (id, name, line, role, amount, bySource) => {
      if (amount <= 0.5) return;
      if (!holdMap[id]) holdMap[id] = { id, name, line, role, total: 0, bySource: { A: 0, B: 0, own: 0 } };
      holdMap[id].total += amount;
      holdMap[id].bySource.A += bySource.A || 0;
      holdMap[id].bySource.B += bySource.B || 0;
      holdMap[id].bySource.own += bySource.own || 0;
    };

    const events = [];
    let banner = null;
    const clauseOverride = clause && (scenario === "A_first" || scenario === "B_first");
    const bothDie = ["A_first", "B_first", "simultaneous"].includes(scenario);

    const singleDeath = (dec) => {
      const sur = dec === "A" ? "B" : "A";
      const estate = dec === "A" ? estateA : estateB;
      const surRetained = (sur === "A" ? a.assets : b.assets) + shared / 2;
      // surviving spouse keeps own property
      add("sp-" + sur, names[sur], "spouse", "surviving spouse", surRetained, { own: surRetained });
      const flows = apply(fracs(dec, true), { [dec]: estate });
      flows.forEach((f) => add(f.id, f.name, f.line, f.role, f.amount, f.bySource));
      events.push({
        who: dec, estate,
        note: willMode === "maxSpouse"
          ? `Will applies the free half to ${names[sur]}; descendants reduced to their compulsory quarter.`
          : `Statutory split: half to ${names[sur]}, half shared among descendants.`,
        recips: flows,
      });
    };

    if (scenario === "A_only") singleDeath("A");
    else if (scenario === "B_only") singleDeath("B");
    else {
      // both spouses die
      if (scenario === "simultaneous" || clauseOverride) {
        if (clauseOverride) {
          banner = {
            t: "Common-accident clause applied",
            p: `Both deaths fall inside the survival window, so the order is ignored. Neither spouse inherits from the other — each estate passes straight down its own bloodline.`,
          };
        }
        const fa = apply(fracs("A", false), { A: estateA });
        const fb = apply(fracs("B", false), { B: estateB });
        fa.forEach((f) => add(f.id, f.name, f.line, f.role, f.amount, f.bySource));
        fb.forEach((f) => add(f.id, f.name, f.line, f.role, f.amount, f.bySource));
        events.push({ who: "A", estate: estateA, note: `No surviving spouse \u2014 passes to ${names.A}\u2019s descendants.`, recips: fa });
        events.push({ who: "B", estate: estateB, note: `No surviving spouse \u2014 passes to ${names.B}\u2019s descendants.`, recips: fb });
      } else {
        // sequential: first dies, spouse inherits, then second dies
        const first = scenario === "A_first" ? "A" : "B";
        const second = first === "A" ? "B" : "A";
        const estate1 = first === "A" ? estateA : estateB;
        const estate2own = second === "A" ? estateA : estateB;

        // round 1 — first dies, second still alive
        const r1 = apply(fracs(first, true), { [first]: estate1 });
        const spouseInherit = r1.filter((f) => f.line === "spouse").reduce((s, f) => s + f.amount, 0);
        // first's descendants are final
        r1.filter((f) => f.line !== "spouse").forEach((f) => add(f.id, f.name, f.line, f.role, f.amount, f.bySource));
        events.push({
          who: first, estate: estate1,
          note: willMode === "maxSpouse"
            ? `${names[second]} survives and (per the will) takes three-quarters; descendants take their compulsory quarter.`
            : `${names[second]} survives and inherits half; descendants share the other half.`,
          recips: r1,
        });

        // round 2 — second dies, now no spouse; estate = own + what they inherited from first
        const srcMap2 = { [first]: spouseInherit, [second]: estate2own };
        const r2 = apply(fracs(second, false), srcMap2);
        r2.forEach((f) => add(f.id, f.name, f.line, f.role, f.amount, f.bySource));
        events.push({
          who: second, estate: spouseInherit + estate2own,
          note: `Estate now includes ${fmt(spouseInherit)} inherited from ${names[first]}. With no surviving spouse it passes to ${names[second]}\u2019s descendants \u2014 carrying ${names[first]}\u2019s money into ${names[second]}\u2019s bloodline.`,
          recips: r2,
        });
      }
    }

    const holdings = Object.values(holdMap).sort((x, y) => y.total - x.total);

    // ---------- insights ----------
    const ins = [];
    const aOnly = kids.filter((c) => c.parent === "A");
    const bOnly = kids.filter((c) => c.parent === "B");

    if (scenario === "A_only" || scenario === "B_only") {
      const dec = scenario === "A_only" ? "A" : "B";
      const sur = dec === "A" ? "B" : "A";
      const stepKids = dec === "A" ? bOnly : aOnly;
      if (stepKids.length) {
        ins.push({ type: "warn", t: "Stepchildren excluded", p: `${names[sur]}\u2019s own ${stepKids.length === 1 ? "child" : "children"} (${stepKids.map((k) => k.name || "?").join(", ")}) ${stepKids.length === 1 ? "is" : "are"} not a descendant of ${names[dec]} and inherit${stepKids.length === 1 ? "s" : ""} nothing from this estate.` });
      }
      ins.push({ type: "", t: "Property vs. inheritance", p: `${names[sur]} first keeps their own assets and half of the shared pot as a property settlement \u2014 only ${names[dec]}\u2019s ${fmt(dec === "A" ? estateA : estateB)} is actually inherited.` });
      if (willToSpouse) ins.push({ type: "good", t: "Will in effect", p: `The free half is steered to ${names[sur]}, leaving descendants only their protected quarter.` });
    }

    if (bothDie) {
      if (clauseOverride || scenario === "simultaneous") {
        ins.push({ type: "good", t: "Bloodlines stay separate", p: `Each estate flows only to its own descendants. ${names.A}\u2019s assets reach ${names.A}\u2019s children and ${names.B}\u2019s reach ${names.B}\u2019s \u2014 no cross-over.` });
        if (scenario !== "simultaneous" && !clause)
          ins.push({ type: "", t: "Try the clause", p: `Switch the scenario order off, or turn on the common-accident clause, to see how a known order of death changes everything.` });
      } else {
        const first = scenario === "A_first" ? "A" : "B";
        const second = first === "A" ? "B" : "A";
        const stepOfFirst = first === "A" ? bOnly : aOnly; // second's own kids = first's stepchildren
        const ownOfFirst = first === "A" ? aOnly : bOnly;
        const leaked = holdings
          .filter((h) => h.line === second)
          .reduce((s, h) => s + (h.bySource[first] || 0), 0);
        if (leaked > 0.5 && stepOfFirst.length) {
          ins.push({
            type: "warn", t: "Inheritance leaks across bloodlines",
            p: `${fmt(leaked)} that originated with ${names[first]} ends up with ${names[second]}\u2019s ${stepOfFirst.length === 1 ? "child" : "children"} (${stepOfFirst.map((k) => k.name || "?").join(", ")}) \u2014 ${names[first]}\u2019s stepchild${stepOfFirst.length === 1 ? "" : "ren"}. Because ${names[first]} died first, their money passed through ${names[second]} and down ${names[second]}\u2019s line.`,
          });
        }
        if (ownOfFirst.length) {
          const ownGot = holdings
            .filter((h) => ownOfFirst.some((k) => k.id === h.id))
            .reduce((s, h) => s + h.total, 0);
          ins.push({ type: "", t: `${names[first]}\u2019s own children`, p: `${ownOfFirst.map((k) => k.name || "?").join(", ")} receive ${fmt(ownGot)} in total \u2014 only their share of ${names[first]}\u2019s estate, since they have no claim on ${names[second]}\u2019s.` });
        }
        ins.push({ type: "good", t: "A clause would fix this", p: `Turn on the common-accident clause to treat the deaths as simultaneous and keep ${names[first]}\u2019s estate within ${names[first]}\u2019s bloodline.` });
      }
    }

    return { estateA, estateB, events, holdings, banner, ins, bothDie };
  }, [a, b, shared, kids, willToSpouse, clause, scenario]);

  const maxHold = Math.max(1, ...result.holdings.map((h) => h.total));

  const tabs = [
    { id: "A_only", label: `${names.A} dies` },
    { id: "B_only", label: `${names.B} dies` },
    { id: "A_first", label: `Both \u00b7 ${names.A} first` },
    { id: "B_first", label: `Both \u00b7 ${names.B} first` },
    { id: "simultaneous", label: "Both \u00b7 same moment" },
  ];
  const scenLabel = tabs.find((t) => t.id === scenario)?.label;

  return (
    <div className="ssx">
      <style>{CSS}</style>
      <div className="wrap">
        <header className="hd">
          <div className="eyebrow">Swiss succession · post-2023 rules</div>
          <h1 className="h1">Who inherits, and what if the order changes?</h1>
          <p className="sub">
            Build a family and its assets, set the arrangements, then play out who dies first. The model
            follows the matrimonial-property split and Swiss forced-heirship after the 2023 reform.
          </p>
        </header>

        <div className="grid">
          {/* ---------- BUILDER ---------- */}
          <div className="panel">
            <div className="sec">
              <div className="legend"><b>1</b> The couple</div>
              <div className="two">
                <Spouse who="A" data={a} set={setA} color="var(--A)" num={num} />
                <Spouse who="B" data={b} set={setB} color="var(--B)" num={num} />
              </div>
              <div className="field" style={{ marginTop: 13 }}>
                <label className="lab">Shared assets (split 50 / 50 on a death)</label>
                <div className="tin">
                  <span className="pre">CHF</span>
                  <input className="num" type="number" value={shared}
                    onChange={(e) => setShared(num(e.target.value))} />
                </div>
              </div>
            </div>

            <div className="sec">
              <div className="legend"><b>2</b> The children</div>
              {kids.map((c) => (
                <div className="kid" key={c.id}>
                  <input className="namein" value={c.name} placeholder="Name"
                    onChange={(e) => setKid(c.id, { name: e.target.value })} />
                  <div className="seg">
                    {[["common", "Both"], ["A", names.A], ["B", names.B]].map(([p, lbl]) => (
                      <button key={p} className={c.parent === p ? "on" : ""}
                        style={c.parent === p ? { background: lineColor[p] } : {}}
                        onClick={() => setKid(c.id, { parent: p })}>{lbl}</button>
                    ))}
                  </div>
                  <button className="xbtn" onClick={() => delKid(c.id)} title="Remove">×</button>
                </div>
              ))}
              <button className="addk" onClick={addKid}>+ Add a child</button>
            </div>

            <div className="sec">
              <div className="legend"><b>3</b> Arrangements</div>
              <Toggle on={willToSpouse} set={setWillToSpouse}
                title="Will favouring the surviving spouse"
                desc="Gives the free half of the estate to the spouse; descendants drop to their compulsory quarter." />
              <Toggle on={clause} set={setClause}
                title="Common-accident (survivorship) clause"
                desc="Treats deaths within the survival window (~30 days) as simultaneous, so neither spouse inherits from the other." />
            </div>
          </div>

          {/* ---------- RESULTS ---------- */}
          <div>
            <div className="tabs">
              {tabs.map((t) => (
                <button key={t.id} className={"tab" + (scenario === t.id ? " on" : "")}
                  onClick={() => setScenario(t.id)}>
                  <span className="skull" />{t.label}
                </button>
              ))}
            </div>

            <h2 className="rsum">{scenLabel}</h2>
            <div className="rsub">
              {names.A}’s estate {fmt(result.estateA)} · {names.B}’s estate {fmt(result.estateB)} · all figures CHF
            </div>

            {result.banner && (
              <div className="banner">
                <span className="bdot" />
                <div><b>{result.banner.t}</b><p>{result.banner.p}</p></div>
              </div>
            )}

            <div className="legend" style={{ marginBottom: 11 }}>Estate division</div>
            {result.events.map((ev, i) => (
              <div className="event" key={i}>
                <div className="evhd">
                  <span className="who2"><span className="rd" />{names[ev.who]} dies</span>
                  <span className="est">estate {fmt(ev.estate)}</span>
                </div>
                {ev.note && <div className="evnote">{ev.note}</div>}
                {ev.recips.map((r, j) => (
                  <div className="recip" key={j}>
                    <span className="nm">
                      <span className="dot" style={{ background: lineColor[r.line] }} />
                      <b>{r.name}</b><span className="role">{r.role}</span>
                    </span>
                    <span className="amt">{fmt(r.amount)}</span>
                  </div>
                ))}
              </div>
            ))}

            <div className="legend" style={{ margin: "22px 0 11px" }}>Where the assets end up</div>
            <div className="final">
              {result.holdings.map((h) => {
                const src = h.bySource;
                return (
                  <div className="hrow" key={h.id}>
                    <div className="htop">
                      <span className="dot" style={{ background: lineColor[h.line] }} />
                      <b>{h.name}</b><span className="role">{h.role}</span>
                      <span className="amt">{fmt(h.total)}</span>
                    </div>
                    <div className="bar">
                      <i style={{ width: (h.total / maxHold) * 100 + "%", background: lineColor[h.line] }} />
                    </div>
                    {(src.A > 0.5 || src.B > 0.5 || src.own > 0.5) && (
                      <div className="src">
                        {src.own > 0.5 && <span className="chip"><i style={{ background: "var(--S)" }} />own property {fmt(src.own)}</span>}
                        {src.A > 0.5 && <span className="chip"><i style={{ background: "var(--A)" }} />from {names.A} {fmt(src.A)}</span>}
                        {src.B > 0.5 && <span className="chip"><i style={{ background: "var(--B)" }} />from {names.B} {fmt(src.B)}</span>}
                      </div>
                    )}
                  </div>
                );
              })}
              {result.holdings.length === 0 && (
                <div style={{ color: "var(--muted)", fontSize: 13 }}>No heirs to receive these assets.</div>
              )}
            </div>

            {result.ins.length > 0 && (
              <div className="ins">
                <div className="legend">What this means</div>
                {result.ins.map((it, i) => (
                  <div className={"icard " + (it.type || "")} key={i}>
                    <b>{it.t}</b><p>{it.p}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <details className="notes">
          <summary>How this is modelled · caveats</summary>
          <ul>
            <li>Compulsory portions use the <span className="k">post-2023</span> reform: spouse and descendants each keep half of their statutory share; parents have no compulsory portion.</li>
            <li>Shared assets are split <span className="k">50 / 50</span> on a death as a simplified stand-in for the default matrimonial regime (participation in acquired property). A surviving spouse keeps their own assets plus half the shared pot before any inheritance happens.</li>
            <li>Only a spouse&rsquo;s <span className="k">own</span> descendants (common children plus that spouse&rsquo;s individual children) inherit from them &mdash; stepchildren take nothing by intestacy.</li>
            <li>The sequential cases assume the first death&rsquo;s inheritance fully passes before the second death. The common-accident clause collapses both into a simultaneous death (Art. 32 ZGB presumption).</li>
            <li>Pillar 3a, life-insurance beneficiary designations, lifetime gifts, cantonal inheritance tax and the no-descendants/parental-line cases are out of scope. This is an illustration, not legal advice.</li>
          </ul>
        </details>
      </div>
    </div>
  );
}

function Spouse({ who, data, set, color, num }) {
  return (
    <div className="who">
      <div className="whohd"><span className="dot" style={{ background: color }} />Spouse {who}</div>
      <div className="field">
        <label className="lab">Name</label>
        <input className="namein" value={data.name} onChange={(e) => set({ ...data, name: e.target.value })} />
      </div>
      <div className="field">
        <label className="lab">Individual assets</label>
        <div className="tin">
          <span className="pre">CHF</span>
          <input className="num" type="number" value={data.assets}
            onChange={(e) => set({ ...data, assets: num(e.target.value) })} />
        </div>
      </div>
    </div>
  );
}

function Toggle({ on, set, title, desc }) {
  return (
    <div className="tog" onClick={() => set(!on)} role="button" tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && set(!on)}>
      <span className={"sw" + (on ? " on" : "")} />
      <span className="togtxt"><b>{title}</b><span>{desc}</span></span>
    </div>
  );
}
