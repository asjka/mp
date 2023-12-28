// Global scope for shared variables
let modalAppWrapper, modalApp;




document.addEventListener('DOMContentLoaded', function () {
    const body = document.querySelector('body');

    // Initialize modal elements
    modalAppWrapper = document.getElementById('mp--app-modal-wrapper');
    modalApp = document.getElementById('mp--app-modal');

    if (body.classList.contains('mp--home')) {
        // Event delegation for app cards
        body.addEventListener('click', function (event) {
            const card = event.target.closest('.mp--app-card');
            if (card) {
                event.preventDefault();
                showAppModal(card);
                
            }
        });

        // Event listener to close modal on clicking outside
        window.addEventListener('click', function (event) {
            if (event.target === modalAppWrapper) {
                closeAppModal();
                document.body.classList.remove('mp--app-modal-open');
                
            }
        });
    }
});




// Function to create list from attributes
function createListFromAttribute(attributeValue, firstItemText) {
    if (!attributeValue) return null;

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
    if (!modalAppWrapper || !modalApp) return;

    document.body.classList.remove('mp--app-modal-open');

    modalAppWrapper.style.display = 'none';
    modalApp.querySelectorAll('.mp--product-logo img, h4, header > p, .mp--description, a, .mp--modal-side-desktop, .mp--modal-side-mobile').forEach(el => {
        if (el.tagName === 'IMG') {
            el.src = '';
        } else if (el.tagName === 'A') {
            el.setAttribute('href', '#');
        } else {
            el.textContent = '';
        }
    });
    modalApp.querySelector('.mp--rating > span').style.width = '0%';
    modalApp.querySelector('.mp--product-logo').style.backgroundColor = '';
}

// Function to show modal and update content
function showAppModal(card) {
    if (!card || !modalApp || !modalAppWrapper) return;

    document.body.classList.add('mp--app-modal-open');

    const appLogoBg = card.querySelector('.mp--logo').style.backgroundColor;
    const appLogo = card.querySelector('.mp--logo img').src;
    const appTitle = card.querySelector('h3').textContent;
    const appAuthor = card.querySelector('.mp--data').getAttribute('author');
    const appRating = card.querySelector('.mp--data').getAttribute('rating') + '%';
    const appDescription = card.querySelector('p').textContent;
    const appLink = card.getAttribute('href');

    modalApp.querySelector('.mp--product-logo').style.backgroundColor = appLogoBg;
    modalApp.querySelector('.mp--product-logo img').src = appLogo;
    modalApp.querySelector('h4').textContent = appTitle;
    modalApp.querySelector('header p').textContent = appAuthor;
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
    const isDesktop = window.innerWidth > 768;
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

    modalAppWrapper.style.display = 'inline-flex';

    document.getElementById('mp--modal-close').addEventListener('click', closeAppModal);
    
}








// Search 

/*function getSearchParams(key) {
    var searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(key);
}

function performSearch(searchText) {
    var sections = document.querySelectorAll('section');

    sections.forEach(function(section) {
        var cards = section.querySelectorAll('.mp--app-card');
        var allCardsHidden = true;

        cards.forEach(function(card) {
            var cardText = card.querySelector('h3').textContent.toLowerCase();
            if (cardText.includes(searchText)) {
                card.classList.remove('hide');
                allCardsHidden = false;
            } else {
                card.classList.add('hide');
            }
        });

        if (allCardsHidden) {
            section.classList.add('hide');
        } else {
            section.classList.remove('hide');
        }
    });

    var button = document.getElementById('mp--search').querySelector('button');
    button.classList.remove('mp--search_find');
    button.classList.add('mp--search_reset');
}

document.addEventListener('DOMContentLoaded', function() {
    var searchParam = getSearchParams('search');
    if (searchParam) {
        document.getElementById('mp--search').querySelector('input').value = searchParam;
        performSearch(searchParam.toLowerCase());
    }

    document.getElementById('mp--search').querySelector('button').addEventListener('click', function() {
        var button = this;

        if (button.classList.contains('mp--search_find')) {
            var searchText = document.getElementById('mp--search').querySelector('input').value.toLowerCase();
            if (searchText !== '') {
                performSearch(searchText);
            }
        } else if (button.classList.contains('mp--search_reset')) {
            document.getElementById('mp--search').querySelector('input').value = '';
            var allCards = document.querySelectorAll('.mp--app-card');
            var allSections = document.querySelectorAll('section');

            allCards.forEach(function(card) {
                card.classList.remove('hide');
            });

            allSections.forEach(function(section) {
                section.classList.remove('hide');
            });

            button.classList.remove('mp--search_reset');
            button.classList.add('mp--search_find');
        }
    });

    
});*/

