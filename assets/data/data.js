fetch("/assets/data/data.json")
  .then((response) => response.json())
  .then((data) => {
    const greetingElement = document.getElementById("greeting");
    const nameElement = document.getElementById("name");
    const balanceElement = document.getElementById("balance");
    const ibanElement = document.getElementById("iban");
    const cardNumberElement = document.getElementById("card-number");
    const cardNumberMaskedElement = document.getElementById("card-number-masked");
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
