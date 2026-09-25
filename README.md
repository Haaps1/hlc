# HLC — Laser & Surgery Clinic website

Static site: open `index.html` or upload the folder to any host. No build step needed.

## Pages
- `index.html`: Home
- `about.html`: About
- `services.html`: All 13 services (filter + search)
- `piles.html`: Piles service detail page
- `contact.html`: Contact / appointment form + map

## Replace before going live
| What | Where |
|---|---|
| Phone / WhatsApp number | `assets/js/main.js` → `CONFIG` (updates every call/WhatsApp link). Also the visible text `+91 98765 43210` in the HTML files |
| Address, email | Search the HTML files for `Indiranagar` and `care@hlcclinic.in` |
| Logo | `assets/img/logo.svg` |
| Photos | Unsplash placeholder URLs in the HTML (`images.unsplash.com`) |
| Doctors, testimonials, stats, insurers | Sample content in `index.html` / `about.html` |
| Colours | `:root` variables at the top of `assets/css/style.css` |

## How leads work
There's no backend. Every form checks the name and a 10-digit Indian mobile number, then opens
WhatsApp with the patient's details pre-filled and sent to the clinic number. To also store leads,
point the form submit in `main.js` (the "Lead forms" section) at a form service such as Formspree or Google Sheets.

Service cards without their own page link to `contact.html?service=<slug>`, which pre-selects that service in the form.
