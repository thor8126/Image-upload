document.addEventListener("DOMContentLoaded", function () {
  const dropArea = document.getElementById("drop-area");
  const inputFile = document.getElementById("input-file");
  const uploadPreview = document.getElementById("upload-preview");
  const previewImage = document.getElementById("preview-image");
  const imageDescription = document.getElementById("image-description");
  const addTodoBtn = document.getElementById("add-todo");
  const cancelUploadBtn = document.getElementById("cancel-upload");
  const todoList = document.getElementById("todo-list");

  // Event listeners
  inputFile.addEventListener("change", handleFileUpload);
  dropArea.addEventListener("dragover", handleDragOver);
  dropArea.addEventListener("drop", handleDrop);
  addTodoBtn.addEventListener("click", addTodo);
  cancelUploadBtn.addEventListener("click", cancelUpload);

  // Load todo list from local storage on page load
  loadTodoList();

  // Handle file upload
  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      previewImage.src = imageUrl;
      uploadPreview.style.visibility = "visible";
      dropArea.style.borderBottomLeftRadius = "0";
      dropArea.style.borderBottomRightRadius = "0";
    }
  }

  // Handle drag over
  function handleDragOver(event) {
    event.preventDefault();
  }

  // Handle drop
  function handleDrop(event) {
    event.preventDefault();
    inputFile.files = event.dataTransfer.files;
    handleFileUpload({ target: inputFile });
  }

  // Add todo item
  function addTodo() {
    const description = imageDescription.value;
    if (!description) {
      alert("Please enter a description.");
      return;
    }

    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const imgElement = document.createElement("img");
    imgElement.src = previewImage.src;
    todoItem.appendChild(imgElement);

    const descElement = document.createElement("div");
    descElement.classList.add("description");
    descElement.innerText = description;
    todoItem.appendChild(descElement);

    const actionsElement = document.createElement("div");
    actionsElement.classList.add("actions");

    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = '<i class="fa fa-times" style="color: red"></i>';
    removeBtn.addEventListener("click", () => {
      todoList.removeChild(todoItem);
      updateLocalStorage();
    });
    actionsElement.appendChild(removeBtn);

    todoItem.appendChild(actionsElement);
    todoList.appendChild(todoItem);

    // Update local storage
    updateLocalStorage();

    // Reset upload preview
    resetUploadPreview();
  }

  // Cancel upload
  function cancelUpload() {
    resetUploadPreview();
  }

  // Reset upload preview
  function resetUploadPreview() {
    previewImage.src = "";
    imageDescription.value = "";
    uploadPreview.style.visibility = "hidden";
  }

  // Load todo list from local storage
  function loadTodoList() {
    const storedTodoList = JSON.parse(localStorage.getItem("todoList"));
    if (storedTodoList) {
      uploadPreview.style.borderBottomLeftRadius = "0";
      uploadPreview.style.borderBottomRightRadius = "0";
      storedTodoList.forEach((todo) => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");

        const imgElement = document.createElement("img");
        imgElement.src = todo.imageSrc;
        todoItem.appendChild(imgElement);

        const descElement = document.createElement("div");
        descElement.classList.add("description");
        descElement.innerText = todo.description;
        todoItem.appendChild(descElement);

        const actionsElement = document.createElement("div");
        actionsElement.classList.add("actions");

        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = '<i class="fa fa-times" style="color: red"></i>';
        removeBtn.addEventListener("click", () => {
          todoList.removeChild(todoItem);
          updateLocalStorage();
        });
        actionsElement.appendChild(removeBtn);

        todoItem.appendChild(actionsElement);
        todoList.appendChild(todoItem);
      });
    }
  }

  // Update local storage
  function updateLocalStorage() {
    const todoItems = todoList.querySelectorAll(".todo-item");
    const todoListData = [];
    todoItems.forEach((todoItem) => {
      const imgSrc = todoItem.querySelector("img").src;
      const description = todoItem.querySelector(".description").innerText;
      todoListData.push({ imageSrc: imgSrc, description: description });
    });
    localStorage.setItem("todoList", JSON.stringify(todoListData));
  }

  // Initialize carousel
  const carouselImages = ["../carousel1.jpg", "../carousel2.jpg"];
  const carousel = document.createElement("div");
  carousel.classList.add("carousel");

  carouselImages.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    carousel.appendChild(img);
  });

  document.querySelector(".hero").appendChild(carousel);

  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    carousel.style.transform = `translateX(-${currentIndex * 50}%)`;
  }, 5000);
});
