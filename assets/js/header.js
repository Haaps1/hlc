/* =========================================================
   Veinex Health — site header
   This file is shared by every page. Edit the HTML between the
   backticks below and the header changes on the whole website.
   ========================================================= */
document.currentScript.insertAdjacentHTML("beforebegin", `
<div class="preloader" aria-hidden="true">
  <div class="pl-inner">
    <img class="pl-logo" src="assets/img/veinex-logo.png" alt="">
    <svg class="pl-ecg" viewBox="0 0 200 50"><path d="M0 25h60l8-14 10 30 10-36 10 30 6-10h96"/></svg>
  </div>
</div>
<div class="page-transition"></div>
<div class="scroll-progress"></div>

<!-- Top bar -->
<div class="topbar">
  <div class="container">
    <div class="topbar-info">
      <a data-tel href="tel:+919876543210"><i class="fa-solid fa-phone"></i> +91 98765 43210</a>
      <a href="mailto:care@veinexhealth.in"><i class="fa-solid fa-envelope"></i> care@veinexhealth.in</a>
      <span><i class="fa-solid fa-location-dot"></i> Indiranagar, Bangalore</span>
    </div>
    <div class="topbar-social">
      <span><i class="fa-regular fa-clock"></i> Mon–Sat 9 AM – 9 PM</span>
      <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
      <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
      <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
    </div>
  </div>
</div>

<!-- Main header -->
<header class="header">
  <nav class="nav container" aria-label="Main">
    <a class="logo" href="index.html" aria-label="Veinex Health home">
        <img class="logo-img" src="assets/img/veinex-logo.png" alt="Veinex Health, Varicose Veins &amp; Proctology Clinic" width="190" height="64">
      </a>
    <ul class="nav-links">
      <li><a href="index.html" data-nav="home">Home</a></li>
      <li><a href="about.html" data-nav="about">About Us</a></li>
      <li class="has-mega">
        <a href="services.html" data-nav="services">Treatments <i class="fa-solid fa-chevron-down"></i></a>
        <div class="mega">
          <div class="mega-col">
            <h6><i class="fa-solid fa-notes-medical"></i>Proctology</h6>
            <a href="piles-treatment-in-bangalore.html" data-nav="piles"><i class="fa-solid fa-notes-medical"></i>Piles (Hemorrhoids)</a>
            <a href="fissure-treatment-in-bangalore.html" data-nav="fissure"><i class="fa-solid fa-bandage"></i>Anal Fissure</a>
            <a href="fistula-treatment-in-bangalore.html" data-nav="fistula"><i class="fa-solid fa-syringe"></i>Fistula-in-Ano</a>
            <a href="pilonidal-sinus-treatment-in-bangalore.html" data-nav="pilonidal-sinus"><i class="fa-solid fa-kit-medical"></i>Pilonidal Sinus</a>
          </div>
          <div class="mega-col">
            <h6><i class="fa-solid fa-heart-pulse"></i>Vascular Surgery</h6>
            <a href="varicose-veins-treatment-in-bangalore.html" data-nav="varicose-veins"><i class="fa-solid fa-heart-pulse"></i>Varicose Veins</a>
            <a href="diabetic-foot-treatment-in-bangalore.html" data-nav="diabetic-foot"><i class="fa-solid fa-shoe-prints"></i>Diabetic Foot</a>
          </div>
          <div class="mega-col">
            <h6><i class="fa-solid fa-video"></i>Laparoscopy</h6>
            <a href="hernia-surgery-in-bangalore.html" data-nav="hernia"><i class="fa-solid fa-shield-heart"></i>Hernia</a>
            <a href="gallbladder-stone-treatment-in-bangalore.html" data-nav="gallbladder-stones"><i class="fa-solid fa-gem"></i>Gallbladder Stones</a>
          </div>
          <div class="mega-col">
            <h6><i class="fa-solid fa-user-doctor"></i>General Surgery</h6>
            <a href="liposuction-in-bangalore.html" data-nav="liposuction"><i class="fa-solid fa-weight-scale"></i>Liposuction</a>
            <a href="appendicitis-surgery-in-bangalore.html" data-nav="appendicitis"><i class="fa-solid fa-truck-medical"></i>Appendicitis</a>
            <a href="hydrocele-surgery-in-bangalore.html" data-nav="hydrocele"><i class="fa-solid fa-droplet"></i>Hydrocele</a>
            <a href="lipoma-removal-in-bangalore.html" data-nav="lipoma"><i class="fa-solid fa-circle-nodes"></i>Lipoma</a>
            <a href="circumcision-surgery-in-bangalore.html" data-nav="circumcision"><i class="fa-solid fa-user-doctor"></i>Circumcision</a>
          </div>
          <div class="mega-foot">
            <span><i class="fa-solid fa-user-doctor"></i> Not sure which treatment you need? Talk to our specialist.</span>
            <a href="services.html">View all treatments <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
      </li>
      <li><a href="varicose-veins-treatment-in-bangalore.html" data-nav="varicose-veins">Varicose Veins</a></li>
      <li><a href="piles-treatment-in-bangalore.html" data-nav="piles">Piles</a></li>
      <li><a href="contact.html" data-nav="contact">Contact</a></li>
    </ul>
    <div class="nav-cta">
      <a class="nav-phone" data-tel href="tel:+919876543210"><span class="ic"><i class="fa-solid fa-phone-volume"></i></span><span><small>Call for appointment</small>+91 98765 43210</span></a>
      <button class="btn btn-primary btn-magnetic" data-book><i class="fa-regular fa-calendar-check"></i> Book Appointment</button>
    </div>
    <div class="app-actions">
      <a class="wa" data-wa href="#" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
      <a data-tel href="tel:+919876543210" aria-label="Call"><i class="fa-solid fa-phone"></i></a>
      <button data-menu aria-label="Open menu"><i class="fa-solid fa-bars-staggered"></i></button>
    </div>
  </nav>
</header>
`);
