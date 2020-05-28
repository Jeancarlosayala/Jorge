const user = document.getElementById('usernav');
const close = document.getElementById('close');

let username = JSON.parse(localStorage.getItem('user'));

if(username != null){
    user.innerHTML = '<a class="nav-link" href="#" id="usernav">'+ username[0].username +'</a>'
}else{
    location.href = '../index.html'
}

close.addEventListener('click', function(){
    location.href = '../index.html';
});