<script>
    import { onMount } from "svelte";
    import { salesJournal } from "../stores";

    /**
     * @type {Array<{date: String, accountDebited: String, accountReceivableDr: Number, salesCr: Number,costOfGoodsSoldDr: Number, inventoryCr: Number}>}
     */
    let salesJournalData = [];
    /**
     * @type {{date: String, accountDebited: String, accountReceivableDr: Number, salesCr: Number,costOfGoodsSoldDr: Number, inventoryCr: Number}}
     */
    let data = {
        date: "",
        accountDebited: "",
        accountReceivableDr: 0,     
        salesCr: 0,
        costOfGoodsSoldDr: 0,
        inventoryCr: 0
    };

    salesJournal.subscribe(value => {
        salesJournalData = value;
    });

    onMount(() => {
        if(salesJournalData.length > index) {
            data = {
                date: salesJournalData[index].date,
                accountDebited: salesJournalData[index].accountDebited,
                accountReceivableDr: salesJournalData[index].accountReceivableDr,
                salesCr: salesJournalData[index].salesCr,
                costOfGoodsSoldDr: salesJournalData[index].costOfGoodsSoldDr,
                inventoryCr: salesJournalData[index].inventoryCr
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
    
    let editDate = false, editAD = false, editAR = false, editCost  = false;

    /**
     * @type {HTMLInputElement}
     */
    let inputDate;
    /**
     * @type {HTMLInputElement}
     */
    let inputAD;
    /**
     * @type {HTMLInputElement}
     */
    let inputAR;
    /**
     * @type {HTMLInputElement}
     */
    let inputCost; 
    
    function updateJournal() {
        // @ts-ignore
        salesJournalData[index] = data;
        // @ts-ignore
        salesJournal.update(value => salesJournalData);
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
    if(!editAD) return;
    editAD = false;
    updateJournal();
}}>
    {#if editAD}
        <form on:submit|preventDefault={() => {
            editAD = false;
            updateJournal();
        }}>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <input type="text" bind:value={data.accountDebited} bind:this={inputAD} on:mouseover={() => inputAD.focus()}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editAD = true}>
            {data.accountDebited}
        </button>
    {/if}
</div>
<div class="col" on:mouseleave={() => {
    if(!editAR) return;
    editAR = false
    data.salesCr = data.accountReceivableDr;
    updateJournal();
}}>
    {#if editAR}
        <form on:submit|preventDefault={() => {
            editAR = false;
            data.salesCr = data.accountReceivableDr;
            updateJournal();
        }}>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <input type="number" min="1" step="any" bind:value={data.accountReceivableDr} bind:this={inputAR} on:mouseover={() => inputAR.focus()}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editAR = true}>
            {#if data.accountReceivableDr}
                ${data.accountReceivableDr}
            {/if}
        </button>
    {/if}
</div>
<div class="col" on:mouseleave={() => {
    if(!editCost) return;
    editCost = false
    data.inventoryCr = data.costOfGoodsSoldDr;
    updateJournal();
}}>
    {#if editCost}
        <form on:submit|preventDefault={() => {
            editCost = false;
            data.inventoryCr = data.costOfGoodsSoldDr;
            updateJournal();
        }}>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <input type="number" bind:value={data.costOfGoodsSoldDr} bind:this={inputCost} on:mouseover={() => inputCost.focus()}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editCost = true}>
            {#if data.costOfGoodsSoldDr}
                ${data.costOfGoodsSoldDr}
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