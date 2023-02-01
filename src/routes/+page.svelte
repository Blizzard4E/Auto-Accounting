<script>
    import { state } from "../stores";
    import GeneralLedger from "../components/GeneralLedger.svelte";
    import AccountsReceivableLedger from "../components/AccountsReceivableLedger.svelte";
    import SalesJournal from "../components/SalesJournal.svelte";       
    import CashReceiptJournal from "../components/CashReceiptJournal.svelte";
    import AccountPayableLedger from "../components/AccountPayableLedger.svelte";
    import PurchaseJournal from "../components/PurchaseJournal.svelte";
    import CashDisbursementsJournal from "../components/CashDisbursementsJournal.svelte";
    import GeneralJournal from "../components/GeneralJournal.svelte";
    import MenuScreen from "../components/MenuScreen.svelte";
    let tab = 0;
    /**
     * @type {number}
     */
    let currentState;
    state.subscribe(value => currentState = value);

    /**
     * @param {number} index
     */
    function changeTab(index) {
        tab = index;
    }
</script>
<MenuScreen />
{#if currentState == 1}
<nav>
    <button on:click={() => changeTab(0)} class="sj" class:active={tab == 0}>Sales Journal</button>
    <button on:click={() => changeTab(1)} class="crj" class:active={tab == 1}>Cash Receipt Journal</button>
    <button on:click={() => changeTab(2)} class="pj" class:active={tab == 2}>Purchase Journal</button>
    <button on:click={() => changeTab(3)} class="cdj" class:active={tab == 3}>Cash Disbursement Journal</button>
    <button on:click={() => changeTab(4)} class="gj" class:active={tab == 4}>General Journal</button>
</nav>
<main>
    {#if tab == 0}
        <SalesJournal/>
    {:else if tab == 1}
        <CashReceiptJournal/>
    {:else if tab == 2}
        <PurchaseJournal/>
    {:else if tab == 3}
        <CashDisbursementsJournal/>
    {:else}
        <GeneralJournal/>
    {/if}
    <div style="width: 1000px;">
        <AccountsReceivableLedger/>
        <AccountPayableLedger/>
        <GeneralLedger/>
    </div>
</main>
{/if}


<style>
    main {
        padding: 1rem;
    }
    div {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;         
    }
    nav {
        display: flex;
    }
    button {
        border: none;
        padding: 0.25rem 0.5rem;
        color: white;
        filter: brightness(0.8);
    }
    .active {
        filter: brightness(1);
    }
    .sj {
        background-color: rgb(0, 174, 255);
    }
    .crj {
        background-color: rgb(171, 80, 255);
    }
    .pj {
        background-color: rgb(255, 61, 61);
    }
    .cdj {
        background-color: rgb(33, 110, 255);
    }
    .gj {
        background-color: rgb(105, 209, 84);
    }
</style>