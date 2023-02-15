document.addEventListener("DOMContentLoaded", getImage);

function getImage(){    
    const btn = document.querySelector("button");
    const resultImage = document.querySelector(".image");

    btn.addEventListener("click", getUrl); 

    function getUrl() { 
        const value = Number(document.getElementById("num").value);

        if (value>=0 && value<=10) {
            const url = new URL(`https://picsum.photos/v2/list?limit=${value}`);
            const data = url.href;
            console.log(data);

            let xhr = new XMLHttpRequest(data);
            xhr.open('GET', data);
            xhr.onload = function() {
                if (xhr.status != 200) {
                    console.log('Статус ответа: ', xhr.status);
                } else {
                    let picsUrl = JSON.parse(xhr.response);
                    card = '';
                    picsUrl.forEach((item) => {
                        let divImages = `
                            <div>
                                <img class="pics" src="${item.download_url}" weight="300px" height="300px">
                            </div>
                            `;
                        card += divImages;
                    })
                    resultImage.innerHTML = card;
                }
            }
            xhr.onprogress = function(event) {
                console.log(`Загружено ${event.loaded} из ${event.total}`)
            };
            xhr.onerror = function() {
                console.log('Ошибка! Статус ответа: ', xhr.status);
            };
            xhr.send();
        } else {
            console.log("Число вне диапазона от 1 до 10");
            const errImage = `
                <div>
                    <p style='color: red; font-weight: bold; font-size: larger'>Число вне диапазона от 1 до 10</p>
                </div>
                `;         
            resultImage.innerHTML = errImage;
        }
    };       
};