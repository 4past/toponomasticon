import {
  bgRgb24,
  rgb24,
  bold,
  italic,
  dim,
  inverse,
  hidden,
  reset,
  strikethrough,
  underline,
  type Rgb,
} from "$deno-cli-format/colors";


type Color = number | Rgb;
type StyleFunction = (text: string) => string;

interface logBoxColorOptions {
  color: Color;
  bgColor: Color;
  boxColor?: Color;
}

interface StyleTarget {
  txt?: boolean;
  box?: boolean;
}
type ComplexStyle = StyleTarget | boolean;

interface logBoxStyleOptions {
  bold?: ComplexStyle;
  dim?: ComplexStyle;
  inverse?: ComplexStyle;
  hidden?: ComplexStyle;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  reset?: boolean;
  padding?: number;
}

const STYLES_MAP: Record<string, StyleFunction> = {
  italic,
  strikethrough,
  underline,
  reset,
  bold,
  dim,
  inverse,
  hidden,
};

function logBox(
  text: string,
  { color, bgColor, boxColor: rawBoxColor }: logBoxColorOptions,
  styles: logBoxStyleOptions = {}
): void {
  const boxColor = rawBoxColor ?? color;
  const padding = Math.max(0, Math.floor(styles.padding ?? 0));

  const createComposer = (target: 'txt' | 'box'): StyleFunction => {
    const activeStyleFns: StyleFunction[] = [];
    for (const key in styles) {
      const styleName = key as keyof logBoxStyleOptions;
      if (styleName === 'padding') continue;
      const styleValue = styles[styleName as keyof Omit<logBoxStyleOptions, 'padding'>];
      if (!STYLES_MAP[styleName]) continue;

      if (typeof styleValue === 'object') {
        if (styleValue?.[target]) {
          activeStyleFns.push(STYLES_MAP[styleName]);
        }
      } else if (typeof styleValue === 'boolean' && styleValue) {
        const isComplexStyle = ['bold', 'dim', 'inverse', 'hidden'].includes(styleName);

        if (isComplexStyle) {
          activeStyleFns.push(STYLES_MAP[styleName]);
        } else {
          if (target === 'txt') {
            activeStyleFns.push(STYLES_MAP[styleName]);
          }
        }
      }
    }
    return (input: string) => activeStyleFns.reduce((acc, fn) => fn(acc), input);
  };

  const applyTxtStyles = createComposer('txt');
  const applyBoxStyles = createComposer('box');

  const lines = text.split('\n');
  const maxWidth = Math.max(...lines.map((line) => line.length));

  const horizontalPaddingWidth = padding + padding==0?1:padding==1?3:2; 
  const horizontalPaddingStr = ' '.repeat(horizontalPaddingWidth);
  const innerWidth = maxWidth + 2 * horizontalPaddingWidth;

  const contentLines = lines.map((line) => {
    const paddedText = `${horizontalPaddingStr}${line.padEnd(maxWidth, ' ')}${horizontalPaddingStr}`;
    const styledContent = applyTxtStyles(paddedText);
    return rgb24(styledContent, color);
  });
  
  const topBorder = rgb24(`╭${'─'.repeat(innerWidth)}╮`, boxColor);
  const bottomBorder = rgb24(`╰${'─'.repeat(innerWidth)}╯`, boxColor);
  const sideBorder = rgb24('│', boxColor);

  const top = applyBoxStyles(bgRgb24(' '+topBorder+' ', bgColor));
  const bottom = applyBoxStyles(bgRgb24(' '+bottomBorder+' ', bgColor));
  const middle = contentLines.map(line => 
      applyBoxStyles(bgRgb24(` ${sideBorder}${line}${sideBorder} `, bgColor))
  );

  const verticalPaddingLine = applyBoxStyles(
    bgRgb24(` ${sideBorder}${' '.repeat(innerWidth)}${sideBorder} `, bgColor)
  );

  console.log(top);
  for (let i = 0; i < padding; i++) {
    console.log(verticalPaddingLine);
  }
  middle.forEach((line) => console.log(line));
  for (let i = 0; i < padding; i++) {
    console.log(verticalPaddingLine);
  }
  console.log(bottom);
}

export default logBox;
export { logBox };
export type {logBoxColorOptions, logBoxStyleOptions};
