// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

const togglePassword = document.querySelector("#togglePassword");
    const password = document.querySelector("#password");
    const eyeIcon = document.querySelector("#eyeIcon");

    togglePassword.addEventListener("click", function () {
        // Toggle the type attribute
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type); // type = text or password setting

        // Toggle the eye icon
        eyeIcon.classList.toggle("bi-eye"); //write
        eyeIcon.classList.toggle("bi-eye-slash");
    });



  const imageInput = document.getElementById("listingImagefornew");
  const imageFeedback = document.getElementById("imageFeedbackfornew");

  imageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const validTypes = ["image/jpeg"];
      if (!validTypes.includes(file.type)) {
        this.classList.add("is-invalid");
        imageFeedback.style.display = "block";
        this.value = ""; // reset the input
      } else {
        this.classList.remove("is-invalid");
        imageFeedback.style.display = "none";
      }
    }
  });


   
