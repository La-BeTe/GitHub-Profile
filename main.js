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
            "Authorization": "Bearer 5307b21501ca8c23c6fc34a7ab51d4c91f022c90",
            "Content-Type": "application/json"
        }
    };
    fetch(githubAPI, reqOptions)
    .then(res=> res.json())
    .then(res=>{
        let data = res.data.viewer;
        // Offline result represents the result of the fetch request above
        // let offlineResult = {"data":{"viewer":{"login":"La-BeTe","name":"Emejuru Emmanuel","avatarUrl":"https://avatars2.githubusercontent.com/u/66489884?s=10&v=4","bio":"Full stack web developer","websiteUrl":"https://www.lbtwebdesign.com","url":"https://github.com/La-BeTe","repositories":{"nodes":[{"name":"github-slideshow","description":"A robot powered training repository :robot:","updatedAt":"2020-10-10T14:21:57Z","licenseInfo":{"name":"MIT License"},"isPrivate":false,"languages":{"nodes":[{"color":"#701516","name":"Ruby"},{"color":"#e34c26","name":"HTML"},{"color":"#89e051","name":"Shell"}]}},{"name":"GitHub-Profile","description":"BuyCoins coding challenge repo","updatedAt":"2020-11-15T13:35:27Z","licenseInfo":null,"isPrivate":false,"languages":{"nodes":[{"color":"#e34c26","name":"HTML"}]}}]}}}};
        // console.log(offlineResult);
        // let data = offlineResult.data.viewer;
        // let anotherOfflineResult = {"data":{"user":{"name":"Ire Aderinokun","login":"ireade","repositories":{"nodes":[{"languages":{"nodes":[{"color":"#f1e05a","name":"JavaScript"},{"color":"#e34c26","name":"HTML"},{"color":"#563d7c","name":"CSS"}]},"description":"🛠Toggle CSS styles within @supports blocks","licenseInfo":null,"name":"feature-queries-manager","updatedAt":"2020-08-25T04:09:25Z"},{"languages":{"nodes":[{"color":"#89e051","name":"Shell"}]},"description":"Dotfiles, configurations, and general workspace setup","licenseInfo":null,"name":"dotfiles","updatedAt":"2020-09-23T16:43:20Z"},{"languages":{"nodes":[{"color":"#563d7c","name":"CSS"},{"color":"#e34c26","name":"HTML"}]},"description":"Work in Progress","licenseInfo":null,"name":"ia-fund.org","updatedAt":"2020-03-21T07:05:46Z"},{"languages":{"nodes":[{"color":"#f1e05a","name":"JavaScript"},{"color":"#2b7489","name":"TypeScript"},{"color":"#e34c26","name":"HTML"},{"color":"#563d7c","name":"CSS"},{"color":"#2c3e50","name":"Vue"}]},"description":"Build amazing native and progressive web apps with open web technologies. One app running on everything 🎉","licenseInfo":{"name":"Other"},"name":"ionic","updatedAt":"2018-11-05T11:22:38Z"},{"languages":{"nodes":[{"color":"#b07219","name":"Java"},{"color":"#438eff","name":"Objective-C"},{"color":"#00B4AB","name":"Dart"}]},"description":"Flutter codelab","licenseInfo":null,"name":"startup_namer","updatedAt":"2018-11-11T00:08:38Z"},{"languages":{"nodes":[{"color":"#f1e05a","name":"JavaScript"}]},"description":null,"licenseInfo":null,"name":"caniuse-embed-api","updatedAt":"2020-06-23T20:40:17Z"},{"languages":{"nodes":[{"color":"#e34c26","name":"HTML"},{"color":"#f1e05a","name":"JavaScript"},{"color":"#563d7c","name":"CSS"}]},"description":"Repository to follow along to Ghost PWA video series","licenseInfo":null,"name":"offline-first-tutorial","updatedAt":"2020-03-24T22:36:25Z"},{"languages":{"nodes":[{"color":"#e34c26","name":"HTML"},{"color":"#563d7c","name":"CSS"}]},"description":null,"licenseInfo":null,"name":"css","updatedAt":"2020-09-28T08:05:13Z"},{"languages":{"nodes":[]},"description":"Snippets of things I re-use but always forget exactly how to write it","licenseInfo":null,"name":"bits","updatedAt":"2020-11-12T19:37:08Z"},{"languages":{"nodes":[{"color":"#2b7489","name":"TypeScript"},{"color":"#f1e05a","name":"JavaScript"}]},"description":"A place where all speakers come together!","licenseInfo":{"name":"MIT License"},"name":"confcitizens","updatedAt":"2018-12-13T21:37:33Z"},{"languages":{"nodes":[{"color":"#e34c26","name":"HTML"}]},"description":"A page filled with common HTML elements to be used for testing purposes. Useful when building CSS systems for projects big and small.","licenseInfo":{"name":"MIT License"},"name":"html5-test-page","updatedAt":"2020-05-26T16:37:10Z"},{"languages":{"nodes":[{"color":"#f1e05a","name":"JavaScript"}]},"description":"Quickly view the alternative text of any image in the context menu. Simply right-click on an image.","licenseInfo":null,"name":"image-alt-quickview","updatedAt":"2020-04-13T00:57:44Z"},{"languages":{"nodes":[{"color":"#e34c26","name":"HTML"},{"color":"#f1e05a","name":"JavaScript"},{"color":"#563d7c","name":"CSS"}]},"description":"High quality vector logos for Nigerian companies","licenseInfo":{"name":"MIT License"},"name":"nigerialogos","updatedAt":"2020-05-26T16:36:52Z"},{"languages":{"nodes":[{"color":"#f1e05a","name":"JavaScript"}]},"description":"Blockchain Nanodegree Project 1 -  Create Your Own Private Blockchain","licenseInfo":null,"name":"nd1309-private-blockchain","updatedAt":"2020-03-12T08:57:49Z"},{"languages":{"nodes":[{"color":"#e34c26","name":"HTML"},{"color":"#f1e05a","name":"JavaScript"}]},"description":"Blockchain Nanodegree Project 2 - Decentralized Star Notary","licenseInfo":null,"name":"nd1309-star-notary","updatedAt":"2020-04-19T18:40:22Z"},{"languages":{"nodes":[{"color":"#f1e05a","name":"JavaScript"}]},"description":"Calculate if you're tax resident in the US using your i94 form","licenseInfo":null,"name":"us-substantial-presence-test-via-i94","updatedAt":"2019-08-20T21:20:47Z"},{"languages":{"nodes":[{"color":"#e34c26","name":"HTML"},{"color":"#f1e05a","name":"JavaScript"},{"color":"#563d7c","name":"CSS"}]},"description":"Blockchain Nanodegree Project 3 - Ethereum Dapp for Tracking Items through Supply Chain","licenseInfo":null,"name":"nd1309-supply-chain","updatedAt":"2020-06-14T07:14:56Z"},{"languages":{"nodes":[{"color":"#f1e05a","name":"JavaScript"},{"color":"#563d7c","name":"CSS"},{"color":"#e34c26","name":"HTML"}]},"description":"Blockchain Nanodegree Project 4 - Flight Surety Project","licenseInfo":{"name":"MIT License"},"name":"nd1309-flight-surety","updatedAt":"2020-10-14T08:11:51Z"},{"languages":{"nodes":[{"color":"#f1e05a","name":"JavaScript"},{"color":"#e34c26","name":"HTML"}]},"description":"Blockchain Nanodegree Capstone Project - Real Estate Marketplace","licenseInfo":null,"name":"nd1309-real-estate-marketplace","updatedAt":"2020-04-19T18:40:19Z"},{"languages":{"nodes":[{"color":"#f1e05a","name":"JavaScript"},{"color":"#e34c26","name":"HTML"},{"color":"#563d7c","name":"CSS"}]},"description":null,"licenseInfo":null,"name":"netlify-puppeteer-screenshot-demo","updatedAt":"2020-11-13T12:41:02Z"}]},"avatarUrl":"https://avatars3.githubusercontent.com/u/8677283?s=200\u0026u=e350a331a44b704f86f56dca07ee44f1bc5675bb\u0026v=4","bio":"Frontend Developer and User Interface Designer","websiteUrl":"https://www.ireaderinokun.com"}}};
        // let data = anotherOfflineResult.data.user;
        for(let each in data){
            updateDOM(each, data[each])
        }
        let intro = document.querySelector("#intro");
        intro.classList.add("disappear");
        setTimeout(function(){
            intro.style.display = "none";
        }, 1000);
    }).catch(console.log);
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
