<script>
    import { onMount } from "svelte";
    import { cashReceiptJournal } from "../stores";

    /**
     * @type {Array<{date: String, accountCredited: String, explanation: String, cashDr: Number, salesDiscount: Number,accountReceivableCr: Number, salesCr: Number, otherAccounts: Number, costOfGoodsSold: Number, inventoryCr: Number}>}
     */
    let cashReceiptJournalData = [];
    /**
     * @type {{date: String, accountCredited: String, explanation: String, cashDr: Number, salesDiscount: Number,accountReceivableCr: Number, salesCr: Number, otherAccounts: Number, costOfGoodsSold: Number, inventoryCr: Number}}
     */
    let data = {
        date: "",
        accountCredited: "",
        explanation: "",
        cashDr: 0,
        salesDiscount: 0,
        accountReceivableCr: 0,
        salesCr: 0,
        otherAccounts: 0,
        costOfGoodsSold: 0,
        inventoryCr: 0
    };

    cashReceiptJournal.subscribe(value => {
        cashReceiptJournalData = value;
    });

    onMount(() => {
        if(cashReceiptJournalData.length > index) {
            data = {
                date: cashReceiptJournalData[index].date,
                accountCredited: cashReceiptJournalData[index].accountCredited,
                explanation: cashReceiptJournalData[index].explanation,
                cashDr: cashReceiptJournalData[index].cashDr,
                salesDiscount: cashReceiptJournalData[index].salesDiscount,
                accountReceivableCr: cashReceiptJournalData[index].accountReceivableCr,
                salesCr: cashReceiptJournalData[index].salesCr,
                otherAccounts: cashReceiptJournalData[index].otherAccounts,
                costOfGoodsSold: cashReceiptJournalData[index].costOfGoodsSold,
                inventoryCr: cashReceiptJournalData[index].inventoryCr
            }
        }
        else {
            updateJournal();
        }
    })


    /**
     * @type {number}
     */
    export let index;
    
    let editDate = false, editAC = false, editExp = false,editCash = false, editSalesDis  = false, editAR = false, editSales = false, editOtherAcc = false, editCost = false;

    /**
     * @type {HTMLInputElement}
     */
    let inputDate;
    /**
     * @type {HTMLInputElement}
     */
    let inputAC;
    /**
     * @type {HTMLInputElement}
     */
    let inputExp;
    /**
     * @type {HTMLInputElement}
     */
    let inputCash;
    /**
     * @type {HTMLInputElement}
     */
    let inputSalesDis; 
    /**
     * @type {HTMLInputElement}
     */
    let inputAR; 
    /**
     * @type {HTMLInputElement}
     */
    let inputSales; 
    /**
     * @type {HTMLInputElement}
     */
    let inputOtherAcc; 
    /**
     * @type {HTMLInputElement}
     */
    let inputCost; 
    
    function updateJournal() {
        // @ts-ignore
        cashReceiptJournalData[index] = data;
        // @ts-ignore
        cashReceiptJournal.update(value => cashReceiptJournalData);
    }
</script>

