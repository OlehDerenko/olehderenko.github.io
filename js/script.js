const fullname = document.querySelector('#fullname');
const email = document.querySelector('#email');
const message = document.querySelector('#message');

const form = document.querySelector('#form')
  const submit = (e) => {
  e.preventDefault()
  
  const form = {
    fullname: fullname.value,
    email:email.value,
    message: message.value
  }

  console.log(form)
}

form.addEventListener("submit",submit)

const burger = document.querySelector('.burger')
const menu = document.querySelector('.burger-menu');
const overlay = document.querySelector('.overlay');
const header = document.querySelector('.header');

const toggleMobileNavigation =  () => {
  burger.classList.toggle('active');
  menu.classList.toggle('active');
  overlay.classList.toggle('active');
  header.classList.toggle('active')
}

burger.addEventListener('click',toggleMobileNavigation)

const links = document.querySelectorAll('.burger-menu a')

links.forEach((link)=>{
  link.addEventListener('click',toggleMobileNavigation)
}) 
