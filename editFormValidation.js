document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("imageForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (validateForm()) {
            var formData = new FormData(form);
            for (var pair of formData.entries()) {
                console.log(pair[0] + ": " + pair[1]);
            }
        }
    });
});

function validateForm() {
    var imageTitle = document.getElementById("imageTitle").value;
    var imageDescription = document.getElementById("imageDescription").value;
    var image = document.getElementById("image").value;
    var category = document.getElementById("category").value;
    var itemForSale = document.querySelector('input[name="itemForSale"]:checked');
    var itemPrice = document.getElementById("itemPrice").value;

    if (imageTitle.trim() === "") {
        alert("Please enter the Image Title.");
        return false;
    }
    if (imageDescription.trim() === "") {
        alert("Please enter the Image Description.");
        return false;
    }
    if (image.trim() === "") {
        alert("Please select an Image.");
        return false;
    }
    if (category === "") {
        alert("Please select a Category.");
        return false;
    }
    if (!itemForSale) {
        alert("Please select whether the Item is for Sale or not.");
        return false;
    }
    if (itemForSale.value === "yes" && itemPrice.trim() === "") {
        alert("Please enter the Item Price.");
        return false;
    }

    return true;
}
