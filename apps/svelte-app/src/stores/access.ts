import { Writable, writable } from "svelte/store";
import { TokenData } from "@apps/core";

export const access: Writable<TokenData> = writable(null);