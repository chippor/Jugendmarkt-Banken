function formatIntDE(n) {
  return new Intl.NumberFormat("de-DE").format(n);
}

function formatEUR(n) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(n);
}

function calcTKP(impressions, tkp) {
  return (impressions / 1000) * tkp;
}

/* sorgt dafür, dass der Slider-Balken „mitläuft“ (cooler Look) */
function setFill(rangeEl) {
  const min = Number(rangeEl.min);
  const max = Number(rangeEl.max);
  const val = Number(rangeEl.value);
  const pct = ((val - min) / (max - min)) * 100;
  rangeEl.style.setProperty("--fill", pct + "%");
}

function setup() {
  const tkpDisplay = 22;
  const tkpSocial = 25;
  const tkpDv360 = 25;
  const priceMail = 0.40;
  const priceLic = 4;

  const el = (id) => document.getElementById(id);

  const sDisplay = el("s_display");
  const sSocial  = el("s_social");
  const sDv360   = el("s_dv360");
  const sMail    = el("s_mail");
  const sLic     = el("s_lic");

  function updateMedia() {
    const display = Number(sDisplay.value);
    const social  = Number(sSocial.value);
    const dv360   = Number(sDv360.value);
    const mail    = Number(sMail.value);

    // Slider-Fill (Design)
    setFill(sDisplay);
    setFill(sSocial);
    setFill(sDv360);
    setFill(sMail);

    // Volumen anzeigen
    el("v_display").textContent = formatIntDE(display);
    el("v_social").textContent  = formatIntDE(social);
    el("v_dv360").textContent   = formatIntDE(dv360);
    el("v_mail").textContent    = formatIntDE(mail);

    // Preise berechnen
    const pDisplay = calcTKP(display, tkpDisplay);
    const pSocial  = calcTKP(social, tkpSocial);
    const pDv360   = calcTKP(dv360, tkpDv360);
    const pMail    = mail * priceMail;

    // Preise anzeigen
    el("p_display").textContent = formatEUR(pDisplay);
    el("p_social").textContent  = formatEUR(pSocial);
    el("p_dv360").textContent   = formatEUR(pDv360);
    el("p_mail").textContent    = formatEUR(pMail);

    // Total
    const total = pDisplay + pSocial + pDv360 + pMail;
    el("t_media").textContent = formatEUR(total);
  }

  function updateLic() {
    const lic = Number(sLic.value);

    // Slider-Fill (Design)
    setFill(sLic);

    // Anzahl anzeigen
    el("v_lic").textContent = formatIntDE(lic);

    // Preis berechnen + anzeigen
    const pLic = lic * priceLic;
    el("p_lic").textContent = formatEUR(pLic);
    el("t_lic").textContent = formatEUR(pLic);
  }

  // Wenn du schiebst → sofort neu rechnen
  [sDisplay, sSocial, sDv360, sMail].forEach((s) => s.addEventListener("input", updateMedia));
  sLic.addEventListener("input", updateLic);

  // Initial
  [sDisplay, sSocial, sDv360, sMail, sLic].forEach(setFill);
  updateMedia();
  updateLic();
}

document.addEventListener("DOMContentLoaded", setup);
