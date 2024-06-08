document.addEventListener("DOMContentLoaded", function () {
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");
  const MAX_IMAGES = 5;
  const maxSize = 1024 * 1024; // 1 MB in bytes

  // Write the code of all the dropzone functionality here
  dropzone.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  dropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    fileInput.files = event.dataTransfer.files;
    console.log(fileInput.files);
    uploadImage();
  });

  // Fetch image from input
  fileInput.addEventListener("change", uploadImage);

  function uploadImage() {
    const imageLink = fileInput.files;
    console.log(imageLink);
    displayFile(imageLink[0]);
  }

  function displayFile(file) {
    // Checking the condition, only 5 images allowed
    const list = document.querySelectorAll(".file-name");
    if (list.length > MAX_IMAGES - 1) {
      window.alert(
        `Maximum images allowed is 5. "${file.name}" won't be added.`
      );
      return;
    }

    // Checking the condition, only images less than 1MB allowed
    if (file.size > maxSize) {
      window.alert("Size of image should be less than 1MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const div = document.createElement("div");
      div.className = "file-name";

      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt = file.name;
      img.className = "thumbnail";

      // Create input textArea
      const textArea = document.createElement("textarea");
      textArea.placeholder = "Add a description...";

      // Create icon for checking
      const check = document.createElement("i");
      check.classList.add("fa-solid", "fa-check", "des-added");
      check.addEventListener("click", () => {
        textArea.disabled = true;
        window.alert("Description added.");
        // Save image data to localStorage
        const imageData = {
          src: e.target.result,
          description: textArea.value,
        };
        saveToLocalStorage(imageData);
      });

      // Create icon for deleting
      const del = document.createElement("i");
      del.classList.add("fa-solid", "fa-trash");
      del.addEventListener("click", () => {
        div.remove();
        console.log("removed");
      });

      div.appendChild(img);
      div.appendChild(textArea);
      div.appendChild(check);
      div.appendChild(del);
      fileList.appendChild(div);
    };
    reader.readAsDataURL(file);
  }

  // Function to save data to localStorage
  function saveToLocalStorage(imageData) {
    const storedImagesData = JSON.parse(
      localStorage.getItem("storedImagesData") || "[]"
    );
    storedImagesData.push(imageData);
    localStorage.setItem("storedImagesData", JSON.stringify(storedImagesData));
  }

  // Load data from localStorage on page load
  function loadFromLocalStorage() {
    const storedImagesData = JSON.parse(
      localStorage.getItem("storedImagesData") || "[]"
    );
    console.log("Loaded from localStorage:", storedImagesData);
    storedImagesData.forEach((data) => {
      const div = document.createElement("div");
      div.className = "file-name";

      const img = document.createElement("img");
      img.src = data.src;
      img.alt = data.name;
      img.className = "thumbnail";

      // Create input textArea
      const textArea = document.createElement("textarea");
      textArea.placeholder = "Add a description...";
      textArea.textContent = data.description;
      textArea.disabled = true;

      // Create icon for checking
      const check = document.createElement("i");
      check.classList.add("fa-solid", "fa-check", "des-added");

      // Create icon for deleting
      const del = document.createElement("i");
      del.classList.add("fa-solid", "fa-trash");

      del.addEventListener("click", () => {
        div.remove();
        // Find the index of the item to be deleted
        const index = storedImagesData.findIndex(
          (item) => item.src === data.src
        );

        // If the item exists, remove it from the array and update localStorage
        if (index !== -1) {
          storedImagesData.splice(index, 1);
          localStorage.setItem(
            "storedImagesData",
            JSON.stringify(storedImagesData)
          );
          console.log("Item removed from localStorage");
        } else {
          console.log("Item not found in localStorage");
        }
      });

      div.append(img, textArea, check, del);
      fileList.appendChild(div);
    });
  }
  loadFromLocalStorage(); // Load data from localStorage on page load
});
