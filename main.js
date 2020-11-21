function bindEventListeners(){
    const searchInput = document.querySelector(".search-box input");
    const menuItemsContainer = document.querySelector(".menu-items-container");
    const menuBtn = document.querySelector(".menu-button");
    const headerMargin = document.querySelector(".header-margin");
    
    searchInput.addEventListener("focus", ()=>{
        menuItemsContainer.classList.add("input-focused")
    });
    searchInput.addEventListener("blur", ()=>{
        menuItemsContainer.classList.remove("input-focused")
    });
    menuBtn.addEventListener("click", ()=>{
        menuItemsContainer.classList.toggle("open");
        headerMargin.classList.toggle("open");
    });
    
    if(innerWidth < 768){
        window.addEventListener("scroll", e=>{
            let nav = document.querySelector("nav");
            let navBottom = document.querySelector("main").getBoundingClientRect().top;
            if(navBottom < 0){
                if(!nav.classList.contains("fixedToTop")){
                    nav.classList.add("fixedToTop");
                }
            }else nav.classList.remove("fixedToTop");
        });
    }
}

function fetchUserDetails(){
    let query = `{
        viewer {
          login
          name
          avatarUrl(size: 200)
          bio
          websiteUrl
          url
          repositories(last: 20) {
            nodes {
              name
              description
              updatedAt
              licenseInfo {
                name
              }
              languages(last: 20) {
                nodes {
                  color
                  name
                }
              }
            }
          }
        }
    }`;
    let githubAPI = "https://api.github.com/graphql";
    let reqOptions = {
        method: "POST",
        body: JSON.stringify({query, variables: {}}),
        headers: {
            "Authorization": `Bearer ${GITHUB_ACCESS_TOKEN}`,
            "Content-Type": "application/json"
        }
    };
    let intro = document.querySelector("#intro");
    fetch(githubAPI, reqOptions)
    .then(res=> res.json())
    .then(res=>{
        let data = res.data.viewer;
        for(let each in data){
            updateDOM(each, data[each])
        }
        intro.classList.add("disappear");
        setTimeout(function(){
            intro.style.display = "none";
        }, 1000);
    }).catch(e=>{
        let introP = intro.querySelector("p");
        let introSvg = intro.querySelectorAll("svg");
        if(e.message === "Failed to fetch"){
            introP.innerText = "Failed to get user details, please check your internet connection and reload the page.";
        }else{
            introP.innerText = "An error occured, please reload page."
        }
        introSvg.forEach(svg=> svg.style.animation = "none");
        console.log(e.message);
    });
}

function updateDOM(className, value){
    switch(className){
        case "repositories":
            let repoContainer = document.querySelector("#repo-container");
            document.querySelector(".badge").innerText = value.nodes.length;
            value.nodes.reverse().forEach(repo=>{
                let frag = document.getElementById("repo-placeholder").cloneNode(true);
                frag.classList.remove("d-none");
                frag.id = "";
                for(let field in repo){
                    switch(field){
                        case "languages":
                            if(repo.languages.nodes[0]){
                                frag.querySelector("#repo-languages-name").innerText = repo.languages.nodes[0].name;
                                frag.querySelector("#repo-languages-color").style.background = repo.languages.nodes[0].color;
                            }else{
                                frag.querySelector("#repo-languages-name").style.cssText = "width: 0; margin: 0; padding: 0;";
                                frag.querySelector("#repo-languages-color").style.cssText = "width: 0; margin: 0; padding: 0;";
                            }
                            break;
                        case "licenseInfo":
                            if(repo.licenseInfo){
                                frag.querySelector("#repo-licenseInfo-name").innerText = repo.licenseInfo.name;
                            }else{
                                frag.querySelector(".license-paragraph").innerHTML = "";
                                frag.querySelector(".license-paragraph").style.cssText = "margin: 0; padding: 0;"
                            }
                            break;
                        case "updatedAt":
                            // Case updatedAt should always remain as last to allow fallthrough
                            let dateDiff = Math.floor((Date.now() - new Date(repo[field])) / (24 * 60 * 60 * 1000));
                            if(dateDiff > 7) repo[field] = `on ${new Date(repo[field]).toDateString().slice(4)}`;
                            else repo[field] = `${dateDiff} days ago`;
                        default:
                            frag.querySelector(`#repo-${field}`).innerText = repo[field] ? repo[field] : "";
                    }
                }
                repoContainer.appendChild(frag);
            });
            break;
        case "avatarUrl":
            let userAvatars = document.getElementsByClassName(className);
            for(let i = 0; i < userAvatars.length; i++){
                if(userAvatars[i].nodeName === "IMG") userAvatars[i].src = value;
                else{
                    userAvatars[i].style.background = `url(${value})`;
                    userAvatars[i].style.backgroundSize = "cover";
                }
            }
            break;
        default:
            let elems = document.getElementsByClassName(className);
            for(let i = 0; i < elems.length; i++){
                elems[i].innerText = value;
                if(className === "websiteUrl") elems[i].href = value;
            }
    }
}

function init(){
    bindEventListeners();
    fetchUserDetails();
}

window.addEventListener("load", init);
