console.log("Hello from javascript");


const weatherForm = document.querySelector("form");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
messageOne.textContent = "";
messageTwo.textContent = "";



weatherForm.addEventListener("submit", (e) => {
    const search = document.querySelector("input");
    e.preventDefault();
    messageOne.textContent = "LOADING...";
    messageTwo.textContent = "";
    fetch(`http://localhost:3000/weather?address=${search.value}`)
        .then((response) => {
            response.json().then(data => {
                if (data.error) {
                    messageOne.textContent = data.error;
                    
                } else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }


            })
        });

})