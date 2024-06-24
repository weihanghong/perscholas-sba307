const validatePassword = (password) => {
    //at least 8 characters with at least 1 capital, 1 lowercase and 1 number
    let regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    return regexp.test(password)? 0:2;
}

const confirmPassword = (password, confirm) => {
    if (confirm === password) {
        return validatePassword(password);
    } else {
        return 1;
    }
}

const msgContainer = document.querySelector("#message-container");
const message = document.querySelector("#message");
const button = document.querySelector("#message-button");
const link = document.querySelector("#message-link");

const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

if(signupForm) {
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const password = signupForm["password"];
        const confirm = signupForm["confirm-password"];
        const validCode = confirmPassword(password.value, confirm.value);
        const container = document.querySelector("#signup-container");
        signupForm.style.setProperty("opacity", "0");
        container.style.setProperty("animation", "pop 0.7s");
        container.addEventListener("animationend", (e) => {
            signupForm.style.setProperty("display", "none");
            msgContainer.style.setProperty("display", "inline-flex");
            container.style.setProperty("animation", "appear .5s ease-out");
            switch (validCode) {
                case 0:
                    message.innerText = "Sign up success!";
                    link.innerText = "Return home";
                    link.href = "index.html";
                    break;
                case 1:
                    message.innerText = "Passwords don't match!";
                    link.innerText = "Try again";
                    link.href = "";
                    button.onclick = (e) => {
                        signupForm.style.setProperty("opacity", "1");
                        signupForm.style.setProperty("display", "block");
                        msgContainer.style.setProperty("display", "none");
                    }
                    break;
                case 2:
                    message.innerText = "Password needs to be at least 8 characters contain capital, lowercase, and number!";
                    link.innerText = "Try again";
                    link.href = "";
                    button.onclick = (e) => {
                        signupForm.style.setProperty("opacity", "1");
                        signupForm.style.setProperty("display", "block");
                        msgContainer.style.setProperty("display", "none");
                    }
                    break;
            }
        })
    });
} else if(loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const password = loginForm["password"];
        const validCode = validatePassword(password.value);
        console.log(password);
        console.log(validCode);
        const container = document.querySelector("#login-container");
        loginForm.style.setProperty("opacity", "0");
        container.style.setProperty("animation", "pop .7s");
        container.addEventListener("animationend", (e) => {
            loginForm.style.setProperty("display", "none");
            msgContainer.style.setProperty("display", "inline-flex");
            container.style.setProperty("animation", "appear .5s ease-out");
            if(validCode===0) {
                message.innerText = "Login successfully!";
                link.innerText = "Return home";
                link.href = "index.html";
            } else {
                message.innerText = "Password needs to be at least 8 characters contain capital, lowercase, and number!";
                link.innerText = "Try again";
                link.href = "";
                button.onclick = (e) => {
                    loginForm.style.setProperty("opacity", "1");
                    loginForm.style.setProperty("display", "block");
                    msgContainer.style.setProperty("display", "none");
                }
            }
        })
    })
}
let active = false;
const start = () => {
    const select = document.querySelector("#stage");
    let playground = document.querySelector("#playground");
    if(!playground) {
        playground = document.createElement("div");
        playground.id = "playground";
        const container = document.querySelector("#nav-container");
        container.appendChild(playground);
        const player = document.createElement("div");
        player.id = "player";
        player.addEventListener("animationend", (e) => {
            player.style.setProperty("animation", "");
        })
        document.addEventListener("keypress", (e) => {
            if(e.code === "Space") {
                player.style.setProperty("animation", "jump 0.7s ease-out");
            }
        })
        playground.appendChild(player);
        const tutorialText = document.createElement("div");
        tutorialText.classList.add("tutorial");
        tutorialText.innerText = "Press space to jump";
        tutorialText.style.setProperty("left", "45px");
        tutorialText.style.setProperty("top", "25px");
        playground.appendChild(tutorialText);
        const startText = document.createElement("div");
        startText.classList.add("tutorial");
        startText.innerText = "Click to start stage";
        startText.style.setProperty("right", "45px");
        startText.style.setProperty("top", "25px");
        playground.appendChild(startText);
        const startButton = document.createElement("div");
        startButton.classList.add("tutorial-start", "tutorial");
        startButton.style.setProperty("right", "80px");
        startButton.style.setProperty("top", "50px");
        startButton.onclick = (e) => {
            const stage = select.value;
            if(!active) {
                active = true;
                startButton.style.setProperty("opacity", ".2");
                switch(stage) {
                    case "1":
                        stage1(playground, startButton);
                        break;
                    case "2":
                        stage2(playground, startButton);
                        break;
                    case "3":
                        stage3(playground, startButton);
                        break;
                }
            }
        }
        playground.appendChild(startButton);
    }
}

const stage1 = (playground, startButton) => {
    const spawn = document.createElement("div");
    spawn.id = "spawn";
    playground.appendChild(spawn);
    const pool = [30, 60]; //Collection
    for (let i = 0; i < 10; i++) {
        let x = document.createElement("div");
        x.classList.add("enemy");
        x.style.setProperty("animation", "moveLeftAndSpin 1.5s "+i*800+"ms linear");
        let r = Math.floor(Math.random()*2);
        x.style.setProperty("width", pool[r]+"px");
        x.addEventListener("animationend", (e) => {x.remove()});
        spawn.appendChild(x);
        if(i===9) {
            x.addEventListener("animationend", (e) => {
                spawn.remove();
                active = false;
                startButton.style.setProperty("opacity", "1");
            });
        }
    }
}

const stage2 = (playground, startButton) => {
    const spawn = document.createElement("div");
    spawn.id = "spawn";
    playground.appendChild(spawn);
    for(let i = 0; i < 15; i++) {
        let x = document.createElement("div");
        x.classList.add("enemy");
        x.style.setProperty("width", "50px");
        x.style.setProperty("animation", "moveLeftAndSpin 1.5s "+i*500+"ms linear");
        x.addEventListener("animationend", (e) => {x.remove()});
        if(i%2===1) {
            x.style.setProperty("bottom", "100px");
        }
        spawn.appendChild(x);
        if(i===14) {
            x.addEventListener("animationend", (e) => {
                spawn.remove();
                active = false;
                startButton.style.setProperty("opacity", "1");
            });
        }
    }
}

const stage3 = (playground, startButton) => {
    const spawn = document.createElement("div");
    spawn.id = "spawn";
    playground.appendChild(spawn);
    spawn.style.setProperty("animation", "upDown 500ms infinite linear alternate");
    for (let i = 0; i < 8; i++) {
        let x = document.createElement("div");
        x.classList.add("enemy");
        x.style.setProperty("animation", "moveLeftAndSpin 2s "+i+"s linear");
        x.addEventListener("animationend", (e) => {x.remove()});
        spawn.appendChild(x);
        if(i===7) {
            x.addEventListener("animationend", (e) => {
                spawn.remove();
                active = false;
                startButton.style.setProperty("opacity", "1");
            });
        }
    }
}