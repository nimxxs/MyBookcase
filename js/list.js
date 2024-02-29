const API_KEY = '1fcc678ac940549cb24a61ded5ec9453a2924d7475da7cb94de1d5ad53ee8212';
let newsList=[];
let totalResults = 0;
let page = 1;
const pageSize = 300;
const groupSize = 5; 

const getLibrary = async () => {
    const url = new URL(`https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${API_KEY}&result_style=json&page_no=${page}&page_size=${pageSize}&start_publish_date=20220101&end_publish_date=20220501`); //isbn
    //const url = new URL(`https://nl.go.kr/NL/search/openApi/saseoApi.do?key=${API_KEY}&result_style=json&startRowNumApi=1&endRowNumApi=10&start_date=20200101&end_date=20200131&drcode=11`); //사서추천
    const response = await fetch(url);    
    const data = await response.json();
    newsList = data.docs;
    totalResults = data.totalResults;    
    render();
    paginationRender();
};

const render = () => {
    const filteredNewsList = newsList.filter(news => news.TITLE_URL && news.TITLE_URL !== ""); // 이미지가 있는 항목만 필터링

    const newsHTML = filteredNewsList.slice(0, 20) // 이미지가 있는 항목 중에서 최대 20개까지만 출력
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
    
    //마지막 페이지 그룹이 그룹 사이즈보다 작다? lastPage = totalPage
    if(lastPage>totalPages){
        lastPage = totalPages;
    }

    const firstPage = lastPage - (groupSize - 1)<=0? 1:lastPage - (groupSize-1);

    let paginationHTML = '';

    for (let i = firstPage; i <= lastPage ; i++) {
        paginationHTML += `<li class="page-item ${i===page?'active':''}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
    }

    document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage=(pageNum)=>{
    console.log("moveToPage",pageNum)
    page = pageNum;
    getLibrary();
}

getLibrary();
