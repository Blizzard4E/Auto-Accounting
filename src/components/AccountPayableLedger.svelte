<script>
    import { purchaseJournal, cashDisbursementsJournal, generalJournal } from "../stores";


    /**
     * @type {Array<{name: String, entries: Array<{date: String, debit: Number, credit: Number, balance: Number}>}>}
     */
    let accountPayData = [];

    /**
     * @type {Array<{date: String, accountName: String, dateInvoice: String, terms: String, accountPay: Number, inventory: Number, office: Number, other: Number}>}
     */
    let purchaseJournalData = [];

    /**
     * @type {Array<{date: String, payeeName: String, accountName: String, accountPay: Number, inventory: Number, cash: Number, other: Number}>}
     */
     let cashDisbursementsJournalData = [];
    /**
     * @type {Array<{date: String, accountName: String, accountNameTo: String, explanation: String, debit: Number, credit: Number, debit2: Number, credit2: Number}>}
     */
     let generalJournalData = [];

    /**
     * @param {Array<{date: String, debit: Number, credit: Number, balance: Number}>} arr
     */
    function sortByDates(arr) {
        // @ts-ignore
        return arr.sort((a, b) => new Date(a.date) - new Date(b.date));
    }   
    purchaseJournal.subscribe(value => {
        purchaseJournalData = value;
        updateJournal();
    });
    cashDisbursementsJournal.subscribe(value => {
        cashDisbursementsJournalData = value;
        updateJournal();
    });
    generalJournal.subscribe(value => {
        generalJournalData = value;
        updateJournal();
    })

    function updateJournal() {
        accountPayData = [];
        if(purchaseJournalData.length) {
            purchaseJournalData.forEach(entry => {
                if(entry.accountPay > 0) {
                    let accName = "";
                    if(entry.accountName.includes('/')) {
                        let arrName = [];
                        arrName = entry.accountName.split('/');
                        accName = arrName[1];
                    }
                    else {
                        accName = entry.accountName;
                    }
                    let found = accountPayData.find(account => account.name == accName);
                    if(found) {
                        let index = accountPayData.indexOf(found);
                        accountPayData[index].entries.push({
                            date: entry.date,
                            debit: 0,
                            credit: entry.accountPay,
                            balance: 0
                        })
                    }
                    else {
                        accountPayData.push({
                            name: accName,
                            entries: [
                                {
                                    date: entry.date,
                                    debit: 0,
                                    credit: entry.accountPay,
                                    balance: 0
                                }
                            ]
                        })
                    }
                }
            });
        }
        if(cashDisbursementsJournalData.length) {
            cashDisbursementsJournalData.forEach(entry => {
                if(entry.accountPay > 0) {
                    let found = accountPayData.find(account => account.name === entry.payeeName);
                    if(found) {
                        let index = accountPayData.indexOf(found);
                        accountPayData[index].entries.push({
                            date: entry.date,
                            debit: entry.accountPay,
                            credit: 0,
                            balance: 0
                        })
                    }
                    else {
                        accountPayData.push({
                            name: entry.payeeName,
                            entries: [
                                {
                                    date: entry.date,
                                    debit: entry.accountPay,
                                    credit: 0,
                                    balance: 0
                                }
                            ]
                        })
                    }
                }
            });
        }
        // if(generalJournalData.length) {
        //     generalJournalData.forEach(entry => {
        //         if(entry.accountName.includes("-")) {
        //             /**
        //              * @type {string[]}
        //              */
        //             let arrName = [];
        //             arrName = entry.accountName.split("-");
        //             let found = accountPayData.find(account => account.name === arrName[1]);
        //             let mainDebit = entry.debit;
        //             if(mainDebit == 0) mainDebit = entry.debit2;
        //             if(found) {
        //                 let index = accountPayData.indexOf(found);
        //                 accountPayData[index].entries.push({
        //                     date: entry.date,
        //                     debit: mainDebit,
        //                     credit: 0,
        //                     balance: 0
        //                 })
        //             }
        //             else {
        //                 accountPayData.push({
        //                     name: arrName[1],
        //                     entries: [
        //                         {
        //                             date: entry.date,
        //                             debit: mainDebit,
        //                             credit: 0,
        //                             balance: 0
        //                         }
        //                     ]
        //                 })
        //             }
        //         }
        //     });
        // }
        accountPayData.forEach(account => {
            account.entries = sortByDates(account.entries);
            for (let i = 0; i < account.entries.length; i++) {
                if(i == 0) {
                    account.entries[i].balance = account.entries[i].debit - account.entries[i].credit;
                }
                else {
                    account.entries[i].balance += account.entries[i-1].balance + account.entries[i].debit - account.entries[i].credit;
                }
            }
        })
    }
</script>

<main>
    <h1>Accounts Payable Ledger</h1>
    <div class="accounts">
        {#each accountPayData as account}
            <div class="account">
                <div class="name">
                    Customer Name
                    {#if account.name}
                        <h2>{account.name}</h2>
                    {:else}
                        <h2>Unknown</h2>
                    {/if}
                </div>
                <div class="table">
                    <div class="col titles">Date</div>
                    <div class="col titles">Debit</div>
                    <div class="col titles">Credit</div>
                    <div class="col titles">Balance</div>       
                    {#each account.entries as entry}
                        <div class="col">{entry.date}</div>
                        <div class="col">
                            {#if entry.debit}
                                ${entry.debit.toLocaleString('en', {useGrouping:true})}
                            {:else }
                                &nbsp
                            {/if}
                        </div>  
                        <div class="col">
                            {#if entry.credit}
                                ${entry.credit.toLocaleString('en', {useGrouping:true})}
                            {:else }
                                &nbsp
                            {/if}
                        </div>  
                        <div class="col">
                            {#if entry.balance < 0}
                                ${(-1 * entry.balance).toLocaleString('en', {useGrouping:true})}
                            {:else}
                                ${entry.balance.toLocaleString('en', {useGrouping:true})}
                            {/if}
                       </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</main>

<style>
    main {
        width: 450px;   
        border-right: 1px solid gray;
        border-bottom: 1px solid gray;
        border-left: 1px solid gray;    
    }
    .table {
        font-family: 'Poppins', sans-serif;
        display: grid;
        grid-template-columns: repeat(4, auto);
        transition: 0.25s;
        border-left: 1px solid gray;
    }
    h1 {
        font-size: 1.2rem;
        font-family: 'Poppins', sans-serif;
        text-align: center;
        background-color: rgb(0, 60, 255);
        color: white;
        padding: 0.5rem;
    }
    .account {
        background-color: rgb(255, 189, 47);
        margin: 0.5rem;
    }
    .name {
        display: flex;
        align-items: center;
        font-size: 0.9rem;
        padding: 0.25rem;
    }
    h2 {
        margin-left: 0.5rem;
        font-size: 1rem;
        background-color: white;
        padding: 0.25rem;
    }
    .titles.col {
        font-weight: bold;
    }
    .col {  
        background-color: rgb(255, 242, 186);   
        display: grid;
        place-items: center;         
        border-right: 1px solid gray;
        border-bottom: 1px solid gray;
        padding: 0.25rem;
    }
</style>