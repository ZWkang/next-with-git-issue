function registerSort() {
  this.stack = { label: [], state: [], any: [] };
}
registerSort.prototype.add = function(hookName, cb) {
  if (typeof hookName === "function") {
    hookName = null;
    cb = hookName;
  }
  if (hookName === null) {
    this.stack.any.push(cb);
    return this;
  }
  if (!this.stack.hookName) {
    this.stack[hookName] = [];
  }
  this.stack[hookName].push(cb);
  return this;
};
registerSort.prototype.remove = function(hookName, cb) {
  if (typeof hookName === "function") {
    hookName = null;
    cb = hookName;
  }
  let index;
  if (hookName === null) {
    index = this.stack.any.indexOf(cb);
  }

  if (!this.stack[hookName]) {
    console.warn(`not exist with hookName: ${hookName} cb: ${cb.toString()}`);
    return this;
  } else {
    index = this.stack[hookName].indexOf(cb);
  }
  if (index < 0) {
    console.warn(`cb: ${cb.toString()} not in  hookName: ${hookName} `);
    return this;
  }

  this.stack = this.stack.splice(index, 1);
  return this;
};

registerSort.prototype.emit = function(
  hookName,
  dataSource,
  callback = _ => _
) {
  if (typeof hookName !== "string") {
    console.warn(`${hookName} not string`);
    return this;
  }

  const tempStack = this.stack[hookName] || [];
  let index = 0;
  let len = tempStack.length;

  while (index < len) {
    dataSource = tempStack[index++](dataSource, index);
  }
  try {
    callback(dataSource);
  } catch (e) {
    console.warn(e.message);
  }

  return dataSource;
};

module.exports = registerSort;
