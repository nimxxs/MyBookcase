const API_KEY = 'ddad4259b659af428252ec826266babcb91d3bedc9d03f0dc7c703a28c0100b3';

let isbnList = [];
let firstList = [];
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

document.addEventListener("DOMContentLoaded", function() {
    getLibrary();    
});

async function getLibrary(searchText) {
    const encodedText = encodeURIComponent(searchText);
    
    const url = new URL(`https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${API_KEY}&result_style=json&page_no=${page}&page_size=${pageSize}`);//isbn
    const response = await fetch(url);    
    const data = await response.json();

    const url2 = new URL(`https://www.nl.go.kr/NL/search/openApi/search.do?apiType=json&key=${API_KEY}&pageNum=${page}&pageSize=${pageSize}&kwd=건강`)
    const response2 = await fetch(url2)
    const data2 = await response2.json()
    console.log("data2", data2)

    isbnList = data.docs;
    console.log("isbnList",isbnList)
    totalResults = data.TOTAL_COUNT; 

    firstList = data2.item;
    console.log("firstList",firstList)
    totalResults2 = data.totalCount; 
    
    render();
    listPaginationRender();
}

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

const render2 = () => {
    const newsHTML = firstList
        .map(news => `
            <div class="row">
                <div class="booklist-img-box">
                    <img class="booklist-img" src="${news.imageUrl || "../images/bookskin.png"}" alt="책 표지" />
                </div>
                <ol>${news.titleInfo.length > 20 ? news.titleInfo.slice(0, 20) + '...' : news.titleInfo}</ol>
                <ul>${news.authorInfo.length > 20 ? news.authorInfo.slice(0, 20) + '...' : news.authorInfo}</ul>
                <ul>${news.kdcName1s}</ul>
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




