import { writable } from 'svelte/store';

export const salesJournal = writable([]);

export const cashReceiptJournal = writable([]);

export const purchaseJournal = writable([]);

export const cashDisbursementsJournal = writable([]);

export const generalJournal = writable([]);

export const startingCapital = writable({
    date: "",
    inventory: 0
});

export const state = writable(0);