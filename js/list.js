const API_KEY = '5d12e5c309d9bdd31723451426dd447ed0cbce865049e425024e78c4092146f2';

let isbnList = [];
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

document.addEventListener("DOMContentLoaded", function() {
    includeHTML(initSearch);
    getLibrary();    
});

async function getLibrary(searchText) {
    const encodedText = encodeURIComponent(searchText);
    
    const url = new URL(`https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${API_KEY}&result_style=json&page_no=${page}&page_size=${pageSize}`);//isbn
        
    const response = await fetch(url);    
    const data = await response.json();

    isbnList = data.docs;
    console.log(isbnList)
    totalResults = data.TOTAL_COUNT; 
    
    render();
    listPaginationRender();
}

// const getURL = async () => {
//     url = new URL(
//       `https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${API_KEY}&result_style=json`
//     );
//     getAPI();
//   };
//   getURL();

// 사서추천 API
//   const recommend = async () => {
//     const url = new URL(
//       `https://corsproxy.io/?https://nl.go.kr/NL/search/openApi/saseoApi.do?key=${API_KEY}&startRowNumApi=1&endRowNumApi=30`
//     );
//     // url.searchParams.set("endRowNumApi", TpageSize);
//     // url.searchParams.set("startRowNumApi", TpageTotalCount);
//     const Tresponse = await fetch(url);
//     const textData = await Tresponse.text();

//     // XML을 JSON으로 변환
//     const parser = new DOMParser();
//     const xmlDoc = parser.parseFromString(textData, "text/xml");

//     // JSON으로 변환
//     const jsonResult = xmlToJson(xmlDoc);
//     todyBookList = jsonResult.channel.list;
//     console.log(todyBookList);
//     TpageTotalCount = parseInt(jsonResult.channel.totalCount["#text"]);

//     Trander();
//   };
//   recommend();

// 사서 추천 render
// const Trander = () => {
//     let TbookListAllHTML = ``;
//     TbookListAllHTML = todyBookList
//       .map(
//         (i) =>
//           `
//           <li class="booklist-item">
//               <div class="booklist-img-box">
//                   <img class="booklist-img" src="${
//                     i.item.recomfilepath["#text"] || "../images/bookskin.png"
//                   }" alt="책 표지" />
                  
//                   <span class="booklist-sub-title">${
//                     i.item.mokchFilePath["#text"] == ""
//                       ? i.item.recomtitle[".text"]
//                       : ""
//                   }</span>
//                   <span class="booklist-sub-author"> ${
//                     i.item.mokchFilePath["#text"] == ""
//                       ? i.item.recomauthor["#text"]
//                       : ""
//                   }</span>
//               </div>
//               <h3 class="booklist-title">${i.item.recomtitle["#text"]}</h3>
//               <span class="booklist-author">${
//                 i.item.recomauthor["#text"]
//               } 지음</span>
//           </li>
//         `
//       )
//       .join("");

//     booklistToday.innerHTML = TbookListAllHTML;
//   };

const render = () => {
    const newsHTML = isbnList
        .map(news => `
            <div class="row">
                <div class="booklist-img-box">
                    <img class="booklist-img" src="${news.TITLE_URL || "../images/bookskin.png"}" alt="책 표지" />
                </div>
                <ol>${news.TITLE.length > 20 ? news.TITLE.slice(0, 20) + '...' : news.TITLE}</ol>
                <ul>${news.AUTHOR.length > 20 ? news.AUTHOR.slice(0, 20) + '...' : news.AUTHOR}</ul>
                <ul>${news.PRE_PRICE}</ul>
            </div>`).join('');

    document.getElementById("news-board").innerHTML = newsHTML;
};

