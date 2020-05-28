const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const rol = document.getElementById('rol');

form.addEventListener('submit', function(event){
    event.preventDefault();
    let users = Array(
        {
            username: username.value,
            password: password.value
        }
    );
    localStorage.setItem('user', JSON.stringify(users));
    location.href ="./views/home.html"
});