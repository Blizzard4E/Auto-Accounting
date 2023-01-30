<script>
    import SalesJournalRow from "./SalesJournalRow.svelte";
    import { onMount } from "svelte";
    import { purchaseJournal } from "../stores";
    import PurchaseJournalRow from "./PurchaseJournalRow.svelte";

    /**
     * @type {Array<{date: String, accountName: String, dateInvoice: String, terms: String, accountPay: Number, inventory: Number, office: Number, other: Number}>}
     */
    let purchaseJournalData = [];
    let accountPayTotal = 0;
    let inventoryTotal = 0;
    let officeTotal = 0;
    let otherTotal = 0;

    purchaseJournal.subscribe((value) => {
        purchaseJournalData = value;
        accountPayTotal = 0;
        inventoryTotal = 0;
        officeTotal = 0;
        otherTotal = 0;
        purchaseJournalData.forEach((entry) => {
            accountPayTotal += entry.accountPay;
            inventoryTotal += entry.inventory;
            officeTotal += entry.office;
            otherTotal += entry.other;
        });
    });

    onMount(() => {
        rows = purchaseJournalData.length;
    });

    /**
     * @type {number}
     */
    let rows;

    function updateJournal() {
        // @ts-ignore
        purchaseJournalData.length = rows;
        // @ts-ignore
        purchaseJournal.update((value) => purchaseJournalData);
    }
</script>

<main>
    <h1>Purchase Journal</h1>
    <div class="table">
        <div class="col titles">Date</div>
        <div class="col titles">Account</div>
        <div class="col titles">Date of Invoice</div>
        <div class="col titles">Terms</div>
        <div class="col titles">Account Payable Cr.</div>
        <div class="col titles">Inventory Dr.</div>
        <div class="col titles">Office Supplies Dr.</div>
        <div class="col titles">Other Accounts Dr.</div>
        {#each { length: rows } as row, i}
            <PurchaseJournalRow index={i} />
        {/each}
        {#if purchaseJournalData.length}
            <div class="col">
                {purchaseJournalData[purchaseJournalData.length - 1].date}
            </div>
            <div class="col">Totals</div>
            <div class="col"></div>
            <div class="col"></div>
            <div class="col">
                {#if accountPayTotal}
                    ${accountPayTotal}
                {/if}
            </div>
            <div class="col">
                {#if inventoryTotal}
                    ${inventoryTotal}
                {/if}
            </div>
            <div class="col">
                {#if officeTotal}
                    ${officeTotal}
                {/if}
            </div>
            <div class="col">
                {#if otherTotal}
                    ${otherTotal}
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
        grid-template-columns: repeat(8, auto);
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
