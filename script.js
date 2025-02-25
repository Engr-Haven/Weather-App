let form = document.querySelector(`#city-form`)
let inputField = document.querySelector(`#input-field`)
let weatherInfoContainer = document.querySelector(`#weather-info`)
let bgWallpaper = document.querySelector(`#background-img-container`)
let errorMSg = document.querySelector(`#err-msg`)


form.addEventListener(`submit`, function(e){
    e.preventDefault()
    let userInput = inputField.value.trim()

    const city = userInput
    const API_KEY = `5903a11e5c66f2bcfbd4a06db5b87ede`
    const endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

    const userRequest = new XMLHttpRequest()
    userRequest.open(`GET`, endPoint, true)
    userRequest.send()
    userRequest.onreadystatechange = function(){
        if(userRequest.readyState === 4 && userRequest.status === 200){
            let userResult = JSON.parse(userRequest.responseText)
            inputField.value = ``
            weatherInfoContainer.innerHTML = ``

            // errorMSg.style.display = `none`
            errorMSg.style.visibility = `hidden`

            let temperatureKelvin = userResult.main.temp
            let tempCelcius = Math.floor(temperatureKelvin - 273.15)
            let cityName = userResult.name
            let countryName = userResult.sys.country
            let pressureCity = userResult.main.pressure
            let humidCity = userResult.main.humidity
            let feelsLike = userResult.main.feels_like
            let feelsCelciusLike = Math.floor(feelsLike - 273.15)
            let windGotten = userResult.wind.speed
            let windConverted = Math.floor(windGotten * 2.23694)


            if(tempCelcius >= -10 && tempCelcius <= 2){
                bgWallpaper.style.backgroundImage = `url(./Elements/snowy.jpg)`
            }else if(tempCelcius >= 10 && tempCelcius <= 25){
                bgWallpaper.style.backgroundImage = `url(./Elements/rainy.jpg)`
            }else if(tempCelcius >= 0 && tempCelcius <= 25){
                bgWallpaper.style.backgroundImage = `url(./Elements/cloudy.jpg)`
            }else if(tempCelcius >= 15 && tempCelcius <= 40){
                bgWallpaper.style.backgroundImage = `url(./Elements/sunny.jpg)`
            }


            let countryAndCityContainer = document.createElement(`div`)
            countryAndCityContainer.classList.add(`country-and-city`)

            let cityInputedContainerDiv = document.createElement(`div`)
            cityInputedContainerDiv.classList.add(`city`)

            let inputedCities = document.createElement(`h3`)
            inputedCities.textContent = cityName.toUpperCase()

            let countryContainer = document.createElement(`div`)
            countryContainer.classList.add(`country`)

            let gottenCountry = document.createElement(`h3`)
            gottenCountry.textContent = countryName

            let temperatureRender = document.createElement(`div`)
            temperatureRender.classList.add(`temp-deg`)

            let actualTemperature = document.createElement(`h1`)
            actualTemperature.textContent = tempCelcius

            let degreeCelsius = document.createElement(`h3`)
            degreeCelsius.textContent = `°C`


            let otherParametersContainer = document.createElement(`div`)
            otherParametersContainer.classList.add(`other-parameters`)

            let pressureContainer = document.createElement(`div`)
            pressureContainer.classList.add(`pressure`)
            let pressureWord = document.createElement(`h3`)
            pressureWord.textContent = `Pressure`
            let pressureGotten = document.createElement(`h5`)
            pressureGotten.textContent = `${pressureCity} hPa`

            let humidityContainer = document.createElement(`div`)
            humidityContainer.classList.add(`humidity`)
            let humidityWord = document.createElement(`h3`)
            humidityWord.textContent = `Humidity`
            let humidityGotten = document.createElement(`h5`)
            humidityGotten.textContent = `${humidCity}%`

            let feelsLikeContainer = document.createElement(`div`)
            feelsLikeContainer.classList.add(`feels-like`)
            let feelsLikeWord = document.createElement(`h3`)
            feelsLikeWord.textContent = `Feels Like`
            let feelsLikeGotten = document.createElement(`h5`)
            feelsLikeGotten.textContent = `${feelsCelciusLike}°`

            let windContainer = document.createElement(`div`)
            windContainer.classList.add(`wind`)
            let windWord = document.createElement(`h3`)
            windWord.textContent = `Wind`
            let windSpeed = document.createElement(`h5`)
            windSpeed.textContent = `${windConverted} mph`

            // Append >>>
            cityInputedContainerDiv.append(inputedCities)
            countryAndCityContainer.append(cityInputedContainerDiv)
            weatherInfoContainer.append(countryAndCityContainer)

            countryContainer.append(gottenCountry)
            countryAndCityContainer.append(countryContainer)
            weatherInfoContainer.append(countryAndCityContainer)

            temperatureRender.append(actualTemperature)
            temperatureRender.append(degreeCelsius)
            weatherInfoContainer.append(temperatureRender)


            pressureContainer.append(pressureWord, pressureGotten)
            otherParametersContainer.append(pressureContainer)
            weatherInfoContainer.append(otherParametersContainer)

            humidityContainer.append(humidityWord, humidityGotten)
            otherParametersContainer.append(humidityContainer)
            weatherInfoContainer.append(otherParametersContainer)

            feelsLikeContainer.append(feelsLikeWord, feelsLikeGotten)
            otherParametersContainer.append(feelsLikeContainer)
            weatherInfoContainer.append(otherParametersContainer)

            windContainer.append(windWord, windSpeed)
            otherParametersContainer.append(windContainer)
            weatherInfoContainer.append(otherParametersContainer)

        }else{
            errorMSg.style.visibility = `visible`
        }
    }
})

