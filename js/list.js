const API_KEY3 = '5d12e5c309d9bdd31723451426dd447ed0cbce865049e425024e78c4092146f2';

let isbnList = [];
let totalResults = 0;
let page3 = 1;
const pageSize3 = 10;
const groupSize3 = 5;

const getLibrary = async () => {
    const url = new URL(`https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${API_KEY3}&result_style=json&page_no=${page3}&page_size=${pageSize3}`);

    const response = await fetch(url);
    const data = await response.json();
    isbnList = data.docs;
    totalResults = data.TOTAL_COUNT; // TOTAL_COUNT 필드 값을 totalResults로 사용
    render();
    listPaginationRender();
    console.log("totalResults:", totalResults); // totalResults 출력
};

const render = () => {
    const newsHTML = isbnList
        .map(news => `
            <div class="row">
                <img class="booklist-img" src="${news.TITLE_URL || "../images/bookskin.png"}" alt="책 표지" />
                <ol>${news.TITLE.length > 20 ? news.TITLE.slice(0, 20) + '...' : news.TITLE}</ol>
                <ul>${news.AUTHOR.length > 20 ? news.AUTHOR.slice(0, 20) + '...' : news.AUTHOR}</ul>
                <ul>${news.PRE_PRICE}</ul>
            </div>`).join('');

    document.getElementById("news-board").innerHTML = newsHTML;
};

const listPaginationRender = () => {
    const totalPages = Math.ceil(totalResults / pageSize3);
    const pageGroup = Math.ceil(page3 / groupSize3);
    let lastPage = pageGroup * groupSize3;
    if (lastPage > totalPages) {
        lastPage = totalPages;
    }
    const firstPage = lastPage - (groupSize3 - 1) <= 0 ? 1 : lastPage - (groupSize3 - 1);

    let listPaginationHTML = `
        <li class="listPage-item" onclick="moveToPage(1)"><a class="page-link">&lt;&lt;</a></li>
        <li class="listPage-item" onclick="preToPage()"><a class="page-link">&lt;</a></li>`;

    for (let i = firstPage; i <= lastPage; i++) {
        listPaginationHTML += `<li class="listPage-item ${i === page3 ? 'active' : ''}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
    }

    listPaginationHTML += `
        <li class="listPage-item" onclick="nextToPage()"><a class="page-link">&gt;</a></li>
        <li class="listPage-item" onclick="moveToPage(${totalPages})"><a class="page-link">&gt;&gt;</a></li>`;

    document.querySelector(".listPagination").innerHTML = listPaginationHTML;
};

const moveToPage3 = (pageNum) => {
    page3 = pageNum;
    getLibrary();
};

const preToPage3 = () => {
    if (page3 > 1) {
        page3--;
        getLibrary();
    }
};

const nextToPage3 = () => {
    const totalPages = Math.ceil(totalResults / pageSize3);
    if (page3 < totalPages) {
        page3++;
        getLibrary();
    }
};

const getCategory = async (category) => {
    const encodedCategory = encodeURIComponent(category);
    const url = `https://www.nl.go.kr/NL/search/openApi/search.do?key=1fcc678ac940549cb24a61ded5ec9453a2924d7475da7cb94de1d5ad53ee8212&kwd=${encodedCategory}`;
    window.open(url, '_self');
};

getLibrary();