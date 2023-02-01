<script>
    import { onMount } from "svelte";
    import { cashDisbursementsJournal } from "../stores";

    /**
     * @type {Array<{date: String, payeeName: String, accountName: String, accountPay: Number, inventory: Number, cash: Number, other: Number}>}
     */
     let cashDisbursementsJournalData = [];
    /**
     * @type {{date: String, payeeName: String, accountName: String, accountPay: Number, inventory: Number, cash: Number, other: Number}}
     */
    let data = {
        date: "",
        payeeName: "",
        accountName: "",
        cash: 0,
        accountPay: 0,
        inventory: 0,
        other: 0
    };

    cashDisbursementsJournal.subscribe(value => {
        cashDisbursementsJournalData = value;
    });

    onMount(() => {
        if(cashDisbursementsJournalData.length > index) {
            data = {
                date: cashDisbursementsJournalData[index].date,
                payeeName: cashDisbursementsJournalData[index].payeeName,
                accountName: cashDisbursementsJournalData[index].accountName,
                accountPay: cashDisbursementsJournalData[index].accountPay,
                inventory: cashDisbursementsJournalData[index].inventory,
                other: cashDisbursementsJournalData[index].other,
                cash: cashDisbursementsJournalData[index].cash
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
    
    let editDate = false, editPayee = false, editAccName = false, editAccPay = false, editInventory = false, editCash = false, editOther = false;

    /**
     * @type {HTMLInputElement}
     */
    let inputDate;
    /**
     * @type {HTMLInputElement}
     */
    let inputPayee;
    /**
     * @type {HTMLInputElement}
     */
    let inputAccName;
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
     let inputCash; 
    /**
     * @type {HTMLInputElement}
     */
     let inputOther; 

    function updateJournal() {
        // @ts-ignore
        cashDisbursementsJournalData[index] = data;
        // @ts-ignore
        cashDisbursementsJournal.update(value => cashDisbursementsJournalData);
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
            <input type="text" bind:value={data.date} bind:this={inputDate} on:mouseover={() => {
                inputDate.focus();
                inputDate.select();
            }}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button on:click={() => editDate = true}>
            {data.date}
        </button>
    {/if}
</div>
<div class="col" on:mouseleave={() => {
    if(!editPayee) return;
    editPayee = false;
    updateJournal();
}}>
    {#if editPayee}
        <form on:submit|preventDefault={() => {
            editPayee = false;
            updateJournal();
        }}>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <input type="text" bind:value={data.payeeName} bind:this={inputPayee} on:mouseover={() => {
                inputPayee.focus();
                inputPayee.select();
            }}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editPayee = true}>
            {data.payeeName}
        </button>
    {/if}
</div>
<div class="col" on:mouseleave={() => {
    if(!editAccName) return;
    editAccName = false;
    updateJournal();
}}>
    {#if editAccName}
        <form on:submit|preventDefault={() => {
            editAccName = false;
            updateJournal();
        }}>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <input type="text" bind:value={data.accountName} bind:this={inputAccName} on:mouseover={() => {
                inputAccName.focus();
                inputAccName.select();
            }}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editAccName = true}>
            {data.accountName}
        </button>
    {/if}
</div>
<div class="col" on:mouseleave={() => {
    if(!editCash) return;
    editCash = false;
    updateJournal();
}}>
    {#if editCash}
        <form on:submit|preventDefault={() => {
            editCash = false;
            updateJournal();
        }}>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <input type="number" bind:value={data.cash} bind:this={inputCash} on:mouseover={() => {
                inputCash.focus();
                inputCash.select();
            }}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editCash = true}>
            {#if data.cash}
                ${data.cash.toLocaleString('en', {useGrouping:true})}
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
            <input type="number" bind:value={data.inventory} bind:this={inputInventory} on:mouseover={() => {
                inputInventory.focus();
                inputInventory.select();
            }}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editInventory = true}>
            {#if data.inventory}
                ${data.inventory.toLocaleString('en', {useGrouping:true})}
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
            <input type="number" bind:value={data.other} bind:this={inputOther} on:mouseover={() => {
                inputOther.focus();
                inputOther.select();
            }}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editOther = true}>
            {#if data.other}
                ${data.other.toLocaleString('en', {useGrouping:true})}
            {/if}
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
            <input type="number" bind:value={data.accountPay} bind:this={inputAccPay} on:mouseover={() => {
                inputAccPay.focus();
                inputAccPay.select();
            }}>
        </form>
    {:else}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <button class="name" on:click={() => editAccPay = true}>
            {#if data.accountPay}
                ${data.accountPay.toLocaleString('en', {useGrouping:true})}
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