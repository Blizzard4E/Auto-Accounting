<script>
    import CashReceiptJournalRow from "./CashReceiptJournalRow.svelte";
    import { onMount } from "svelte";
    import { cashReceiptJournal } from "../stores";

    /**
     * @type {Array<{date: String, accountCredited: String, explanation: String, cashDr: Number, salesDiscount: Number,accountReceivableCr: Number, salesCr: Number, otherAccounts: Number, costOfGoodsSold: Number, inventoryCr: Number}>}
     */
    let cashReceiptJournalData = [];
    let cashTotal = 0;
    let salesDisTotal = 0;
    let ARTotal = 0;
    let salesTotal = 0;
    let otherAccTotal = 0;
    let costOfGoodsSoldTotal = 0;

    cashReceiptJournal.subscribe(value => {
        cashReceiptJournalData = value;
        cashTotal = 0;
        salesDisTotal = 0;
        ARTotal = 0;
        salesTotal = 0;
        otherAccTotal = 0;
        costOfGoodsSoldTotal = 0;
        cashReceiptJournalData.forEach(entry => {
            cashTotal += entry.cashDr;
            salesDisTotal += entry.salesDiscount;
            ARTotal += entry.accountReceivableCr;
            salesTotal += entry.salesCr;
            otherAccTotal += entry.otherAccounts;
            costOfGoodsSoldTotal += entry.costOfGoodsSold;
        });
    });

    onMount(() => { 
        rows = cashReceiptJournalData.length;
    })

    /**
     * @type {number}
     */
    let rows;

    function updateJournal() {
        // @ts-ignore
        cashReceiptJournalData.length = rows;
        // @ts-ignore   
        cashReceiptJournal.update(value => cashReceiptJournalData);
    }
</script>   

<main>
    <h1>Cash Receipt Journal</h1>
    <div class="table">
        <div class="col titles">Date</div>  
        <div class="col titles">Account Credited</div>               
        <div class="col titles">Explanation</div>
        <div class="col titles">Cash Dr.</div>  
        <div class="col titles">Sales Discount Dr.</div>   
        <div class="col titles">Account Receivable Cr.</div>    
        <div class="col titles">Sales Cr.</div>    
        <div class="col titles">Other Accounts Cr.</div> 
        <div class="col titles">
            <div>Cost of Goods Sold Dr.</div>
            <div>Inventory Cr.</div>
        </div> 
        {#each {length: rows} as row, i}
            <CashReceiptJournalRow index={i}/>    
        {/each}
        {#if cashReceiptJournalData.length}
            <div class="col">{cashReceiptJournalData[cashReceiptJournalData.length - 1].date}</div>
            <div class="col">Totals</div>
            <div class="col"></div>
            <div class="col">   
                {#if cashTotal}
                    ${cashTotal}
                {/if}
            </div>
            <div class="col">   
                {#if salesDisTotal}
                    ${salesDisTotal}
                {/if}
            </div>
            <div class="col">   
                {#if ARTotal}
                    ${ARTotal}
                {/if}
            </div>
            <div class="col">   
                {#if salesTotal}
                    ${salesTotal}
                {/if}
            </div>
            <div class="col">   
                {#if otherAccTotal}
                    ${otherAccTotal}
                {/if}
            </div>
            <div class="col">   
                {#if costOfGoodsSoldTotal}
                    ${costOfGoodsSoldTotal}
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
        width: 1400px;
    }
    .table {
        font-family: 'Poppins', sans-serif;
        display: grid;
        grid-template-columns: repeat(9, auto);
        transition: 0.25s;
        border-left: 1px solid gray;
    }
    h1 {
        font-family: 'Poppins', sans-serif;
        text-align: center;
        background-color: rgb(171, 80, 255);
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