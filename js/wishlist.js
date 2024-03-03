let API_KEY2 = '1fcc678ac940549cb24a61ded5ec9453a2924d7475da7cb94de1d5ad53ee8212';
// import { API_KEY } from '../js/apiKey.js';
let newsList=[];
let totalResults = 0;
let page2 = 1;
const pageSize2 = 10;
const groupSize2 = 5;
const category = 0;

const getLibrary = async () => {
    // const url = new URL(`https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${API_KEY2}&result_style=json&page_no=${page2}&page_size=${pageSize2}`); //isbn    
    const url = new URL(`https://corsproxy.io/?https://nl.go.kr/NL/search/openApi/saseoApi.do?key=${API_KEY}&startRowNumApi=1&endRowNumApi=1325`); //사서추천    
    
    const response = await fetch(url);    
    const data = await response.json();
    newsList = data.docs;
    totalResults = data.TOTAL_COUNT; // TOTAL_COUNT 필드 값을 totalResults로 사용   
    render();
    paginationRender2();
};

// const render = () => {
//     const newsHTML = newsList.slice(0, 20) // 최대 20개 항목까지만 출력
//         .map(news => {
//             // 입력된 문자열을 "YYYY.MM.DD" 형식으로 변환
//             const dateString = news.PUBLISH_PREDATE.slice(0, 4) + '.' + news.PUBLISH_PREDATE.slice(4, 6) + '.' + news.PUBLISH_PREDATE.slice(6, 8);
            
//             return `
//                 <section>
//                     <div><img class="booklist-img" src="${news.imageUrl || "../images/bookskin.png"}" alt="책 표지" /></div>
//                     <div>
//                         <ol>${news.TITLE}</ol>
//                         <ul>${news.AUTHOR}</ul>
//                         <ul>${news.PUBLISHER}</ul>
//                         <ul>${dateString}</ul> <!-- 변환된 날짜 문자열 사용 -->
//                         <div class="price-style">${news.PRE_PRICE}</div>
//                     </div>        
//                 </section>
//                 <div class="list-contents-border"></div>`;
//         }).join('');
            
//     document.getElementById("news-board").innerHTML = newsHTML;
// };

// 사서 추천 render
const render = () => {
    const newsHTML = newsList.slice(0, 20) // 최대 20개 항목까지만 출력
        .map(news => {
            // 입력된 문자열을 "YYYY.MM.DD" 형식으로 변환
            const dateString = news.PUBLISH_PREDATE.slice(0, 4) + '.' + news.PUBLISH_PREDATE.slice(4, 6) + '.' + news.PUBLISH_PREDATE.slice(6, 8);
            
            return `
                <section>
                    <div><img class="booklist-img" src="${news.item.recomisbn["#text"] || "../images/bookskin.png"}" alt="책 표지" /></div>
                    <div>
                        <ol>${news.item.recomtitle["#text"]}</ol>
                        <ul>${news.item.recomauthor["#text"]}</ul>
                        <ul>${news.item.recompublisher["#text"]}</ul>
                        <ul>${dateString}</ul> <!-- 변환된 날짜 문자열 사용 -->
                        <div class="price-style">${news.PRE_PRICE}</div>
                    </div>        
                </section>
                <div class="list-contents-border"></div>`;
        }).join('');
            
    document.getElementById("news-board").innerHTML = newsHTML;
};

const paginationRender2 = () => {
    const totalPages = Math.ceil(totalResults / pageSize2);
    const pageGroup = Math.ceil(page2 / groupSize2);
    let lastPage = pageGroup * groupSize2;
    if (lastPage > totalPages) {
        lastPage = totalPages;
    }
    const firstPage = lastPage - (groupSize2 - 1) <= 0 ? 1 : lastPage - (groupSize2 - 1);

    let paginationHTML = `
        <li class="page-item" onclick="moveToPage(1)"><a class="page-link">&lt;&lt;</a></li>
        <li class="page-item" onclick="preToPage()"><a class="page-link">&lt;</a></li>`;

    for (let i = firstPage; i <= lastPage; i++) {
        paginationHTML += `<li class="page-item ${i === page2 ? 'active' : ''}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
    }

    paginationHTML += `
        <li class="page-item" onclick="nextToPage()"><a class="page-link">&gt;</a></li>
        <li class="page-item" onclick="moveToPage(${totalPages})"><a class="page-link">&gt;&gt;</a></li>`;

    document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage2 = (pageNum) => {
    page2 = pageNum;
    getLibrary();
};

const preToPage2 = () => {
    if (page2 > 1) {
        page2--;
        getLibrary();
    }
};

const nextToPage2 = () => {
    const totalPages = Math.ceil(totalResults / pageSize2);
    if (page2 < totalPages) {
        page2++;
        getLibrary();
    }
};

// const getCategory = async (category) => {
//     const encodedCategory = encodeURIComponent(category);
//     const url = `https://www.nl.go.kr/NL/search/openApi/search.do?key=1fcc678ac940549cb24a61ded5ec9453a2924d7475da7cb94de1d5ad53ee8212&kwd=${encodedCategory}`;
//     window.open(url, '_self');
// };

getLibrary();
