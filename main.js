document.addEventListener("DOMContentLoaded", function () {
    // Variables
    var currentCardBackground = Math.floor(Math.random() * 25 + 1);
    var cardName = "";
    var cardNumber = "";
    var cardMonth = "";
    var cardYear = "";
    var cardCvv = "";
    var minCardYear = new Date().getFullYear();
    var cardNumberTemp = "";
    var isCardFlipped = false;
    var isInputFocused = false;
  
    var cardNumberInput = document.getElementById('cardNumber');
    var cardNameInput = document.getElementById('cardName');
    var cardMonthInput = document.getElementById('cardMonth');
    var cardYearInput = document.getElementById('cardYear');
    var cardCvvInput = document.getElementById('cardCvv');
  
    var cardItem = document.getElementById('card-item');
    var cardItemFocus = document.getElementById('card-item-focus');
    var cardNumberDisplay = document.getElementById('card-number-display');
    var cardNameDisplay = document.getElementById('card-name-display');
    var cardMonthDisplay = document.getElementById('card-month-display');
    var cardYearDisplay = document.getElementById('card-year-display');
    var cardCvvDisplay = document.getElementById('card-cvv-display');
    var cardTypeImg = document.getElementById('card-type-img');
    var cardTypeImgBack = document.getElementById('card-type-img-back');
    var cardBg = document.getElementById('card-bg');
    var cardBgBack = document.getElementById('card-bg-back');
  
    // Set random background
    cardBg.src = 'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + currentCardBackground + '.jpeg';
    cardBgBack.src = cardBg.src;
  
    // Set initial card type image
    updateCardType();
  
    // Populate month options
    for (var i = 1; i <= 12; i++) {
      var monthOption = document.createElement('option');
      monthOption.value = i < 10 ? '0' + i : i;
      monthOption.textContent = i < 10 ? '0' + i : i;
      cardMonthInput.appendChild(monthOption);
    }
  
    // Populate year options
    for (var i = 0; i <= 12; i++) {
      var yearOption = document.createElement('option');
      yearOption.value = minCardYear + i;
      yearOption.textContent = minCardYear + i;
      cardYearInput.appendChild(yearOption);
    }
  
    // Event listeners
    cardNumberInput.addEventListener('input', function (e) {
      cardNumber = e.target.value.replace(/\D/g, '');
      cardNumberInput.value = formatCardNumber(cardNumber);
      updateCardNumberDisplay();
      updateCardType();
    });
  
    cardNameInput.addEventListener('input', function (e) {
      cardName = e.target.value;
      cardNameDisplay.textContent = cardName || 'Full Name';
    });
  
    cardMonthInput.addEventListener('change', function (e) {
      cardMonth = e.target.value;
      cardMonthDisplay.textContent = cardMonth || 'MM';
    });
  
    cardYearInput.addEventListener('change', function (e) {
      cardYear = e.target.value;
      cardYearDisplay.textContent = cardYear ? cardYear.slice(2, 4) : 'YY';
      // Adjust min month
      adjustMinMonth();
    });
  
    cardCvvInput.addEventListener('focus', function () {
      flipCard(true);
    });
  
    cardCvvInput.addEventListener('blur', function () {
      flipCard(false);
    });
  
    cardCvvInput.addEventListener('input', function (e) {
      cardCvv = e.target.value.replace(/\D/g, '');
      cardCvvInput.value = cardCvv;
      cardCvvDisplay.textContent = '*'.repeat(cardCvv.length);
    });
  
    function flipCard(status) {
      isCardFlipped = status;
      if (isCardFlipped) {
        cardItem.classList.add('-active');
      } else {
        cardItem.classList.remove('-active');
      }
    }
  
    function getCardType(number) {
      var re = new RegExp("^4");
      if (number.match(re) != null) return "visa";
  
      re = new RegExp("^(34|37)");
      if (number.match(re) != null) return "amex";
  
      re = new RegExp("^5[1-5]");
      if (number.match(re) != null) return "mastercard";
  
      re = new RegExp("^6011");
      if (number.match(re) != null) return "discover";
  
      re = new RegExp('^9792');
      if (number.match(re) != null) return 'troy';
  
      return "visa"; // default type
    }
  
    function updateCardType() {
      var cardType = getCardType(cardNumber);
      var cardTypeSrc = 'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + cardType + '.png';
      cardTypeImg.src = cardTypeSrc;
      cardTypeImgBack.src = cardTypeSrc;
    }
  
    function formatCardNumber(number) {
      var cardType = getCardType(number);
      var formattedNumber = '';
      if (cardType === 'amex') {
        // Amex card format: #### ###### #####
        formattedNumber = number.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
      } else {
        // Other card format: #### #### #### ####
        formattedNumber = number.replace(/(.{4})/g, '$1 ').trim();
      }
      return formattedNumber;
    }
  
    function updateCardNumberDisplay() {
      cardNumberDisplay.textContent = cardNumberInput.value || '#### #### #### ####';
    }
  
    function adjustMinMonth() {
      var currentYear = new Date().getFullYear();
      if (cardYear == currentYear) {
        var currentMonth = new Date().getMonth() + 1;
        var options = cardMonthInput.options;
        for (var i = 0; i < options.length; i++) {
          if (parseInt(options[i].value) < currentMonth) {
            options[i].disabled = true;
          } else {
            options[i].disabled = false;
          }
        }
      } else {
        var options = cardMonthInput.options;
        for (var i = 0; i < options.length; i++) {
          options[i].disabled = false;
        }
      }
    }
  });
  