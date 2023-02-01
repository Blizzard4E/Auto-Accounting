<script>
    import { onMount } from "svelte";
    import { generalJournal } from "../stores";

    /**
     * @type {Array<{date: String, accountName: String, accountNameTo: String, explanation: String, debit: Number, credit: Number, debit2: Number, credit2: Number}>}
     */
     let generalJournalData = [];
    /**
     * @type {{date: String, accountName: String, accountNameTo: String, explanation: String, debit: Number, credit: Number, debit2: Number, credit2: Number}}
     */
    let data = {
        date: "",
        accountName: "Account Name",
        accountNameTo: "Other Account Name",
        explanation: "Explanation",
        debit: 0,
        credit: 0,
        debit2: 0,
        credit2: 0
    };

    generalJournal.subscribe(value => {
        generalJournalData = value;
    });

    onMount(() => {
        if(generalJournalData.length > index) {
            data = {
                date: generalJournalData[index].date,
                accountName: generalJournalData[index].accountName,
                accountNameTo: generalJournalData[index].accountNameTo,
                explanation: generalJournalData[index].explanation,
                debit: generalJournalData[index].debit,
                credit: generalJournalData[index].credit,
                debit2: generalJournalData[index].debit2,
                credit2: generalJournalData[index].credit2
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
    
    let editDate = false, editAccName = false, editAccNameTo = false, editExplain = false, editDebit = false, editCredit = false,editDebit2 = false, editCredit2 = false;

    /**
     * @type {HTMLInputElement}
     */
    let inputDate;
    /**
     * @type {HTMLInputElement}
     */
    let inputAccName;
    /**
     * @type {HTMLInputElement}
     */
     let inputAccNameTo; 
     /**
     * @type {HTMLInputElement}
     */
    let inputExplain; 
    /**
     * @type {HTMLInputElement}
     */
     let inputDebit; 
    /**
     * @type {HTMLInputElement}
     */
     let inputCredit; 
    /**
     * @type {HTMLInputElement}
     */
     let inputDebit2; 
    /**
     * @type {HTMLInputElement}
     */
     let inputCredit2; 

    function updateJournal() {
        // @ts-ignore
        generalJournalData[index] = data;
        // @ts-ignore
        generalJournal.update(value => generalJournalData);
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
<div class="col special">
    <div class="row" on:mouseleave={() => {
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
            <button on:click={() => editAccName = true}>
                {data.accountName}
            </button>
        {/if}
    </div>
    <div class="row" on:mouseleave={() => {
        if(!editAccNameTo) return;
        editAccNameTo = false;
        updateJournal();
    }}>
        {#if editAccNameTo}
            <form on:submit|preventDefault={() => {
                editAccNameTo = false;
                updateJournal();
            }}>
                <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                <input type="text" bind:value={data.accountNameTo} bind:this={inputAccNameTo} on:mouseover={() => {
                    inputAccNameTo.focus();
                    inputAccNameTo.select();
                }}>
            </form>
        {:else}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <button on:click={() => editAccNameTo = true}>
                {data.accountNameTo}
            </button>
        {/if}
    </div>
    <div class="row" on:mouseleave={() => {
        if(!editExplain) return;
        editExplain = false;
        updateJournal();
    }}>
        {#if editExplain}
            <form on:submit|preventDefault={() => {
                editExplain = false;
                updateJournal();
            }}>
                <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                <input type="text" bind:value={data.explanation} bind:this={inputExplain} on:mouseover={() => {
                    inputExplain.focus();
                    inputExplain.select();
                }}>
            </form>
        {:else}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <button on:click={() => editExplain = true}>
                {data.explanation}
            </button>
        {/if}
    </div>
</div>
<div class="col">
    <div class="row" on:mouseleave={() => {
        if(!editDebit) return;
        editDebit = false;
        updateJournal();
    }}>
        {#if editDebit}
            <form on:submit|preventDefault={() => {
                editDebit = false;
                updateJournal();
            }}>
                <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                <input type="number" bind:value={data.debit} bind:this={inputDebit} on:mouseover={() => {
                    inputDebit.focus();
                    inputDebit.select();
                }}>
            </form>
        {:else}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <button on:click={() => editDebit = true}>
                {#if data.debit}
                    ${data.debit}
                {/if}
            </button>
        {/if}
    </div>
    <div class="row" on:mouseleave={() => {
        if(!editDebit2) return;
        editDebit2 = false;
        updateJournal();
    }}>
        {#if editDebit2}
            <form on:submit|preventDefault={() => {
                editDebit2 = false;
                updateJournal();
            }}>
                <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                <input type="number" bind:value={data.debit2} bind:this={inputDebit2} on:mouseover={() => {
                    inputDebit2.focus();
                    inputDebit2.select();
                }}>
            </form>
        {:else}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <button on:click={() => editDebit2 = true}>
                {#if data.debit2}
                    ${data.debit2}
                {/if}
            </button>
        {/if}
    </div>
</div>
<div class="col">
    <div class="row" on:mouseleave={() => {
        if(!editCredit) return;
        editCredit = false;
        updateJournal();
    }}>
        {#if editCredit}
            <form on:submit|preventDefault={() => {
                editCredit = false;
                updateJournal();
            }}>
                <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                <input type="number" bind:value={data.credit} bind:this={inputCredit} on:mouseover={() => {
                    inputCredit.focus();
                    inputCredit.select();
                }}>
            </form>
        {:else}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <button on:click={() => editCredit = true}>
                {#if data.credit}
                    ${data.credit}
                {/if}
            </button>
        {/if}
    </div>
    <div class="row" on:mouseleave={() => {
        if(!editCredit2) return;
        editCredit2 = false;
        updateJournal();
    }}>
        {#if editCredit2}
            <form on:submit|preventDefault={() => {
                editCredit2 = false;
                updateJournal();
            }}>
                <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                <input type="number" bind:value={data.credit2} bind:this={inputCredit2} on:mouseover={() => {
                    inputCredit2.focus();
                    inputCredit2.select();
                }}>
            </form>
        {:else}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <button on:click={() => editCredit2 = true}>
                {#if data.credit2}
                    ${data.credit2}
                {/if}
            </button>
        {/if}
    </div>
</div>

<style>
    .col {
        border-right: 1px solid gray;
        border-bottom: 1px solid gray;
        padding: 0.25rem;
        transition: 0.25s;
        min-height: 2.5rem;
    }
    .row {
        display: grid;
        place-items: center;
        min-height: 2.5rem;
        width: 100%;
    }
    button {
        font-family: 'Poppins', sans-serif;
        font-size: 1rem;
        width: 100%;
        min-height: 2.5rem;
        border: none;
        background: none;
    }
    .special .row button {
        text-align: start;
    }
    .special .row:nth-child(2) button {
        margin-left: 10%;
        width: 90%;
    }
    .special .row:nth-child(3) button {
        font-style: italic;
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