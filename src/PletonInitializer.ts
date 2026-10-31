import {Decorator, PletonApplication} from "@pleton/core";

type Imports = { [key: string]: { [key: string]: any } }

export class PletonInitializer {
  public static init(imports: Imports) {
    const appDecoratedClasses = this.discover(imports, (target) => Decorator.getValue(target, "application", "is"))
    if (appDecoratedClasses.length !== 1) throw new Error("There is less/more than one class decorated with @Application()");

    const controllers = this.discover(imports, (target) => Decorator.getValue(target, "controller", "is"))
    const injectables = this.discover(imports, (target) => Decorator.getValue(target, "injectable", "is"))

    const [name, app] = appDecoratedClasses[0];

    const application = new app() as PletonApplication;
    void application.init(controllers, injectables)
  }

  private static discover(imports: Imports, check: (target: any) => boolean) {
    return Object.entries(imports).flatMap(([modId, exports]) => Object.entries(exports).filter(([, target]) => check(target)))
  }
}