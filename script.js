const apiKey ="fac622134cc940f8b223f1f2f7537f6f";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=> fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const responce = await fetch(`${url}${query}&apiKey=${apiKey}`);
    const data = await responce.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const card_container = document.getElementById('card_container');
    const newsCardTemplate = document.getElementById('template-news-card');

    card_container.innerHTML="";
    articles.forEach((articles) => {
        if(!articles.urlToImage) return;
        const cardColne = newsCardTemplate.content.cloneNode(true);
        fillDataIncard(cardColne ,articles);
        card_container.appendChild(cardColne);
    });
}
function fillDataIncard(cardColne,articles){
    const newsImg = cardColne.querySelector('#news-img');
    const newsTitle = cardColne.querySelector('#news-title');
    const newsSource = cardColne.querySelector('#news-source');
    const newsDesc = cardColne.querySelector('#news-desc');

    newsImg.src = articles.urlToImage;
    newsTitle.innerHTML = articles.title;
    newsDesc.innerHTML = articles.description;
    const date = new Date(articles.publishedAt).toLocaleDateString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML = `${articles.source.name} . ${date}`;
    cardColne.firstElementChild.addEventListener('click',()=>{
        window.open(articles.url , "_blank");
    })
}
let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav ?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav ?.classList.add('active');
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener('click',()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
})
document.addEventListener("keydown", (event)=> {
    if (event.key === "Enter") {
        // Check if the Enter key is pressed
       searchButton.click(); 
       // Trigger the button's click event
    }
  });