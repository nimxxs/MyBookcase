const API_KEY = `bbaa351bbf88c6e2f61f5d9f2e71fbdf67c4e01b279c7fe537b1c97a2417e585`;

// Function to parse query string and return value for specified key
function getQueryParam(key) {
    let queryParams = new URLSearchParams(window.location.search);
    return queryParams.get(key);
}

// Use the function to get the ISBN value from the query string
let ISBN = getQueryParam("isbn");
//ISBN = "9791170013419"
//ISBN = "9788996586043"

// Now, you can use the ISBN value as needed
console.log("ISBN from parent", ISBN);

let url = "";
let url2 = "";
let bookInfo = [];
let detailURL = "";

let conditionValue = false;

// 이전에 저장된 데이터 읽어오기
let storedData = localStorage.getItem("wishData");
let existingData = storedData ? JSON.parse(storedData) : [];

// 만약 이전에 저장된 데이터가 배열이 아니라면 빈 배열로 초기화
if (!Array.isArray(existingData)) {
    existingData = [];
}

let targetBookDetail = async () => {

    //ISBN = "9791196777050"
    //ISBN = "8984993727"
    //ISBN = "9788941241256"
    url = new URL(`https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${API_KEY}&result_style=json&page_no=1&page_size=10&isbn=${ISBN}`)
    const response = await fetch(url)
    const data = await response.json()
    bookInfo = data.docs[0]
    console.log("ISBN check", bookInfo.EA_ISBN)
    console.log("ISBN api (data.docs[0])", bookInfo)

    url2 = new URL(`https://www.nl.go.kr/NL/search/openApi/search.do?apiType=json&key=${API_KEY}&detailSearch=true&isbnOp=isbn&isbnCode=${ISBN}`)
    const response2 = await fetch(url2)
    const data2 = await response2.json()
    console.log("소장자료API (data2)", data2)

    if (data2.result != null) { detailURL = data2.result[0].detailLink }
    console.log("ddd", detailURL)
    loadTopSection()
    showBookCover(bookInfo.TITLE_URL)
    showBookDetails(bookInfo)
    //renderHeart(ISBN)
    //localStorage.clear("wishData")
    console.log("localStorage(wishData):", JSON.parse(localStorage.getItem("wishData")));
}


let loadTopSection = () => {
    document.getElementById("book-title").innerHTML = bookInfo.TITLE;
};

// // When the user clicks on <div>, open the popup
// function popUp() {
//     var popup = document.getElementById("myPopup");
//     popup.classList.toggle("show");
// }

// open new window for detailed info
function popWindow() {
    let params = `
        popup=no,
        scrollbars=yes,
        resizable=yes,
        status=no,
        location=no,
        toolbar=no,
        menubar=yes,
        width=1000,
        height=800,
        left=(window.screen.width / 2) - (width/2),
        top=(window.screen.height / 4)
        `;
    window.open("detail_page.html", "a", params);
}

targetBookDetail();

function showBookCover(book_title) {
    console.log("ISBN API bookcover URL", book_title);
    if (book_title == "") {
        document.querySelector(
            ".book-cover"
        ).innerHTML = `<img src="../images/bookskin.png"/>`;
    } else {
        document.querySelector(
            ".book-cover"
        ).innerHTML = `<img src="${book_title}"/>`;
    }
}

function showBookDetails(bookInfo) {
    document.querySelector(".book-details").innerHTML = `
    <div class="details-texts details-texts-title">제목: ${bookInfo.TITLE} 
    <button class="wishbutton" onclick="toLibFunction()" title="국립중앙도서관 링크">
    <img width="15px" text-align="center" src="../images/link.svg" />
  </button>
    </div>
    <div class="details-texts details-texts-author">저자: ${bookInfo.AUTHOR
        } </div>
    <div class="details-texts details-texts-publisher">출판사: ${bookInfo.PUBLISHER
        } <button onclick="toPublisherURL()" title="국립중앙도서관 링크"><img width="15px" text-align="center" src="../images/link.svg"" /></button></div>
    <div class="details-texts details-texts-date">출시일: ${publishDate(bookInfo)} </div>
    <div class="details-texts details-texts-pages">쪽 수: ${findPage(bookInfo)} </div>
    <div class="details-texts details-texts-isbn">ISBN: ${bookInfo.EA_ISBN} </div>
    <div>  </div>
    <button class="wishbutton_heart" onclick="wishFunction()" title="wish button">
        <div class="details-texts details-texts-heart"> ${renderHeart(bookInfo.EA_ISBN)} </div>
    </button>
    `;
}

function renderHeart(ISBN) {

    let existingEntry = existingData.find(entry => entry.isbn === ISBN);
    console.log("existingEntry", existingEntry);
    console.log("condition", conditionValue);

    // If an entry exists, set conditionValue to true, otherwise false
    conditionValue = existingEntry ? true : false;

    if (existingEntry) {


        if (conditionValue === false) {
            return `<img width="20px" src="/images/heart-empty.svg"/>`;
        } else if (conditionValue === true) {
            return `<img width="20px" src="/images/heart-filled.svg"/>`;
        }
    } else {
        // Handle the case where no matching entry is found
        console.log("No entry found for ISBN", ISBN);
        return `<img width="20px" src="/images/heart-empty.svg"/>`;
        

    }
    //   } else {
    //     // Handle the case where no matching entry is found
    //     document.querySelector(
    //       ".wishbutton"
    //     ).innerHTML = `<img width="20px" src="../images/heart.fill.svg"/>`;
    //     console.log("No entry found for ISBN", ISBN);
    //   }
}

let wishFunction = () => {

    // Check if there is an existing entry with the same ISBN
    let existingEntry = existingData.find(entry => entry.isbn === ISBN);

    // If an entry exists, set conditionValue to false, otherwise true
    conditionValue = existingEntry ? false : true;

    if (conditionValue) {
        // If conditionValue is true, package the data and add to existingData
        let newMessageObject = {
            isbn: ISBN, //ISBN is already defined somewhere above in the code
            url: bookInfo.TITLE_URL
        }

        existingData.push(newMessageObject);

        // Send the object to the parent window
        //window.opener.postMessage(newMessageObject, "*")
    } else {
        // If conditionValue is false, remove all objects with the matching ISBN
        existingData = existingData.filter(entry => entry.isbn !== ISBN);
    }

    // 누적된 데이터를 다시 저장
    localStorage.setItem('wishData', JSON.stringify(existingData));

    // Log action based on conditionValue
    if (conditionValue) {
        console.log("Added new entry:", { isbn: ISBN, url: bookInfo.TITLE_URL });
    } else {
        console.log("Removed entries with ISBN", ISBN);
    }

    console.log("updated wishData:", JSON.parse(localStorage.getItem("wishData")));

    // If an entry exists, set conditionValue to false, otherwise true
    conditionValue = existingEntry ? false : true;
    showBookDetails(bookInfo)
}


let toLibFunction = () => {
    window.open(`https://www.nl.go.kr${detailURL}`, "", "");
};

let toPublisherURL = () => {

    window.open(`${bookInfo.PUBLISHER_URL}`)
}

function publishDate(bookInfo) {
    if (bookInfo.REAL_PUBLISH_DATE !== "") { return bookInfo.REAL_PUBLISH_DATE }
    if (bookInfo.REAL_PUBLISH_DATE == "") {
        if (bookInfo.PUBLISH_PREDATE !== "") { return bookInfo.PUBLISH_PREDATE }
        else { return "" }

    }
}


function findPage(bookInfo) {

    if (bookInfo.PAGE != "") { return bookInfo.PAGE }
    else return "(정보가 없습니다)"
}
