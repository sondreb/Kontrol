# Kontrol

App that helps you organize your media files.

Currently the app does only support renaming of .mp4 files, there are no support for renaming images yet. Until image rename support is added, please refer to [Namexif](http://www.digicamsoft.com/softnamexif.html).

Kontrol process for finding video creation date:

1. Read EXIF metadata.
2. Find date in this order: createDate, mediaCreateDate, trackCreateDate.
3. If date is not found in the EXIF, reads metadata from file system ("mtime").

Currently the app does not support custom filename formats, and defaults to the following example:

2015-10-31-16h06m12.mp4

## Version 0.1

![Kontrol main window](./doc/screenshot-01.png)

## License
    
MIT © [Sondre Bjellås](http://sondreb.com)
