import {Decorator} from "@pleton/core";

export class PletonInitializer {
  public static init(imports: { [key: string]: any }) {
    const appDecoratedClasses = Object.entries(imports).filter(([, target]) => Decorator.getValue(target, "application"))
    if (appDecoratedClasses.length !== 1) throw new Error("There is less/more than one class decorated with @Application()");

    const [name, app] = appDecoratedClasses[0];
    new app().run();
  }
}