function listPaginationRender() {
    const totalPages = Math.ceil(totalResults / pageSize);
    const pageGroup = Math.ceil(page / groupSize);
    let lastPage = pageGroup * groupSize;
    if (lastPage > totalPages) {
        lastPage = totalPages;
    }
    const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

    let listPaginationHTML = `
        <li class="listPage-item" onclick="moveToPage(1)"><a class="listPage-link">&lt;&lt;</a></li>
        <li class="listPage-item" onclick="preToPage()"><a class="listPage-link">&lt;</a></li>`;

    for (let i = firstPage; i <= lastPage; i++) {
        listPaginationHTML += `<li class="listPage-item ${i === page ? 'active' : ''}" onclick="moveToPage(${i})"><a class="listPage-link">${i}</a></li>`;
    }

    listPaginationHTML += `
        <li class="listPage-item" onclick="nextToPage()"><a class="listPage-link">&gt;</a></li>
        <li class="listPage-item" onclick="moveToPage(${totalPages})"><a class="listPage-link">&gt;&gt;</a></li>`;

    document.querySelector(".listPagination").innerHTML = listPaginationHTML;
}

function moveToPage(pageNum) {
    page = pageNum;
    getLibrary();
}

function preToPage() {
    if (page > 1) {
        page--;
        getLibrary();
    }
}

function nextToPage() {
    const totalPages = Math.ceil(totalResults / pageSize);
    if (page < totalPages) {
        page++;
        getLibrary();
    }
}

function initSearch() {
    searchInput = document.querySelector("#search-input");
    let searchContainer = document.querySelector("#search-container");

    searchInput.addEventListener("click", () => {
        searchInput.style.border = "2px solid #fff";
        searchInput.style.boxShadow = "0px 0px 12px rgba(255, 255, 255, 0.2)";
        searchInput.style.backgroundColor = "#ffffff40";
        searchInput.value = "";
    });
    searchInput.addEventListener("blur", () => {
        searchInput.style.border = "none";
        searchInput.style.boxShadow = "none";
        searchInput.style.backgroundColor = "#ffffff6c";
    });

    const handleSearch = () => {
        const currentSearchText = searchInput.value;
        searchBook(currentSearchText);
    }

    searchContainer.addEventListener("submit", (event) => {
        event.preventDefault();
    })
    searchInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            modal.classList.remove("hidden");
            handleSearch();
        }
    })
    closeButton.addEventListener("click", () => {
        modal.classList.add("hidden");
    })
    modal_overlay.addEventListener("click", () => {
        modal.classList.add("hidden");
    })
}

function modalRender() {
    const modalHTML = searchList.map(searchItem => 
        `<div class="modal_image">
            <img src="${searchItem.imageUrl}" alt="이미지"></img>
        </div>
        <div class="modal_info">
            <h3>${searchItem.titleInfo}</h3>
            <p>${searchItem.authorInfo}</p>
        </div>`).join('');

    document.getElementById('modal_gird').innerHTML = modalHTML;
}

function paginationRender() {
    const totalPages = Math.ceil(totalResult / pageSize);
    const pageGroup = Math.ceil(page / groupSize);
    let lastPage = pageGroup * groupSize;
    if (lastPage > totalPages) {
        lastPage = totalPages;
    }
    let firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);
    
    let paginationHTML = ``
    paginationHTML += `<li class="page_item preToPage">
         <a class="page-link" aria-label="Previous">
            <span aria-hidden="true">«</span>
        </a>
    </li>`;

    for (let i = firstPage; i <= lastPage; i++) {
        paginationHTML +=
        `<li class="page_item ${i === page ? "active" : ""}" onclick="moveToPage(${i})">
            <a class="page-link">${i}</a>
        </li>`;
    }

    paginationHTML += `<li class="page_item nextToPage">
        <a class="page-link" aria-label="Next">
            <span aria-hidden="true">»</span>
        </a>
    </li>`;
    
    document.querySelector(".pagination").innerHTML = paginationHTML;
    document.querySelector(".preToPage").addEventListener("click", preToPage);
    document.querySelector(".nextToPage").addEventListener("click", nextToPage);
}