function getSearchParams(key) {
    var searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(key);
};

function performSearch(searchText) {
    var sections = document.querySelectorAll('section');
    var messageContainer = document.getElementById('messageContainer');

    var allCardsHidden = true; // Declare allCardsHidden outside the loop

    sections.forEach(function(section) {
      var cards = section.querySelectorAll('.mp--app-card');

      cards.forEach(function(card) {
        var cardText = card.querySelector('h3').textContent.toLowerCase();
        if (cardText.includes(searchText)) {
          card.classList.remove('hide');
          allCardsHidden = false;
        } else {
          card.classList.add('hide');
        }
      });

      if (allCardsHidden) {
        section.classList.add('hide');
      } else {
        section.classList.remove('hide');
      }
    });

    var button = document.getElementById('mp--search').querySelector('button');
    button.classList.remove('mp--search_find');
    button.classList.add('mp--search_reset');

    // Show/hide the "search not found" message based on the search outcome
    if (allCardsHidden) {
      // Create the message element if it doesn't exist
      if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.id = 'messageContainer';
        document.querySelector('.mp--main').appendChild(messageContainer); // Append to .mo-main
      }

      // Set the message text
      messageContainer.innerHTML = '<h5>Results not found.</h5><p>We could not find any project named <b>"' + searchText + '"</b>.</p><a class="mp--btn" href="#" type="primary" id="goBackLink">Go Back</a>';

      // Event listener for the "Go Back" link click
      var goBackLink = document.getElementById('goBackLink');
      goBackLink.addEventListener('click', function(event) {
        event.preventDefault();
        // Clear the search input
        document.getElementById('mp--search').querySelector('input').value = '';
        // Bring back all hidden elements
        var allCards = document.querySelectorAll('.mp--app-card');
        var allSections = document.querySelectorAll('section');

        allCards.forEach(function(card) {
          card.classList.remove('hide');
        });

        allSections.forEach(function(section) {
          section.classList.remove('hide');
        });

        // Remove the message element
        messageContainer.parentNode.removeChild(messageContainer);

        // Change the button class back to mp--search_find
        button.classList.remove('mp--search_reset');
        button.classList.add('mp--search_find');
      });

    } else {
      // Remove the message element if it exists
      if (messageContainer) {
        messageContainer.parentNode.removeChild(messageContainer);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    var searchParam = getSearchParams('search');
    if (searchParam) {
      document.getElementById('mp--search').querySelector('input').value = searchParam;
      performSearch(searchParam.toLowerCase());
    }

    var searchInput = document.getElementById('mp--search').querySelector('input');
    var searchButton = document.getElementById('mp--search').querySelector('button');

    // Event listener for the "Enter" key on the input field
    searchInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        var searchText = searchInput.value.toLowerCase();
        if (searchText !== '') {
          performSearch(searchText);
        }
      }
    });

    // Event listener for the search button click
    searchButton.addEventListener('click', function() {
      var button = this;
      var searchText = searchInput.value.toLowerCase();
      
      if (button.classList.contains('mp--search_find') && searchText !== '') {
        performSearch(searchText);
      } else if (button.classList.contains('mp--search_reset')) {
        searchInput.value = '';
        var allCards = document.querySelectorAll('.mp--app-card');
        var allSections = document.querySelectorAll('section');

        allCards.forEach(function(card) {
          card.classList.remove('hide');
        });

        allSections.forEach(function(section) {
          section.classList.remove('hide');
        });

        button.classList.remove('mp--search_reset');
        button.classList.add('mp--search_find');
      }
    });
  });
























