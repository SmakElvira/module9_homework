document.addEventListener("DOMContentLoaded", getImage);

function getImage(){
    const btn = document.querySelector("button");
    const resultImage = document.querySelector(".image");

    btn.addEventListener("click", getUrl);

    function getUrl() {
        const widthImage = Number(document.getElementById("num1").value);
        const heightImage = Number(document.getElementById("num2").value);
        if (widthImage>=100 && widthImage<=300 && heightImage>=100 && heightImage<=300) {
        const url = new URL(`https://picsum.photos/${widthImage}/${heightImage}`);
        console.log(url);
        myFetch(url);
        return url;
        }
        else {
            console.log("Одно из чисел вне диапазона от 100 до 300");
            const errImage = `
                <div>
                    <p style='color: red; font-weight: bold; font-size: larger'>Одно из чисел вне диапазона от 100 до 300</p>
                </div>
                `;         
            resultImage.innerHTML = errImage;
        }
    };
  
    function myFetch(url){ 
        fetch(url) 
        .then(response => {
            console.log(response.url)
            if (response.ok = true) {
                return response.url}
            })
        .then(data => {
            const card = `
                <div>
                    <img src="${data}">
                </div>
                `;         
            resultImage.innerHTML = card;
            }) 
        .catch(() => {
            console.log(`Error`);
            })
        .finally(() => {
            document.getElementById("num1").value = '';
            document.getElementById("num2").value = '';
            });
        };
};