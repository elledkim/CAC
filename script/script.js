// variables
const balance = document.getElementById("spendings-balance");
const spendingsBar = document.getElementById("spendings-bar");
const spendingsFill = document.getElementById("spendings-fill");

const balance2 = document.getElementById("savings-balance");
const savingsBar = document.getElementById("savings-bar");
const savingsFill = document.getElementById("savings-fill");

const interestRate = 0.15 / 365;

var bankBalance = 100;
var savingsBalance = 100;

let goalSpendings = 1000;
let goalSavings = 1000;

let purchaseCount = 0;

if (localStorage.getItem('purchaseCount') > 0) {
    purchaseCount = localStorage.getItem('purchaseCount');
}
else {
    localStorage.setItem('purchaseCount', 0);
}

let intSum = 0;
if (localStorage.getItem('intSum') > 0) {
    intSum = localStorage.getItem('purchaseCount');
}
else {
    localStorage.setItem('intSum', 0);
}

let rightSplit = 0;
if (localStorage.getItem('rightSplit') > 0) {
    rightSplit = localStorage.getItem("rightSplit");
}
else {
    localStorage.setItem("rightSplit", 0);
}

let depCount = 0;
if (localStorage.getItem('depCount') > 0) {
    rightSplit = localStorage.getItem("depCount");
}
else {
    localStorage.setItem("depCount", 0);
}

//POPUP variables

// initialization (local storage)
if (localStorage.getItem('balance') != 100) {
    bankBalance = localStorage.getItem('balance');
}
else {
    localStorage.setItem('balance', 100.0);
}
if (localStorage.getItem('savingsBalance') != 100) {
    savingsBalance = localStorage.getItem('savingsBalance');
}
else {
    localStorage.setItem('savingsBalance', 100.0);
}

//these are just to make my life easier
if (localStorage.getItem('balance') == 0) {
    localStorage.setItem('balance', 50);
}
if (isNaN(localStorage.getItem('balance'))) {
    localStorage.setItem('balance', 50);
}
if (isNaN(localStorage.getItem('savingsBalance'))) {
    localStorage.setItem('savingsBalance', 50);
}

if(parseFloat(localStorage.getItem('balance'))>1000) {
    localStorage.setItem('balance', 50);
}
if(parseFloat(localStorage.getItem('savingsBalance'))>1000) {
    localStorage.setItem('savingsBalance', 50);

}

function updateAll() {
    updateBalance();
    updateSavings()
    updateSpendingsBar();
    updateSavingsBar()
}

//update nav when reload
updateAll();


//debugging
// console.log(bankBalance);
// console.log(savingsBalance)


// SPENDINGS FUNCTIONS
function increaseBalance(amount) {
    localStorage.getItem('balance') += amount;
    balance.textContent = "$" + localStorage.getItem('balance');
    bankBalance = localStorage.getItem('balance')
    updateSpendingsBar();
}

function updateSpendingsBar() {
    const progress1 = (bankBalance / goalSpendings) * 100;
    spendingsFill.style.width = progress1 + "%";
}

function updateBalance() {
    localStorage.setItem('balance', (parseFloat(localStorage.getItem('balance'))).toFixed(2))
    balance.textContent = "$" + localStorage.getItem('balance');
    bankBalance = localStorage.getItem('balance')
}



// SAVINGS FUNCTIONS
function increaseSavings(amount) {
    localStorage.getItem('savingsBalance') += amount;
    balance2.textContent = "$" + localStorage.getItem('savingsBalance');
    savingsBalance = localStorage.getItem('savingsBalance')
    updateSavingsBar();
}

function updateSavingsBar() {
    const progress2 = (savingsBalance / goalSavings) * 100;
    savingsFill.style.width = progress2 + "%";

}

function updateSavings() {
    localStorage.setItem('savingsBalance', (parseFloat(localStorage.getItem('savingsBalance'))).toFixed(2))
    balance2.textContent = "$" + localStorage.getItem('savingsBalance');
    savingsBalance = localStorage.getItem('savingsBalance');
}


