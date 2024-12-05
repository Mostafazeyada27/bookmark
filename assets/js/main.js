var siteUrlInput = document.getElementById("siteUrl");
var siteNameInput = document.getElementById("siteName");
var btn = document.getElementById("submit");
var closeBtn = document.getElementById("closeBtn");
var alertBox = document.getElementById("alertBox");
var siteContainer = [];

if (localStorage.getItem("container") !== null) {
  siteContainer = JSON.parse(localStorage.getItem("container"));
  displayData();
}

// Add Function
function addSite() {
  if (
    validateInput(siteUrlInput, "msgName") &&
    validateInput(siteUrlInput, "msgUrl")
  ) {
    var site = {
      name: siteNameInput.value,
      url: siteUrlInput.value,
    };
    siteContainer.push(site);
    localStorage.setItem("container", JSON.stringify(siteContainer));
    displayData();
  } else {
    alertBox.classList.remove("d-none");
  }
}
// Clear Function
function clearform() {
  siteNameInput.value = null;
  siteUrlInput.value = null;
  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");
}

//Display Function
function displayData() {
  var cartona = "";
  for (var i = 0; i < siteContainer.length; i++) {
    cartona += `
        <tr>
            <td class="py-3">1</td>
            <td>${siteContainer[i].name}</td>
            <td><button    class="btn btn-warning"><a  target="_blank" href="${siteContainer[i].url}"><i class="fa-solid fa-eye text-white"></i> visite</a></button></td>
            <td><button  onclick ="deleteSite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can text-white"></i> Delete</button></td>
          </tr>
    `;
  }
  document.getElementById("display-data").innerHTML = cartona;
}

// DeleteFunction
function deleteSite(index) {
  siteContainer.splice(index, 1);
  localStorage.setItem("container", JSON.stringify(siteContainer));
  displayData();
}

// validation function
function validateInput(input, msgID) {
  var text = input.value;
  var Regex = {
    siteName: /^[a-zA-Z]{3,}$/,
    siteUrl: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/,
  };
  var msg = document.getElementById(msgID);

  if (Regex[input.id].test(text)) {
    msg.classList.add("d-none");
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    msg.classList.remove("d-none");
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}

// close Modal
function closeModal() {
  alertBox.classList.add("d-none");
}

btn.addEventListener("click", function () {
  addSite();
  clearform();
});

closeBtn.addEventListener("click", closeModal);