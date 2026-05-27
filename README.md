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

## Setup

### First Time Setup
1. Click the extension icon in the Firefox toolbar
2. Select your default country code from the dropdown
3. Your selection is saved automatically (you'll see "✓ Saved" confirmation)
4. The extension is now ready to use!

### Supported Countries

The extension includes country codes for:

**North America**
- 🇺🇸 United States / Canada (+1)
- 🇲🇽 Mexico (+52)

**Europe**
- 🇬🇧 United Kingdom (+44)
- 🇫🇷 France (+33)
- 🇩🇪 Germany (+49)
- 🇮🇹 Italy (+39)
- 🇪🇸 Spain (+34)
- 🇳🇱 Netherlands (+31)
- 🇧🇪 Belgium (+32)
- 🇨🇭 Switzerland (+41)
- 🇦🇹 Austria (+43)
- 🇩🇰 Denmark (+45)
- 🇸🇪 Sweden (+46)
- 🇳🇴 Norway (+47)
- 🇫🇮 Finland (+358)
- 🇵🇹 Portugal (+351)
- 🇮🇪 Ireland (+353)
- 🇵🇱 Poland (+48)
- 🇨🇿 Czech Republic (+420)
- 🇭🇺 Hungary (+36)
- 🇬🇷 Greece (+30)

**Asia & Pacific**
- 🇨🇳 China (+86)
- 🇯🇵 Japan (+81)
- 🇰🇷 South Korea (+82)
- 🇮🇳 India (+91)
- 🇦🇺 Australia (+61)
- 🇳🇿 New Zealand (+64)

**Middle East & Africa**
- 🇹🇷 Turkey (+90)
- 🇮🇱 Israel (+972)
- 🇦🇪 UAE (+971)
- 🇸🇦 Saudi Arabia (+966)
- 🇿🇦 South Africa (+27)

**South America**
- 🇧🇷 Brazil (+55)
- 🇦🇷 Argentina (+54)

**Other**
- 🇷🇺 Russia (+7)

## Usage

### Right-Click Context Menu
1. Select any phone number text on a webpage
2. Right-click and choose "Call [number]"
3. Your default calling app will open with the number

### How Country Code is Applied

The extension intelligently handles phone numbers:

| Selected Text | Country Code Setting | Result |
|---------------|---------------------|--------|
| `+44 20 7946 0958` | Any | `+442079460958` (uses existing) |
| `555-123-4567` | +1 (US) | `+15551234567` (adds US code) |
| `1-555-123-4567` | +1 (US) | `+15551234567` (adds + only) |
| `20 7946 0958` | +44 (UK) | `+442079460958` (adds UK code) |

### Extension Popup
1. Click the extension icon in the Firefox toolbar
2. **Set Country Code**: Choose your default country from the dropdown
3. **Test Numbers**: Enter a phone number and click "Test Call" to verify

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
- **`background.js`**: Handles context menu and country code logic
- **`content.js`**: Executes the calling functionality on web pages
- **`popup.html/js`**: Settings interface with country code selector
- **`styles.css`**: Notification styling

## Permissions Explained

- **`contextMenus`**: Required to add the right-click menu option
- **`storage`**: Required to save your country code preference

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

### Wrong Country Code Applied
- Open the extension popup and verify your country code setting
- Numbers starting with `+` will always use the existing country code
- Numbers that already include your country code digits won't be duplicated

### Calling Not Working
- Ensure you have a default calling app configured
- Check that your calling app supports `tel:` links
- Try the test feature in the extension popup

### Country Code Not Saving
- Check that the `storage` permission is granted
- Try reloading the extension from `about:debugging`
- Verify Firefox isn't in private browsing mode (settings may not persist)

## Privacy

This extension:
- Only processes phone numbers locally in your browser
- Does not send any data to external servers
- Does not track your browsing or calling activity
- Only accesses webpage content when you select text
- Stores country code preference locally in Firefox

## Version History

### v1.1 (Current)
- Added default country code selection
- Added persistent storage for user preferences
- Added 35+ country codes with flag emojis
- Smart country code detection (no duplicates)
- Improved test feature

### v1.0
- Initial release
- Right-click context menu calling
- Basic `tel:` protocol support
- Test feature in popup

## Minimal Architecture

This extension is designed to be as simple as possible:
- **Background script**: Handles context menu and number processing
- **Content script**: Triggers the actual `tel:` call
- **Popup**: Settings and testing interface
- **Storage**: Saves only the country code preference
- **No external dependencies**: Uses standard web APIs only

---

**Note**: This extension uses the standard `tel:` protocol, making it compatible with any calling application on your system. Your country code preference is stored locally and never shared.
