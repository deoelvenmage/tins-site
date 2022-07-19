const src = "./src/temples.json";
fetch(src)
.then( response => response.json() )
.then( data => {
    const temples = data['temples'];
    temples.forEach(displayTemple);
});

const directory = document.querySelector("#temple-directory")

function displayTemple(temple) {
    let card = document.createElement('section');
    let name = document.createElement('h2');
    let imagediv = document.createElement('div');
    let image = document.createElement('img');
    let address = document.createElement('p');
    let contactinfo = document.createElement('p');
    let status = document.createElement('p');
    let services = document.createElement('p');
    let closures = document.createElement('h3');
    let closurelist = document.createElement('ul');
    let history = document.createElement('h3');
    let historylist = document.createElement('ul');

    name.textContent = `${temple.name}`;
    image.setAttribute('src', `${temple.image}`);
    image.setAttribute('alt', `temple image for ${temple.name}`);
    imagediv.setAttribute('class', 'temple-image-container');
    address.textContent = `${temple.address}`;
    contactinfo.textContent = `${temple.telephone} | ${temple.email}`;
    let serviceText = "Services: "
    for (let i = 0; i < temple.services.length; i++) {
        serviceText += `${temple.services[i]}`;
        if (i < temple.services.length - 1) {
            serviceText += ", ";
        }
    }
    services.textContent = serviceText;
    status.textContent = `Status: ${temple.status}`;
    status.style.fontWeight = "bold"
    closures.textContent = "Closures: ";
    for (let i = 0; i < temple.closures.length; i++) {
        let closure = document.createElement('li');
        let date = document.createElement('p');
        date.textContent = temple.closures[i];
        closure.appendChild(date);
        closurelist.appendChild(closure);
    }
    history.textContent = "History: ";
    for (let i = 0; i < temple.history.length; i++) {
        let occurence = document.createElement('li');
        let date = document.createElement('p');
        date.textContent = temple.history[i];
        occurence.appendChild(date);
        historylist.appendChild(occurence);
    }

    card.appendChild(name);
    imagediv.appendChild(image)
    card.appendChild(imagediv);
    card.appendChild(address);
    card.appendChild(contactinfo);
    card.appendChild(services);
    card.appendChild(status);
    card.appendChild(closures);
    card.appendChild(closurelist);
    card.appendChild(history);
    card.appendChild(historylist);

    let likebutton = document.createElement('button')
    let like = document.createElement('img')
    likebutton.setAttribute('class', 'like-button')
    if (window.localStorage.getItem(`${temple.name}`)) {
        like.setAttribute('src', './images/heart-full.png');
    }
    else {
        like.setAttribute('src', './images/heart-clear.png');
    }
    image.setAttribute('alt', `like icon`);
    likebutton.addEventListener("click", () => {
        if (window.localStorage.getItem(`${temple.name}`)) {
            like.setAttribute('src', './images/heart-clear.png');
            window.localStorage.removeItem(`${temple.name}`)
        }
        else {
            like.setAttribute('src', './images/heart-full.png');
            window.localStorage.setItem(`${temple.name}`, 'liked')
        }
    })
    likebutton.append(like)
    card.appendChild(likebutton)

    card.setAttribute('class', 'temple-card')
    directory.appendChild(card);
}