if (!navigator.serviceWorker.controller) {
  navigator.serviceWorker.register("/assets/pwa/sw.js").then(function (reg) {
    console.log("Service worker has been registered for scope: " + reg.scope);
  });
}



// function isMobileDevice() {
//   return /Mobi|Android/i.test(navigator.userAgent);
// }
// if (!isMobileDevice()) {
//   document.body.innerHTML =
//     "<h1>This website is only accessible on mobile devices.</h1>";
// }


function calculate() {
  const amountInput = document.getElementById("amount");
  const amount = amountInput.value;
  const duration = document.getElementById("duration").value;
  const installment = document.getElementById("installment");
  const total = document.getElementById("total");
  const interestElement = document.getElementById("interestE");
  const interestAmount = document.getElementById("interestA");

  if (amount < 500 || amount > 5000) {
    const alertElement = document.getElementById("alert");
    const alertMessage = document.getElementById("alert-message");
    alertMessage.innerHTML =
      "Please enter an amount between AED 500 and AED 5000.";
    alertElement.style.display = "block";
    let fadeInEffect = setInterval(function () {
      if (!alertElement.style.opacity) {
        alertElement.style.opacity = 0;
      }
      if (alertElement.style.opacity < 1) {
        alertElement.style.opacity =
          parseFloat(alertElement.style.opacity) + 0.1;
      } else {
        clearInterval(fadeInEffect);
      }
    }, 50);

    setTimeout(function () {
      let fadeEffect = setInterval(function () {
        if (!alertElement.style.opacity) {
          alertElement.style.opacity = 1;
        }
        if (alertElement.style.opacity > 0) {
          alertElement.style.opacity -= 0.1;
        } else {
          clearInterval(fadeEffect);
          alertElement.style.display = "none";
        }
      }, 50);
    }, 5000);
    return;
  }

  if (duration < 1 || duration > 12) {
    const alertElement = document.getElementById("alert");
    const alertMessage = document.getElementById("alert-message");
    alertMessage.innerHTML =
      "Please enter an duration between 1 Month and 12 Months.";
    alertElement.style.display = "block";
    let fadeInEffect = setInterval(function () {
      if (!alertElement.style.opacity) {
        alertElement.style.opacity = 0;
      }
      if (alertElement.style.opacity < 1) {
        alertElement.style.opacity =
          parseFloat(alertElement.style.opacity) + 0.1;
      } else {
        clearInterval(fadeInEffect);
      }
    }, 50);

    setTimeout(function () {
      let fadeEffect = setInterval(function () {
        if (!alertElement.style.opacity) {
          alertElement.style.opacity = 1;
        }
        if (alertElement.style.opacity > 0) {
          alertElement.style.opacity -= 0.1;
        } else {
          clearInterval(fadeEffect);
          alertElement.style.display = "none";
        }
      }, 50);
    }, 5000);
    return;
  }
  const interestRates = [
    4.39653, 4.37472, 4.35291, 4.32086, 4.28881, 4.25676, 4.267072,
    4.277383, 4.287695, 4.298007, 4.308318, 4.31863,
  ];

  const interest = interestRates[duration - 1] / 100;
  interestElement.innerHTML = `${interestRates[duration - 1]}%`;

  const interestAmountValue = amount * interest;
  interestAmount.innerHTML = interestAmountValue.toFixed(2);

  const totalAmount = amount * (1 + interest);
  const monthlyInstallment = totalAmount / duration;

  installment.innerHTML = monthlyInstallment.toFixed(2);
  total.innerHTML = totalAmount.toFixed(2);

  const applyButton = document.getElementById("apply-button");
  applyButton.style.display = "block";
  
}