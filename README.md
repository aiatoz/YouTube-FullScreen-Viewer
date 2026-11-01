# YouTube Fill Screen

Removes black bars when a YouTube video is fullscreen.

## Install
1. Unzip this folder.
2. Open `chrome://extensions` and turn on **Developer mode** (top right).
3. Click **Load unpacked** and select the `yt-fill` folder.

## Use
- Open any YouTube video and go fullscreen (F).
- Click the extension icon to pick **Crop**, **Stretch** or **Off**, or press **Z** on YouTube to cycle.

## Limits
- Only affects fullscreen; the normal and theater views are untouched.
- Bars that are part of the video itself (a movie uploaded with letterboxing baked in) are in the picture, so Crop will zoom only as far as your screen's shape requires, not past those bars.
- If YouTube renames its player classes, the CSS selectors in `styles.css` may need updating.
