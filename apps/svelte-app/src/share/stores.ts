import type { TokenData } from '@apps/core';
import { writable, type Writable } from 'svelte/store';

type ModalStore = { event?: string; id?: any; source?: any; index?: number };
type NotificationStore = { enable: boolean; type?: string; title?: string; msg?: string };

// Persists the User
export const access: Writable<TokenData> = writable(null);

// Persists the modal 'open' state
export const modal: Writable<ModalStore> = writable({});

// Persists the notify 'open' state
export const notification: Writable<NotificationStore> = writable({ enable: false });
