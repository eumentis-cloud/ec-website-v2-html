vex.defaultOptions.className = 'vex-theme-os';

const contactFormEndpoint = 'https://jsb78olm45.execute-api.ap-south-1.amazonaws.com/production/';

const reqdError = {
  name: "Full Name is required",
  email: "Email is required",
  mobile: "Mobile is required",
  message: "Message is required"
};

// Toastr options
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "10000",
  "extendedTimeOut": "5000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};

// Axios defaults
axios.defaults.headers.post['Content-Type'] = 'application/json';

function openContactForm(event) {
  vex.dialog.open({
    message: "Write to us, if you like to avail our services.",
    input: [
      '<input style="display: none;" type="text" class="info-inp" name="info_1" id="cf-info_1" value="not_human" tabindex="-1" autocomplete="false" placeholder="Info1">',
      '<input style="display: none;" type="text" class="info-inp" name="info_2" id="cf-info_2" value="" tabindex="-1" autocomplete="false"  placeholder="Info2">',
      '<input type="text" id="cf-name" name="name" placeholder="Full Name" required>',
      '<input type="email" id="cf-email" name="email" placeholder="Email Address" required>',
      '<input type="tel" id="cf-mobile" name="mobile" placeholder="Mobile no. (India only)" aria-describedby="mobile-addon">',
      '<textarea name="message" id="cf-message" rows="4" placeholder="Message"></textarea>'
    ].join(''),
    buttons: [
      $.extend({}, vex.dialog.buttons.YES, { text: 'Submit' }),
      $.extend({}, vex.dialog.buttons.NO, { text: 'Back' })
    ],
    callback: function (data) {
      if (!data) {
        console.log('Cancelled');
      } else {
        if (!data.hasOwnProperty('info_2')) {
          const errors = [];
          // All fields are required
          for (const key in data) {
            if (!Boolean(data[key])) errors.push(reqdError[key]);
          }
          // Email check
          const emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
          if (!emailRegex.test(data.email)) errors.push("Incorrect email entered");
          // Mobile no. check
          const mobileRegex = /^[7-9]\d{9}$/;
          if (!mobileRegex.test(data.mobile)) errors.push("Incorrect mobile number (should only be 10 digits)");

          if (errors.length > 0) {
            errors.forEach(function (msg) {
              toastr.error(msg);
            });
          } else {
            data.info_2 = "";
            axios.post(contactFormEndpoint, data)
              .then(function (response) {
                toastr["success"]("We have received your query. Expect our reply within 24 hours.", "Thank you!");
              })
              .catch(function (error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  if (error.response.status === 422) {
                    var msg = '<ul>';
                    error.response.data.errors.forEach(function (errorMsg) {
                      "use strict";
                      msg += '<li>' + errorMsg + '</li>';
                    });
                    msg += '</ul>';

                    toastr["error"](msg, "Could not submit due to following errors");
                  } else {
                    toastr.error("Could not submit the form. Please try again!");
                  }
                } else {
                  toastr.error("Could not submit the form. Please try again!");
                }
              });
          }
        }
      }
    }
  });

  event.preventDefault();
}

const sliderConfig = {
  preloadImages: true,
  updateOnImagesReady: true,
  centeredSlides: true,
  spaceBetween: 0,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: true,
  },
}
// Testimonials swiper carousel
let swiper2 = new Swiper('#testimonialSlider', {
  ...sliderConfig,
  pagination: {
    el: '.swiper-pagination',
  },
});

// Other Work swiper carousel
let swiper3 = new Swiper('#otherWorkSlider', {
  ...sliderConfig,
  mouseWheel:false,
  slidesPerView: 3,
  spaceBetween : 30,
  loop: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
    },
    480: {
      slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
    },
    640: {
      slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
    },
    768: {
      slidesPerView: 3
    },
    1024: {
      slidesPerView: 3
    },
  }
})


