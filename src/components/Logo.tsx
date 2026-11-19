/**
 * RUDNIK logo, traced from the client's own vector (rudnik.ua/wp-content/uploads/2026/02/SVG-R-2-Color.svg).
 * viewBox 0 0 708.7 166.4 — the red "R" block on the left (x 0–170), the wordmark on the right.
 */
export const LOGO_VIEWBOX = "0 0 708.7 166.4";
export const MARK_VIEWBOX = "0 0 170.4 166.4";
export const wordPaths = ["m236.4,98h-14.7v36.8h-22.1V31.7h44.2c19.6,0,29.5,9.8,29.5,29.5v7.4c0,12-4.5,20.5-13.6,25.5l13.6,40.8h-22.1l-14.8-36.9Zm-14.7-44.2v22.1h22.1c4.9,0,7.4-2.5,7.4-7.4v-7.4c0-4.9-2.5-7.4-7.4-7.4h-22.1v.1Z", "m317.6,31.7v73.7c0,4.9,2.5,7.4,7.4,7.4h14.7c4.9,0,7.4-2.5,7.4-7.4V31.7h22.1v73.7c0,19.6-9.8,29.5-29.5,29.5h-14.7c-19.6,0-29.5-9.8-29.5-29.5V31.7h22.1Z", "m435.7,31.7c19.6,0,29.5,9.8,29.5,29.5v44.2c0,19.6-9.8,29.5-29.5,29.5h-44.2V31.7h44.2Zm7.3,29.4c0-4.9-2.5-7.4-7.4-7.4h-22.1v58.9h22.2c4.9,0,7.4-2.5,7.4-7.4v-44.1h-.1Z", "m509.5,31.7l36.8,62.6V31.7h22.1v103.1h-22.1l-36.8-62.6v62.6h-22.1V31.7h22.1Z", "m612.8,31.7v103.1h-22.1V31.7h22.1Z", "m635,134.8V31.7h22.1v47.9l28-47.9h23.6l-30.9,51.6,30.9,51.6h-23.6l-28-47.9v47.9h-22.1v-.1Z"];
/** The mark: three solid pieces of the R + the frame with the "UA" lettering cut out. */
export const markPaths = ["m38,166.3H.2V53.9h37.8v112.4Z", "m104,166.3h-39v-51.3h18.1c6.9,17,13.9,34.1,20.9,51.3Z", "m65,52.6c4.5,0,8.9-.1,13.2,0,5.2.1,10.5.1,15.7.8,4.9.6,7.2,3.2,7.3,8.1.2,7.9,0,15.8,0,23.7,0,3.9-2.3,6.2-5.8,7.1-2.6.7-5.3,1-8,1-7.1.1-14.1,0-21.2,0-.3,0-.7-.1-1.1-.1-.1-13.5-.1-26.9-.1-40.6Z", "m0,0v29.1h3.1c30.6,0,61.1,0,91.7.1,3.8,0,7.8.5,11.5,1.3,10.7,2.4,18.2,8.5,20.8,19.6.5,2,.9,4.1.9,6.2,0,11.5.3,23-.4,34.5-.6,10-5.9,17.6-15.1,22-1.4.7-2.8,1.2-4.2,1.8,0,.2,0,.3.1.4,8.1,16.7,16.1,33.4,24.1,50.1.5,1.1,1.2,1.3,2.3,1.3h31.5V0H0Zm133.6,18.6h-3.1v-3.1h3.1v3.1Zm13.4-4.2c0,2.7-1.4,4.1-4.1,4.1h-2.1c-2.7,0-4.1-1.4-4.1-4.1V4.1h3.1v10.3c0,.7.3,1,1,1h2.1c.7,0,1-.3,1-1V4.1h3.1v10.3Zm12.4,4.2l-1-3.1h-5.3l-1,3.1h-3.1l4.3-14.4h4.7l4.3,14.4h-2.9Z"];
export const markUa = "154.1 12.4 157.5 12.4 155.8 7.2 154.1 12.4";

export function Logo({ className = "logo", title = "RUDNIK" }: { className?: string; title?: string }) {
  return (
    <svg className={className} viewBox={LOGO_VIEWBOX} role="img" aria-label={title} fill="currentColor">
      {wordPaths.map((d) => (
        <path key={d.slice(0, 16)} d={d} />
      ))}
      <g className="logo-mark">
        {markPaths.map((d) => (
          <path key={d.slice(0, 16)} d={d} />
        ))}
        <polygon points={markUa} />
      </g>
    </svg>
  );
}

/** Just the red R block. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox={MARK_VIEWBOX} aria-hidden="true">
      {markPaths.map((d) => (
        <path key={d.slice(0, 16)} d={d} />
      ))}
      <polygon points={markUa} />
    </svg>
  );
}
