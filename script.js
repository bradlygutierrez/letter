const letters = [
  {
    theme: "Una verdad sencilla",
    title: "Lo que amo de vos",
    images: [
      "images/Fotos Nosotros Juntos/WhatsApp Image 2026-09-22 at 10.02.16 PM.jpeg",
      "images/Fotos Nosotros Juntos/WhatsApp Image 2026-09-22 at 10.02.28 PM.jpeg",
    ],
    fallback: "Todo lo lindo de vos",
    paragraphs: [
      "Amo la forma en que hacés que los días comunes se sientan especiales. Amo tu risa, tu manera de mirar el mundo, amo el como comprendes cada aspecto de la vida y esa ternura que aparece incluso cuando no te das cuenta.",
      "En tu cumpleaños quiero recordarte que sos una persona inmensa, a como te lo he dicho siempre, sos la luz de mi vida y de las personas que te rodean. Gracias por existir y por dejarme acompañarte en este camino, sos mi vida Daiarita.",
    ],
    signature: "Con todo mi amor,\nTu tito",
  },
  {
    theme: "Nuestros pequeños tesoros",
    title: "Nuestros recuerdos",
    images: [
      "images/Fotos Nosotros Juntos/WhatsApp Image 2026-09-22 at 10.04.39 PM.jpeg",
      "images/Fotos Nosotros Juntos/WhatsApp Image 2026-09-22 at 10.08.51 PM.jpeg",
    ],
    fallback: "Nuestra historia",
    paragraphs: [
      "Guardo nuestros recuerdos como pequeñas postales: cada conversación, cada abrazo, cada risa, no me arrepiento nuncade haberte contestado ese mensaje a mi estado y de seguir hablando con vos por los siguientes dias, cada año que he pasado con vos es un regalo que atesoro profundamente. Cada momento compartido es un tesoro que guardo en mi corazón, amo los dias en los que simplemente hablamos acostados en la cama y amo los dias en los dias en los que salimos, paseamos y nos divertimos juntos. Amo todo lo que hemos vivido y todo lo que nos queda por vivir.",
      "Ojalá sigamos llenando la vida de momentos nuestros, de planes improvisados y de historias que un día vamos a contar sonriendo. Mi lugar favorito siempre va a ser cerquita tuyo.",
    ],
    signature: "Siempre juntos,\nTu tito",
  },
  {
    theme: "Un nuevo año para brillar",
    title: "Deseos para tu cumpleaños",
    images: [
      "images/Fotos Nosotros Juntos/WhatsApp Image 2026-09-22 at 10.09.07 PM.jpeg",
      "images/Fotos Nosotros Juntos/WhatsApp Image 2026-09-22 at 10.02.28 PM.jpeg",
    ],
    fallback: "Que se cumpla todo",
    paragraphs: [
      "Deseo que este nuevo año te encuentre rodeada de amor, proyectos bonitos y motivos para sonreír. Que nunca te falte la confianza para perseguir eso que te hace feliz. Espero que podas conseguir el trabajo que tanto deseas, que sigas aprendiendo, creciendo y que todo lo que te propongas se haga realidad. Que la vida te sorprenda con momentos de alegría y que cada día esté lleno de nuevas oportunidades.",
      "Y deseo poder estar ahí para celebrarte, cuidarte y recordarte cada vez que haga falta lo especial que sos. Feliz cumpleaños, mi amor. Te merecés todo lo hermoso.",
    ],
    signature: "Feliz cumpleaños,\nTu tito",
  },
];
const landingView = document.getElementById("landingView");
const letterView = document.getElementById("letterView");
const backButton = document.getElementById("backButton");
const letterImageOne = document.getElementById("letterImageOne");
const letterImageTwo = document.getElementById("letterImageTwo");
const photoFallback = document.getElementById("photoFallback");
const fallbackText = document.getElementById("fallbackText");
const letterKicker = document.getElementById("letterKicker");
const letterTitle = document.getElementById("letterTitle");
const letterCopy = document.getElementById("letterCopy");
const letterSignature = document.getElementById("letterSignature");
const envelopeCards = [...document.querySelectorAll(".envelope-card")];
let activeEnvelope = null;
let isTransitioning = false;
let failedLetterImages = 0;
letterView.inert = true;
function renderLetter(index) {
  const letter = letters[index];
  letterKicker.textContent = letter.theme;
  letterTitle.textContent = letter.title;
  fallbackText.textContent = letter.fallback;
  letterCopy.innerHTML = letter.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");
  letterSignature.innerHTML = letter.signature.replace("\n", "<br>");
  failedLetterImages = 0;
  [letterImageOne, letterImageTwo].forEach((image, imageIndex) => {
    image.alt = `Foto ${imageIndex + 1} de ${letter.title.toLowerCase()}`;
    image.hidden = false;
    image.src = letter.images[imageIndex];
  });
  photoFallback.hidden = true;
}
[letterImageOne, letterImageTwo].forEach((image) => image.addEventListener("error", () => {
  image.hidden = true;
  failedLetterImages += 1;
  if (failedLetterImages === 2) photoFallback.hidden = false;
}));
function openLetter(index) {
  if (isTransitioning) return;
  isTransitioning = true;
  activeEnvelope = envelopeCards[index];
  renderLetter(index);
  activeEnvelope.classList.add("is-opening");
  landingView.classList.add("is-leaving");
  window.setTimeout(() => { landingView.hidden = true; window.scrollTo(0, 0); letterView.classList.add("is-visible"); letterView.setAttribute("aria-hidden", "false"); letterView.inert = false; backButton.focus(); isTransitioning = false; }, 440);
}
function closeLetter() {
  if (isTransitioning || !activeEnvelope) return;
  isTransitioning = true;
  letterView.classList.remove("is-visible");
  letterView.setAttribute("aria-hidden", "true");
  letterView.inert = true;
  landingView.hidden = false;
  landingView.classList.remove("is-leaving");
  window.setTimeout(() => { activeEnvelope.classList.remove("is-opening"); activeEnvelope.focus(); isTransitioning = false; }, 480);
}
envelopeCards.forEach((envelope) => envelope.addEventListener("click", () => openLetter(Number(envelope.dataset.letter))));
backButton.addEventListener("click", closeLetter);
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && letterView.classList.contains("is-visible")) closeLetter(); });
