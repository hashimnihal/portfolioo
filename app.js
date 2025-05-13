document.addEventListener("DOMContentLoaded", function () {
        const filter_btns = document.querySelectorAll(".filter-btn");
        const skills_wrap = document.querySelector(".skills-wrap");
        const skills_bars = document.querySelectorAll(".skill-progress");
        const records_wrap = document.querySelector(".records-wrap");
        const records_numbers = document.querySelectorAll(".number");
        const footer_input = document.querySelector(".footer-input");
        const hamburger_menu = document.querySelector("#hamburger");
        const navbar = document.querySelector("#navbar");
        const links = document.querySelectorAll(".navbar .links a");

        if (footer_input) {
          footer_input.addEventListener("focus", () => {
            footer_input.classList.add("focus");
          });
          footer_input.addEventListener("blur", () => {
            if (footer_input.value.trim() !== "") return;
            footer_input.classList.remove("focus");
          });
        }

        function closeMenu() {
          if (navbar) navbar.classList.remove("open");
          document.body.classList.remove("stop-scrolling");
         
        }

        if (hamburger_menu) {
          hamburger_menu.addEventListener("click", () => {
            if (!navbar.classList.contains("open")) {
              navbar.classList.add("open");
              document.body.classList.add("stop-scrolling");
            } else {
              closeMenu();
            }
          });
        }

        if (links) {
          links.forEach((link) => {
            link.addEventListener("click", () => closeMenu());
          });
        }

        if (filter_btns) {
          filter_btns.forEach((btn) => {
            btn.addEventListener("click", () => {
              filter_btns.forEach((button) => button.classList.remove("active"));
              btn.classList.add("active");
              let filterValue = btn.dataset.filter;
              if (window.jQuery) {
                $(".grid").isotope({ filter: filterValue });
              } else {
                console.error("jQuery is not loaded. Isotope requires jQuery.");
              }
            });
          });
        }

        if (window.jQuery) {
          $(window).on("load", function () {
            $(".grid").isotope({
              itemSelector: ".grid-item",
              layoutMode: "fitRows",
              transitionDuration: "0.6s",
            });
          });
        }

        window.addEventListener("scroll", () => {
          skillsEffect();
          countUp();
        });

        function checkScroll(el) {
          if (!el) return false;
          let rect = el.getBoundingClientRect();
          return window.innerHeight >= rect.top + el.offsetHeight;
        }

        function skillsEffect() {
          if (!skills_wrap) return;
          if (!checkScroll(skills_wrap)) return;
          skills_bars.forEach((skill) => {
            skill.style.width = skill.dataset.progress;
          });
        }

        function countUp() {
          if (!records_wrap) return;
          if (!checkScroll(records_wrap)) return;
          records_numbers.forEach((numb) => {
            const updateCount = () => {
              let currentNum = +numb.innerText;
              let maxNum = +numb.dataset.num;
              let speed = 100;
              const increment = Math.ceil(maxNum / speed);
              if (currentNum < maxNum) {
                numb.innerText = currentNum + increment;
                setTimeout(updateCount, 1);
              } else {
                numb.innerText = maxNum;
              }
            };
            setTimeout(updateCount, 400);
          });
        }

        new Swiper(".swiper-container", {
          speed: 1100,
          slidesPerView: 1,
          loop: true,
          autoplay: {
            delay: 5000,
          },
          navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          },
        });
      });
    