// POPUP
if (document.body.className.match("indexP")) {
    const popUpShown = sessionStorage.getItem("popUpShown");
    const closePopup = document.getElementById("close-popup");

    document.addEventListener("DOMContentLoaded", function () {
        const popup = document.getElementById("popup");
        const closePopup = document.getElementById("close-popup");

        if (!localStorage.getItem("popupClosed")) {
            popup.style.display = "block";
        }

        closePopup.addEventListener("click", function () {
            popup.style.display = "none";
            // localStorage.setItem("popupClosed", "true");
        });
    });

    closePopup.addEventListener("click", function () {
        popup.style.display = "none";
        // sessionStorage.setItem("popUpShown", "true");
    });

    const daysInput = document.getElementById("daysInput");

    calculateEarnings.addEventListener("click", function () {
        const days = parseInt(daysInput.value, 10);
        const earnings = days * 20;

        var rawInterest = parseFloat(localStorage.getItem(('savingsBalance'))) * interestRate * days;
        const interest = rawInterest.toFixed(2);

        intSum = parseFloat(intSum) + interest;
        localStorage.setItem('intSum', intSum);

        if (days > 0 && parseFloat(localStorage.getItem('savingsBalance'))>0) {
            alert(`Your Savings has increased by $${interest} from interest.`)
        }

        localStorage.setItem('savingsBalance', parseFloat(localStorage.getItem('savingsBalance')) + (interest));

        if (days == 1) {
            alert(`You've earned $20 in 1 day from working!`);
        }
        else if (days > 1) {
            alert(`You've earned $${earnings} in ${days} days from working!`);
        }
        else {
            alert('You have not earned any money yet from working. Please check again later!')
            popup.style.display = "none";
        }

        if(days > 0){
            const savingsPercentage = parseFloat(prompt("What percentage of your earnings would you like to allocate to savings?"));
            const savings = (savingsPercentage / 100) * earnings;

            if (!isNaN(savingsPercentage)) {
                if (savingsPercentage == 20) {
                    alert(`You've allocated $${savings} (${savingsPercentage}% of your earnings) to savings. Nice job! 20% is the recommended amount to allocate to savings.`);

                    rightSplit = parseFloat(rightSplit) + 1;
                    localStorage.setItem('rightSplit', rightSplit);
                }
                else {
                    alert(`You've allocated $${savings} (${savingsPercentage}% of your earnings) to savings. Keep in mind that it is recommended to allocate 20% of your earnings to savings!`);
                }
            } 
            localStorage.setItem('savingsBalance', parseFloat(localStorage.getItem('savingsBalance')) + (savings));
            localStorage.setItem('balance', parseFloat(localStorage.getItem('balance')) + (earnings - savings));
        }


        popup.style.display = "none";

        updateAll();
        // sessionStorage.setItem("popUpShown", "true");
    });
}

// BANK

function depositMoney() {
    const depositAmt = parseFloat(prompt("How much money would you like to deposit to Savings?"));

    if (depositAmt <= localStorage.getItem('balance')) {
        localStorage.setItem('savingsBalance', parseFloat(localStorage.getItem('savingsBalance')) + (depositAmt));
        localStorage.setItem('balance', parseFloat(localStorage.getItem('balance')) - (depositAmt));

        depCount = parseFloat(depCount) + 1;
        localStorage.setItem('depCount', depCount);

        updateAll();
        alert(`You've deposited $${depositAmt}. Your Savings balance is now $${localStorage.getItem('savingsBalance')}`);
    }

    else {
        alert("That is not a valid amount. Please try again.")
    }
}

function withdrawMoney() {
    const withdrawAmt = parseFloat(prompt("How much money would you like to withdraw from Savings?"));

    if (withdrawAmt <= localStorage.getItem('savingsBalance')) {
        localStorage.setItem('savingsBalance', parseFloat(localStorage.getItem('savingsBalance')) - (withdrawAmt));
        localStorage.setItem('balance', parseFloat(localStorage.getItem('balance')) + (withdrawAmt));

        updateAll();
        alert(`You've withdrawn $${withdrawAmt}. Your Spendings balance is now $${localStorage.getItem('balance')}`);
    }

    else {
        alert("That is not a valid amount. Please try again.")
    }
}

// GOALS
function updateFills() {
    const p1 = (savingsBalance / goalSavings) * 100;
    // goal1Fill.style.width = p1 + "%";

    // const p2 = purchaseCount * 10;
    // goal2Fill.style.width = p2 + "%";
}

