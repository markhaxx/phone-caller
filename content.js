class PhoneCaller {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Listen for messages from background script (context menu clicks)
    browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.action === 'callNumber') {
        var caller = new PhoneCaller();
        caller.callNumber(request.phoneNumber);
        sendResponse({success: true});
      }
    });
  }

  callNumber(phoneNumber) {
    var telUrl = 'tel:' + phoneNumber;
    
    // Create a temporary link and click it to trigger the tel: protocol
    var link = document.createElement('a');
    link.href = telUrl;
    link.style.display = 'none';
    document.body.appendChild(link);
    
    try {
      link.click();
      this.showCallConfirmation(phoneNumber);
    } catch (error) {
      this.showError('Unable to initiate call. Please check your default calling app.');
    } finally {
      document.body.removeChild(link);
    }
  }

  showCallConfirmation(phoneNumber) {
    var notification = document.createElement('div');
    notification.className = 'phone-notification';
    
    var content = document.createElement('div');
    content.className = 'phone-notification-content';
    content.textContent = '📞 Calling ' + phoneNumber + '...';
    
    notification.appendChild(content);
    document.body.appendChild(notification);
    
    var self = this;
    setTimeout(function() {
      notification.classList.add('fade-out');
      setTimeout(function() {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  showError(message) {
    var notification = document.createElement('div');
    notification.className = 'phone-notification error';
    
    var content = document.createElement('div');
    content.className = 'phone-notification-content';
    content.textContent = '❌ ' + message;
    
    notification.appendChild(content);
    document.body.appendChild(notification);
    
    setTimeout(function() {
      notification.classList.add('fade-out');
      setTimeout(function() {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }
}

// Initialize the extension
var phoneCaller = new PhoneCaller();