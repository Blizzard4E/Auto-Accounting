<script>
    import { cashReceiptJournal, salesJournal, purchaseJournal, cashDisbursementsJournal, startingCapital, generalJournal } from "../stores";
    /**
     * @type {Array<{date: String, accountDebited: String, accountReceivableDr: Number, salesCr: Number,costOfGoodsSoldDr: Number, inventoryCr: Number}>}
     */
    let salesJournalData = [];

    /**
     * @type {Array<{date: String, accountCredited: String, explanation: String, cashDr: Number, salesDiscount: Number,accountReceivableCr: Number, salesCr: Number, otherAccounts: Number, costOfGoodsSold: Number, inventoryCr: Number}>}
     */
    let cashReceiptJournalData = [];

    /**
     * @type {Array<{date: String, accountName: String, dateInvoice: String, terms: String, accountPay: Number, inventory: Number, office: Number, other: Number}>}
     */
     let purchaseJournalData = [];

    /**
     * @type {Array<{date: String, payeeName: String, accountName: String, accountPay: Number, inventory: Number, cash: Number, other: Number}>}
     */
    let cashDisbursementsJournalData = [];
    
    /**
     * @type {Array<{name: String, entries: Array<{date: String, debit: Number, credit: Number, balance: Number}>}>}
     */
    let generalLedgerData = [];
    /**
     * @type {Array<{date: String, accountName: String, accountNameTo: String, explanation: String, debit: Number, credit: Number, debit2: Number, credit2: Number}>}
     */
     let generalJournalData = [];

    generalJournal.subscribe((value) => {
        generalJournalData = value;
        updateJournal();
    });

    salesJournal.subscribe(value => {
        salesJournalData = value;
        updateJournal();
    });

    cashReceiptJournal.subscribe(value => {
        cashReceiptJournalData = value;
        updateJournal();
    });

    purchaseJournal.subscribe(value => {
        purchaseJournalData = value;
        updateJournal();
    });

    cashDisbursementsJournal.subscribe(value => {
        cashDisbursementsJournalData = value;
        updateJournal();
    });

    startingCapital.subscribe(value => {
        let startingCapitalData = value;
        generalLedgerData[1].entries.push({
            date: startingCapitalData.date,
            debit: startingCapitalData.inventory,
            credit: 0,
            balance: 0
        });
        generalLedgerData.forEach(account => {
            account.entries = sortByDates(account.entries);
            for (let i = 0; i < account.entries.length; i++) {
                account.entries[i].balance = 0;
                if(i == 0) {
                    account.entries[i].balance = account.entries[i].debit - account.entries[i].credit;
                }
                else {
                    account.entries[i].balance += account.entries[i-1].balance + account.entries[i].debit - account.entries[i].credit;
                }
            }
        })
    })

    /**
     * @param {Array<{date: String, debit: Number, credit: Number, balance: Number}>} arr
     */
     function sortByDates(arr) {
        // @ts-ignore
        return arr.sort((a, b) => new Date(a.date) - new Date(b.date));
    }   
    /**
     * @param {Date} date
     */
     function formatDate(date) {
        return date.toLocaleDateString('en', {
            month: 'short', day: 'numeric', 
        })
    }

    function updateJournal() {
        generalLedgerData = [
            {
                name: "Account Receivable",
                entries: []
            },
            {
                name: "Inventory",
                entries: []
            },
            {
                name: "Sales",
                entries: []
            },
            {
                name: "Costs of Goods Sold",
                entries: []
            },
            {
                name: "Cash",
                entries: []
            },
            {
                name: "Sales Discount",
                entries: []
            },
            {
                name: "Notes Payable",
                entries: []
            },
            {
                name: "Interest Revenue",
                entries: []
            },
            {
                name: "Account Payable",
                entries: []
            },
            {
                name: "Office Supplies",
                entries: []
            }
        ];
        if(salesJournalData.length) {
            let accountReceivableTotal = 0;
            let inventoryTotal = 0;
            let month = new Date(salesJournalData[0].date).getMonth();
            let lastDay = new Date(2022, month + 1, 0);
            
            salesJournalData.forEach(entry => {
                accountReceivableTotal += entry.accountReceivableDr;
                inventoryTotal += entry.inventoryCr;
            })
            generalLedgerData[0].entries.push({
                date: formatDate(lastDay),
                debit: accountReceivableTotal,
                credit: 0,
                balance: 0
            });
            generalLedgerData[1].entries.push({
                date: formatDate(lastDay),
                debit: 0,
                credit: inventoryTotal,
                balance: 0
            });
            generalLedgerData[2].entries.push({
                date: formatDate(lastDay),
                debit: 0,
                credit: accountReceivableTotal,
                balance: 0
            });
            generalLedgerData[3].entries.push({
                date: formatDate(lastDay),
                debit: inventoryTotal,
                credit: 0,
                balance: 0
            });
        }
        if(cashReceiptJournalData.length) {
            let cashTotal = 0;
            let salesDiscountTotal = 0;
            let accountReceivableTotal = 0;
            let salesTotal = 0;
            let costOfGoodsTotal = 0;
            let month = new Date(cashReceiptJournalData[0].date).getMonth();
            let lastDay = new Date(2022, month + 1, 0);

            cashReceiptJournalData.forEach(entry => {
                cashTotal += entry.cashDr;
                salesDiscountTotal += entry.salesDiscount;
                accountReceivableTotal += entry.accountReceivableCr;
                salesTotal += entry.salesCr;
                costOfGoodsTotal += entry.costOfGoodsSold;

                if(entry.accountCredited == "Notes Payable") {
                    generalLedgerData[6].entries.push({
                        date: entry.date,
                        debit: 0,
                        credit: entry.otherAccounts,
                        balance: 0
                    });
                }
                if(entry.accountCredited == "Interest Revenue") {
                    generalLedgerData[7].entries.push({
                        date: entry.date,
                        debit: 0,
                        credit: entry.otherAccounts,
                        balance: 0
                    });
                }
            })
            if(accountReceivableTotal > 0) {
                generalLedgerData[0].entries.push({
                    date: formatDate(lastDay),
                    debit: 0,
                    credit: accountReceivableTotal,
                    balance: 0
                });
            }
            
            if(salesTotal > 0) {
                generalLedgerData[2].entries.push({
                    date: formatDate(lastDay),
                    debit: 0,
                    credit: salesTotal,
                    balance: 0
                });
            }

            if(cashTotal > 0) {
                generalLedgerData[4].entries.push({
                    date: formatDate(lastDay),
                    debit: cashTotal,
                    credit: 0,
                    balance: 0
                });
            }

            if(salesDiscountTotal > 0) {
                generalLedgerData[5].entries.push({
                    date: formatDate(lastDay),
                    debit: salesDiscountTotal,
                    credit: 0,
                    balance: 0
                });
            }
            if(costOfGoodsTotal > 0) {
                generalLedgerData[3].entries.push({
                    date: formatDate(lastDay),
                    debit: costOfGoodsTotal,
                    credit: 0,
                    balance: 0
                });
                generalLedgerData[1].entries.push({
                    date: formatDate(lastDay),
                    debit: 0,
                    credit: costOfGoodsTotal,
                    balance: 0
                });
            }
        }
        if(purchaseJournalData.length) {
            let accountPayTotal = 0;
            let inventoryTotal = 0;
            let officeTotal = 0;
            let month = new Date(purchaseJournalData[0].date).getMonth();
            let lastDay = new Date(2022, month + 1, 0);
            purchaseJournalData.forEach(entry => {
                accountPayTotal += entry.accountPay;
                inventoryTotal += entry.inventory;
                officeTotal += entry.office;
                if(entry.other > 0) {
                    /**
                     * @type {string[]}
                     */
                    let arrName = [];
                    arrName = entry.accountName.split("/");
                    let found = generalLedgerData.find(account => account.name == arrName[0]);
                    if(found) {
                        let index = generalLedgerData.indexOf(found);
                        generalLedgerData[index].entries.push({
                            date: entry.date,
                            debit: entry.other,
                            credit: 0,
                            balance: 0
                        })
                    }
                    else {
                        generalLedgerData.push({
                            name: arrName[0],
                            entries: [
                                {
                                    date: entry.date,
                                    debit: entry.other,
                                    credit: 0,
                                    balance: 0
                                }
                            ]
                        })
                    }
                }
            })
            if(accountPayTotal > 0) {
                generalLedgerData[8].entries.push({
                    date: formatDate(lastDay),
                    debit: 0,
                    credit: accountPayTotal,
                    balance: 0
                })
            }
            if(inventoryTotal > 0) {
                generalLedgerData[1].entries.push({
                    date: formatDate(lastDay),
                    debit: inventoryTotal,
                    credit: 0,
                    balance: 0
                })
            }
            if(officeTotal > 0) {
                generalLedgerData[9].entries.push({
                    date: formatDate(lastDay),
                    debit: officeTotal,
                    credit: 0,
                    balance: 0
                })
            }
        }
        if(cashDisbursementsJournalData.length) {
            let accountPayTotal = 0;
            let inventoryTotal = 0;
            let cashTotal = 0;
            let month = new Date(cashDisbursementsJournalData[0].date).getMonth();
            let lastDay = new Date(2022, month + 1, 0);
            cashDisbursementsJournalData.forEach(entry => {
                accountPayTotal += entry.accountPay;
                inventoryTotal += entry.inventory;
                cashTotal += entry.cash;
                if(entry.other > 0 && entry.accountName != "Account Payable") {
                    let found = generalLedgerData.find(account => account.name === entry.accountName);
                    if(found) {
                        let index = generalLedgerData.indexOf(found);
                        generalLedgerData[index].entries.push({
                            date: entry.date,
                            debit: entry.other,
                            credit: 0,
                            balance: 0
                        })
                    }
                    else {
                        generalLedgerData.push({
                            name: entry.accountName,
                            entries: [
                                {
                                    date: entry.date,
                                    debit: entry.other,
                                    credit: 0,
                                    balance: 0
                                }
                            ]
                        })
                    }
                }
            })
            if(cashTotal > 0) {
                generalLedgerData[4].entries.push({
                    date: formatDate(lastDay),
                    debit: 0,
                    credit: cashTotal,
                    balance: 0
                })
            }
            if(inventoryTotal > 0) {
                generalLedgerData[1].entries.push({
                    date: formatDate(lastDay),
                    debit: 0,
                    credit: inventoryTotal,
                    balance: 0
                })
            }
            if(accountPayTotal > 0) {
                generalLedgerData[8].entries.push({
                    date: formatDate(lastDay),
                    debit: accountPayTotal,
                    credit: 0,
                    balance: 0
                })
            }
        }
        if(generalJournalData.length) {
            generalJournalData.forEach(entry => {
                if(entry.accountName.includes("-")) {
                    /**
                     * @type {string[]}
                     */
                    let arrName = [];
                    arrName = entry.accountName.split("-");
                    let found = generalLedgerData.find(account => account.name === arrName[0]);
                    let mainDebit = entry.debit;
                    if(mainDebit == 0) mainDebit = entry.debit2;
                    if(found) {
                        let index = generalLedgerData.indexOf(found);
                        generalLedgerData[index].entries.push({
                            date: entry.date,
                            debit: mainDebit,
                            credit: 0,
                            balance: 0
                        })
                    }
                    else {
                        generalLedgerData.push({
                            name: arrName[0],
                            entries: [
                                {
                                    date: entry.date,
                                    debit: mainDebit,
                                    credit: 0,
                                    balance: 0
                                }
                            ]
                        })
                    }
                }
                let found = generalLedgerData.find(account => account.name === entry.accountNameTo);
                let mainDebit = entry.debit;
                if(mainDebit == 0) mainDebit = entry.debit2;
                if(found) {
                    let index = generalLedgerData.indexOf(found);
                    generalLedgerData[index].entries.push({
                        date: entry.date,
                        debit: 0,
                        credit: mainDebit,
                        balance: 0
                    })
                }
                else {
                    generalLedgerData.push({
                        name: entry.accountNameTo,
                        entries: [
                            {
                                date: entry.date,
                                debit: 0,
                                credit: mainDebit,
                                balance: 0
                            }
                        ]
                    })
                }
            })
        }
        generalLedgerData.forEach(account => {
            account.entries = sortByDates(account.entries);
            for (let i = 0; i < account.entries.length; i++) {
                account.entries[i].balance = 0;
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
    <h1>General Ledger</h1>
    <div class="accounts">
        {#each generalLedgerData as account}
            {#if account.entries.length > 0}
            <div class="account">
                <div class="name">
                    <h2>{account.name}</h2>
                </div>
                <div class="table">
                    <div class="col titles">Date</div>
                    <div class="col titles">Debit</div>
                    <div class="col titles">Credit</div>
                    <div class="col titles">Balance</div>
                    {#each account.entries as entry}
                        <div class="col">
                            {#if entry.date != "Invalid Date"}
                                {entry.date}
                            {:else }
                                &nbsp
                            {/if}
                        </div>
                        <div class="col">
                            {#if entry.debit}
                                ${entry.debit.toLocaleString('en', {useGrouping:true})}
                            {/if}
                        </div>
                        <div class="col">
                            {#if entry.credit}
                                ${entry.credit.toLocaleString('en', {useGrouping:true})}
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
            {/if}
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
        background-color: rgb(47, 255, 158);
        margin: 0.5rem;
    }
    .name {
        display: grid;
        place-items: center;
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
        background-color: rgb(186, 255, 223);   
        display: grid;
        place-items: center;         
        border-right: 1px solid gray;
        border-bottom: 1px solid gray;
        padding: 0.25rem;
    }
    
    .account:nth-of-type(4n + 1) {
        background-color: rgb(248, 47, 255);
    }
    .account:nth-of-type(4n + 1) .col {
        background-color: rgb(248, 186, 255);  
    }
    .account:nth-of-type(4n + 2) {
        background-color: rgb(47, 224, 255);
    }
    .account:nth-of-type(4n + 2) .col {
        background-color: rgb(186, 241, 255);  
    }
    .account:nth-of-type(4n + 3) {
        background-color: rgb(47, 85, 255);
    }
    .account:nth-of-type(4n + 3) .col {
        background-color: rgb(186, 216, 255);  
    }
    .account:nth-of-type(4n + 4) {
        background-color: rgb(255, 47, 168);
    }
    .account:nth-of-type(4n + 4) .col {
        background-color: rgb(255, 186, 218);  
    }
    .account:nth-of-type(4n + 5) {
        background-color: rgb(255, 182, 47);
    }
    .account:nth-of-type(4n + 5) .col {
        background-color: rgb(255, 227, 186);  
    }
    .account:nth-of-type(4n + 6) {
        background-color: rgb(255, 113, 47);
    }
    .account:nth-of-type(4n + 6) .col {
        background-color: rgb(255, 188, 186);  
    }
</style>