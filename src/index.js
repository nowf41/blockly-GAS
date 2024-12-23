import * as Blockly from 'blockly';
import {blocks_text} from './blocks/text';
import {blocks_http} from './blocks/http';
import {blocks_forms} from "./blocks/forms";
import {forBlock} from './generators/javascript';
import {javascriptGenerator} from 'blockly/javascript';
import {save, load} from './serialization';
import {toolbox} from './toolbox';
import './index.css';

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks_text);
Blockly.common.defineBlocks(blocks_http);
Blockly.common.defineBlocks(blocks_forms);
Object.assign(javascriptGenerator.forBlock, forBlock);

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById('generatedCode').firstChild;
const outputDiv = document.getElementById('output');
const blocklyDiv = document.getElementById('blocklyDiv');
const ws = Blockly.inject(blocklyDiv, {toolbox});

const runCode = () => {
  codeDiv.innerText = javascriptGenerator.workspaceToCode(ws);
};

load(ws);
runCode();

ws.addChangeListener((e) => {
  if (e.isUiEvent) return;
  save(ws);
});

document.querySelector('#project').addEventListener('input', () => {
  try {
  save(ws);
  load(ws, document.querySelector('#project').value ?? 'mainWorkspace');
  } catch(e) {
    alert(e);
  }
})

ws.addChangeListener(e => {
  if (
    e.isUiEvent ||
    e.type === Blockly.Events.FINISHED_LOADING ||
    ws.isDragging()
  ) {
    return;
  }
  runCode();
});

// disable blocks NOT contained by top-level blocks
ws.addChangeListener(Blockly.Events.disableOrphans);