const x = document.getElementById('login-container');

let userType = null;

function librarian(id) {
	x.style.overflow = "hidden";
	x.style.height = "350px";
	x.innerHTML = "<h2>"+id+"</h2> <form method='POST' action='/librarian'> <label>Username</label><br /><br /> <input type='text' name='username'><br /><br /><label>Password</label><br /><br /><input type='password' name='password'><br /><br /><br /><input type='submit'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type='button' onclick='back()' class='form-btns'>Back</button></form>";
	userType = id;
}
function user(id) {
	x.style.overflow = "hidden";
	x.style.height = "350px";
	x.innerHTML = "<h2>"+id+"</h2> <form method='POST' action='/customers'> <label>Username</label><br /><br /> <input type='text' name='username'><br /><br /><label>Password</label><br /><br /><input type='password' name='password'><br /><br /><br /><input type='submit'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type='button' onclick='back()' class='form-btns'>Back</button></form>";
	userType = id;
}
function back() {
	x.style.height = "100px";
	x.innerHTML = "<div id='btns'><button id='Librarian' onclick='librarian(id)'>Librarian</button>&nbsp;&nbsp;&nbsp;&nbsp;<button id='User' onclick='user(id)'>User</button></div>";
}