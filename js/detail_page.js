const API_KEY = `bbaa351bbf88c6e2f61f5d9f2e71fbdf67c4e01b279c7fe537b1c97a2417e585`;

// Function to parse query string and return value for specified key
function getQueryParam(key) {
    let queryParams = new URLSearchParams(window.location.search);
    return queryParams.get(key);
}

// Use the function to get the ISBN value from the query string
let ISBN = getQueryParam('isbn');

// Now, you can use the ISBN value as needed
console.log("ISBN from parent", ISBN);


let url = new URL(`https://www.nl.go.kr/NL/search/openApi/search.do?apiType=json&key=${API_KEY}&detailSearch=true&isbnOp=isbn&isbnCode=8984993727`)
let url2 = ""
//let ISBN = ""
let bookInfo = []

let targetBookDetail = async()=>{
    //ISBN = "9791196777050"
    //ISBN = "8984993727"
    //ISBN = "9788941241256"
    url = new URL(`https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${API_KEY}&result_style=json&page_no=1&page_size=10&isbn=${ISBN}`)
    const response = await fetch(url)
    const data = await response.json()
    bookInfo = data.docs[0]
    console.log("ISBN check", bookInfo.EA_ISBN)  
    console.log("data.docs[0]", bookInfo)
    
    url2 = new URL(`https://www.nl.go.kr/NL/search/openApi/search.do?apiType=json&key=${API_KEY}&detailSearch=true&isbnOp=isbn&isbnCode=${ISBN}`)
    const response2 = await fetch(url2)
    const data2 = await response2.json()
    console.log("data2", data2)

    loadTopSection()
    
}

let loadTopSection = ()=>{
    document.getElementById("book-title").innerHTML = bookInfo.TITLE
}

// const renderBookInfo = () =>{
//     const bookHTML = ``;

//     bookHTML = bookInfo.map(info=>``)
// }

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

targetBookDetail()




//this will post a message to the parent
let wishFunction = ()=>{
     // 이전에 저장된 데이터 읽어오기
    let storedData = localStorage.getItem('wishData');
    let existingData = storedData ? JSON.parse(storedData) : [];

    // 만약 이전에 저장된 데이터가 배열이 아니라면 빈 배열로 초기화
    if (!Array.isArray(existingData)) {
        existingData = [];
    }
    
    
    let wishISBN = ISBN;
    let conditionValue = true;

    // Package both values into an object
    let newMessageObject = {
        isbn: wishISBN,
        wishCondition: conditionValue
    }

    existingData.push(newMessageObject);


    // Send the object to the parent window
    window.opener.postMessage(newMessageObject, "*")

    // 누적된 데이터를 다시 저장
    localStorage.setItem('wishData', JSON.stringify(existingData));

    console.log(localStorage.setItem)
    console.log("send");
}

let toLibFunction = ()=>{
    window.open("https://www.naver.com","","")
}

