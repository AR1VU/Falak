// Data JSON File Location
const dataFile = "/data.json";

function getTransactionId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("transactionid");
}

fetch(dataFile)
  .then((response) => response.json())
  .then((data) => {
    const transactionId = getTransactionId();
    const transaction = data.transactions.find(
      (transaction) => transaction.id === transactionId
    );

    const transName = document.getElementById("transName");
    const transDesc = document.getElementById("transDesc");
    const transDate = document.getElementById("transDate");
    const transAmount = document.getElementById("transAmount");
    const transID = document.getElementById("transID");

    // itereate through the data until the transaction is found by id
    if (transaction) {
      transName.innerText = transaction.name;
      transDesc.innerText = transaction.description;
      transID.innerText = `${data.accountID}` + transactionId;
      transDate.innerText = new Date(transaction.date).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      );
      transAmount.innerText = transaction.amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else {
      console.log("Transaction not found");
    }
  })
  .catch((error) => console.error("Error fetching transaction data:", error));

// User Data
fetch(dataFile)
  .then((response) => response.json())
  .then((data) => {
    const greetingElement = document.getElementById("greeting");
    const nameElement = document.getElementById("name");
    const balanceElement = document.getElementById("balance");
    const ibanElement = document.getElementById("iban");
    const cardNumberElement = document.getElementById("card-number");
    const cardNumberMaskedElement =
      document.getElementById("card-number-masked");
    const cardCVVElement = document.getElementById("card-cvv");
    const cardExpirationElement = document.getElementById("card-expiration");
    const cardStatusElement = document.getElementById("card-status");

    if (data.card.status !== undefined && cardStatusElement) {
      cardStatusElement.textContent = data.card.status;
    }

    if (data.card.cvv !== undefined && cardCVVElement) {
      cardCVVElement.textContent = data.card.cvv;
    }

    if (data.card.expiry !== undefined && cardExpirationElement) {
      cardExpirationElement.textContent = data.card.expiry;
    }

    if (data.name !== undefined && nameElement) {
      nameElement.textContent = data.name;
    }

    if (data.name !== undefined && greetingElement) {
      const firstName = data.name.split(" ")[0];
      greetingElement.textContent = "Hello " + firstName + "!";
    }

    if (data.balance !== undefined && balanceElement) {
      data.balance = parseFloat(data.balance).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      balanceElement.textContent = data.balance;
    }
    if (data.iban !== undefined && ibanElement) {
      const formattedIban = data.iban.replace(/(.{4})(?=.{4})/g, "$1 ");
      ibanElement.textContent = formattedIban.trim();
    }

    if (data.card.number !== undefined && cardNumberElement) {
      const formattedCardNumber = data.card.number.replace(
        /(.{4})(?=.{4})/g,
        "$1 "
      );
      cardNumberElement.textContent = formattedCardNumber.trim();
    }

    if (data.card.number !== undefined && cardNumberMaskedElement) {
      const lastFourDigits = data.card.number.slice(-4);
      const maskedCardNumber = lastFourDigits.padStart(
        data.card.number.length,
        "*"
      );
      const formattedCardNumber = maskedCardNumber.replace(
        /(.{4})(?=.{4})/g,
        "$1 "
      );
      cardNumberMaskedElement.textContent = formattedCardNumber.trim();
    }
  })
  .catch((error) => console.error("Error fetching data:", error));

// Loan Data
fetch(dataFile)
  .then((response) => response.json())
  .then((data) => {
    const loanDataContainer = document.getElementById("loanDataContainer");
    data.loans.reverse().forEach((loan) => {
      const loanItem = document.createElement("div");
      loanItem.classList.add("loan-item");
      loanItem.innerHTML = `
                            <div class="loan-details">
                                <h3 class="loan-name">${loan.name}</h3>
                                
                                <p class="loan-category">Interest: ${loan.interest}%</p>
                                <p class="loan-category">Monthly Payment: AED ${loan.monthly_payment}</p>
                                <p class="loan-category">Next Payment: ${loan.next_payment}</p>
                            </div>
                            <div class="loan-amount">
                                <p>AED ${loan.amount}</p>
                            </div>
                            
                        `;
      loanDataContainer.appendChild(loanItem);
      if (loan !== data.loans[data.loans.length - 1]) {
        loanDataContainer.appendChild(document.createElement("hr"));
      }
    });
  })
  .catch((error) => console.error("Error fetching loan data:", error));