// SHOP

// SHOP variables
if (document.body.className.match("shopP")) {

    const wnFill = document.getElementById("wn-fill");

    var wantCount = 0;
    var needCount = 0;


    if (parseFloat(localStorage.getItem('wantCount')) != 0) {
        wantCount = parseFloat(localStorage.getItem('wantCount'));
    }
    else {
        localStorage.setItem('wantCount', 0)
    }
    if (parseFloat(localStorage.getItem('needCount')) != 0) {
        needCount = parseFloat(localStorage.getItem('needCount'));
    }
    else {
        localStorage.setItem('needCount', 0)
    }


    if (typeof wantCount === "string") {
        wantCount = 0;
        localStorage.setItem('wantCount', 0)
    }
    if (typeof needCount === "string") {
        needCount = 0;
        localStorage.setItem('needCount', 0)
    }

    function updateWN() {
        // wnFill.style.width = "10%"
        var a = parseFloat(needCount)
        var b = parseFloat(wantCount)
        var c = (a / (a + b)) * 100
        wnFill.style.width = c + "%";

        console.log(needCount, wantCount)
    }

    updateWN();
}

// PURCHASING (using spendings)
function purchaseItemW(price) {
    if (localStorage.getItem('balance') >= price) {
        localStorage.setItem('balance', localStorage.getItem('balance') - price);
        bankBalance = localStorage.getItem('balance')

        purchaseCount = parseFloat(purchaseCount) + 1;
        localStorage.setItem('purchaseCount', purchaseCount);

        wantCount = parseFloat(wantCount) + price;
        localStorage.setItem('wantCount', wantCount);
        updateWN();

        // localStorage.setItem('purchaseCount', purchaseCount);

        updateBalance();
        updateSpendingsBar();

        alert("Item purchased successfully!");

        if ((parseFloat(wantCount) / 3) > (parseFloat(needCount) / 5)) {
            alert("Woah! You're spending a little too much money on Wants. Keep in mind that you should be spending 50% of your income on Needs and 30% of your income on Wants.")
        }
    }

    else {
        alert("Insufficient funds to purchase this item.");
    }
}

function purchaseItemN(price) {
    if (localStorage.getItem('balance') >= price) {
        localStorage.setItem('balance', localStorage.getItem('balance') - price);
        bankBalance = localStorage.getItem('balance')

        purchaseCount = parseFloat(purchaseCount) + 1;
        localStorage.setItem('purchaseCount', purchaseCount);

        needCount = parseFloat(needCount) + price;
        localStorage.setItem('needCount', needCount);
        updateWN();

        // localStorage.setItem('purchaseCount', purchaseCount);

        updateBalance();
        updateSpendingsBar();

        alert("Item purchased successfully!");
    }

    else {
        alert("Insufficient funds to purchase this item.");
    }
}

// GOALS
if (document.body.className.match("goalP")) {
    const goal1Fill = document.getElementById("goal1-fill");
    const goal2Fill = document.getElementById("goal2-fill");
    const goal3Fill = document.getElementById("goal3-fill");
    const goal4Fill = document.getElementById("goal4-fill");
    const goal5Fill = document.getElementById("goal5-fill");


    goal1Fill.style.width = parseFloat(localStorage.getItem('savingsBalance')) / 10 + "%";
    goal2Fill.style.width = parseFloat(localStorage.getItem('purchaseCount')) / 3 * 10 + "%";
    goal3Fill.style.width = parseFloat(localStorage.getItem('intSum')) / 10 + "%";
    goal4Fill.style.width = parseFloat(localStorage.getItem('rightSplit')) * 10 + "%";
    goal5Fill.style.width = parseFloat(localStorage.getItem('depCount')) * 20 + "%";
}

var toy1img = document.getElementById("toy1");

function addItem(x) {
    if (!localStorage.getItem('imageAdded')) {
        // Create new img element
        var img = document.createElement('img');
        img.src = x;
        img.alt = 'Dynamic Image';
    
        // Append the image to the target div
        document.getElementById(targetDiv).appendChild(img);
    
        // Set the flag in localStorage
        localStorage.setItem('imageAdded', 'true');

      } else {
        console.log('Image has already been added.');
      }
 
}