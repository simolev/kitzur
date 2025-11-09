# Kitzur Shulchan Aruch Mobile App

A cross-platform mobile application for reading the Kitzur Shulchan Aruch, built with React Native and Expo.

## Features

- Browse all 221 chapters (capitoli)
- View paragraphs with prominent titles
- Clean, readable interface
- Works on both iOS and Android

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your device:
- **iOS**: Press `i` or run `npm run ios`
- **Android**: Press `a` or run `npm run android`
- **Web**: Press `w` or run `npm run web`

## Project Structure

```
├── App.js                      # Main app component with navigation
├── screens/
│   ├── ChaptersScreen.js       # List of all chapters
│   └── ChapterDetailScreen.js  # Chapter detail with paragraphs
├── kitzur_capitoli.json        # Chapter data
├── kitzur_paragrafi.json       # Paragraph data
└── package.json                # Dependencies
```

## Building for Production

### Android
```bash
expo build:android
```

### iOS
```bash
expo build:ios
```

## Technologies Used

- React Native
- Expo
- React Navigation
- JavaScript

## Notes

- The app uses Expo for easier cross-platform development
- All text is in Italian
- Data is loaded from local JSON files
