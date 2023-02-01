<script>
    import SalesJournalRow from "./SalesJournalRow.svelte";
    import { onMount } from "svelte";
    import { generalJournal } from "../stores";
    import GeneralJournalRow from "./GeneralJournalRow.svelte";

    /**
     * @type {Array<{date: String, accountName: String, accountNameTo: String, explanation: String, debit: Number, credit: Number, debit2: Number, credit2: Number}>}
     */
    let generalJournalData = [];

    generalJournal.subscribe((value) => {
        generalJournalData = value;
    });

    onMount(() => {
        rows = generalJournalData.length;
    });

    /**
     * @type {number}
     */
    let rows;

    function updateJournal() {
        // @ts-ignore
        generalJournalData.length = rows;
        // @ts-ignore
        generalJournal.update((value) => generalJournalData);
    }
</script>

<main>
    <h1>General Journal</h1>
    <div class="table">
        <div class="col titles">Date</div>
        <div class="col titles">Account</div>
        <div class="col titles">Debit</div>
        <div class="col titles">Credit</div>
        {#each { length: rows } as row, i}
            <GeneralJournalRow index={i}/>
        {/each}
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
        width: 1000px;
    }
    .table {
        font-family: "Poppins", sans-serif;
        display: grid;
        grid-template-columns: repeat(4, auto);
        transition: 0.25s;
        border-left: 1px solid gray;
    }
    h1 {
        font-family: "Poppins", sans-serif;
        text-align: center;
        background-color: rgb(105, 209, 84);
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
