Drop your exported App Store screenshot PNGs in this folder.

Then open index.html, find the "SCREENSHOTS — SLOTS LEFT EMPTY"
section, and inside each .shot-frame replace this:

    <div class="slot-note"><b>Slot 1</b>Home &amp; due today</div>

with this:

    <img src="assets/screenshots/home.png" alt="Clarity home screen showing topics due today">

Notes
- Each .shot block is independent. Add or delete blocks freely;
  the row scrolls horizontally and snaps.
- Update the <figcaption class="shot-caption"> under each one to
  describe the screen.
- Frames are locked to a 1320 x 2868 aspect ratio, so export at
  whatever size you used for the App Store canvas and the CSS
  will scale it down. No separate web export needed.
- Images are cropped with object-fit: cover, so keep the important
  content away from the very edges.

Optional: the hero currently shows an interactive calibration
gauge instead of a screenshot. If you'd rather show a phone there,
swap the <div class="gauge"> ... </div> block for:

    <div class="phone-slot">
      <img src="assets/screenshots/hero.png" alt="Clarity home screen">
    </div>