// Transaction Data
fetch(dataFile)
  .then((response) => response.json())
  .then((data) => {
    const transactionDataContainer = document.getElementById(
      "transactionDataContainer"
    );

    transactionDataContainer.style.whiteSpace = "nowrap";
    transactionDataContainer.style.textOverflow = "ellipsis";

    data.transactions.reverse().forEach((transaction) => {
      const link = document.createElement("a");
      link.href = `/pages/transactions/transaction.html?transactionid=${transaction.id}`;
      link.style.color = "white";
      const transactionItem = document.createElement("div");
      transactionItem.classList.add("transaction-item");

      icons = {
        Deposit: "money-bill-wave",
        Housing: "house",
        Transportation: "car",
        Utilities: "plug",
        "Food & Drink": "utensils",
        Entertainment: "gamepad",
        Shopping: "shopping-bag",
        Education: "graduation-cap",
        Health: "heart",
        Loan: "hand-holding-usd",
        Other: "square-ring",
      };

      transactionItem.innerHTML = `
      
                            <div class="transaction-icon">
                                <i class="fas fa-${
                                  icons[transaction.description]
                                }"></i>
                            </div>

                            <div class="transaction-details">   
                                <p class="transaction-title">${
                                  transaction.name
                                }</p>
                                <p class="transaction-category">${
                                  transaction.description
                                }</p>
                                <p class="transaction-date">${new Date(
                                  transaction.date
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}</p>
                                 
                            </div>
                            <div class="transaction-amount">
                            <!-- Format AED X,XXX.00-->
                                <p>${
                                  transaction.amount < 0 ? "- AED " : "AED "
                                }${Math.abs(transaction.amount).toLocaleString(
        "en-US",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )}</p>
                            </div>

                            
                        `;
      link.appendChild(transactionItem);
      transactionDataContainer.appendChild(link);
      if (transaction !== data.transactions[data.transactions.length - 1]) {
        transactionDataContainer.appendChild(document.createElement("hr"));
      }
    });
  })
  .catch((error) => console.error("Error fetching transaction data:", error));

// Transaction Data Home Page (Only 3)
fetch(dataFile)
  .then((response) => response.json())
  .then((data) => {
    const transactionDataContainer = document.getElementById(
      "transactionDataContainer3"
    );

    transactionDataContainer.style.whiteSpace = "nowrap";
    transactionDataContainer.style.textOverflow = "ellipsis";

    data.transactions.reverse().forEach((transaction) => {
      const link = document.createElement("a");
      link.style.color = "white";
      link.href = `/pages/transactions/transaction.html?transactionid=${transaction.id}`;
      const transactionItem = document.createElement("div");
      transactionItem.classList.add("transaction-item");

      // only latest 3 transactions
      if (
        transaction !== data.transactions[0] &&
        transaction !== data.transactions[1] &&
        transaction !== data.transactions[2]
      ) {
        return;
      }

      icons = {
        Deposit: "money-bill-wave",
        Housing: "house",
        Transportation: "car",
        Utilities: "plug",
        "Food & Drink": "utensils",
        Entertainment: "gamepad",
        Shopping: "shopping-bag",
        Education: "graduation-cap",
        Health: "heart",
        Loan: "hand-holding-usd",
        Other: "square-ring",
      };

      transactionItem.innerHTML = `

                          <div class="transaction-icon">
                              <i class="fas fa-${
                                icons[transaction.description]
                              }"></i>
                          </div>

                          <div class="transaction-details">   
                              <p class="transaction-title">${
                                transaction.name
                              }</p>
                              <p class="transaction-category">${
                                transaction.description
                              }</p>
                              <p class="transaction-date">${new Date(
                                transaction.date
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}</p>
                               
                          </div>
                          <div class="transaction-amount">
                          <!-- Format AED X,XXX.00-->
                              <p>${
                                transaction.amount < 0 ? "- AED " : "AED "
                              }${Math.abs(transaction.amount).toLocaleString(
        "en-US",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )}</p>
                          </div>

                          
                      `;
      link.appendChild(transactionItem);
      transactionDataContainer.appendChild(link);
      if (transaction !== data.transactions[2]) {
        transactionDataContainer.appendChild(document.createElement("hr"));
      }
    });
  })
  .catch((error) => console.error("Error fetching transaction data:", error));

// Authenatication
const numbtn1 = document.getElementById("numbtn1");
const numbtn2 = document.getElementById("numbtn2");
const numbtn3 = document.getElementById("numbtn3");
const numbtn4 = document.getElementById("numbtn4");
const numbtn5 = document.getElementById("numbtn5");
const numbtn6 = document.getElementById("numbtn6");
const numbtn7 = document.getElementById("numbtn7");
const numbtn8 = document.getElementById("numbtn8");
const numbtn9 = document.getElementById("numbtn9");
const numbtn0 = document.getElementById("numbtn0");
const numbtnd = document.getElementById("numbtnd");

const password = document.getElementById("password");

let pin = "";

const buttons = document.querySelectorAll(".num-btn:not([disabled])");

fetch(dataFile)
  .then((response) => response.json())
  .then((data) => {
    const mpin = data.mpin;
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        pin += button.textContent.trim();
        password.innerHTML = pin;
        if (pin.length === 0) {
          password.innerHTML = "Enter your PIN";
        }
        if (pin.length === 4) {
          if (pin === mpin) {
            password.innerHTML = "PIN Accepted";
            setTimeout(() => {
              document.getElementById("auth").style.display = "none";
              document.getElementById("content").style.display = "block";
            }, 1000);
          } else {
            password.innerHTML = "Invalid PIN";
            pin = "";
            setTimeout(() => {
              password.innerHTML = "Enter your PIN";
            }, 1000);
          }
        }
      });
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

numbtnd.addEventListener("click", () => {
  pin = pin.slice(0, -1);
  if (pin.length === 0) {
    password.innerHTML = "Enter your PIN";
    return;
  }
  password.innerHTML = pin;
});
