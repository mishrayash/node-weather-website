

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageone=document.querySelector('#message1')
const messagetwo=document.querySelector('#message2')

// messageone.textContent

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageone.textContent='Loading...'
    messagetwo.textContent=''
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageone.textContent=data.error
            // console.log(data.error)
        }
        else{
            messageone.textContent=data.location
            messagetwo.textContent=data.forecast
            // console.log(data.location)
            // console.log(data.forecast)

        }
    })
})

    console.log(location)
})

console.log('Yash')