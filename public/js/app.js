console.log('Client side javascript is running')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const pencarian = (location) => {
    messageOne.textContent = 'Loading ....'
    messageTwo.textContent = ''
    
    fetch(`http://localhost:3000/weather?location=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
}

const searchWeather = document.querySelector('form')
const search = document.querySelector('input')

searchWeather.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    pencarian(location)
})