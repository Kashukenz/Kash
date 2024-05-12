function menuFunc() {
    var x = document.getElementById("navbody");
    if (x.style.display === "none" || x.style.display === "") {
        x.style.display = "block";
        setTimeout(function(){ x.style.opacity = "1"; }, 0);
    } else {
        x.style.opacity = "0";
        setTimeout(function(){ x.style.display = "none"; }, 500);
    }
}

function cardFunc(buttonId) {
  // Get references to the hidden content divs
  var firstHiddenContent = document.getElementById("hidden-content1");
  var secondHiddenContent = document.getElementById("hidden-content2");
  var thirdHiddenContent = document.getElementById("hidden-content3");

  // Hide all hidden contents initially
  firstHiddenContent.style.display = "none";
  secondHiddenContent.style.display = "none";
  thirdHiddenContent.style.display = "none";

  // Show the selected hidden content based on the button clicked
  if (buttonId === "button1") {
      firstHiddenContent.style.display = "block";
      setTimeout(function() {
          firstHiddenContent.style.opacity = "1";
      }, 0);
  } else if (buttonId === "button2") {
      secondHiddenContent.style.display = "block";
      setTimeout(function() {
          secondHiddenContent.style.opacity = "1";
      }, 0);
  } else if (buttonId === "button3") {
      thirdHiddenContent.style.display = "block";
      setTimeout(function() {
          thirdHiddenContent.style.opacity = "1";
      }, 0);
  }

  // Hide other hidden contents when one is active
  if (buttonId !== "button1") {
      firstHiddenContent.style.opacity = "0";
      setTimeout(function() {
          firstHiddenContent.style.display = "none";
      }, 500);
  }
  if (buttonId !== "button2") {
      secondHiddenContent.style.opacity = "0";
      setTimeout(function() {
          secondHiddenContent.style.display = "none";
      }, 500);
  }
  if (buttonId !== "button3") {
      thirdHiddenContent.style.opacity = "0";
      setTimeout(function() {
          thirdHiddenContent.style.display = "none";
      }, 500);
  }
}

// Initialize slider function
const initSlider = () => {
  const sliderWrappers = document.querySelectorAll(".slider-wrapper");

  sliderWrappers.forEach(wrapper => {
      const imageList = wrapper.querySelector(".image-list");
      const slideButtons = wrapper.querySelectorAll(".slide-button");
      const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

      // Slide images according to the slide button clicks
      slideButtons.forEach(button => {
          button.addEventListener("click", () => {
              const direction = button.classList.contains("prev-slide") ? -1 : 1;
              const scrollAmount = imageList.clientWidth * direction;
              imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
          });
      });

      // Show or hide slide buttons based on scroll position
      const handleSlideButtons = () => {
          slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
          slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
      };

      // Call handleSlideButtons when image list scrolls
      imageList.addEventListener("scroll", () => {
          handleSlideButtons();
      });

      // Initialize slide buttons display
      handleSlideButtons();
  });
};

// Call initSlider function on window load and resize
window.addEventListener("load", initSlider);
window.addEventListener("resize", initSlider);



(function () {
    "use strict";
    /*
     * Form Validation
     */
  
    // Fetch all the forms we want to apply custom validation styles to
    const forms = document.querySelectorAll(".needs-validation");
    const result = document.getElementById("result");
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
  
            form.querySelectorAll(":invalid")[0].focus();
          } else {
            /*
             * Form Submission using fetch()
             */
  
            const formData = new FormData(form);
            event.preventDefault();
            event.stopPropagation();
            const object = {};
            formData.forEach((value, key) => {
              object[key] = value;
            });
            const json = JSON.stringify(object);
            result.innerHTML = "Please wait...";
  
            fetch("https://api.web3forms.com/submit", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: json
            })
              .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                  result.innerHTML = json.message;
                  result.classList.remove("text-gray-500");
                  result.classList.add("text-green-500");
                } else {
                  console.log(response);
                  result.innerHTML = json.message;
                  result.classList.remove("text-gray-500");
                  result.classList.add("text-red-500");
                }
              })
              .catch((error) => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
              })
              .then(function () {
                form.reset();
                form.classList.remove("was-validated");
                setTimeout(() => {
                  result.style.display = "none";
                }, 5000);
              });
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  })();