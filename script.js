const img = document.querySelector('#img');
const url = document.querySelector('#url');
const number = document.querySelector('#number');
const footer = document.querySelector('footer');
const fullscreen = document.querySelector('#fullscreen');

const paintings = [
    {
        url: "https://aesthetic.computer/#digitpain",
        img: "https://aesthetic.computer/#digitpain",
        width: 1000,
        height: 1250
    }
];

function hashCheck() {
    // If there is no hash in the URL, then make it the most recent picture.
    if (window.location.hash.length === 0) {
        window.onhashchange = undefined;
        window.location.hash = "#" + (paintings.length - 1);
        return;
    }

    // If there already is a hash, then check if it's an integer and return
    // the request, or default to "#0".
    if (window.location.hash.length > 1) {

        const index = parseInt(window.location.hash.substr(1));

        let p = paintings[index];

        if (p === undefined) {
            window.location.hash = "#0";
            return;
        } else {
            window.onhashchange = undefined;
            window.location.hash = "#" + index;
            window.onhashchange = hashCheck;
        }

        url.innerHTML = `<a href="${p.url}">${p.url}</a>`;
        number.innerHTML = index;

        img.src = p.img;

        function resize() {
            img.width = p.width;
            img.height = p.height;

            // Get the actual pixel width, to take any scrollbars into account.
            const width = document.body.clientWidth + "px";

            img.style.width = width;
            img.style.height = `calc(calc(${p.height / p.width } * ${width})`;
            img.style.maxHeight = `100vh`;
            img.style.maxWidth = `calc(${ p.width / p.height } * 100vh)`;

            const ratio = window.innerWidth / window.innerHeight;
            console.log(ratio);
        }

        resize();
        window.onresize = resize;

        img.onload = () => footer.classList.remove("hidden");
    }
}

hashCheck();
window.onhashchange = hashCheck;

// Fullscreen
img.addEventListener('pointerdown', (e) => {
    if (e.key === "f") {
        toggleFullscreen();
    }
})

fullscreen.addEventListener('click', (e) => {
    toggleFullscreen();
});

// Fullscreen [Pulled from aesthetic.computer:bios.js] 2022.04.08.05.16
// Note: This doesn't work in Safari because you can't fullscreen the body element.
//       (Or anything other than a video element?) 2022.04.08.05.16
const requestFullscreen =
    document.body.requestFullscreen || wrapper.webkitRequestFullscreen;

const exitFullscreen =
    document.exitFullscreen || document.webkitExitFullscreen;

// Tries to toggle fullscreen. Must be called within a user interaction.
function toggleFullscreen() {
    const fullscreenElement =
        document.fullscreenElement || document.webkitFullscreenElement;

    if (!fullscreenElement) {
        requestFullscreen.apply(img)?.catch((e) => console.error(e));
    } else {
        exitFullscreen();
    }
}

document.body.onfullscreenchange = (event) => {
    const fullscreenElement =
        document.fullscreenElement || document.webkitFullscreenElement;

    if (fullscreenElement) {
        console.log("😱 Entered fullscreen mode!", fullscreenElement);
    } else {
        console.log("😱 Leaving fullscreen mode!");
    }
};
