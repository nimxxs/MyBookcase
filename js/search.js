// 현재 includes.js 때문에 로딩 순서가 문제이다.
// 1. initSearch 함수를 만들어서 header.html에 가져올 id를 담아준다.
// 2. DOMContentLoaded -> HTML 문서의 모든 내용이 로드 후 발생하는 이벤트.
// 3. 그래서 DOM 로드 완료 후, includeHTML함수 실행.
//      -> includeHTML함수는 includes.js에 있는 함수이다.
// 4. includeHTML함수에 initSearch함수를 매개변수로 넣어준다.
//      -> includes.js에서 initSearch가 매개변수 callback으로 작동함.
// 이렇게 header.html에 있는 id를 가져와야지 id에 들어있는 값을 가져올 수 있다.
let searchInput;
function initSearch() {
    searchInput = document.querySelector("#search-input");
    // console.log(searchInput);
    // 검색창 스타일
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
      // 모달창 띄우기
    searchInput.addEventListener("focus", () => {
        modal.classList.remove("hidden");
    })
}
document.addEventListener("DOMContentLoaded", function() {
    includeHTML(initSearch);
});

// 여기부터 includes.js와 관련 없는 코드
const API_KEY = '1fcc678ac940549cb24a61ded5ec9453a2924d7475da7cb94de1d5ad53ee8212'

const closeButton = document.getElementById("closeButton");
const modal = document.querySelector(".modal");
const modal_overlay = modal.querySelector(".modal_overlay");
let totalResult = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

// isbn api
let isbnList = [];
const isbn = async () => {
    const url = new URL(`https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${API_KEY}&result_style=json&page_no=${page}&page_size=${pageSize}`)
    const response = await fetch(url);
    const data = await response.json();
    isbnList = data.docs;
    totalResult = data.TOTAL_COUNT;
    console.log("isbn", isbnList);
    modalRender();
    paginationRender();
}
isbn()

// 사서추천 api

// let recoList = [];
// const recommend = async () => {
//     const url = new URL(`https://corsproxy.io/?https://nl.go.kr/NL/search/openApi/saseoApi.do?key=${API_KEY}`);
//     const response = await fetch(url);
//     const textData = await response.text();

//     // XML을 JSON으로 변환
//     const parser = new DOMParser();
//     const xmlDoc = parser.parseFromString(textData, "text/xml");

//     // JSON으로 변환
//     const jsonResult = xmlToJson(xmlDoc);
//     recoList = jsonResult.channel.list
//     console.log("reco", recoList);

//     modalRender()
// }

// recommend();

// XML을 JSON으로 변환하는 함수
function xmlToJson(xml) {
  // Create the return object
  var obj = {};

  if (xml.nodeType == 1) { // element node
      // do attributes
      if (xml.attributes.length > 0) {
          obj["@attributes"] = {};
          for (var j = 0; j < xml.attributes.length; j++) {
              var attribute = xml.attributes.item(j);
              obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
          }
      }
  } else if (xml.nodeType == 3) { // text node
      obj = xml.nodeValue;
  }

  // do children
  if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
          var item = xml.childNodes.item(i);
          var nodeName = item.nodeName;
          if (typeof obj[nodeName] == "undefined") {
              obj[nodeName] = xmlToJson(item);
          } else {
              if (typeof obj[nodeName].push == "undefined") {
                  var old = obj[nodeName];
                  obj[nodeName] = [];
                  obj[nodeName].push(old);
              }
              obj[nodeName].push(xmlToJson(item));
          }
      }
  }
  return obj;
}

closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
})
modal_overlay.addEventListener("click", () => {
    modal.classList.add("hidden");
})

// modalRender (isbn api)
const modalRender = () => {
    const modalHTML = isbnList
    // .filter(isbnItem => isbnItem.TITLE_URL && isbnItem.TITLE_URL !== "") // 이미지가 있는 항목만 필터링
    .map(isbnItem => 
        `<div class="modal_image">
            <img src="${isbnItem.TITLE_URL}" alt="이미지"></img>
        </div>
        <div class="modal_info">
            <h3>${isbnItem.SERIES_TITLE ? isbnItem.SERIES_TITLE : isbnItem.TITLE}</h3>
            <p>${isbnItem.AUTHOR}</p>
            <p>가격 : ${isbnItem.PRE_PRICE}</p>
            <p>줄거리 : </p>
        </div>`).join('');

    document.getElementById('modal_gird').innerHTML = modalHTML;
}

const paginationRender = () => {
    let totalPages = Math.ceil(totalResult / pageSize);
    let pageGroup = Math.ceil(page / groupSize);
    let lastPage = pageGroup * groupSize;
    if(lastPage > totalPages) {
        lastPage = totalPages;
    }
    let firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);
    let paginationHTML = ``

     // 이전 버튼 추가
     paginationHTML += `<li class="page-item preToPage">
        <a class="page-link" aria-label="Previous">
            <span aria-hidden="true">«</span>
        </a>
    </li>`;
    for (let i=firstPage; i<=lastPage; i++) {
        paginationHTML += `<li class="page_item" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
    }
     // 다음 버튼 추가
     paginationHTML += `<li class="page-item nextToPage">
        <a class="page-link" aria-label="Next">
            <span aria-hidden="true">»</span>
        </a>
    </li>`;

    document.querySelector(".pagination").innerHTML = paginationHTML;
    document.querySelector(".preToPage").addEventListener("click", preToPage);
    document.querySelector(".nextToPage").addEventListener("click", nextToPage);

}
const moveToPage = (pageNum) => {
    console.log("moveToPage", pageNum);
    page = pageNum;
    isbn();
}
// 이전 페이지, 다음 페이지
const preToPage =  () => {
    if (page > 1) {
        page --;
        isbn();
    }
}
const nextToPage = () => {
    const totalPages = Math.ceil(totalResult / pageSize);
    if (page < totalPages) {
        page ++;
        isbn();
    }
}
paginationRender();
