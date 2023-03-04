async function Signup() {
    console.log("Hii");
    const name = document.getElementById('Sname').value;
    const pass = document.getElementById('Spassword').value;
    if (name == "" || pass == "") {
        alert("Enter Full details");
    } else {
        const res = await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify({
                name,
                pass
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        console.log(data, "lll", data.msg);
        if (data.msg == "Sucess") {
            sessionStorage.setItem("name", name);
            location.href = "/game";
        } else {
            alert(data.msg);
        }
    }


}

async function Login() {
    console.log('btn call');
    const name = document.getElementById('Lname').value;
    const pass = document.getElementById('Lpassword').value;
    if (name == "" || pass == "") {
        alert("Enter Full details");
    } else {
        const res = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({
                name,
                pass
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        console.log(data.msg);
        if (data.msg == 'login') {
            sessionStorage.setItem("name", name);
            location.href = "/game";

        } else if (data.msg == 'no') {
            alert('wrong credentials');
        } else {
            alert('Sorry Try Again');
        }
    }
}