<script>
    import SalesJournalRow from "./SalesJournalRow.svelte";
    import { onMount } from "svelte";
    import { salesJournal } from "../stores";

    /**
     * @type {Array<{date: String, accountDebited: String, accountReceivableDr: Number, salesCr: Number,costOfGoodsSoldDr: Number, inventoryCr: Number}>}
     */
    let salesJournalData = [];
    let debitTotal = 0;
    let creditTotal = 0;
    let month;
    /**
     * @type {Date}
     */
    let lastDay;


    salesJournal.subscribe(value => {
        salesJournalData = value;
        debitTotal = 0;
        creditTotal = 0;
        salesJournalData.forEach(entry => {
            debitTotal += entry.accountReceivableDr;
            creditTotal += entry.inventoryCr;
        });
        if(salesJournalData.length) {
            month = new Date(salesJournalData[0].date).getMonth();
            lastDay = new Date(2022, month + 1, 0);
        }
    });

    onMount(() => { 
        rows = salesJournalData.length;
        if(salesJournalData.length) {
            month = new Date(salesJournalData[0].date).getMonth();
            lastDay = new Date(2022, month + 1, 0);
        }
    })

    /**
     * @type {number}
     */
    let rows;

    function updateJournal() {
        // @ts-ignore
        salesJournalData.length = rows;
        // @ts-ignore   
        salesJournal.update(value => salesJournalData);
    }
    /**
     * @param {Date} date
     */
    function formatDate(date) {
        return date.toLocaleDateString('en', {
            month: 'short', day: 'numeric', 
        })
    }
</script>   

<main>
    <h1>Sales Journal</h1>
    <div class="table">
        <div class="col titles">Date</div>  
        <div class="col titles">Account Debited</div>               
        <div class="col titles">
            <div>Accounts Receivable Dr.</div>
            <div>Sales Cr.</div>
        </div>
        <div class="col titles">
            <div>Cost of Goods Sold Dr.</div>   
            <div>Inventory Cr.</div>
        </div>          
        {#each {length: rows} as row, i}
            <SalesJournalRow index={i}/>    
        {/each}
        {#if salesJournalData.length}
            <div class="col">
                {#if salesJournalData[0].date != ""}
                    {formatDate(lastDay)}
                {/if}
            </div>
            <div class="col">Totals</div>
            <div class="col">   
                {#if debitTotal}
                    ${debitTotal.toLocaleString('en', {useGrouping:true})}
                {/if}
            </div>
            <div class="col">
                {#if creditTotal}
                    ${creditTotal.toLocaleString('en', {useGrouping:true})}
                {/if}
            </div>
        {/if}
    </div>
    <div class="options">
        <button on:click={() => rows++}>Add Row</button>
        <button on:click={() => {
            rows--;
            updateJournal();
        }}>Remove Row</button>
    </div>
</main>

<style>
    main {
        width: 1000px;
    }
    .table {
        font-family: 'Poppins', sans-serif;
        display: grid;
        grid-template-columns: repeat(4, auto);
        transition: 0.25s;
        border-left: 1px solid gray;
    }
    h1 {
        font-family: 'Poppins', sans-serif;
        text-align: center;
        background-color: rgb(0, 174, 255);
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
        font-family: 'Poppins', sans-serif;
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