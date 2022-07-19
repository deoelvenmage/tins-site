const url = "https://api.openweathermap.org/data/3.0/onecall?lat=39&lon=-77&units=Imperial&appid=6a4d06e769f51aa7a4f0a6138ef208c9";

const day1 = document.querySelector('#day1');
const day2 = document.querySelector('#day2');
const day3 = document.querySelector('#day3');

const currentTemp = document.querySelector('#temperature'); 
const conditions = document.querySelector('#conditions');
const humidity = document.querySelector('#humidity');

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const iconurl = `https://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`;
    const weatherIcon = document.createElement('img');
    weatherIcon.setAttribute('src', iconurl);
    weatherIcon.setAttribute('alt', data.daily[0].weather[0].description);
    const temp = document.createElement('p');
    temp.textContent = `${Math.round(data.daily[0].temp.day)} °F`;
    day1.appendChild(weatherIcon);
    day1.appendChild(temp);

    const iconurl2 = `https://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`;
    const weatherIcon2 = document.createElement('img');
    weatherIcon2.setAttribute('src', iconurl2);
    weatherIcon2.setAttribute('alt', data.daily[1].weather[0].description);
    const temp2 = document.createElement('p');
    temp2.textContent = `${Math.round(data.daily[1].temp.day)} °F`;
    day2.appendChild(weatherIcon2);
    day2.appendChild(temp2);

    const iconurl3 = `https://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png`;
    const weatherIcon3 = document.createElement('img');
    weatherIcon3.setAttribute('src', iconurl3);
    weatherIcon3.setAttribute('alt', data.daily[2].weather[0].description);
    const temp3 = document.createElement('p');
    temp3.textContent = `${Math.round(data.daily[2].temp.day)} °F`;
    day3.appendChild(weatherIcon3);
    day3.appendChild(temp3);
    

    currentTemp.textContent = `${Math.round(data.current.temp)} °F`;
    let desc = data.current.weather[0].description.split(" ");
        for (let i = 0; i < desc.length; i++) {
            desc[i] = desc[i].charAt(0).toUpperCase() + desc[i].slice(1);
        }
        desc = desc.join(" ");
    conditions.textContent = desc;
    humidity.textContent = `${data.current.humidity}`;

    if (data.alerts.length != 0) {
        const div = document.createElement('div');
        const alert = document.createElement('p');
        const button = document.createElement('button');

        alert.style.textAlign = 'center';
        alert.style.padding = '5px';
        alert.style.color = 'white'

        div.style.backgroundColor = '#34435E';
        div.style.width = '100%';
        div.style.display = 'flex';
        div.style.justifyContent = 'center'
        div.style.alignItems = 'center'

        button.textContent = "Dismiss"
        button.style.height = "20px;"
        button.addEventListener("click", () => {
            alert.style.display = 'none';
            button.style.display = 'none';
        })

        let text = 'Notice: ';
        data.alerts.forEach(item => {
            text += `${item.event}, `
        });
        text += "near Bethesda."
        alert.textContent = text;
        div.appendChild(alert)
        div.appendChild(button)

        const header = document.querySelector('header');
        const body = document.querySelector('body');
        body.insertBefore(div, header);
    }
});