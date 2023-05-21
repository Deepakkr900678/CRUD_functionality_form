document.addEventListener("DOMContentLoaded", function () {
  var recordTable = document.getElementById("recordTable");
  var records = [];

  function addRecord(title, category, imagePreview, paidOrFree) {
    records.push({
      title: title,
      category: category,
      imagePreview: imagePreview,
      paidOrFree: paidOrFree
    });
  }

  function generateTableRows() {
    var tbody = recordTable.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";

    records.forEach(function (record, index) {
      var row = tbody.insertRow();

      var titleCell = row.insertCell();
      titleCell.textContent = record.title;

      var categoryCell = row.insertCell();
      categoryCell.textContent = record.category;

      var imagePreviewCell = row.insertCell();
      var imagePreview = document.createElement("img");
      imagePreview.src = record.imagePreview;
      imagePreviewCell.appendChild(imagePreview);

      var paidOrFreeCell = row.insertCell();
      paidOrFreeCell.textContent = record.paidOrFree;

      var controlOptionsCell = row.insertCell();
      var editLink = document.createElement("a");
      editLink.href = "editForm.html?index=" + index;
      editLink.textContent = "Edit";
      controlOptionsCell.appendChild(editLink);
      controlOptionsCell.appendChild(document.createTextNode(" | "));
      var deleteLink = document.createElement("a");
      deleteLink.href = "#";
      deleteLink.textContent = "Delete";
      controlOptionsCell.appendChild(deleteLink);
    });
  }

  addRecord("Image 1", "People", "image1.jpg", "Paid");
  addRecord("Image 2", "Tech", "image2.jpg", "Free");
  addRecord("Image 3", "Entertainment", "image3.jpg", "Paid");

  generateTableRows();
});

function populateRecordsTable(records) {
  var tableBody = document.getElementById("records-table-body");

  tableBody.innerHTML = "";

  for (var i = 0; i < records.length; i++) {
    var record = records[i];
    var row = document.createElement("tr");

    var titleCell = document.createElement("td");
    titleCell.textContent = record.title;
    row.appendChild(titleCell);

    var categoryCell = document.createElement("td");
    categoryCell.textContent = record.category;
    row.appendChild(categoryCell);

    var imagePreviewCell = document.createElement("td");
    row.appendChild(imagePreviewCell);

    var paidOrFreeCell = document.createElement("td");
    paidOrFreeCell.textContent = record.paid ? "Paid" : "Free";
    row.appendChild(paidOrFreeCell);

    var controlOptionsCell = document.createElement("td");
    row.appendChild(controlOptionsCell);

    tableBody.appendChild(row);
  }
}

var imageFileInput = document.getElementById("image-file-input");

imageFileInput.addEventListener("change", function (event) {
  var file = event.target.files[0];

  var thumbnailFileName = "thumbnail_" + file.name;
  var previewFileName = "preview_" + file.name;
  var originalFileName = "original_" + file.name;

  var thumbnailImage = new Image(300, 300);
  var previewImage = new Image(900, 900);
  var originalImage = new Image();

  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");

  originalImage.onload = function () {
    ctx.clearRect(0, 0, thumbnailImage.width, thumbnailImage.height);
    ctx.drawImage(originalImage, 0, 0, thumbnailImage.width, thumbnailImage.height);
    var thumbnailDataUrl = canvas.toDataURL();

    ctx.clearRect(0, 0, previewImage.width, previewImage.height);
    ctx.drawImage(originalImage, 0, 0, previewImage.width, previewImage.height);
    var previewDataUrl = canvas.toDataURL();

    var formData = new FormData();
    formData.append("imageFile", file, originalFileName);
    fetch("/uploadImage", { method: "POST", body: formData })
      .then(response => {
        if (response.ok) {
          console.log("Image file uploaded successfully");
        } else {
          console.error("Failed to upload the image file");
        }
      })
      .catch(error => {
        console.error("An error occurred while uploading the image file", error);
      });
  };

  originalImage.src = URL.createObjectURL(file);
});


function deleteRecord(recordId) {

  fetch(`/deleteRecord/${recordId}`, { method: "DELETE" })
    .then(response => {
      if (response.ok) {
        console.log("Record deleted successfully");
      } else {
        console.error("Failed to delete the record");
      }
    })
    .catch(error => {
      console.error("An error occurred while deleting the record", error);
    });
}


document.addEventListener('DOMContentLoaded', function () {
  fetch('path/to/records-api')
    .then(response => response.json())
    .then(records => {
      const recordListBody = document.getElementById('record-list-body');

      records.forEach(record => {
        const row = document.createElement('tr');

        const titleCell = document.createElement('td');
        titleCell.textContent = record.title;
        row.appendChild(titleCell);

        const categoryCell = document.createElement('td');
        categoryCell.textContent = record.category;
        row.appendChild(categoryCell);

        const imagePreviewCell = document.createElement('td');
        const imagePreview = document.createElement('img');
        imagePreview.src = record.imagePreviewUrl;
        imagePreviewCell.appendChild(imagePreview);
        row.appendChild(imagePreviewCell);

        const paidOrFreeCell = document.createElement('td');
        paidOrFreeCell.textContent = record.isPaid ? 'Paid' : 'Free';
        row.appendChild(paidOrFreeCell);

        const controlOptionsCell = document.createElement('td');
        const editLink = document.createElement('a');
        editLink.href = 'edit-form.html?id=' + record.id;
        editLink.textContent = 'Edit';

        const deleteLink = document.createElement('a');
        deleteLink.href = '#';
        deleteLink.textContent = 'Delete';

        controlOptionsCell.appendChild(editLink);
        controlOptionsCell.appendChild(document.createTextNode(' | '));
        controlOptionsCell.appendChild(deleteLink);
        row.appendChild(controlOptionsCell);

        recordListBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching records:', error);
    });
});
