import { parse } from 'node-html-parser';

export function parseTemplate(htmlString: string) {
  // Always expect a single parent element
  // TODO: test for this case ^
  return parse(htmlString);
}
