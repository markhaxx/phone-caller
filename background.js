// Background script for Phone Caller extension

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
    var cleanNumber = cleanPhoneNumber(selectedText);
    
    if (isValidPhoneNumber(cleanNumber)) {
      // Send message to content script to handle the call
      browser.tabs.sendMessage(tab.id, {
        action: "callNumber",
        phoneNumber: cleanNumber
      });
    }
  }
});

// Utility functions
function cleanPhoneNumber(phoneNumber) {
  // Remove all non-digit characters except +
  var cleaned = phoneNumber.replace(/[^\d+]/g, '');
  
  // Handle US numbers - add +1 if missing
  if (cleaned.length === 10 && !cleaned.startsWith('+')) {
    cleaned = '+1' + cleaned;
  } else if (cleaned.length === 11 && cleaned.startsWith('1') && !cleaned.startsWith('+')) {
    cleaned = '+' + cleaned;
  }
  
  return cleaned;
}

function isValidPhoneNumber(phoneNumber) {
  var cleaned = phoneNumber.replace(/[^\d]/g, '');
  return cleaned.length >= 7 && cleaned.length <= 15;
}