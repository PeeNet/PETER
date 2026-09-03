/* =====================================================
   PETER AMPOMAH PORTFOLIO
   Main JavaScript
===================================================== */


/* ===============================
   MOBILE NAVIGATION
================================ */

const navToggle =
    document.getElementById("nav-toggle");

const navMenu =
    document.getElementById("nav-menu");


navToggle.addEventListener("click", () => {

    const open =
        navMenu.classList.toggle("open");

    navToggle.setAttribute(
        "aria-expanded",
        String(open)
    );

    navToggle.setAttribute(
        "aria-label",
        open
            ? "Close navigation"
            : "Open navigation"
    );

});


document
    .querySelectorAll(".nav-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            navToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });



/* ===============================
   DARK / LIGHT MODE
================================ */

const themeToggle =
    document.getElementById("theme-toggle");


const savedTheme =
    localStorage.getItem(
        "portfolio-theme"
    );


if (savedTheme === "light") {

    document.documentElement
        .dataset.theme = "light";

}


updateThemeIcon();


themeToggle.addEventListener(
    "click",
    () => {

        const isLight =
            document.documentElement
                .dataset.theme === "light";


        if (isLight) {

            delete document
                .documentElement
                .dataset.theme;

            localStorage.setItem(
                "portfolio-theme",
                "dark"
            );

        } else {

            document.documentElement
                .dataset.theme = "light";

            localStorage.setItem(
                "portfolio-theme",
                "light"
            );

        }


        updateThemeIcon();

    }
);


function updateThemeIcon() {

    themeToggle.textContent =
        document.documentElement
            .dataset.theme === "light"
            ? "☀"
            : "☾";

}



/* ===============================
   HEADER + SCROLL PROGRESS
================================ */

const header =
    document.querySelector(".site-header");

const progressBar =
    document.getElementById("progress-bar");


window.addEventListener(
    "scroll",
    () => {

        header.classList.toggle(
            "scrolled",
            window.scrollY > 20
        );


        const max =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        const progress =
            max > 0
                ? (window.scrollY / max) * 100
                : 0;


        progressBar.style.width =
            `${progress}%`;

    },
    {
        passive: true
    }
);



/* ===============================
   TYPING EFFECT
================================ */

const roles = [

    "Information Technology Graduate",

    "Web Developer",

    "IT Support Enthusiast",

    "Networking Enthusiast",

    "Technology Problem Solver"

];


const typedRole =
    document.getElementById(
        "typed-role"
    );


let roleIndex = 0;

let charIndex = 0;

let deleting = false;


function typeRole() {

    const role =
        roles[roleIndex];


    if (deleting) {

        charIndex--;

        typedRole.textContent =
            role.substring(
                0,
                charIndex
            );

    } else {

        charIndex++;

        typedRole.textContent =
            role.substring(
                0,
                charIndex
            );

    }


    if (
        !deleting &&
        charIndex >= role.length
    ) {

        deleting = true;

        setTimeout(
            typeRole,
            1500
        );

        return;

    }


    if (
        deleting &&
        charIndex <= 0
    ) {

        deleting = false;

        roleIndex =
            (roleIndex + 1) %
            roles.length;

        charIndex = 0;

    }


    setTimeout(
        typeRole,
        deleting ? 45 : 75
    );

}


typeRole();



/* ===============================
   SCROLL REVEAL
================================ */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("visible");


                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        observer.observe(element);

    });



/* ===============================
   PORTFOLIO ASSISTANT
================================ */

const chatForm =
    document.getElementById(
        "chat-form"
    );


const chatInput =
    document.getElementById(
        "chat-input"
    );


const chatMessages =
    document.getElementById(
        "chat-messages"
    );



const answers = [

    {
        keys: [
            "project",
            "projects",
            "built",
            "system"
        ],

        answer:
            "Peter's featured projects include a Nurses' Attendance System, a Document Filter Web App, and a Graphic Design Portfolio. The attendance project focuses on attendance, leave requests and shift scheduling."
    },


    {
        keys: [
            "skill",
            "skills",
            "technology",
            "tech",
            "code"
        ],

        answer:
            "Peter's skills include HTML, CSS, JavaScript, PHP, MySQL, hardware/software troubleshooting, networking support, Photoshop and Illustrator."
    },


    {
        keys: [
            "experience",
            "internship",
            "work"
        ],

        answer:
            "Peter completed a Networking Internship at Bui Power Authority from October–December 2024 and a Hardware & Software Internship at Leyaata Hospital from September–November 2023."
    },


    {
        keys: [
            "education",
            "degree",
            "school",
            "graduate"
        ],

        answer:
            "Peter completed a four-year Information Technology programme and has a practical interest in web development, networking, IT support and technology solutions."
    },


    {
        keys: [
            "contact",
            "email",
            "phone",
            "hire"
        ],

        answer:
            "You can reach Peter through the contact form on this page, by email, or by phone at +233 547 369 977."
    }

];



function addMessage(
    text,
    type
) {

    const message =
        document.createElement(
            "div"
        );


    message.className =
        `chat-message ${type}`;


    message.textContent = text;


    chatMessages.appendChild(
        message
    );


    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}



function getAnswer(input) {

    const text =
        input.toLowerCase();


    const found =
        answers.find(
            item =>
                item.keys.some(
                    key =>
                        text.includes(key)
                )
        );


    if (found) {

        return found.answer;

    }


    return `
        I can tell you about Peter's
        projects, skills, experience,
        education or contact details.
        Try asking about one of those.
    `;

}



function submitChat(question) {

    const value =
        question.trim();


    if (!value) {

        return;

    }


    addMessage(
        value,
        "user"
    );


    setTimeout(
        () => {

            addMessage(
                getAnswer(value),
                "bot"
            );

        },
        300
    );

}



chatForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        submitChat(
            chatInput.value
        );


        chatInput.value = "";

    }
);



/* QUICK QUESTIONS */

document
    .querySelectorAll(
        ".chat-suggestions button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                submitChat(
                    button.dataset.question
                );

            }
        );

    });



/* ===============================
   CURRENT YEAR
================================ */

document.getElementById(
    "year"
).textContent =
    new Date().getFullYear();



/* ===============================
   SMOOTH ANCHOR SCROLL
================================ */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const target =
                    document.querySelector(
                        link.getAttribute(
                            "href"
                        )
                    );


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });