# Veinex Health — Varicose Veins & Proctology Clinic website

Static site: open `index.html` or upload the whole folder to any host. No build step needed.

## Pages
| Page | File |
|---|---|
| Home | `index.html` |
| About | `about.html` |
| All treatments | `services.html` |
| Contact | `contact.html` |
| **Proctology** | `piles-treatment-in-bangalore.html` · `fissure-treatment-in-bangalore.html` · `fistula-treatment-in-bangalore.html` · `pilonidal-sinus-treatment-in-bangalore.html` |
| **Vascular Surgery** | `varicose-veins-treatment-in-bangalore.html` · `diabetic-foot-treatment-in-bangalore.html` |
| **Laparoscopy** | `hernia-surgery-in-bangalore.html` · `gallbladder-stone-treatment-in-bangalore.html` |
| **General Surgery** | `liposuction-in-bangalore.html` · `appendicitis-surgery-in-bangalore.html` · `hydrocele-surgery-in-bangalore.html` · `lipoma-removal-in-bangalore.html` · `circumcision-surgery-in-bangalore.html` |

`piles.html` is the old address; it redirects to `piles-treatment-in-bangalore.html`.

## Header & footer (shared)
The header and footer are separate files used by every page:

- `assets/js/header.js`: top bar, logo, menu (4 speciality columns), phone, Book button
- `assets/js/footer.js`: footer, mobile tab bar, mobile menu, booking form

Edit the HTML between the backticks in these files and the change appears on all pages.
Don't use a backtick (`) character inside that HTML.

## Replace before going live
| What | Where |
|---|---|
| Website address | Search all `.html` files, `sitemap.xml` and `robots.txt` for `https://www.veinexhealth.in/` and replace it with the real domain |
| Phone / WhatsApp number | `assets/js/main.js` → `CONFIG`, plus the visible `+91 98765 43210` / `+919876543210` in `header.js`, `footer.js` and the HTML files |
| Address, email | Search for `Indiranagar` and `care@veinexhealth.in` |
| Logo | `assets/img/veinex-logo.png` (header, footer, loader) · `assets/img/logo.svg` (browser tab icon) |
| Photos | Unsplash placeholder URLs in the HTML (`images.unsplash.com`) |
| Doctors, testimonials, stats, insurers | Sample content in `index.html`, `about.html` and the treatment pages |
| Colours | `:root` variables at the top of `assets/css/style.css` |

## SEO built in
- Each treatment page targets "[condition] treatment/surgery in Bangalore" in the URL, title, H1, first paragraph, headings and FAQs.
- About 1,400–1,700 words per treatment page: overview, symptoms, causes, types/grades, treatment options, comparison table, procedure, recovery, cost factors, areas served, FAQs.
- Structured data (JSON-LD): MedicalClinic, MedicalWebPage, BreadcrumbList and FAQPage.
- `sitemap.xml` and `robots.txt` are included. Submit the sitemap in Google Search Console after going live.
- Titles are at most 60 characters and meta descriptions at most 155.
- Medical content should be reviewed by the clinic's doctors before publishing.

## How leads work
There's no backend. Every form checks the name and a 10-digit Indian mobile number, then opens
WhatsApp with the patient's details pre-filled and sent to the clinic number. To also store leads,
point the form submit in `main.js` (the "Lead forms" section) at a form service such as Formspree or Google Sheets.
