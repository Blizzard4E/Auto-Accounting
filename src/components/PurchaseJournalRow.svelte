<script>
    import { onMount } from "svelte";
    import { purchaseJournal } from "../stores";

    /**
     * @type {Array<{date: String, accountName: String, dateInvoice: String, terms: String, accountPay: Number, inventory: Number, office: Number, other: Number}>}
     */
    let purchaseJournalData = [];
    /**
     * @type {{date: String, accountName: String, dateInvoice: String, terms: String, accountPay: Number, inventory: Number, office: Number, other: Number}}
     */
    let data = {
        date: "",
        accountName: "",
        dateInvoice: "",
        terms: "",
        accountPay: 0,
        inventory: 0,
        office: 0,
        other: 0
    };

    purchaseJournal.subscribe(value => {
        purchaseJournalData = value;
    });

    onMount(() => {
        if(purchaseJournalData.length > index) {
            data = {
                date: purchaseJournalData[index].date,
                accountName: purchaseJournalData[index].accountName,
                dateInvoice: purchaseJournalData[index].dateInvoice,
                terms: purchaseJournalData[index].terms,
                accountPay: purchaseJournalData[index].accountPay,
                inventory: purchaseJournalData[index].inventory,
                office: purchaseJournalData[index].office,
                other: purchaseJournalData[index].other
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
    
    let editDate = false, editName = false, editInvoice = false, editTerm = false, editAccPay = false, editInventory = false, editOffice = false, editOther = false;

    /**
     * @type {HTMLInputElement}
     */
    let inputDate;
    /**
     * @type {HTMLInputElement}
     */
    let inputName;
    /**
     * @type {HTMLInputElement}
     */
    let inputInvoice;
    /**
     * @type {HTMLInputElement}
     */
    let inputTerm; 
    /**
     * @type {HTMLInputElement}
     */
     let inputAccPay; 
     /**
     * @type {HTMLInputElement}
     */
    let inputInventory; 
    /**
     * @type {HTMLInputElement}
     */
     let inputOffice; 
    /**
     * @type {HTMLInputElement}
     */
     let inputOther; 

    function updateJournal() {
        // @ts-ignore
        purchaseJournalData[index] = data;
        // @ts-ignore
        purchaseJournal.update(value => purchaseJournalData);
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
    if(!editName) return;
    editName = false;
    updateJournal();
}}>
    {#if editName}
        <form on:submit|preventDefault={() => {
            editName = false;
            updateJournal();
        }}>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <input type="text" bind:value={data.accountName} bind:this={inputName} on:mouseover={() => inputName.focus()}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editName = true}>
            {data.accountName}
        </button>
    {/if}
</div>
<div class="col" on:mouseleave={() => {
    if(!editInvoice) return;
    editInvoice = false;
    updateJournal();
}}>
    {#if editInvoice}
        <form on:submit|preventDefault={() => {
            editInvoice = false;
            updateJournal();
        }}>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <input type="text" bind:value={data.dateInvoice} bind:this={inputInvoice} on:mouseover={() => inputInvoice.focus()}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editInvoice = true}>
            {data.dateInvoice}
        </button>
    {/if}
</div>
<div class="col" on:mouseleave={() => {
    if(!editTerm) return;
    editTerm = false;
    updateJournal();
}}>
    {#if editTerm}
        <form on:submit|preventDefault={() => {
            editTerm = false;
            updateJournal();
        }}>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <input type="text" bind:value={data.terms} bind:this={inputTerm} on:mouseover={() => inputTerm.focus()}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editTerm = true}>
            {data.terms}
        </button>
    {/if}
</div>
<div class="col" on:mouseleave={() => {
    if(!editAccPay) return;
    editAccPay = false;
    updateJournal();
}}>
    {#if editAccPay}
        <form on:submit|preventDefault={() => {
            editAccPay = false;
            updateJournal();
        }}>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <input type="number" bind:value={data.accountPay} bind:this={inputAccPay} on:mouseover={() => inputAccPay.focus()}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editAccPay = true}>
            {#if data.accountPay}
                ${data.accountPay}
            {/if}
        </button>
    {/if}
</div>
<div class="col" on:mouseleave={() => {
    if(!editInventory) return;
    editInventory = false;
    updateJournal();
}}>
    {#if editInventory}
        <form on:submit|preventDefault={() => {
            editInventory = false;
            updateJournal();
        }}>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <input type="number" bind:value={data.inventory} bind:this={inputInventory} on:mouseover={() => inputInventory.focus()}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editInventory = true}>
            {#if data.inventory}
                ${data.inventory}
            {/if}
        </button>
    {/if}
</div>
<div class="col" on:mouseleave={() => {
    if(!editOffice) return;
    editOffice = false;
    updateJournal();
}}>
    {#if editOffice}
        <form on:submit|preventDefault={() => {
            editOffice = false;
            updateJournal();
        }}>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <input type="number" bind:value={data.office} bind:this={inputOffice} on:mouseover={() => inputOffice.focus()}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editOffice = true}>
            {#if data.office}
                ${data.office}
            {/if}
        </button>
    {/if}
</div>
<div class="col" on:mouseleave={() => {
    if(!editOther) return;
    editOther = false;
    updateJournal();
}}>
    {#if editOther}
        <form on:submit|preventDefault={() => {
            editOther = false;
            updateJournal();
        }}>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <input type="number" bind:value={data.other} bind:this={inputOther} on:mouseover={() => inputOther.focus()}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editOther = true}>
            {#if data.other}
                ${data.other}
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