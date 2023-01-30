<script>
    import SalesJournalRow from "./SalesJournalRow.svelte";
    import { onMount } from "svelte";
    import { cashDisbursementsJournal } from "../stores";
    import CashDisbursementsJournalRow from "./CashDisbursementsJournalRow.svelte";

    /**
     * @type {Array<{date: String, payeeName: String, accountName: String, accountPay: Number, inventory: Number, cash: Number, other: Number}>}
     */
    let cashDisbursementsJournalData = [];
    let cashTotal = 0;
    let inventoryTotal = 0;
    let otherTotal = 0;
    let accountPayTotal = 0;

    cashDisbursementsJournal.subscribe((value) => {
        cashDisbursementsJournalData = value;
        cashTotal = 0;
        inventoryTotal = 0;
        otherTotal = 0;
        accountPayTotal = 0;
        cashDisbursementsJournalData.forEach((entry) => {
            accountPayTotal += entry.accountPay;
            inventoryTotal += entry.inventory;
            cashTotal += entry.cash;
            otherTotal += entry.other;
        });
    });

    onMount(() => {
        rows = cashDisbursementsJournalData.length;
    });

    /**
     * @type {number}
     */
    let rows;

    function updateJournal() {
        // @ts-ignore
        cashDisbursementsJournalData.length = rows;
        // @ts-ignore
        cashDisbursementsJournal.update((value) => cashDisbursementsJournalData);
    }
</script>

<main>
    <h1>Purchase Journal</h1>
    <div class="table">
        <div class="col titles">Date</div>
        <div class="col titles">Payee</div>
        <div class="col titles">Account Debited</div>
        <div class="col titles">Cash Cr.</div>
        <div class="col titles">Inventory Cr.</div>
        <div class="col titles">Other Accounts Dr.</div>
        <div class="col titles">Account Payable Dr.</div>
        {#each { length: rows } as row, i}
            <CashDisbursementsJournalRow index={i}/>
        {/each}
        {#if cashDisbursementsJournalData.length}
            <div class="col">
                {cashDisbursementsJournalData[cashDisbursementsJournalData.length - 1].date}
            </div>
            <div class="col">Totals</div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col">
                {#if cashTotal}
                    ${cashTotal}
                {/if}
            </div>
            <div class="col">
                {#if inventoryTotal}
                    ${inventoryTotal}
                {/if}
            </div>
            <div class="col">
                {#if otherTotal}
                    ${otherTotal}
                {/if}
            </div>
            <div class="col">
                {#if accountPayTotal}
                    ${accountPayTotal}
                {/if}
            </div>
            
        {/if}
    </div>
    <div class="options">
        <button on:click={() => rows++}>Add Row</button>
        <button
            on:click={() => {
                rows--;
                updateJournal();
            }}>Remove Row</button
        >
    </div>
</main>

<style>
    main {
        width: 1200px;
    }
    .table {
        font-family: "Poppins", sans-serif;
        display: grid;
        grid-template-columns: repeat(7, auto);
        transition: 0.25s;
        border-left: 1px solid gray;
    }
    h1 {
        font-family: "Poppins", sans-serif;
        text-align: center;
        background-color: rgb(255, 61, 61);
        color: white;
    }
    .titles.col {
        display: grid;
        place-items: center;
        border-right: 1px solid gray;
        border-bottom: 1px solid gray;
        padding: 0.25rem;
    }
    .col {
        display: grid;
        place-items: center;
        border-right: 1px solid gray;
        border-bottom: 1px solid gray;
        padding: 0.25rem;
        transition: 0.25s;
        min-height: 2.5rem;
    }
    .options {
        display: flex;
        justify-content: flex-end;
    }
    .options button {
        font-family: "Poppins", sans-serif;
        font-size: 0.85rem;
        margin: 0.25rem 0;
        margin-left: 0.5rem;
        padding: 0.5rem;
        background-color: rgb(236, 236, 236);
        border: none;
        transition: 0.15s;
    }
    .options button:hover {
        background-color: rgb(200, 200, 200);
    }
</style>
