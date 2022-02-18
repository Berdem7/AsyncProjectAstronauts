const astrosUrl = "http://api.open-notify.org/astros.json";
const wikiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/";
const peopleList = document.getElementById("people");
const btn = document.querySelector("button");

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = ()=>{
    if(xhr.status===200){
      // getJSON(astrosUrl,generateHTML)
      // let data = JSON.parse(astrosUrl);
      // console.log(data);
      let data = JSON.parse(xhr.responseText);
      console.log(data);
    }}
xhr.open("GET",astrosUrl);
xhr.send();