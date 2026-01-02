
var observer = new IntersectionObserver((entries)=>{
        for (const entry of entries){
            if (entry.isIntersecting && entry.target.dataset.onview){
                setTimeout(() => {
                        matrixType(0,0,JSON.parse(entry.target.dataset.matrix),entry.target);
                },entry.target.dataset.startdelay*1000);
                    observer.unobserve(entry.target);
            }
        }
        });
        
        document.addEventListener("DOMContentLoaded",function (){
        var parag = document.getElementsByClassName("wp-block-create-block-matrix-typing-effect");
        for (const element of parag){
        if (element.dataset.onview=="true"){
                observer.observe(element);
        }else{
                setTimeout(()=>{
                        matrixType(0,0,JSON.parse(element.dataset.matrix),element);
                },element.dataset.startdelay*1000);
        }
        };
        });
        function matrixType(letter,line,matrixText,matrixP) {
            if (Object.keys(matrixText).length<=line){
                    return;
            }
            if (letter==0){
                    matrixP.innerHTML="";
            }else{
                    matrixP.innerText=matrixText[line].slice(0,letter);
            }
            letter++;
            if (matrixText[line].length>=letter){
                    let v = (1000/matrixP.dataset.speed);
                    setTimeout(()=>{
                            matrixType(letter,line,matrixText,matrixP);
                    },v);
            }else{
                    setTimeout(()=>{
                            line++;
                    matrixType(0,line,matrixText,matrixP);
                    },matrixP.dataset.betweendelay*1000);
            }
        }
        