import { FrameworkConfiguration, PLATFORM } from "aurelia-framework";

export function configure(config: FrameworkConfiguration): void {
  //config.globalResources([]);
  config.globalResources([PLATFORM.moduleName("./elements/loading-indicator")]);
}
