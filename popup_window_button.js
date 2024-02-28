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

// This event handler will listen for messages from the child
window.addEventListener("message", (e)=>{
    //e.data hold the message from the child
    console.log(e.data)
})

// this is a test
