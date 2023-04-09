import * as core from "~/index";
import * as global from './shared-kernel'

declare module "@apps/core" {
  export { core, global }

}