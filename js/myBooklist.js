const myAPI =
  "7a328df4e2e5bc6c3dd52d51251e3469a5d0910058d86c71204180d55a9afce2";
let ISBNUrl = new URL(
  `https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${myAPI}&result_style=json&page_no=1&page_size=1`
);
let RecommendUrl = new URL(
  `https://corsproxy.io/?https://nl.go.kr/NL/search/openApi/saseoApi.do?key=${myAPI}&endRowNemApi=100&start_date=20220101`
);
let bookList = [];
let matchArray = [];
let matchBookList = [];

let ISBNList = [
  {
    isbn: "9791185035154",
    url: "https://www.nl.go.kr/afile/previewThumbnail/NLR-1267",
  },
  {
    isbn: "9788961961844",
    url: "https://www.nl.go.kr/afile/previewThumbnail/NLR-1259",
  },
  {
    isbn: "9791167373618",
    url: "https://www.nl.go.kr/afile/previewThumbnail/24013052262qnXFI",
  },
  {
    isbn: "9788983717054",
    url: "https://www.nl.go.kr/afile/previewThumbnail/NLR-1278",
  },
  {
    isbn: "9788996586043",
    url: "https://www.nl.go.kr/afile/previewThumbnail/NLR-1056",
  },
];

// let ISBNList = ["9791185035154", "9788961961844", "9791167373618", '9788983717054', '9788996586043']

// ISBN 저자정보
// https://www.nl.go.kr/seoji/SearchApi.do?cert_key=[발급된키값]&result_style=json&page_no=1&page_size=10

// 사서 추천도서
// https://nl.go.kr/NL/search/openApi/saseoApi.do?key=[발급된 인증키]

// const API_KEY = '1fcc678ac940549cb24a61ded5ec9453a2924d7475da7cb94de1d5ad53ee8212'

// const recommend = async () => {
//     const response = await fetch(RecommendUrl)
//     const responseData = await response.text()

//     const parser = new DOMParser()
//     const XMLData = parser.parseFromString(responseData, "text/xml")

//     const jsonData = xmlToJson(XMLData);

//     console.log("jsonData: ", jsonData)
//     console.log("사서추천도서: ", jsonData.channel.list)

//     bookList = jsonData.channel.list.filter(book => ISBNList.includes(book.item.recomisbn['#text']));

//     console.log("booklist: ", bookList);

//     // bookList = jsonData.channel.list
//     // console.log("booklist: ", bookList)

//     // matchBookList = bookList.filter(book => ISBNList.includes(book.item.recomisbn['#text']));
//     // console.log("matchList: ", matchBookList);

//     render()
// }

// const recommend = async () => {

//     for (const isbn of ISBNList) {
//         //         ISBNUrl.searchParams.set('isbn', i)
//         const url = new URL(`https://corsproxy.io/?https://nl.go.kr/NL/search/openApi/saseoApi.do?key=${myAPI}&isbn=${isbn}`);
//         const response = await fetch(url);
//         const responseData = await response.text();

//         const parser = new DOMParser();
//         const XMLData = parser.parseFromString(responseData, "text/xml");
//         const jsonData = xmlToJson(XMLData);

//         const bookList = jsonData.channel.list;

//         // ISBN 목록에 해당하는 도서 정보만 필터링하여 matchBookList에 추가
//         const matchingBooks = bookList.filter(book => book.item.recomisbn['#text'] === isbn);
//         matchBookList.push(...matchingBooks);
//     }

//     console.log("matchBookList: ", matchBookList);

//     render();
// }

// recommend()

// xml json으로 변환 함수
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

const render = () => {
  const bookHTML = matchBookList
    .map((book) => {
      // ISBNList에서 해당 도서의 ISBN에 해당하는 URL을 찾습니다.
      const isbnItem = ISBNList.find((item) => item.isbn === book.EA_ISBN);
      // ISBN에 해당하는 URL이 존재한다면 이미지 소스로 설정합니다.
      const imageURL = isbnItem ? isbnItem.url : "";

      return `
        <div class="book">
            <div class="book_firstDiv">
                <input type="checkbox" id="buy">
                <input type="checkbox" id="read">
            </div>
            <div class="book_midDiv">
                <img src="${imageURL}" alt="책 이미지 위치">
                <div class="bookInfo">
                    <div id="title">${book.TITLE}</div>
                    <div id="codeName">${book.AUTHOR}</div>
                </div>
            </div>
            <div class="book_lastDiv">
                <button>
                    <img src="../images/trash.svg">
                </button>
            </div>
        </div>
        `;
    })
    .join("");
  document.querySelector(".booksArea").innerHTML = bookHTML;
};

async function matchISBN() {
  if (!Array.isArray(ISBNList)) {
    console.error("ISBNList is not an array");
    return;
  }

  for (let i of ISBNList) {
    ISBNUrl.searchParams.set("isbn", i.isbn);
    console.log("ISBNUrl.href: ", ISBNUrl.href);
    const response = await fetch(ISBNUrl.href);
    const matchData = await response.json();
    matchArray.push(matchData);

    console.log("매칭된 데이터: ", matchData);
  }
  console.log("matchArray: ", matchArray);

  matchBookList = matchArray.flatMap((item) => item.docs || []);

  console.log("matchBookList: ", matchBookList);

  render();
}

matchISBN();
