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
    const url = new URL(`https://corsproxy.io/?https://nl.go.kr/NL/search/openApi/saseoApi.do?key=${API_KEY2}&startRowNumApi=1&endRowNumApi=1325`); //사서추천    
    
    const response = await fetch(url);    
    const data = await response.text();

    // XML을 JSON으로 변환
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");

    // JSON으로 변환
    const jsonResult = xmlToJson(xmlDoc);
    
    newsList = jsonResult.channel.list;
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
            // const dateString = news.PUBLISH_PREDATE.slice(0, 4) + '.' + news.PUBLISH_PREDATE.slice(4, 6) + '.' + news.PUBLISH_PREDATE.slice(6, 8);
            
            return `
                <section>
                <div class="modal_image">
                <img onclick="popWindow(${news.item.recomisbn["#text"]})" src="${news.item.recomfilepath["#text"]}" alt="이미지"></img>
            </div>
            <div class="modal_info">
                <h3 class="modal-title">${news.item.recomtitle["#text"]}</h3>
                <p>지은이 : ${news.item.recomauthor["#text"]}</p>
                <p>출판사 : ${news.item.recompublisher["#text"]}</p>
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

// XML을 JSON으로 변환하는 함수
function xmlToJson(xml) {
    // Create the return object
    var obj = {};
    if (xml.nodeType == 1) {
      // element node
      // do attributes
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) {
      // text node
      obj = xml.nodeValue;
    }
    // do children
    if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof obj[nodeName] == "undefined") {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof obj[nodeName].push == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
    return obj;
  }

// const getCategory = async (category) => {
//     const encodedCategory = encodeURIComponent(category);
//     const url = `https://www.nl.go.kr/NL/search/openApi/search.do?key=1fcc678ac940549cb24a61ded5ec9453a2924d7475da7cb94de1d5ad53ee8212&kwd=${encodedCategory}`;
//     window.open(url, '_self');
// };

getLibrary();
