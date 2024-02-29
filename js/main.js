includeHTML(function () {
  const API_KEYdong = `ddad4259b659af428252ec826266babcb91d3bedc9d03f0dc7c703a28c0100b3`;
  let booklistAll = [];
  let pageSize = 6;
  let pageNo = 1;
  let pageTotalCount = 0;
  let url = ``;
  let bookList = document.querySelector(".booklist");
  let booklistBts = document.querySelectorAll(".booklist-bt");
  let booklistSlider = document.querySelector(".booklist-slider");
  console.log(booklistSlider);

  // getAPI
  const getAPI = async () => {
    try {
      url.searchParams.set("page_size", pageSize);
      url.searchParams.set("page_no", pageNo);

      const response = await fetch(url);
      const data = await response.json();

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
      `https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${API_KEYdong}&result_style=json`
    );
    getAPI();
  };
  getURL();
  // render
  // let bookListAllHTML = ``;
  const rander = () => {
    bookListAllHTML = booklistAll
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

    booklistSlider.innerHTML = bookListAllHTML;
  };
  // 버튼 클릭시 북리스트 다음페이지로 넘김
  let moverSlide = 0;
  let booklistItem = document.querySelector(".booklist-item");
  let moverSlideNum = booklistItem.offsetWidth + 77;
  booklistBts.forEach((e) => {
    e.addEventListener("click", (i) => {
      if (e.id == "left" && pageSize > 6) {
        pageSize -= 1;
        getAPI();
        console.log(pageSize);
        booklistSlider.style.transform = `translateX(${(moverSlide +=
          moverSlideNum)}px)`;
      } else if (e.id == "right" && pageSize < pageTotalCount) {
        pageSize += 1;
        getAPI();
        booklistSlider.style.transform = `translateX(${(moverSlide -=
          moverSlideNum)}px)`;
        console.log(pageSize);
      }
    });
  });

  // 돔 연결

  // document.addEventListener("DOMContentLoaded", (event) => {
  //   booklistBts = document.querySelectorAll(".booklist-bt");
  //   console.log("다큐멘트가 다 읽히면 실행되는 코드임", booklistBts);
  //   bookListHTML = document.querySelector(".booklist-all");
  //   console.log("다큐멘트가 다 읽히면 실행되는 코드임", bookListHTML);
  //   const tlqkf = document.querySelector(".booklist-author");
  //   console.log(tlqkf);
  // });

  // //
  // console.log(1);
  // setTimeout(function () {
  //   booklistBts = document.querySelectorAll(".booklist-bt");
  //   console.log(booklistBts);
  //   bookListHTML = document.querySelector(".booklist-all");
  //   console.log(bookListHTML);
  // }, 10000);
});
