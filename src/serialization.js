import * as Blockly from 'blockly/core';

let storageKey = window.localStorage.getItem('.recent_key');
window.nowStorageKey = storageKey;

/**
 * Saves the state of the workspace to browser's local storage.
 * @param {Blockly.Workspace} workspace Blockly workspace to save.
 */
export const save = function (workspace) {
  const data = Blockly.serialization.workspaces.save(workspace);
  window.localStorage?.setItem(storageKey, JSON.stringify(data));
};

/**
 * Loads saved state from local storage into the given workspace.
 * @param {Blockly.Workspace} workspace Blockly workspace to load into.
 */
export const load = function (workspace, strKey = storageKey) {
  let data = window.localStorage?.getItem(strKey);
  window.nowStorageKey = strKey;
  storageKey = strKey;
  if (!data) data = '{}';
  window.localStorage.setItem('.recent_key', strKey);

  // Don't emit events during loading.
  Blockly.Events.disable();
  Blockly.serialization.workspaces.load(JSON.parse(data), workspace, false);
  Blockly.Events.enable();
};
