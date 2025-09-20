/**
 * Behavior Tree Framework
 *
 * A reactive AI system based on behavior trees for dynamic decision making.
 * Provides a descriptive system that could support visual editing.
 */

export enum NodeStatus {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  RUNNING = "RUNNING",
}

/**
 * Base class for all behavior tree nodes
 */
export abstract class BTNode {
  protected _status = NodeStatus.FAILURE;

  get status() {
    return this._status;
  }

  abstract execute(dt: number): NodeStatus;

  reset() {
    this._status = NodeStatus.FAILURE;
  }
}

/**
 * Condition nodes - evaluate to SUCCESS or FAILURE
 */
export abstract class BTCondition extends BTNode {
  abstract evaluate(): boolean;

  execute(): NodeStatus {
    this._status = this.evaluate() ? NodeStatus.SUCCESS : NodeStatus.FAILURE;
    return this._status;
  }
}

/**
 * Action nodes - perform some action and return status
 */
export abstract class BTAction extends BTNode {
  abstract perform(dt: number): NodeStatus;

  execute(dt: number): NodeStatus {
    this._status = this.perform(dt);
    return this._status;
  }
}

/**
 * Composite nodes - have child nodes
 */
export abstract class BTComposite extends BTNode {
  protected children: BTNode[] = [];

  addChild(child: BTNode) {
    this.children.push(child);
    return this;
  }

  override reset() {
    super.reset();
    for (const child of this.children) {
      child.reset();
    }
  }
}

/**
 * Selector - executes children until one succeeds (OR logic)
 */
export class BTSelector extends BTComposite {
  private currentChildIndex = 0;

  execute(dt: number): NodeStatus {
    while (this.currentChildIndex < this.children.length) {
      const child = this.children[this.currentChildIndex];
      if (!child) break;
      const status = child.execute(dt);

      if (status === NodeStatus.SUCCESS) {
        this._status = NodeStatus.SUCCESS;
        this.currentChildIndex = 0;
        return this._status;
      }

      if (status === NodeStatus.RUNNING) {
        this._status = NodeStatus.RUNNING;
        return this._status;
      }

      // FAILURE - try next child
      this.currentChildIndex++;
    }

    // All children failed
    this._status = NodeStatus.FAILURE;
    this.currentChildIndex = 0;
    return this._status;
  }

  override reset() {
    super.reset();
    this.currentChildIndex = 0;
  }
}

/**
 * Sequence - executes children until one fails (AND logic)
 */
export class BTSequence extends BTComposite {
  private currentChildIndex = 0;

  execute(dt: number): NodeStatus {
    while (this.currentChildIndex < this.children.length) {
      const child = this.children[this.currentChildIndex];
      if (!child) break;
      const status = child.execute(dt);

      if (status === NodeStatus.FAILURE) {
        this._status = NodeStatus.FAILURE;
        this.currentChildIndex = 0;
        return this._status;
      }

      if (status === NodeStatus.RUNNING) {
        this._status = NodeStatus.RUNNING;
        return this._status;
      }

      // SUCCESS - move to next child
      this.currentChildIndex++;
    }

    // All children succeeded
    this._status = NodeStatus.SUCCESS;
    this.currentChildIndex = 0;
    return this._status;
  }

  override reset() {
    super.reset();
    this.currentChildIndex = 0;
  }
}

/**
 * Decorator - wraps a single child node
 */
export abstract class BTDecorator extends BTNode {
  constructor(protected child: BTNode) {
    super();
  }

  override reset() {
    super.reset();
    this.child.reset();
  }
}

/**
 * Inverter - inverts the result of its child
 */
export class BTInverter extends BTDecorator {
  execute(dt: number): NodeStatus {
    const status = this.child.execute(dt);

    if (status === NodeStatus.RUNNING) {
      this._status = NodeStatus.RUNNING;
    } else if (status === NodeStatus.SUCCESS) {
      this._status = NodeStatus.FAILURE;
    } else {
      this._status = NodeStatus.SUCCESS;
    }

    return this._status;
  }
}

/**
 * Repeat - repeats its child a certain number of times or until failure
 */
export class BTRepeat extends BTDecorator {
  private executionCount = 0;

  constructor(
    child: BTNode,
    private readonly maxExecutions = Infinity,
  ) {
    super(child);
  }

  execute(dt: number): NodeStatus {
    if (this.executionCount >= this.maxExecutions) {
      this._status = NodeStatus.SUCCESS;
      return this._status;
    }

    const status = this.child.execute(dt);

    if (status === NodeStatus.RUNNING) {
      this._status = NodeStatus.RUNNING;
    } else {
      this.executionCount++;
      this.child.reset();

      if (status === NodeStatus.FAILURE) {
        this._status = NodeStatus.FAILURE;
      } else if (this.executionCount >= this.maxExecutions) {
        this._status = NodeStatus.SUCCESS;
      } else {
        this._status = NodeStatus.RUNNING;
      }
    }

    return this._status;
  }

  override reset() {
    super.reset();
    this.executionCount = 0;
  }
}
