// ==========================================
// C 63 S — MAIN JAVASCRIPT
// ==========================================


// ==========================================
// SHORT SELECTORS
// ==========================================

const $ = (selector, parent = document) => {
  return parent.querySelector(selector);
};

const $$ = (selector, parent = document) => {
  return [...parent.querySelectorAll(selector)];
};



// ==========================================
// LOADING SCREEN
// ==========================================

window.addEventListener("load", () => {

  setTimeout(() => {

    const loader = $("#loader");

    if (loader) {
      loader.classList.add("hide");
    }

  }, 700);

});



// ==========================================
// HEADER SCROLL EFFECT
// ==========================================

const header = $("#siteHeader");

window.addEventListener(
  "scroll",
  () => {

    if (!header) return;

    if (window.scrollY > 30) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  },
  {
    passive: true
  }
);



// ==========================================
// HERO VIDEO SOUND
// ==========================================

const video = $("#heroVideo");

const soundButton = $("#soundBtn");


if (soundButton && video) {

  soundButton.addEventListener("click", () => {

    if (video.muted) {

      video.muted = false;

      soundButton.innerHTML =
        '<span class="sound-icon">◼</span> SOUND ON';

      video.play().catch(() => {});

    } else {

      video.muted = true;

      soundButton.innerHTML =
        '<span class="sound-icon">◼</span> SOUND OFF';

    }

  });

}



// ==========================================
// PERFORMANCE NUMBER ANIMATION
// ==========================================

const counters = $$("[data-count]");


const counterObserver =
  new IntersectionObserver(

    (entries, observer) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }


        const element = entry.target;

        const target =
          Number(element.dataset.count);


        const decimals =
          Number(
            element.dataset.decimals || 0
          );


        const startTime =
          performance.now();


        const duration = 1000;


        function animateCounter(currentTime) {

          const elapsed =
            currentTime - startTime;


          const progress =
            Math.min(
              elapsed / duration,
              1
            );


          const easedProgress =
            1 -
            Math.pow(
              1 - progress,
              3
            );


          const value =
            target * easedProgress;


          element.textContent =
            value.toFixed(decimals);


          if (progress < 1) {

            requestAnimationFrame(
              animateCounter
            );

          }

        }


        requestAnimationFrame(
          animateCounter
        );


        observer.unobserve(element);

      });

    },

    {
      threshold: 0.5
    }

  );


counters.forEach((counter) => {

  counterObserver.observe(counter);

});



// ==========================================
// EXTERIOR COLOR SELECTOR
// ==========================================

const swatches = $$(".swatch");

const colorName = $("#colorName");


swatches.forEach((swatch) => {

  swatch.addEventListener(
    "click",
    () => {

      swatches.forEach((item) => {

        item.classList.remove(
          "active"
        );

      });


      swatch.classList.add(
        "active"
      );


      if (colorName) {

        colorName.textContent =
          swatch.dataset.name;

      }

    }
  );

});



// ==========================================
// WHEEL SELECTOR
// ==========================================

const wheelChoices =
  $$(".choice");


wheelChoices.forEach((choice) => {

  choice.addEventListener(
    "click",
    () => {

      wheelChoices.forEach((item) => {

        item.classList.remove(
          "active"
        );

      });


      choice.classList.add(
        "active"
      );

    }
  );

});



// ==========================================
// ENQUIRY MODAL
// ==========================================

const enquiryModal =
  $("#enquiryModal");


function openEnquiry() {

  if (!enquiryModal) return;

  enquiryModal.classList.add(
    "open"
  );

  enquiryModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";

}


function closeEnquiry() {

  if (!enquiryModal) return;

  enquiryModal.classList.remove(
    "open"
  );

  enquiryModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow =
    "";

}



// ==========================================
// OPEN ENQUIRY BUTTONS
// ==========================================

const openButtons =
  $$("[data-open-enquiry]");


openButtons.forEach((button) => {

  button.addEventListener(
    "click",
    openEnquiry
  );

});



// ==========================================
// CLOSE ENQUIRY BUTTONS
// ==========================================

const closeButtons =
  $$("[data-close-enquiry]");


closeButtons.forEach((button) => {

  button.addEventListener(
    "click",
    closeEnquiry
  );

});



// ==========================================
// ESCAPE KEY CLOSE
// ==========================================

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      closeEnquiry();

    }

  }
);



// ==========================================
// ENQUIRY FORM
// ==========================================

const enquiryForm =
  $("#enquiryForm");


const formSuccess =
  $("#formSuccess");


if (enquiryForm) {

  enquiryForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      if (formSuccess) {

        formSuccess.style.display =
          "block";

      }


      enquiryForm.reset();

    }
  );

}



// ==========================================
// CURRENT YEAR
// ==========================================

const yearElement =
  $("#year");


if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}



// ==========================================
// SMOOTH ANCHOR NAVIGATION
// ==========================================

const anchorLinks =
  $$('a[href^="#"]');


anchorLinks.forEach((link) => {

  link.addEventListener(
    "click",
    (event) => {

      const targetId =
        link.getAttribute("href");


      if (!targetId || targetId === "#") {
        return;
      }


      const target =
        $(targetId);


      if (!target) {
        return;
      }


      event.preventDefault();


      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }
  );

});



// ==========================================
// VIDEO AUTOPLAY FALLBACK
// ==========================================

if (video) {

  video.play().catch(() => {

    // Some mobile browsers block autoplay.
    // The poster image will remain visible.

  });

}



// ==========================================
// CONFIGURATION VISUAL FEEDBACK
// ==========================================

const configImage =
  $("#configImage");


swatches.forEach((swatch) => {

  swatch.addEventListener(
    "click",
    () => {

      if (!configImage) {
        return;
      }


      // Give the configuration image
      // a subtle transition when a
      // configuration is selected.

      configImage.style.transform =
        "scale(1.025)";


      setTimeout(() => {

        configImage.style.transform =
          "scale(1)";

      }, 350);

    }
  );

});



// ==========================================
// BUTTON PRESS EFFECT
// ==========================================

const buttons =
  $$("button");


buttons.forEach((button) => {

  button.addEventListener(
    "pointerdown",
    () => {

      button.style.transform =
        "scale(0.97)";

    }
  );


  button.addEventListener(
    "pointerup",
    () => {

      button.style.transform =
        "";

    }
  );


  button.addEventListener(
    "pointerleave",
    () => {

      button.style.transform =
        "";

    }
  );

});



// ==========================================
// INTERSECTION REVEAL
// ==========================================

const revealElements =
  $$(
    ".stat-card, .detail-card, .engineering-list > div"
  );


const revealObserver =
  new IntersectionObserver(

    (entries, observer) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }


        entry.target.style.opacity =
          "1";


        entry.target.style.transform =
          "translateY(0)";


        entry.target.style.transition =
          "opacity 0.7s ease, transform 0.7s ease";


        observer.unobserve(
          entry.target
        );

      });

    },

    {
      threshold: 0.15
    }

  );


revealElements.forEach((element) => {

  element.style.opacity =
    "0";


  element.style.transform =
    "translateY(25px)";


  revealObserver.observe(
    element
  );

});



// ==========================================
// END
// ==========================================