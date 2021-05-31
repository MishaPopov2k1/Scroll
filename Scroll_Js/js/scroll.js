const navClassName = 'nav';
const navLinkClassName = 'nav-link';
const navLinkActiveClassName = 'nav-link-active';
const sectionClassName = 'section';

const navNode = document.querySelector(`.${navClassName}`);
const navLinksNodes = document.querySelectorAll(`.${navLinkClassName}`);
const navActiveLinksNode = document.querySelector(`.${navLinkClassName}`);
const sectionNodes = document.querySelectorAll(`.${sectionClassName}`);

let indexActiveLink = 0;
let scrollAnimationId;
let currentScroll = window.scrollY;

function changeNavActiveLink(newNavLinkNode) {
    for (let i = 0; i < navLinksNodes.length; i++) {
        navLinksNodes[i].classList.remove(navLinkActiveClassName);
    }
    newNavLinkNode.classList.add(navLinkActiveClassName);
}

changeNavActiveLink(navLinksNodes[indexActiveLink]);

navNode.addEventListener('click', (evt) => {
    evt.preventDefault();
    const linkNavNode = evt.target.closest('a');

    if (!linkNavNode) {
        return;
    }

    stopAnimationScroll();
    changeNavActiveLink(linkNavNode);

    currentScroll = window.scrollY;
    const newSectionName = linkNavNode.getAttribute('href').substring(1);
    const newSectionElement = document.getElementById(newSectionName);
    startAnimationScroll(newSectionElement.offsetTop);
});

window.addEventListener('scroll', () => {
    if (!scrollAnimationId) {
        setActiveLinkByScroll();
    }
})

function setActiveLinkByScroll() {
    const topSection = Array.from(sectionNodes).map((sectionNodes) => (
        sectionNodes.offsetTop
    ));

    let currentActiveIndex = 0;
    for (let i = 0; i < topSection.length; i++) {
        if (window.scrollY >= topSection[i]) {
            currentActiveIndex = i;
        }

        if (indexActiveLink!== currentActiveIndex) {
            indexActiveLink = currentActiveIndex;
            changeNavActiveLink(navLinksNodes[indexActiveLink])
        }

    }
}


function startAnimationScroll(newScrollY) {
    const deltaScroll = (newScrollY - currentScroll);

    currentScroll += deltaScroll * 0.15;
    window.scrollTo(0, currentScroll);

    if (Math.abs(deltaScroll) > 1) {
        scrollAnimationId = window.requestAnimationFrame(() =>
            startAnimationScroll(newScrollY));
    } else {
        window.scrollTo(0, newScrollY);
        stopAnimationScroll();
    }
}

function stopAnimationScroll() {
    window.cancelAnimationFrame(scrollAnimationId);
    scrollAnimationId = undefined;
}