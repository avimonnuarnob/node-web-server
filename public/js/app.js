const weatherForm = document.querySelector('button')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

if (weatherForm) {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition()
    recognition.interimResults = true

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('')
        search.value = transcript
    })

    recognition.start()

    recognition.addEventListener('end', recognition.start)

    weatherForm.addEventListener('click', (e) => {
        e.preventDefault()
        messageOne.textContent = 'Loading....'
        messageTwo.textContent = ''
      
        const location = search.value

        fetch('/weather?address=' + location).then((response) => {
            
            response.json().then((data) => {
                if (data.error) {
                  return messageOne.textContent = data.error
                }
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                if(data.eatKacchi === true) {
                    messageThree.textContent = "It's a Good Day To Have a Plate Of Kacchi!"
                }
            })
        })

    })
}