import { Ability, PureAbility } from "@casl/ability";
import { Aurelia, PLATFORM } from "aurelia-framework";

export async function configure(aurelia: Aurelia) {
  aurelia.use.plugin(PLATFORM.moduleName("@casl/aurelia"));
  aurelia.use.instance(PureAbility, new AppAbility());
}

class AppAbility extends Ability {}
