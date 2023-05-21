import { writable } from 'svelte/store';

interface Notification {
    id: number;
    type: string;
    message: string;
}

const notifications = writable<Notification[]>([]);

function addNotification(type: string, message: string) {
    const id = Date.now();
    notifications.update((current) => [...current, { id, type, message }]);

    setTimeout(() => {
        removeNotification(id);
    }, 5000);
}

function removeNotification(id: number) {
    notifications.update((current) => current.filter((n) => n.id !== id));
}

export default {
    subscribe: notifications.subscribe,
    add: addNotification,
    remove: removeNotification,
};
