const API_KEY = '1fcc678ac940549cb24a61ded5ec9453a2924d7475da7cb94de1d5ad53ee8212';
let newsList=[];
let totalResults = 0;
let page = 1;
const pageSize = 300;
const groupSize = 5;
const category = 0;

const getLibrary = async () => {
    const url = new URL(`https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${API_KEY}&result_style=json&page_no=${page}&page_size=${pageSize}`); //isbn    
    
    const response = await fetch(url);    
    const data = await response.json();
    newsList = data.docs;
    totalResults = data.TOTAL_COUNT; // TOTAL_COUNT 필드 값을 totalResults로 사용   
    render();
    paginationRender();
};

const render = () => {
    const filteredNewsList = newsList.filter(news => news.TITLE_URL && news.TITLE_URL !== ""); // 이미지가 있는 항목만 필터링

    const newsHTML = filteredNewsList.slice(0, 20) // 이미지가 있는 항목 중에서 최대 20개까지만 출력
        .map(news => {
            // 입력된 문자열을 "YYYY.MM.DD" 형식으로 변환
            const dateString = news.PUBLISH_PREDATE.slice(0, 4) + '.' + news.PUBLISH_PREDATE.slice(4, 6) + '.' + news.PUBLISH_PREDATE.slice(6, 8);
            
            return `
                <section>
                    <div><img src=${news.TITLE_URL}></div>
                    <div>
                        <ol>${news.TITLE}</ol>
                        <ul>${news.AUTHOR}</ul>
                        <ul>${news.PUBLISHER}</ul>
                        <ul>${dateString}</ul> <!-- 변환된 날짜 문자열 사용 -->
                        <div class="price-style">${news.PRE_PRICE}</div>
                    </div>        
                </section>
                <div class="list-contents-border"></div>`;
        }).join('');
            
    document.getElementById("news-board").innerHTML = newsHTML;
};

const paginationRender = () => {
    const totalPages = Math.ceil(totalResults / pageSize);
    const pageGroup = Math.ceil(page / groupSize);
    let lastPage = pageGroup * groupSize;
    if (lastPage > totalPages) {
        lastPage = totalPages;
    }
    const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

    let paginationHTML = `
        <li class="page-item" onclick="moveToPage(1)"><a class="page-link">&lt;&lt;</a></li>
        <li class="page-item" onclick="preToPage()"><a class="page-link">&lt;</a></li>`;

    for (let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `<li class="page-item ${i === page ? 'active' : ''}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
    }

    paginationHTML += `
        <li class="page-item" onclick="nextToPage()"><a class="page-link">&gt;</a></li>
        <li class="page-item" onclick="moveToPage(${totalPages})"><a class="page-link">&gt;&gt;</a></li>`;

    document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
    page = pageNum;
    getLibrary();
};

const preToPage = () => {
    if (page > 1) {
        page--;
        getLibrary();
    }
};

const nextToPage = () => {
    const totalPages = Math.ceil(totalResults / pageSize);
    if (page < totalPages) {
        page++;
        getLibrary();
    }
};

const getCategory = async (category) => {
    const encodedCategory = encodeURIComponent(category);
    const url = `https://www.nl.go.kr/NL/search/openApi/search.do?key=1fcc678ac940549cb24a61ded5ec9453a2924d7475da7cb94de1d5ad53ee8212&kwd=${encodedCategory}`;
    window.open(url, '_blank');
};

getLibrary();
