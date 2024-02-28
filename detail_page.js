const API_KEY = `bbaa351bbf88c6e2f61f5d9f2e71fbdf67c4e01b279c7fe537b1c97a2417e585`;

let url = new URL(`https://www.nl.go.kr/NL/search/openApi/search.do?apiType=json&key=${API_KEY}&detailSearch=true&isbnOp=isbn&isbnCode=8984993727`)
let url2 = ""
let ISBN = ""
let bookInfo = []

let targetBookDetail = async()=>{
    ISBN = "9791196777050"
    url = new URL(`https://www.nl.go.kr/seoji/SearchApi.do?cert_key=${API_KEY}&result_style=json&page_no=1&page_size=10&isbn=${ISBN}`)
    const response = await fetch(url)
    const data = await response.json()
    bookInfo = data.docs[0]
    console.log("ISBN check", bookInfo.EA_ISBN)  
    console.log("data.docs[0]", bookInfo)
    
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
    window.opener.postMessage("wish button clicked", "*")
}

// This event handler will listen for messages from the child
window.addEventListener("message", (e)=>{
    //e.data hold the message from the child
    console.log(e.data)
})