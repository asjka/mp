document.addEventListener('DOMContentLoaded', function () {
    const body = document.querySelector('body');
    
    
    // Check if body has class 'mp--home' and add event listeners to cards
    if (body.classList.contains('mp--home')) {
        const modalAppWrapper = document.getElementById('mp--app-modal-wrapper');
        const modalApp = document.getElementById('mp--app-modal');
        const appCards = document.querySelectorAll('.mp--app-card');
        
        
        appCards.forEach(card => {
            card.addEventListener('click', function (event) {
                event.preventDefault();
                showAppModal(this);
            });
        });
        
        
        // Event listener to close modal on clicking outside
        window.addEventListener('click', function (event) {
            if (event.target === modalAppWrapper) {
                closeAppModal();
            }
        });
    }
    
    
});




// Function to create list from attributes
function createListFromAttribute(attributeValue, firstItemText) {
    const items = attributeValue.split(',');
    const ul = document.createElement('ul');
    ul.appendChild(document.createElement('li')).textContent = firstItemText;
    items.forEach(item => {
        ul.appendChild(document.createElement('li')).textContent = item;
    });
    return ul;
}




// Function to close and clean up modal content
function closeAppModal() {
    modalAppWrapper.style.display = 'none';
    modalApp.querySelector('.mp--product-logo img').src = '';
    modalApp.querySelector('h4').textContent = '';
    modalApp.querySelector('header > p').textContent = '';
    modalApp.querySelector('.mp--rating > span').style.width = '0%';
    modalApp.querySelector('.mp--description').textContent = '';
    modalApp.querySelector('a').setAttribute('href', '#');
    modalApp.querySelector('.mp--modal-side-desktop').innerHTML = '';
    modalApp.querySelector('.mp--modal-side-mobile').innerHTML = '';
}




// Function to show modal and update content
function showAppModal(card) {
    const appLogo = card.querySelector('.mp--logo img').src;
    const appTitle = card.querySelector('h3').textContent;
    const appAuthor = card.querySelector('.mp--data').getAttribute('author');
    const appRating = card.querySelector('.mp--data').getAttribute('rating') + '%';
    const appDescription = card.querySelector('p').textContent;
    const appLink = card.getAttribute('href');

    modalApp.querySelector('.mp--product-logo img').src = appLogo;
    modalApp.querySelector('h4').textContent = appTitle;
    modalApp.querySelector('header > p').textContent = appAuthor;
    modalApp.querySelector('.mp--rating > span').style.width = appRating;
    modalApp.querySelector('.mp--description').textContent = appDescription;
    modalApp.querySelector('a').setAttribute('href', appLink);

    const data = card.querySelector('.mp--data');
    const modalSideDesktop = modalApp.querySelector('.mp--modal-side-desktop');
    const modalSideMobile = modalApp.querySelector('.mp--modal-side-mobile');

    // Clear previous lists and hide both sides
    modalSideDesktop.innerHTML = '';
    modalSideMobile.innerHTML = '';
    modalSideDesktop.style.display = 'none';
    modalSideMobile.style.display = 'none';

    // Determine which side to use
    const isDesktop = window.innerWidth > 800;
    const targetSide = isDesktop ? modalSideDesktop : modalSideMobile;
    let sideContentAdded = false;

    if (data.getAttribute('features')) {
        const featuresList = createListFromAttribute(data.getAttribute('features'), 'Features');
        targetSide.appendChild(featuresList);
        sideContentAdded = true;
    }

    if (data.getAttribute('categories')) {
        const categoriesList = createListFromAttribute(data.getAttribute('categories'), 'Categories');
        targetSide.appendChild(categoriesList);
        sideContentAdded = true;
    }

    if (data.getAttribute('release')) {
        const releaseList = document.createElement('ul');
        releaseList.appendChild(document.createElement('li')).textContent = 'Latest Release';
        releaseList.appendChild(document.createElement('li')).textContent = data.getAttribute('release');
        targetSide.appendChild(releaseList);
        sideContentAdded = true;
    }

    // Show the chosen side only if at least one content element was added
    if (sideContentAdded) {
        targetSide.style.display = 'block';
    }
    modalAppWrapper.style.display = 'flex';
}