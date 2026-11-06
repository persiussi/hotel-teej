# Hotel Teej · Nawalgarh website concept

A responsive, accessible, framework-free hotel demo built with **HTML + CSS + vanilla JavaScript**, designed with fresco-inspired colour and graphic motifs, without misrepresenting the actual hotel as a heritage haveli.

## Run

Open `website/index.html` in a browser. No build step is required. Alternatively, from inside `website/`, run `python -m http.server 8080` and visit http://localhost:8080.

## What is inside

- `index.html` — page structure, SEO description, semantic sections and functional navigation
- `style.css` — desktop/mobile visual design, hover/motion and reduced-motion support
- `script.js` — mobile nav, gallery filtering, lightbox, form validation, enquiry message copy, remote image fallback
- `assets/images/*.svg` — locally stored ORIGINAL artwork for guaranteed offline fallbacks, **not hotel photos**
- `assets/images/film-poster.jpg` — poster for the original animated postcard
- `assets/videos/nawalgarh-postcard.mp4` — fully local, 12-second concept motion artwork, **not footage of the property**
- `MEDIA_SOURCES.md` — photo attribution and reuse notes

## Photo & video notes

The website references several archival photos associated with **SPOT ON 60198 Hotel Teej** on a historical OYO listing (`https://www.oyorooms.com/80599/`). These externally hosted photographs require internet access and may fail to load due to hotlink or regional controls. The page automatically shows local artwork in that case. Images are labeled as historical listing photos; do not claim that they represent current hotel conditions without confirmation.

**Important:** The external photos are not bundled with this ZIP. Before commercial deployment, contact the hotel and/or rightsholders, secure authorized current property photography/videos, and host permitted copies in `assets/images/` / `assets/videos/` for reliable playback. The original local motion film was generated for this website; it does not depict the hotel's real building or interiors.

## Content to confirm with owner

- Current phone number and precise address; the public Google Hotels listing shows `+91 93310 09481`, 'opposite SDM office and near Shrima Plaza, 3rd floor'.
- Current room categories, prices, facilities and opening hours for restaurant/bar.
- Photos that show the **current** property and permission to reuse them.
- Booking policy and optional secure reservation backend (this demo's form **only prepares a message**, does not transmit or create a reservation).
- No invented room prices, ratings, testimonials, or unverified amenities have been added.

## Quick customization

- Update the CSS custom properties at top of `style.css` to adjust the palette.
- Replace the external image URLs in `index.html` with authorized local `assets/images/...` references and update the media attribution.
- Replace the 12-second concept `mp4` and poster with actual authorized hotel footage.
- Update Google Maps coordinates or links if the hotel supplies an alternate precise location.

Demo photos and the Google Maps iframe require internet access; the rest of the experience runs locally.
