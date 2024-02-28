const API_KEY = '1fcc678ac940549cb24a61ded5ec9453a2924d7475da7cb94de1d5ad53ee8212'
let newsList=[]

const getLibrary = async () => {
    const url = new URL(`https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${API_KEY}&result_style=json&page_no=1&page_size=100&start_publish_date=20220509&end_publish_date=20220509`)
    //console.log("url", url)
    const response = await fetch(url);
    const data = await response.json()
    newsList = data.docs;
    render();
    console.log("ddd",newsList)
}

const render=()=>{
    const newsHTML = newsList
    .filter(news => news.TITLE_URL)
    .map(news=>`<div class="row">
    <img src=${news.TITLE_URL}>
    <ol>${news.TITLE}</ol>
    <ul>${news.AUTHOR}</ul>
    <ul>${news.PRE_PRICE}</ul>
</div>`).join('')
    
    

    document.getElementById("news-board").innerHTML=newsHTML//어디에 붙일지
}
getLibrary()