document.addEventListener("DOMContentLoaded", getImage);

function getImage(){
    const btn = document.querySelector("button");
    const resultImage = document.querySelector(".image");
    let pics;
    outLocalStor();

    btn.addEventListener("click", getUrl);

    function getUrl() {
        const pageUrl = Number(document.getElementById("page").value);
        const limitUrl = Number(document.getElementById("limit").value);
        if (!isNaN(pageUrl) && !isNaN(limitUrl) && pageUrl>=1 && pageUrl<=10 && limitUrl>=1 && limitUrl<=10) {
            const url = new URL(`https://picsum.photos/v2/list?page=${pageUrl}&limit=${limitUrl}`);
            myFetch(url);
            return url;
        }
        else {
            if (pageUrl<1 || pageUrl>10 || isNaN(pageUrl)) {
                console.log("Номер страницы вне диапазона от 1 до 10");
                const errImage = `
                    <div>
                        <p style='color: red; font-weight: bold; font-size: larger'>Номер страницы вне диапазона от 1 до 10</p>
                    </div>
                    `;        
            resultImage.innerHTML = errImage;
            }
            if (limitUrl<1 || limitUrl>10 || isNaN(limitUrl) && isNaN(pageUrl)) {
                console.log("Лимит вне диапазона от 1 до 10");
                const errImage = `
                    <div>
                        <p style='color: red; font-weight: bold; font-size: larger'>Лимит вне диапазона от 1 до 10</p>
                    </div>
                    `;    
            resultImage.innerHTML = errImage;
            }
            if ((isNaN(pageUrl) && isNaN(limitUrl)) || (pageUrl<1 || pageUrl>10) && (limitUrl<1 || limitUrl>10)) {
                console.log("Номер страницы и лимит вне диапазона от 1 до 10");
                const errImage = `
                    <div>
                        <p style='color: red; font-weight: bold; font-size: larger'>Номер страницы и лимит вне диапазона от 1 до 10</p>
                    </div>
                    `;        
            resultImage.innerHTML = errImage;
            }
        }
    };
  
    function myFetch(url){ 
        fetch(url) 
        .then(response => {
            return response.json()
        })
        .then((data) => {
            inLocalStor(data);
            imageForClient(data);
            return data
        }) 
        .catch(() => {
            const errImage = `
                <div>
                    <p style='color: red; font-weight: bold; font-size: larger'>Error</p>
                </div>
                `;         
            resultImage.innerHTML = errImage;
        })
        .finally(() => {
            document.getElementById("page").value = '';
            document.getElementById("limit").value = '';
            console.log("ok")
        });
    };

    function imageForClient(data, card) {
        card = '';
        data.forEach((item) => {
            let divImages = `
                <div>
                    <img class="pics" src="${item.download_url}" weight="300px" height="300px">
                </div>
                `;
            card += divImages;
        })
        resultImage.innerHTML = card;
    };

    function outLocalStor() {
        if (localStorage.getItem('images')){
            let images = localStorage.getItem('images');
            let data = JSON.parse(images);
            imageForClient(data, pics);  
        } 
    };

    function inLocalStor(data) {
        localStorage.clear();
        localStorage.setItem('images', JSON.stringify(data));
    };

    async function result() {
        const responseData = await myFetch();
        if(responseData) {
            imageForClient(responseData, pics);
            inLocalStor(responseData);
        }
    };   
};