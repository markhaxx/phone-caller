// Background script for Phone Caller extension

// Default country code
var DEFAULT_COUNTRY_CODE = '+1';

// Create context menu
browser.runtime.onInstalled.addListener(function() {
  browser.contextMenus.create({
    id: "callNumber",
    title: "Call '%s'",
    contexts: ["selection"],
    documentUrlPatterns: ["<all_urls>"]
  });
});

// Handle context menu clicks
browser.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "callNumber") {
    var selectedText = info.selectionText.trim();
    
    // Get country code from storage, then process number
    browser.storage.local.get('countryCode', function(result) {
      var countryCode = result.countryCode || DEFAULT_COUNTRY_CODE;
      var cleanNumber = cleanPhoneNumber(selectedText, countryCode);
      
      if (isValidPhoneNumber(cleanNumber)) {
        // Send message to content script to handle the call
        browser.tabs.sendMessage(tab.id, {
          action: "callNumber",
          phoneNumber: cleanNumber
        });
      }
    });
  }
});

// Utility functions
function cleanPhoneNumber(phoneNumber, countryCode) {
  // Remove all non-digit characters except +
  var cleaned = phoneNumber.replace(/[^\d+]/g, '');
  
  // If number already starts with +, use as-is
  if (cleaned.indexOf('+') === 0) {
    return cleaned;
  }
  
  // Remove country code prefix without +
  var codeDigits = countryCode.replace(/[^\d]/g, '');
  
  // If number starts with country code digits and is long enough, add +
  if (cleaned.length > codeDigits.length && cleaned.indexOf(codeDigits) === 0) {
    return '+' + cleaned;
  }
  
  // Otherwise, prepend the country code
  return countryCode + cleaned;
}

function isValidPhoneNumber(phoneNumber) {
  var cleaned = phoneNumber.replace(/[^\d]/g, '');
  return cleaned.length >= 7 && cleaned.length <= 15;
}
