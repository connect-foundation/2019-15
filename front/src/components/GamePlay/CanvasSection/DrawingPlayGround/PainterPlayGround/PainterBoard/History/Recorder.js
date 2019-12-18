const DEFAULT_LIMIT = 20;

class Recorder {
  constructor(limit = DEFAULT_LIMIT) {
    this.limit = limit;
    this.undoList = [];
    this.redoList = [];
  }

  addDo(obj) {
    if (this.isUndoListFull()) this.undoList.shift();

    this.undoList.push(obj);
  }

  undo() {
    if (!this.undoable()) return null;

    if (this.isRedoListFull()) this.redoList.shift();

    const unDone = this.undoList.pop();
    this.redoList.push(unDone);
    return unDone;
  }

  redo() {
    if (!this.redoable()) return null;

    if (this.isUndoListFull()) this.undoList.shift();

    const reDone = this.redoList.pop();
    this.undoList.push(reDone);
    return reDone;
  }

  isUndoListFull() {
    return this.undoList.length === this.limit;
  }

  isRedoListFull() {
    return this.redoList.length === this.limit;
  }

  undoable() {
    return !!this.undoList.length;
  }

  redoable() {
    return !!this.redoList.length;
  }

  clear() {
    this.undoList = [];
    this.redoList = [];
  }
}

export default Recorder;
