import React, { useEffect, useMemo, useState } from 'react';

/**
 * A faux code-editor window that types out a short, syntax-highlighted
 * snippet, then loops. Reinforces that sites are hand-coded. Typing is
 * driven by a timer over a flat token list so highlighting reveals
 * character-by-character. Honors prefers-reduced-motion (shows full code).
 */

const LINES = [
  [['const', 'kw'], [' site ', 'var'], ['= ', 'op'], ['createSite', 'fn'], ['({', 'punc']],
  [['  name', 'prop'], [': ', 'op'], ['"Your Business"', 'str'], [',', 'punc']],
  [['  theme', 'prop'], [': ', 'op'], ['"modern"', 'str'], [',', 'punc']],
  [['  responsive', 'prop'], [': ', 'op'], ['true', 'bool'], [',', 'punc']],
  [['});', 'punc']],
  [['', '']],
  [['site', 'var'], ['.', 'op'], ['add', 'fn'], ['(', 'punc'], ['<Hero />', 'tag'], [');', 'punc']],
  [['site', 'var'], ['.', 'op'], ['optimize', 'fn'], ['({ ', 'punc'], ['seo', 'prop'], [': ', 'op'], ['true', 'bool'], [' });', 'punc']],
  [['', '']],
  [['export default', 'kw'], [' site', 'var'], [';', 'punc'], ['   // launched', 'com']],
];

// Flatten lines into a single [text, class] token stream with newlines.
const TOKENS = [];
LINES.forEach((line, i) => {
  line.forEach((tok) => TOKENS.push(tok));
  if (i < LINES.length - 1) TOKENS.push(['\n', '']);
});
const TOTAL = TOKENS.reduce((n, [t]) => n + t.length, 0);

const renderTokens = (count) => {
  let remaining = count;
  const out = [];
  for (let i = 0; i < TOKENS.length; i += 1) {
    if (remaining <= 0) break;
    const [text, cls] = TOKENS[i];
    const slice = text.slice(0, remaining);
    out.push(
      <span key={i} className={cls ? `tok-${cls}` : undefined}>
        {slice}
      </span>
    );
    remaining -= text.length;
  }
  return out;
};

const CodeWindow = () => {
  const reduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );
  const [count, setCount] = useState(reduced ? TOTAL : 0);

  useEffect(() => {
    if (reduced) return undefined;
    let i = 0;
    let timer;
    const step = () => {
      i += 1;
      setCount(i);
      if (i < TOTAL) {
        timer = setTimeout(step, 34);
      } else {
        // hold the finished snippet, then restart the loop
        timer = setTimeout(() => {
          i = 0;
          setCount(0);
          timer = setTimeout(step, 500);
        }, 2800);
      }
    };
    timer = setTimeout(step, 600);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <div className="mockup code-window">
      <div className="mockup-bar">
        <span></span>
        <span></span>
        <span></span>
        <span className="cw-file">site.jsx</span>
      </div>
      <pre className="cw-body">
        <code>
          {renderTokens(count)}
          <span className="cw-caret" aria-hidden="true"></span>
        </code>
      </pre>
    </div>
  );
};

export default CodeWindow;