<div class="col" on:mouseleave={() => {
    if(!editDate) return;
    editDate = false;
    updateJournal();
}}>
    {#if editDate}
        <form on:submit|preventDefault={() => {
            editDate = false;
            updateJournal();
        }}>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <input type="text" bind:value={data.date} bind:this={inputDate} on:mouseover={() => inputDate.focus()}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button on:click={() => editDate = true}>
            {data.date}
        </button>
    {/if}
</div>
<div class="col" on:mouseleave={() => {
    if(!editAC) return;
    editAC = false;
    updateJournal();
}}>
    {#if editAC}
        <form on:submit|preventDefault={() => {
            editAC = false;
            updateJournal();
        }}>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <input type="text" bind:value={data.accountCredited} bind:this={inputAC} on:mouseover={() => inputAC.focus()}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editAC = true}>
            {data.accountCredited}
        </button>
    {/if}
</div>
<div class="col" on:mouseleave={() => {
    if(!editExp) return;
    editExp = false;
    updateJournal();
}}>
    {#if editExp}
        <form on:submit|preventDefault={() => {
            editExp = false;
            updateJournal();
        }}>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <input type="text" bind:value={data.explanation} bind:this={inputExp} on:mouseover={() => inputExp.focus()}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editExp = true}>
            {data.explanation}
        </button>
    {/if}
</div>
<div class="col" on:mouseleave={() => {
    if(!editCash) return;
    editCash = false
    updateJournal();
}}>
    {#if editCash}
        <form on:submit|preventDefault={() => {
            editCash = false;
            updateJournal();
        }}>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <input type="number" min="1" step="any" bind:value={data.cashDr} bind:this={inputCash} on:mouseover={() => inputCash.focus()}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editCash = true}>
            {#if data.cashDr}
                ${data.cashDr}
            {/if}
        </button>
    {/if}
</div>
<div class="col" on:mouseleave={() => {
    if(!editSalesDis) return;
    editSalesDis = false;
    updateJournal();
}}>
    {#if editSalesDis}
        <form on:submit|preventDefault={() => {
            editSalesDis = false;
            updateJournal();
        }}>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <input type="number" min="1" step="any" bind:value={data.salesDiscount} bind:this={inputSalesDis} on:mouseover={() => inputSalesDis.focus()}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editSalesDis = true}>
            {#if data.salesDiscount}
                ${data.salesDiscount}
            {/if}
        </button>
    {/if}
</div>
<div class="col" on:mouseleave={() => {
    if(!editAR) return;
    editAR = false;
    updateJournal();
}}>
    {#if editAR}
        <form on:submit|preventDefault={() => {
            editAR = false;
            updateJournal();
        }}>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <input type="number" min="1" step="any" bind:value={data.accountReceivableCr} bind:this={inputAR} on:mouseover={() => inputAR.focus()}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editAR = true}>
            {#if data.accountReceivableCr}
                ${data.accountReceivableCr}
            {/if}
        </button>
    {/if}
</div>
<div class="col" on:mouseleave={() => {
    if(!editSales) return;
    editSales = false;
    updateJournal();
}}>
    {#if editSales}
        <form on:submit|preventDefault={() => {
            editSales = false;
            updateJournal();
        }}>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <input type="number" min="1" step="any" bind:value={data.salesCr} bind:this={inputSales} on:mouseover={() => inputSales.focus()}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editSales = true}>
            {#if data.salesCr}
                ${data.salesCr}
            {/if}
        </button>
    {/if}
</div>
<div class="col" on:mouseleave={() => {
    if(!editOtherAcc) return;
    editOtherAcc = false;
    updateJournal();
}}>
    {#if editOtherAcc}
        <form on:submit|preventDefault={() => {
            editOtherAcc = false;
            updateJournal();
        }}>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <input type="number" min="1" step="any" bind:value={data.otherAccounts} bind:this={inputOtherAcc} on:mouseover={() => inputOtherAcc.focus()}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editOtherAcc = true}>
            {#if data.otherAccounts}
                ${data.otherAccounts}
            {/if}
        </button>
    {/if}
</div>
<div class="col" on:mouseleave={() => {
    if(!editCost) return;
    editCost = false;
    data.inventoryCr = data.costOfGoodsSold;
    updateJournal();
}}>
    {#if editCost}
        <form on:submit|preventDefault={() => {
            editCost = false;
            data.inventoryCr = data.costOfGoodsSold;
            updateJournal();
        }}>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <input type="number" min="1" step="any" bind:value={data.costOfGoodsSold} bind:this={inputCost} on:mouseover={() => inputCost.focus()}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editCost = true}>
            {#if data.costOfGoodsSold}
                ${data.costOfGoodsSold}
            {/if}
        </button>
    {/if}
</div>

<style>
    .col {
        display: grid;
        place-items: center;
        border-right: 1px solid gray;
        border-bottom: 1px solid gray;
        padding: 0.25rem;
        transition: 0.25s;
        min-height: 2.5rem;
    }
    button {
        font-family: 'Poppins', sans-serif;
        font-size: 1rem;
        width: 100%;
        height: 100%;
        border: none;
        background: none;
    }
    form {
        width: 100%;
    }
    input {
        font-family: 'Poppins', sans-serif;
        font-size: 0.85rem;
        width: 100%;
        background-color: rgb(224, 224, 224);
        margin: 0;
        border: 1px solid gray;
        padding: 0.25rem;
        transition: 0.25s;
    }
    form:focus {
        outline: none
    }
    input:focus {
        outline: none
    }
    .name {
        place-items: start;
    }
    button:focus {
        outline: none
    }
</style>