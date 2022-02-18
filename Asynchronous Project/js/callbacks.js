const astrosUrl = "http://api.open-notify.org/astros.json";
const wikiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/";
const peopleList = document.getElementById("people");
const btn = document.querySelector("button");

// Make an AJAX request

function getJSON(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET",url);
  
  xhr.onload = ()=>{
    if(xhr.status===200){
      // getJSON(astrosUrl,generateHTML)
      // let data = JSON.parse(astrosUrl);
      // console.log(data);
      let data = JSON.parse(xhr.responseText);
      callback(data);
    }
  }  
  
  
  xhr.send();
  //create xmlhttpreuqest
  //open request with url
  //onload if status is 200 then parse the response then call the callback function with parsed data
  //send request
}

// Generate the markup for each profile
function generateHTML(data) {
  //create section document element
  let section = document.createElement("section");
  
  //append that section into peopleList
  peopleList.appendChild(section);

  // Checking if request returns a 'standard' page from Wiki
  if (data.type === "standard") {
    //in section as innerHTML with template litral:
    //create img with src of value data.thumbnail.source
    let img = document.createElement("img");
    img.src = `${data.thumbnail.source}`;
    section.appendChild(img);
    //create h2 with data.title value
    let h2 = document.createElement("h2");
    section.appendChild(h2);
    h2.innerHTML = `${data.title}`;
    //create p with data.description
    let p = document.createElement("p");
    section.appendChild(p);
    p.innerHTML = `${data.description}`;
    //create p with data.extract
    let p1 = document.createElement("p");
    section.appendChild(p1);
    p1.innerHTML = `${data.extract}`;
    // section.innerHTML = `
    //   <img src=`${data.thumbnail.source}`>
    //   <h2>`${data.title}`</h2>
    //   <p>`${data.title}`</p>
    //   ${data.extract_html}
    // `;
  } else {
    section.innerHTML = `
      <img src="img/profile.jpg" alt="ocean clouds seen from space">
      <h2>${data.title}</h2>
      <p>Results unavailable for ${data.title}</p>
      ${data.extract_html}
    `;
  }
}

btn.addEventListener("click", (event) => {
  //call getJson function with astrosUrl and anonymous callback function

  getJSON(astrosUrl,(x)=>{
    // console.log(x);
    x.people.map((y)=>{
      getJSON(`${wikiUrl}${y.name}`, generateHTML)
      
    })
  })
  
  //anonymous callback function is taking data as argument then access people property of its
  //then map over the its. Inside map call getJson function with wikiUrl plus
  //the name property of the element and generateHTML function as callback function
});
