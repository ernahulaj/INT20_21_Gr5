let galleryImages = document.querySelectorAll(".gallery-img"); //array qe ruan fotot e body
let getLatestOpenedImg;
let windowWidth = window.innerWidth;


if(galleryImages){ //vlere boolean qe eshte true nese galleryImages permban anetare
    galleryImages.forEach(function(image, index) { //ne menyre qe me funksionu per secilen foto qe klikohet
        image.onclick = function(){
            let getElementCss = window.getComputedStyle(image);
            let getFullImgUrl = getElementCss.getPropertyValue("background-image");
            let getImgUrlPos = getFullImgUrl.split("/gallery/thumbs/"); //ndan url te fotos ne dy pjese
            let setNewImgUrl = getImgUrlPos[1].replace('.jpeg")',''); //meqe versioni i fotove 'thumbnail' eshte jpeg kurse i fotove te rritura jpg
            

            getLatestOpenedImg = index + 1; //+1 sepse renditjen e fotove ne folder e kemi bere prej 1

            let container = document.body;
            let newImgWindow = document.createElement("div"); //krijon element div ne body 
            container.appendChild(newImgWindow);
            newImgWindow.setAttribute("class", "img-window"); //shtohen atributet class dhe onclick ne elementin newImgWindow
            newImgWindow.setAttribute("onclick", "closeImg()");

            let newImg = document.createElement("img");
            newImgWindow.appendChild(newImg);
            newImg.setAttribute("src","gallery/"+setNewImgUrl+".jpg"); //shfaqet fotoja e re me format .jpg
            newImg.setAttribute("id","current-img");

            newImg.onload = function(){ //fillimisht ngarkohet fotoja pastaj krijohen butonat
                let imgWidth = this.width;
                let calcImgToEdge = ((windowWidth - imgWidth)/2) - 90; //ne menyre qe butonat me u pozicionu sakte varesisht prej gjeresise se fotos

                let newNextBtn = document.createElement("a");
                let btnNextText = document.createTextNode("NEXT");
                newNextBtn.appendChild(btnNextText);
                container.appendChild(newNextBtn);
                newNextBtn.setAttribute("class","img-btn-next");
                newNextBtn.setAttribute("onclick","changeImg(1)"); //parametri 1 i shkon funksionit changeImg kur kalojme te fotoja next
                newNextBtn.style.cssText = "right:"+calcImgToEdge+ "px";
    
    
                let newPrevBtn = document.createElement("a");
                let btnPrevText = document.createTextNode("PREV"); //parametri 0 i shkon funksionit changeImg kur kalojme te fotoja previous
                newPrevBtn.appendChild(btnPrevText);
                container.appendChild(newPrevBtn);
                newPrevBtn.setAttribute("class","img-btn-prev");
                newPrevBtn.setAttribute("onclick","changeImg(0)");
                newPrevBtn.style.cssText = "left:"+calcImgToEdge+ "px";
            }
        }
    });
}


function closeImg(){
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-next").remove();
    document.querySelector(".img-btn-prev").remove();
}


function changeImg(changeDir){
    document.querySelector("#current-img").remove();

    let getImgWindow = document.querySelector(".img-window");
    let newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);

    let calcNewImg;
    
    if(changeDir === 1){
        calcNewImg = getLatestOpenedImg + 1;
        if(calcNewImg > galleryImages.length){
            calcNewImg = 1;
        }
    }
    else if(changeDir === 0){
        calcNewImg = getLatestOpenedImg - 1;
        if(calcNewImg < 1){
            calcNewImg = galleryImages.length;
        }  
    }
    
    newImg.setAttribute("src", "gallery/sh"+calcNewImg+".jpg");
    newImg.setAttribute("id", "current-img");

    getLatestOpenedImg = calcNewImg;

    newImg.onload = function(){
        let imgWidth = this.width;
        let calcImgToEdge = ((windowWidth - imgWidth)/2) - 90;

        let nextBtn = document.querySelector(".img-btn-next");
        nextBtn.style.cssText = "right:"+calcImgToEdge+ "px";

        let prevBtn = document.querySelector(".img-btn-prev");
        prevBtn.style.cssText = "left:"+calcImgToEdge+ "px";
    }
}
