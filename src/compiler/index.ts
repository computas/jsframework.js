import { parseTemplate } from '../parser';
import { appendFileSync, writeFileSync } from 'fs';
import { TextNode } from 'node-html-parser';

// TODO: add parameters for specifying certain files
export function compile() {
  // TODO: refactor to read from a file
  const htmlString = `
<div>
    Hello World!
    <div>
        Hello World!
  </div>
</div>
`;

  const file = 'test-out/index.js';

  writeFileSync(file, '');

  const parsedTemplate = parseTemplate(htmlString);
  // TODO:
  // Always assume newline character '\n' are unimportant
  const node = parsedTemplate.childNodes.filter(
    (node) => node.rawText !== '\n'
  )[0];

  createElement(node, true);



  // How to do this?
  // (node.childNodes[0] as TextNode)._rawText

  return;
}

compile();

// TODO remove any
function createElement(node: any, isFirst: boolean) {
  if(node.rawText.trim() === ''){
    return;
  }

  // @ts-ignore
  // TODO: why is rawTagName not available on interface?
  const tag = node.rawTagName;

  // TODO: figure out path to output file
  const file = 'test-out/index.js';
  let r = makeid(7);
  appendFileSync(file, `const ${r} = document.createElement('${tag}');\n`);
  appendFileSync(
    file,
    // @ts-ignore
    `${r}.textContent = '${node.rawText.trim()}';\n`
  );
  if (node.childNodes.length > 0) {
    node.childNodes.forEach((el) => {
      return createElement(el, false);
    });
  }
  if(isFirst){
    // TODO: refactor for generic root tags
    appendFileSync(
        file,
        `document.getElementById('root').appendChild(${r});\n`
    );
  }
}


function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
