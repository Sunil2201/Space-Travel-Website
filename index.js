// Navigation
const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");
navToggle.addEventListener("click",()=>{
    const visibility = nav.getAttribute("data-visible");
    if(visibility === "false"){
        nav.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expanded", true);
    } else{
        nav.setAttribute("data-visible",false);
        navToggle.setAttribute("aria-expanded", false);
    }
})

//Tabs 
const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener("keydown",changeTabFocus);

tabs.forEach((tab)=>{
    tab.addEventListener('click',changeTabPanel)
})

let tabFocus = 0;
function changeTabFocus(event){
    const keydownLeft = 37;
    const keydownRight = 39;

    //Change the tabindex of the current tab to -1
    if(event.keyCode === keydownLeft || event.keyCode === keydownRight){
        tabs[tabFocus].setAttribute("tabindex",-1);
        // If the right key is pushed, move to the next tab on the right 
        if(event.keyCode === keydownRight){
            tabFocus++;
            if(tabFocus >= tabs.length){
                tabFocus = 0;
            }
        }
        // If the left key is pushed, move to the next tab on the left
        else if(event.keyCode === keydownLeft){
            tabFocus--;
            if(tabFocus < 0){
                tabFocus = tabs.length - 1;
            }
        }
    }
    
    

    tabs[tabFocus].setAttribute("tabindex",0);
    tabs[tabFocus].focus();
}

function changeTabPanel(event){
    const targetTab = event.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");

    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;

    tabContainer
            .querySelector('[aria-selected="true"]')
            .setAttribute("aria-selected",false);

    targetTab.setAttribute("aria-selected",true);

    mainContainer
            .querySelectorAll('[role="tabpanel"]')
            .forEach((panel)=>panel.setAttribute("hidden", true));

    mainContainer.querySelector([`#${targetPanel}`]).removeAttribute('hidden');

    mainContainer
            .querySelectorAll('picture')
            .forEach((picture) => picture.classList.add("hidden"));


    mainContainer.querySelector([`#${targetImage}`]).classList.remove('hidden');
    
    
    
}