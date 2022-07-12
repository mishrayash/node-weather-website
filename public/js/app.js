

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageone=document.querySelector('#message1')
const messagetwo=document.querySelector('#message2')

// messageone.textContent

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageone.textContent='Loading...'
    document.getElementById("message1").style.color="black";

    messagetwo.textContent=''
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            document.getElementById("message1").style.color="red";
            messageone.textContent=data.error

            // console.log(data.error)
        }
        else{
            document.getElementById("message1").style.color="black";
            document.getElementById("message2").style.color="black";


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