// ========================================
// MOBILE NAVIGATION
// ========================================

const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");


if (bar && nav) {
    bar.addEventListener("click", () => {
        nav.classList.add("active");
    });
}


if (close && nav) {
    close.addEventListener("click", (event) => {
        event.preventDefault();
        nav.classList.remove("active");
    });
}



// ========================================
// AUTHENTICATION / NAVBAR
// ========================================

const AUTH_ADMIN_URL =
    "http://localhost:5000/api/admin/dashboard";


async function setupAuthNavbar() {

    const navbar =
        document.getElementById("navbar");

    if (!navbar) {
        return;
    }


    const token =
        localStorage.getItem("token");

    const userName =
        localStorage.getItem("userName");


    // Remove previously generated items
    document
        .querySelectorAll(".dynamic-auth-item")
        .forEach(item => {
            item.remove();
        });



    // ========================================
    // FIND EXISTING NAVBAR ITEMS
    // ========================================

    const loginItem =
        document.getElementById("login-link");

    const registerItem =
        document.getElementById("register-link");


    const dashboardLink =
        Array.from(
            navbar.querySelectorAll("a")
        ).find(link =>
            link.getAttribute("href") ===
            "admin.html"
        );


    const dashboardItem =
        dashboardLink
            ? dashboardLink.closest("li")
            : null;



    // ========================================
    // LOGGED OUT
    // ========================================

    if (!token) {

        // Hide Dashboard
        if (dashboardItem) {
            dashboardItem.style.display = "none";
        }


        // Show existing Login link
        if (loginItem) {

            loginItem.style.display = "";

        } else {

            addAuthLink(
                navbar,
                "Login",
                "login.html"
            );

        }


        // Show existing Register link
        if (registerItem) {

            registerItem.style.display = "";

        } else {

            addAuthLink(
                navbar,
                "Register",
                "register.html"
            );

        }


        return;
    }



    // ========================================
    // LOGGED IN
    // ========================================

    // Hide Login
    if (loginItem) {
        loginItem.style.display = "none";
    }


    // Hide Register
    if (registerItem) {
        registerItem.style.display = "none";
    }


    // Hide Dashboard until backend confirms admin
    if (dashboardItem) {
        dashboardItem.style.display = "none";
    }



    // ========================================
    // USER NAME
    // ========================================

    if (userName) {

        const nameItem =
            document.createElement("li");


        nameItem.classList.add(
            "dynamic-auth-item"
        );


        const nameElement =
            document.createElement("a");


        nameElement.href = "#";

        nameElement.textContent =
            userName;


        nameElement.style.cursor =
            "default";


        nameElement.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

            }
        );


        nameItem.appendChild(
            nameElement
        );


        insertBeforeBag(
            navbar,
            nameItem
        );
    }



    // ========================================
    // LOGOUT
    // ========================================

    const logoutItem =
        document.createElement("li");


    logoutItem.classList.add(
        "dynamic-auth-item"
    );


    const logoutLink =
        document.createElement("a");


    logoutLink.href = "#";

    logoutLink.textContent =
        "Logout";


    logoutLink.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            logoutUser();

        }
    );


    logoutItem.appendChild(
        logoutLink
    );


    insertBeforeBag(
        navbar,
        logoutItem
    );



    // ========================================
    // VERIFY ADMIN WITH BACKEND
    // ========================================

    try {

        const response =
            await fetch(
                AUTH_ADMIN_URL,
                {
                    method: "GET",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );



        // ADMIN
        if (response.ok) {

            if (dashboardItem) {
                dashboardItem.style.display = "";
            }

            return;
        }



        // INVALID / EXPIRED TOKEN
        if (response.status === 401) {

            clearAuthData();

            window.location.reload();

            return;
        }



        // NORMAL USER
        if (response.status === 403) {

            // Dashboard remains hidden
            return;
        }


        console.error(
            "Unexpected admin check status:",
            response.status
        );


    } catch (error) {

        console.error(
            "Navbar authentication check failed:",
            error
        );

    }
}



// ========================================
// CREATE AUTH LINK
// Used on pages that don't already contain
// Login/Register in their HTML
// ========================================

function addAuthLink(
    navbar,
    text,
    href
) {

    const item =
        document.createElement("li");


    item.classList.add(
        "dynamic-auth-item"
    );


    const link =
        document.createElement("a");


    link.href = href;

    link.textContent = text;


    item.appendChild(link);


    insertBeforeBag(
        navbar,
        item
    );
}



// ========================================
// INSERT BEFORE CART ICON
// ========================================

function insertBeforeBag(
    navbar,
    item
) {

    const bag =
        document.getElementById("lg-bag");


    if (
        bag &&
        bag.parentElement === navbar
    ) {

        navbar.insertBefore(
            item,
            bag
        );

    } else {

        navbar.appendChild(
            item
        );

    }
}



// ========================================
// LOGOUT USER
// ========================================

function logoutUser() {

    clearAuthData();


    alert(
        "Logged out successfully."
    );


    window.location.href =
        "index.html";
}



// ========================================
// CLEAR AUTH DATA
// ========================================

function clearAuthData() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("userName");
}



// ========================================
// START
// ========================================

setupAuthNavbar();