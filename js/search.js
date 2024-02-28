let searchInput;
function initSearch() {
    searchInput = document.querySelector("#search-input");
    // console.log(searchInput);
    searchInput.addEventListener("click", () => {
        searchInput.style.border = "2px solid #fff";
        searchInput.style.boxShadow = "0px 0px 12px rgba(255, 255, 255, 0.2)";
        searchInput.style.backgroundColor = "#ffffff40";
      });
      searchInput.addEventListener("blur", () => {
        searchInput.style.border = "none";
        searchInput.style.boxShadow = "none";
        searchInput.style.backgroundColor = "#ffffff6c";
        searchInput.value = "";
      });
}
document.addEventListener("DOMContentLoaded", function() {
    includeHTML(initSearch);
});

const modal = document.querySelector(".modal");
const closeButton = document.getElementById("closeButton");
const modal_overlay = modal.querySelector(".modal_overlay");

searchInput.addEventListener("focus", () => {
    modal.classList.remove("hidden");
})
closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
})
modal_overlay.addEventListener("click", () => {
    modal.classList.add("hidden");
})
