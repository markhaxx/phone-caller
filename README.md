# Phone Caller Firefox Extension

A simple Firefox extension that allows you to call phone numbers directly using your default calling app via right-click context menu.

## Features

- 📞 **Right-Click Calling**: Select any phone number and right-click to call
- 🎯 **Universal Integration**: Uses standard `tel:` protocol - works with any calling app
- 🧪 **Test Feature**: Test calling from the extension popup
- 🚀 **Lightweight**: Minimal code, maximum functionality

## Installation

### Method 1: Load as Temporary Extension (For Testing)

1. **Download the extension files**:
   - Save all the provided files in a folder named `phone-caller`

2. **Open Firefox Developer Mode**:
   - Type `about:debugging` in the address bar
   - Click "This Firefox" in the left sidebar
   - Click "Load Temporary Add-on..."

3. **Load the extension**:
   - Navigate to your `phone-caller` folder
   - Select the `manifest.json` file
   - Click "Open"

### Required Files Structure
```
phone-caller/
├── manifest.json
├── content.js
├── background.js
├── styles.css
├── popup.html
├── popup.js
└── icons/
    ├── icon-16.png
    ├── icon-48.png
    └── icon-128.png
```

## Icons

Create these three PNG files in an `icons/` folder:

- `icon-16.png` (16x16 pixels)
- `icon-48.png` (48x48 pixels) 
- `icon-128.png` (128x128 pixels)

You can use a simple phone icon (📞) or download phone icons from icon sites.

## Usage

### Right-Click Context Menu
1. Select any phone number text on a webpage
2. Right-click and choose "Call [number]"
3. Your default calling app will open with the number

### Extension Popup
1. Click the extension icon in the Firefox toolbar
2. Enter a phone number in the test field
3. Click "Test Call" to verify it works

## Supported Phone Number Formats

The extension recognizes various phone number formats:
- `+1-555-123-4567`
- `(555) 123-4567`
- `555.123.4567`
- `555 123 4567`
- `+44 20 7946 0958` (International)
- Numbers with extensions: `555-123-4567 ext. 123`

## Compatible Calling Apps

Since this uses the standard `tel:` protocol, it works with:
- Microsoft Teams
- Skype
- Zoom Phone
- WhatsApp Desktop
- System default phone app
- Any app that registers for `tel:` links

## File Descriptions

- **`manifest.json`**: Extension configuration and permissions
- **`background.js`**: Handles context menu creation and phone number validation
- **`content.js`**: Executes the actual calling functionality on web pages
- **`popup.html/js`**: Extension popup interface for testing
- **`styles.css`**: Notification styling

## Requirements

- Firefox browser
- A calling app that supports `tel:` links (Teams, Skype, etc.)

## Troubleshooting

### Extension Not Working
- Ensure all files are in the correct folder structure
- Check that manifest.json is valid JSON
- Verify the extension is enabled in `about:addons`

### No Context Menu
- Make sure you've selected text before right-clicking
- Refresh the page after installing the extension
- Check that the selected text contains a valid phone number

### Calling Not Working
- Ensure you have a default calling app configured
- Check that your calling app supports `tel:` links
- Try the test feature in the extension popup

## Privacy

This extension:
- Only processes phone numbers locally in your browser
- Does not send any data to external servers
- Does not track your browsing or calling activity
- Only accesses webpage content to detect selected phone numbers

## Minimal Architecture

This extension is designed to be as simple as possible:
- **Background script**: Only handles context menu registration
- **Content script**: Only handles the actual calling action
- **No storage**: No settings to save, just pure functionality
- **No external dependencies**: Uses standard web APIs only

---

**Note**: This extension uses the standard `tel:` protocol, making it compatible with any calling application on your system.
