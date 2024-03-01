const API_KEY = '5d12e5c309d9bdd31723451426dd447ed0cbce865049e425024e78c4092146f2';

let isbnList=[];
let totalResults = 0;
let page = 1;
const pageSize = 20;
const groupSize = 5;

const getLibrary = async () => {            
    const url = new URL(`https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${API_KEY}&result_style=json&page_no=${page}&page_size=${pageSize}`); //isbn
        
    const response = await fetch(url);    
    const data = await response.json();
    isbnList = data.docs;
    totalResults = data.totalResults;    
    render();
    paginationRender();
};

const render = () => {
    //전체리스트
    const newsHTML = isbnList
        .map(news => `
            <div class="row">
                <img src=${news.TITLE_URL}>
                <ol>${news.TITLE.length > 20 ? news.TITLE.slice(0, 20) + '...' : news.TITLE}</ol>
                <ul>${news.AUTHOR.length > 20 ? news.AUTHOR.slice(0, 20) + '...' : news.AUTHOR}</ul>
                <ul>${news.PRE_PRICE}</ul>
            </div>`).join('');
            
  document.getElementById("news-board").innerHTML = newsHTML;
};

// const render = () => {
//     const filteredNewsList = isbnList.filter(news => news.TITLE_URL && news.TITLE_URL !== ""); // 이미지가 있는 항목만 필터링
    
//     const newsHTML = filteredNewsList.slice(0, 20) // 이미지가 있는 항목 중에서 최대 20개까지만 출력
//         .map(news => `
//             <div class="row">
//                 <img src=${news.TITLE_URL}>
//                 <ol>${news.TITLE.length > 20 ? news.TITLE.slice(0, 20) + '...' : news.TITLE}</ol>
//                 <ul>${news.AUTHOR.length > 20 ? news.AUTHOR.slice(0, 20) + '...' : news.AUTHOR}</ul>
//                 <ul>${news.PRE_PRICE}</ul>
//             </div>`).join('');
            
//   document.getElementById("news-board").innerHTML = newsHTML;
// };

const paginationRender = () => {
    const totalPages = Math.ceil(totalResults / pageSize);
    const pageGroup = Math.ceil(page / groupSize);

    const lastPage = pageGroup * groupSize;
    
    
    const firstPage = lastPage - (groupSize - 1)<=0? 1:lastPage - (groupSize-1);

    let paginationHTML = '';

    for (let i = firstPage; i <= lastPage ; i++) {
        paginationHTML += `<li class="page-item ${i===page?'active':''}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
    }

    document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage=(pageNum)=>{    
    page = pageNum;
    getLibrary();
}

// 클릭된 카테고리에 해당하는 책 목록을 가져오는 함수
const getBooksByCategory = async (category) => {
    const url = new URL(`https://www.nl.go.kr/NL/search/openApi/search.do?key=1fcc678ac940549cb24a61ded5ec9453a2924d7475da7cb94de1d5ad53ee8212&kwd=${category}`);

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // API에서 받은 데이터를 적절히 가공하여 출력
        const booksHTML = data.map(book => `
            <div class="row">
                <img src="${book.imageUrl}">
                <ol>${book.title}</ol>
                <ul>${book.author}</ul>
                <ul>${book.price}</ul>
            </div>`).join('');

        document.getElementById("news-board").innerHTML = booksHTML;
    } catch (error) {
        console.error('Error fetching books:', error);
    }
    getLibrary();getBooksByCategory
};

getLibrary();
