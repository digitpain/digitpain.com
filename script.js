const img = document.querySelector("#img");
const url = document.querySelector("#url");
const timesig = document.querySelector("#timesig");
const number = document.querySelector("#number");
const footer = document.querySelector("footer");

const paintings = [
  {
    url: "",
    img: "https://aesthetic.computer/#digitpain0",
    timesig: "2022.04.08.22.55",
    width: 1000,
    height: 1250,
  },
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

    if (p.url.length > 0) {
      url.innerHTML = `<a href="${p.url}">${p.url}</a>`;
    } else {
      url.innerHTML = "NOT YET MINTED";
    }

    number.innerHTML = index;

    timesig.innerHTML = p.timesig;
    img.src = p.img;

    function resize() {
      img.width = p.width;
      img.height = p.height;

      // Get the actual pixel width, to take any scrollbars into account.
      const width = document.body.clientWidth + "px";

      img.style.width = width;
      img.style.height = `calc(calc(${p.height / p.width} * ${width})`;
      img.style.maxHeight = `100vh`;
      img.style.maxWidth = `calc(${p.width / p.height} * 100vh)`;

      const ratio = window.innerWidth / window.innerHeight;
    }

    resize();
    window.onresize = resize;
    img.onload = () => footer.classList.remove("hidden");
  }
}

hashCheck();
window.onhashchange = hashCheck;
