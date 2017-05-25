# <img align="center" width="128" height="128" src="./res/kontrol-logo-128x128.png"> Kontrol

App that helps you organize your media files.

Learn more about the app on the official web page: [https://sondreb.github.io/Kontrol/](https://sondreb.github.io/Kontrol/)

Currently the app does only support renaming of .mp4 and .mov files, there are no support for renaming images yet. Until image rename support is added, please refer to [Namexif](http://www.digicamsoft.com/softnamexif.html).

Kontrol process for finding video creation date:

1. Read EXIF metadata.
2. Find date in this order: createDate, mediaCreateDate, trackCreateDate.
3. If date is not found in the EXIF, reads metadata from file system ("mtime").

Currently the app does not support custom filename formats, and defaults to the following example:

2015-10-31-16h06m12.mp4


## Setup of source and building the app

```
git clone https://github.com/sondreb/Kontrol.git
```

Navigate into the "Kontrol" folder on your computer.

```
npm install
npm start
```

This will first install all the dependencies, and then launch the app.

## Package the app

Looking into packaging using "asar" package, details here: [https://electron.atom.io/docs/tutorial/application-packaging/](https://electron.atom.io/docs/tutorial/application-packaging/).

Install [Yarn](https://yarnpkg.com/) which minimizes node_modules content: 

Run inside the "app" folder:

```
yarn install

yarn clean
```

Then run from the root folder:

```
npm run package
```

TODO: Start using the electron-builder, for auto-update support: [https://github.com/electron-userland/electron-builder](https://github.com/electron-userland/electron-builder)


## Dependencies

- Kontrol relies on [ExifTool](http://owl.phy.queensu.ca/~phil/exiftool/) (supplied in the repo) to read EXIF data from media files.
- [Node.js](https://nodejs.org/)


## Supported platforms

Kontrol supports only Windows at the moment, but support for Linux and OS X is planned in the future.

## Disclaimer

Any operations on the file system is prone to problems. Using Kontrol is done under
no warranty. Make sure you take backups before using Kontrol. While great care is taken to avoid problems, you are using the app under your own risk.

## Screenshots

### Version 0.1

![Kontrol main window](./res/screenshot-01.png)

## License
    
MIT © [Sondre Bjellås](http://sondreb.com)
