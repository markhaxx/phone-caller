// Popup script for Phone Caller extension

document.addEventListener('DOMContentLoaded', function() {
  var testNumberInput = document.getElementById('testNumber');
  var testCallButton = document.getElementById('testCall');
  var statusDiv = document.getElementById('status');

  // Test call button handler
  testCallButton.addEventListener('click', function() {
    var phoneNumber = testNumberInput.value.trim();
    
    if (!phoneNumber) {
      showStatus('Please enter a phone number', 'error');
      return;
    }
    
    var cleanNumber = cleanPhoneNumber(phoneNumber);
    
    if (!isValidPhoneNumber(cleanNumber)) {
      showStatus('Please enter a valid phone number', 'error');
      return;
    }
    
    // Attempt to call
    callNumber(cleanNumber);
    showStatus('Attempting to call ' + cleanNumber + '...', 'success');
  });

  // Input validation
  testNumberInput.addEventListener('input', function() {
    var phoneNumber = testNumberInput.value.trim();
    var cleanNumber = cleanPhoneNumber(phoneNumber);
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

  function cleanPhoneNumber(phoneNumber) {
    // Remove all non-digit characters except +
    var cleaned = phoneNumber.replace(/[^\d+]/g, '');
    
    // Handle US numbers - add +1 if missing
    if (cleaned.length === 10 && cleaned.indexOf('+') !== 0) {
      cleaned = '+1' + cleaned;
    } else if (cleaned.length === 11 && cleaned.charAt(0) === '1' && cleaned.indexOf('+') !== 0) {
      cleaned = '+' + cleaned;
    }
    
    return cleaned;
  }

  function isValidPhoneNumber(phoneNumber) {
    var cleaned = phoneNumber.replace(/[^\d]/g, '');
    return cleaned.length >= 7 && cleaned.length <= 15;
  }

  function callNumber(phoneNumber) {
    var cleanNumber = cleanPhoneNumber(phoneNumber);
    var telUrl = 'tel:' + cleanNumber;
    
    // Simple approach - just open the tel: URL
    window.open(telUrl, '_blank');
  }
});