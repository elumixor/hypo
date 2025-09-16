import { EventEmitter } from "@elumixor/event-emitter";
import type { LoadingProgress } from "@elumixor/thrixi-resources";
import { Service } from "@engine";
import { resources } from "resources";

/** For now just logs progress */
export class ResourcesLoaderService extends Service {
  // fixme: This event will always fire before anyone subscribes to it
  // because we first load all services during init()
  // and only then they are available
  // See the comment lower in the code
  readonly loadProgress = new EventEmitter<LoadingProgress>();

  override async init() {
    await super.init();

    // Load resources
    this.log("LoaderService: Loading resources...");

    // We need different resources groups and to be able to wait for them.
    // So that we can have resources group per-scene, for example
    // We can also have different instances of ResourcesClass, of course,
    // But I think loadGroup("groupName") works better for this case
    // todo: update @elumixor/thrixi-resources package
    await resources.load((p) => {
      this.log(`Loaded asset: ${p.current.name}. Progress: ${p.percentage}%`);
      this.loadProgress.emit(p);
    });
    this.log("LoaderService initialized");
  }
}
