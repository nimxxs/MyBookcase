const API_KEY_ISBN = 'ddad4259b659af428252ec826266babcb91d3bedc9d03f0dc7c703a28c0100b3';
const API_KEY_SEARCH = '1fcc678ac940549cb24a61ded5ec9453a2924d7475da7cb94de1d5ad53ee8212';
//git test
let isbnList = [];
let searchList = [];
let totalResults = 0;
let totalResult = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;
let searchInput;
const closeButton = document.getElementById("closeButton");
const modal = document.querySelector(".modal");
const modal_overlay = modal.querySelector(".modal_overlay");

document.addEventListener("DOMContentLoaded", function() {
    includeHTML(initSearch);
    getLibrary();
});

async function getLibrary() {
    const url = new URL(`https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${API_KEY_ISBN}&result_style=json&page_no=${page}&page_size=${pageSize}`);

    const response = await fetch(url);
    const data = await response.json();
    isbnList = data.docs;
    totalResults = data.TOTAL_COUNT; 
    render();
    listPaginationRender();
}

function render() {
    const newsHTML = isbnList.map(news => `
        <div class="row">
            <img src=${news.TITLE_URL}>
            <ol>${news.TITLE.length > 20 ? news.TITLE.slice(0, 20) + '...' : news.TITLE}</ol>
            <ul>${news.AUTHOR.length > 20 ? news.AUTHOR.slice(0, 20) + '...' : news.AUTHOR}</ul>
            <ul>${news.PRE_PRICE}</ul>
        </div>`).join('');

    document.getElementById("news-board").innerHTML = newsHTML;
}

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

async function searchBook(searchText) {
    const encodedText = encodeURIComponent(searchText);
    const url = new URL(`https://www.nl.go.kr/NL/search/openApi/search.do?key=${API_KEY_SEARCH}&apiType=json&category=%EB%8F%84%EC%84%9C&srchTarget=title&kwd=${encodedText}&pageNum=${page}&pageSize=${pageSize}`);
    const response = await fetch(url);
    const data = await response.json();
    searchList = data.result;
    totalResult = data.total;
    modalRender();
    paginationRender();
}

// const API_KEY = 'ddad4259b659af428252ec826266babcb91d3bedc9d03f0dc7c703a28c0100b3';

// let isbnList = [];
// let totalResults = 0;
// let page = 1;
// const pageSize = 10;
// const groupSize = 5;

// const getLibrary = async () => {
//     const url = new URL(`https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${API_KEY}&result_style=json&page_no=${page}&page_size=${pageSize}`);

//     const response = await fetch(url);
//     const data = await response.json();
//     isbnList = data.docs;
//     totalResults = data.TOTAL_COUNT; // TOTAL_COUNT 필드 값을 totalResults로 사용
//     render();
//     listPaginationRender();
//     console.log("totalResults:", totalResults); // totalResults 출력
// };

// const render = () => {
//     const newsHTML = isbnList
//         .map(news => `
//             <div class="row">
//                 <img src=${news.TITLE_URL}>
//                 <ol>${news.TITLE.length > 20 ? news.TITLE.slice(0, 20) + '...' : news.TITLE}</ol>
//                 <ul>${news.AUTHOR.length > 20 ? news.AUTHOR.slice(0, 20) + '...' : news.AUTHOR}</ul>
//                 <ul>${news.PRE_PRICE}</ul>
//             </div>`).join('');

//     document.getElementById("news-board").innerHTML = newsHTML;
// };

// const listPaginationRender = () => {
//     const totalPages = Math.ceil(totalResults / pageSize);
//     const pageGroup = Math.ceil(page / groupSize);
//     let lastPage = pageGroup * groupSize;
//     if (lastPage > totalPages) {
//         lastPage = totalPages;
//     }
//     const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

//     let listPaginationHTML = `
//         <li class="listPage-item" onclick="moveToPage(1)"><a class="listPage-link">&lt;&lt;</a></li>
//         <li class="listPage-item" onclick="preToPage()"><a class="listPage-link">&lt;</a></li>`;

//     for (let i = firstPage; i <= lastPage; i++) {
//         listPaginationHTML += `<li class="listPage-item ${i === page ? 'active' : ''}" onclick="moveToPage(${i})"><a class="listPage-link">${i}</a></li>`;
//     }

//     listPaginationHTML += `
//         <li class="listPage-item" onclick="nextToPage()"><a class="listPage-link">&gt;</a></li>
//         <li class="listPage-item" onclick="moveToPage(${totalPages})"><a class="listPage-link">&gt;&gt;</a></li>`;

//     document.querySelector(".listPagination").innerHTML = listPaginationHTML;
// };

// const moveToPage = (pageNum) => {
//     page = pageNum;
//     getLibrary();
// };

// const preToPage = () => {
//     if (page > 1) {
//         page--;
//         getLibrary();
//     }
// };

// const nextToPage = () => {
//     const totalPages = Math.ceil(totalResults / pageSize);
//     if (page < totalPages) {
//         page++;
//         getLibrary();
//     }
// };

// const getCategory = async (category) => {
//     const encodedCategory = encodeURIComponent(category);
//     const url = `https://www.nl.go.kr/NL/search/openApi/search.do?key=1fcc678ac940549cb24a61ded5ec9453a2924d7475da7cb94de1d5ad53ee8212&kwd=${encodedCategory}`;
//     window.open(url, '_blank');
// };

// getLibrary();