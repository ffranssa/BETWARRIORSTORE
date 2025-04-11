const forms = document.querySelector(".forms"),
      pwShowHide = document.querySelectorAll(".eye-icon"),
      links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        
        pwFields.forEach(password => {
            if(password.type === "password"){
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })
        
    })
})      

links.forEach(link => {
    link.addEventListener("click", e => {
       e.preventDefault(); //preventing form submit
       forms.classList.toggle("show-signup");
    })
})


        function iniciarSesion(){
            const formularioInicioSesion = document.getElementById('loginForm');
            const apodo = formularioInicioSesion.querySelector('#apodo').value;
            const contra = formularioInicioSesion.querySelector('#contra').value;
        }

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apodo,
                contrasena
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.authenticated) {
                window.location.href = '/index.html';
            }   else {
                const mensajeError = document.getElementById('mensajeError');
                mensajeError.textContent = 'El usuario no existe o las credenciales ingresadas son incorrectas';
            }
        })
        .catch(error => {
            console.error('Error al iniciar sesion: ' + error);
        });
