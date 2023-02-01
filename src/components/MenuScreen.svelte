<script>
    import { onMount } from "svelte";
    import { cashReceiptJournal, salesJournal, purchaseJournal, cashDisbursementsJournal, generalJournal, startingCapital, state } from "../stores";

    /**
     * @type {any}
     */
    let salesJournalData;
    /**
     * @type {any}
     */
    let cashReceiptJournalData;
    /**
     * @type {any}
     */
    let purchaseJournalData;
    /**
     * @type {any}
     */
    let cashDisbursementsJournalData;
    /**
     * @type {any}
     */
    let generalJournalData;
    /**
     * @type {{date: String, inventory: Number}}
     */
     let startingCapitalData = {
        date: "",
        inventory: 0
    };

    /**
     * @type {number}
     */
    let currentState;

    salesJournal.subscribe(value => {
        salesJournalData = value;
    })
    cashReceiptJournal.subscribe(value => {
        cashReceiptJournalData = value;
    })
    purchaseJournal.subscribe(value => {
        purchaseJournalData = value;
    })
    cashDisbursementsJournal.subscribe(value => {
        cashDisbursementsJournalData = value;
    })
    generalJournal.subscribe(value => {
        generalJournalData = value;
    })
    startingCapital.subscribe(value => {
        startingCapitalData = value;
    })
    state.subscribe(value => currentState = value)

    let page = 0;
    /**
     * @type {any}
     */
    let database;
    
    onMount(() => {
        if(localStorage.getItem("database")) {
            database = JSON.parse(localStorage.getItem("database") || '[]');
        }
        else {
            database = [];
            localStorage.setItem("database", JSON.stringify(database));
        }
    });

    /**
     * @param {Number} index
     */
    function loadProject(index) {
        salesJournal.update(value => database[index].salesJournalData);
        cashReceiptJournal.update(value => database[index].cashReceiptJournalData);
        purchaseJournal.update(value => database[index].purchaseJournalData);
        cashDisbursementsJournal.update(value => database[index].cashDisbursementsJournalData);
        generalJournal.update(value => database[index].generalJournalData);
        startingCapital.update(value => database[index].startingCapitalData);
        page = 3;
        newProjectName = database[index].name;
        currentState = 1;
        state.update(value => currentState);
    }
    function saveProject() {
        let found = database.find((/** @type {any} */ data) => data.name == newProjectName);
        if(found) {
            let index = database.indexOf(found);
            database[index] = {
                name: newProjectName,
                salesJournalData: salesJournalData,
                cashReceiptJournalData: cashReceiptJournalData,
                purchaseJournalData: purchaseJournalData,
                cashDisbursementsJournalData: cashDisbursementsJournalData,
                generalJournalData: generalJournalData,
                startingCapitalData: startingCapitalData
            };
            console.log(database[index]);
        }
        else {
            database.push({
                name: newProjectName,
                salesJournalData: salesJournalData,
                cashReceiptJournalData: cashReceiptJournalData,
                purchaseJournalData: purchaseJournalData,
                cashDisbursementsJournalData: cashDisbursementsJournalData,
                generalJournalData: generalJournalData,
                startingCapitalData: {
                    date: newDate,
                    inventory: inventory
                }
            });
        }
        localStorage.setItem("database", JSON.stringify(database));
    }

    let newProjectName = "";
    let newDate = "";
    let inventory = 0;

    function createProject() {
        saveProject();
        loadProject(database.length - 1);
    }

</script>
<div class="options">
    <h2 style="display: inline; margin-right: 0.5rem">{newProjectName}</h2>
    <button on:click={saveProject}>Save</button>
    <button on:click={() => {
        location.reload();
    }}>Exit</button>
</div>
{#if page < 3}
<main>
    <div>
        {#if page == 0}
            <h1>Welcome</h1>
            <h2>What would you like to do?</h2>
            <div style="display:grid; place-items: center">
                <div>
                    <button on:click={() => page = 1}>Existing Projects</button>
                    <button on:click={() => page = 2}>New Project</button>
                </div>
            </div>
        {:else if page == 1}
            <h2>Projects List: </h2>
            {#if database.length}
                {#each database as data, i}
                    <li on:click={() => loadProject(i)}>{data.name}</li>
                {/each}
            {:else}
                <h3>There are no existing projects</h3>
            {/if}
        {:else if page == 2}
            <h2>New Project</h2>
            <form>
                <div>
                    <label for="name">Project Name: </label>
                    <input type="text" placeholder="Project Name" name="name" bind:value={newProjectName}>
                </div>
                <div>
                    <label for="date">Date: </label>
                    <input type="text" placeholder="Starting Date" name="date" bind:value={newDate}>
                </div>
                <div>
                    <label for="capital">Capital: </label>
                    <input type="number" placeholder="Starting Capital" name="capital" bind:value={inventory}>
                </div>
                <button on:click={createProject}>Save</button>
            </form>
        {/if}
    </div>
</main>
{/if}

<style>
    main {
        position: absolute;
        width: 100vw;
        height: 100vh;
        background-color: white;
        display: grid;
        place-items: center;
        z-index: 2;
    }
    h1 {
        text-align: center;
        font-size: 4rem;
        line-height: 4rem;
    }
    h2 {
        font-weight: normal;
        margin-bottom: 1rem;
    }
    button {
        border: none;
        border-radius: 8px;
        padding: 0.5rem 1rem;
        background-color: aquamarine;
        cursor: pointer;
        font-size: 1.1rem;
        transition: 0.15s ease-out;
        -webkit-font-smoothing: subpixel-antialiased;

    }
    button:last-child {
        background-color: rgb(255, 196, 0);
    }
    button:hover {
        transform: scale(0.9)
    }
    .options {
        position: absolute;
        top: 0;
        right: 0;
        margin: 1rem;
    }
    form label {
        font-size: 1.1rem;
    }
    form input{
        font-size: 1.1rem;
        border: none;
        border-bottom: 2px solid rgba(0, 0, 0, 0.5);
        padding: 0.25rem;
        margin-bottom: 0.5rem;
    }
    form input:focus {
        outline: none;
    }
    li {
        margin: 0.25rem 0;
        padding: 0.25rem 0.5rem;
        font-size: 1.2rem;
        transition: 0.15s ease-in-out;
        cursor: pointer;
    }
    li:hover {
        background-color: aquamarine;
    }
</style>