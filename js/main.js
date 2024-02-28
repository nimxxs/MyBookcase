const API_KEY = `ddad4259b659af428252ec826266babcb91d3bedc9d03f0dc7c703a28c0100b3`;
let booklistAll = [];
let pageSize = 5;
let pageNo = 1;
let pageTotalCount = 0;
let url = ``;
const booklistBts = document.querySelectorAll(".booklist-bt");

// getAPI
const getAPI = async () => {
  try {
    url.searchParams.set("page_size", pageSize);
    url.searchParams.set("page_no", pageNo);

    const response = await fetch(url);
    const data = await response.json();

    console.log(response);

    if (response.status == 200) {
      booklistAll = data.docs;
      pageTotalCount = data.TOTAL_COUNT;
      rander();
    } else {
      throw new Error(data.message);
    }
  } catch (e) {
    console.log(e.message);
  }
};
const getURL = async () => {
  url = new URL(
    `https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${API_KEY}&result_style=json`
  );
  getAPI();
};
getURL();
// render
const rander = () => {
  let bookListAllHTML = booklistAll
    .map(
      (i) => `
    <li class="booklist-item">
        <div class="booklist-img-box">
            <img class="booklist-img" src="${
              i.TITLE_URL || "../images/bookpage.svg"
            }" alt="책 표지" />
            
            <span class="booklist-sub-title">${
              i.TITLE_URL == "" ? i.TITLE : ""
            }</span>
            <span class="booklist-sub-author"> ${
              i.TITLE_URL == "" ? i.AUTHOR : ""
            }</span>
        </div>
        <h3 class="booklist-title">${i.TITLE}</h3>
        <span class="booklist-author">${i.AUTHOR} 지음</span>
    </li>
  `
    )
    .join("");
  document.querySelector(".booklist-all").innerHTML = bookListAllHTML;
};
// 버튼 클릭시 북리스트 다음페이지로 넘김
booklistBts.forEach((e) => {
  e.addEventListener("click", () => {
    if (e.id == "left" && pageNo > 1) {
      pageNo -= 1;
      rander();
    } else if (e.id == "right" && pageNo < pageTotalCount) {
      pageNo += 1;
      rander();
    }
  });
});
rander();
