const API_KEY = '1fcc678ac940549cb24a61ded5ec9453a2924d7475da7cb94de1d5ad53ee8212';
let newsList=[];

const getLibrary = async () => {
    const url = new URL(`https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${API_KEY}&result_style=json&page_no=1&page_size=300&start_publish_date=20220509&end_publish_date=20220509`);
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.docs;
    render();
    console.log("ddd",newsList);
};

const render = () => {
    const newsHTML = newsList
        .filter(news => news.TITLE_URL && news.TITLE_URL !== "") // 이미지가 있는 항목만 필터링
        .map((news, index) => {
            // 제목이 10자를 초과하면 10자로 자르고 '...'을 붙임
            const truncatedTitle = news.TITLE.length > 10 ? news.TITLE.slice(0, 20) + '...' : news.TITLE;
            // 저자가 20자를 초과하면 20자로 자르고 '...'을 붙임
            const truncatedAuthor = news.AUTHOR.length > 20 ? news.AUTHOR.slice(0, 20) + '...' : news.AUTHOR;
            // 제목이 한 줄로 표시되면 뒤에 한 줄만큼의 공간을 추가
            const titleLineBreak = news.TITLE.length <= 10 ? '<br>' : '';
            if (index % 5 === 0) {
                return `</div><div class="row">
                            <img src=${news.TITLE_URL}>
                            <ol>${truncatedTitle}${titleLineBreak}</ol>
                            <ul>${truncatedAuthor}</ul>
                            <ul class="space">${news.PRE_PRICE}</ul>`;
            } else {
                return `        <img src=${news.TITLE_URL}>
                            <ol>${truncatedTitle}${titleLineBreak}</ol>
                            <ul>${truncatedAuthor}</ul>
                            <ul class="space">${news.PRE_PRICE}</ul>`;
            }
        }).join('');

    document.getElementById("news-board").innerHTML = newsHTML;
};

getLibrary();