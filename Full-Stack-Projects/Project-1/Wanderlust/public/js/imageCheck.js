// imageCheck.js

document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById("listingImagefornew");
    

    imageInput.addEventListener("change", function (event) {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        const files = event.target.files;// write dowm
        let errorMsg = "";

        for (let i = 0; i < files.length; i++) {
            if (!allowedTypes.includes(files[i].type)) {
                errorMsg = "Only .jpg, .jpeg, and .png files are allowed.";
                break;
            }
        }

        // Remove any previous error message
        let prevError = document.getElementById("image-upload-error");
        if (prevError) prevError.remove();

        if (errorMsg) {
            // Clear the input
            imageInput.value = "";
            // Show error message
            const errorDiv = document.createElement("div");
            errorDiv.id = "image-upload-error";
            errorDiv.style.color = "red";
            errorDiv.textContent = errorMsg;
            imageInput.parentNode.insertBefore(errorDiv, imageInput.nextSibling);
        }
    });
});