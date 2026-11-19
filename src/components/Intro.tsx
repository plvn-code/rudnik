import { LOGO_VIEWBOX, markPaths, markUa, wordPaths } from "./Logo";

/**
 * First-visit curtain: the red R assembles from its four pieces like a mounting kit, the wordmark rises,
 * a red line runs across, then a red panel wipes the screen away. Pure CSS — content never waits for JS.
 * The inline script in the layout adds html.no-intro on repeat views and away from the home page.
 */
export function Intro() {
  const order = [3, 0, 1, 2]; // frame drops in, then bar, leg, bowl
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-mark">
        <svg className="intro-logo" viewBox={LOGO_VIEWBOX}>
          {order.map((i, k) => (
            <path key={i} className={`im im-${k + 1}`} d={markPaths[i]} />
          ))}
          <polygon className="im im-1" points={markUa} />
          {wordPaths.map((d, i) => (
            <path key={i} className="iw" d={d} style={{ animationDelay: `${0.7 + i * 0.07}s` }} />
          ))}
        </svg>
        <span className="intro-bar">
          <i />
        </span>
        <span className="intro-cap mono">
          <span>Завод систем кріплення</span>
          <span>з 2015</span>
        </span>
      </div>
    </div>
  );
}
