// Popup script for Phone Caller extension

document.addEventListener('DOMContentLoaded', function() {
  var testNumberInput = document.getElementById('testNumber');
  var testCallButton = document.getElementById('testCall');
  var statusDiv = document.getElementById('status');
  var countryCodeSelect = document.getElementById('countryCode');
  var countryStatusDiv = document.getElementById('countryStatus');

  // Load saved country code
  browser.storage.local.get('countryCode', function(result) {
    if (result.countryCode) {
      countryCodeSelect.value = result.countryCode;
    }
  });

  // Save country code when changed
  countryCodeSelect.addEventListener('change', function() {
    var selectedCode = countryCodeSelect.value;
    browser.storage.local.set({ countryCode: selectedCode }, function() {
      countryStatusDiv.textContent = '✓ Saved: ' + selectedCode;
      setTimeout(function() {
        countryStatusDiv.textContent = '';
      }, 2000);
    });
  });

  // Test call button handler
  testCallButton.addEventListener('click', function() {
    var phoneNumber = testNumberInput.value.trim();
    
    if (!phoneNumber) {
      showStatus('Please enter a phone number', 'error');
      return;
    }
    
    var countryCode = countryCodeSelect.value;
    var cleanNumber = cleanPhoneNumber(phoneNumber, countryCode);
    
    if (!isValidPhoneNumber(cleanNumber)) {
      showStatus('Please enter a valid phone number', 'error');
      return;
    }
    
    callNumber(cleanNumber);
    showStatus('Calling ' + cleanNumber + '...', 'success');
  });

  // Input validation
  testNumberInput.addEventListener('input', function() {
    var phoneNumber = testNumberInput.value.trim();
    var countryCode = countryCodeSelect.value;
    var cleanNumber = cleanPhoneNumber(phoneNumber, countryCode);
    var isValid = phoneNumber === '' || isValidPhoneNumber(cleanNumber);
    
    testCallButton.disabled = !isValid || phoneNumber === '';
    
    if (phoneNumber && !isValid) {
      testNumberInput.style.borderColor = '#dc3545';
    } else {
      testNumberInput.style.borderColor = '#ddd';
    }
  });

  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = 'status ' + type;
    statusDiv.style.display = 'block';
    
    setTimeout(function() {
      statusDiv.style.display = 'none';
    }, 3000);
  }

  function cleanPhoneNumber(phoneNumber, countryCode) {
    var cleaned = phoneNumber.replace(/[^\d+]/g, '');
    
    if (cleaned.indexOf('+') === 0) {
      return cleaned;
    }
    
    var codeDigits = countryCode.replace(/[^\d]/g, '');
    
    if (cleaned.length > codeDigits.length && cleaned.indexOf(codeDigits) === 0) {
      return '+' + cleaned;
    }
    
    return countryCode + cleaned;
  }

  function isValidPhoneNumber(phoneNumber) {
    var cleaned = phoneNumber.replace(/[^\d]/g, '');
    return cleaned.length >= 7 && cleaned.length <= 15;
  }

  function callNumber(phoneNumber) {
    var telUrl = 'tel:' + phoneNumber;
    window.open(telUrl, '_blank');
  }
});
