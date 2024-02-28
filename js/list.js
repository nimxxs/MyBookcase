const API_KEY = '1fcc678ac940549cb24a61ded5ec9453a2924d7475da7cb94de1d5ad53ee8212';
let newsList=[];
let totalResults = 0;
let page = 1;
const pageSize = 20;
const groupSize = 5;

const getLibrary = async () => {
    const url = new URL(`https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${API_KEY}&result_style=json&page_no=${page}&page_size=${pageSize}&start_publish_date=20220509&end_publish_date=20220509`);
    const response = await fetch(url);    
    const data = await response.json();
    newsList = data.docs;
    totalResults = data.totalResults;
    render();
    paginationRender();
};

const render = () => {
    const newsHTML = newsList
        //.filter(news => news.TITLE_URL && news.TITLE_URL !== "") // 이미지가 있는 항목만 필터링
        .map(news => `
            <div class="row">
                <img src=${news.TITLE_URL}>
                <ol>${news.TITLE.length > 20 ? news.TITLE.slice(0, 20) + '...' : news.TITLE}</ol>
                <ul>${news.AUTHOR.length > 20 ? news.AUTHOR.slice(0, 20) + '...' : news.AUTHOR}</ul>
                <ul>${news.PRE_PRICE}</ul>
            </div>`).join('');

    document.getElementById("news-board").innerHTML = newsHTML;
};

const paginationRender = () => {
    const totalPages = Math.ceil(totalResults / pageSize);
    const pageGroup = Math.ceil(page / groupSize);

    const lastPage = pageGroup * groupSize;
    const firstPage = lastPage - (groupSize - 1);

    let paginationHTML = '';

    for (let i = firstPage; i <= lastPage ; i++) {
        paginationHTML += `<li class="page-item" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
    }

    document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage=(pageNum)=>{
    console.log("moveToPage",pageNum)
    page = pageNum;
    getLibrary();
}

getLibrary();