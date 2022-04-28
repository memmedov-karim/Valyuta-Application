const money = document.querySelector(".valyuta_input1");
const result = document.querySelector(".valyuta_result");
const info = document.querySelector(".default1");
const info1 = document.querySelector(".default2");
const buttons1 = document.querySelectorAll(".ex1");
const buttons2 = document.querySelectorAll(".ex2");
buttons1.forEach((item,index)=>{
    item.addEventListener("click",()=>{
        info.innerText = item.innerText;
        item.style.backgroundColor = "#833AE0";
        money.disabled = false;
        ls = [0,1,2,3];
        ans = []
        for(let d of ls){
            if (d!=index){
                ans.push(d)
            }
        }
        for(let i of ans){
            buttons1[i].style.backgroundColor = "unset";
        }
    }) 
})
buttons2.forEach((item,index)=>{
    item.addEventListener("click",()=>{
        info1.innerText = item.innerText;
        item.style.backgroundColor = "#833AE0";
        result.style.display = "block"
        ls = [0,1,2,3];
        ans = []
        for(let d of ls){
            if (d!=index){
                ans.push(d)
            }
        }
        for(let i of ans){
            buttons2[i].style.backgroundColor = "unset";
        }
    }) 
})
money.addEventListener("keyup",()=>{
    if((info.innerText=="1 RUB = 0.0135 USD" && info1.innerText=="1 USD = 73.8896 RUB") || (info.innerText == "1 RUB = 0.0135 USD" && info1.innerText != "1 USD = 73.8896 RUB") || (info.innerText!="1 RUB = 0.0135 USD" && info1.innerText == "1 USD = 73.8896 RUB")){
        alert("Zehmet olmasa valyuta secin")
    }
    else{
        if(Number(money.value)!=money.value){
            money.value = "";
            alert("Zehmet olmasa duzgun daxil edin!")
        }
        else{
            fetch(`https://api.exchangerate.host/latest?base=${info.innerText}&symbols=${info1.innerText}`)
                .then((response)=>response.json())
                .then((data)=>{
                    result.value = `${money.value*data.rates[`${info1.innerText}`]}`
                    if(result.value.length>10){
                        result.style.fontSize = "25px"
                        money.style.fontSize = "25px"
                    }
                    else{
                        result.style.fontSize = "36px"
                        money.style.fontSize = "36px"
                    }
                })
                .catch((error)=>{
                    alert("Internet baglantinizi yoxlayin")
                })
        }
    }  
})
result.addEventListener("keyup",()=>{
    if((info.innerText=="1 RUB = 0.0135 USD" && info1.innerText=="1 USD = 73.8896 RUB") || (info.innerText == "1 RUB = 0.0135 USD" && info1.innerText != "1 USD = 73.8896 RUB") || (info.innerText!="1 RUB = 0.0135 USD" && info1.innerText == "1 USD = 73.8896 RUB")){
        alert("Zehmet olmasa valyuta secin")
    }
    else{
        if(Number(result.value)!=result.value){
            result.value = "";
            alert("Zehmet olmasa duzgun daxil edin!")
        }
        else{
            fetch(`https://api.exchangerate.host/latest?base=${info1.innerText}&symbols=${info.innerText}`)
                .then((response)=>response.json())
                .then((data)=>{
                    money.value = `${result.value*data.rates[`${info.innerText}`]}`
                    if(money.value.length>10){
                        result.style.fontSize = "25px"
                        money.style.fontSize = "25px"
                    }
                    else{
                        result.style.fontSize = "36px"
                        money.style.fontSize = "36px"
                    }
                })
                .catch((error)=>{
                    alert("Internet baglantinizi yoxlayin")
                })
        }
    }  
})
window.addEventListener("unload",()=>{
    money.value = ""  
    result.value = ""
})


