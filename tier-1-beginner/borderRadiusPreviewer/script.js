const element = document.getElementById("shape");
const cssObj = window.getComputedStyle(element, null);
let textObj = document.getElementById("text-field");

// Need all four radius
const tl = cssObj.borderTopLeftRadius;
const tr = cssObj.borderTopRightRadius;
const br = cssObj.borderBottomRightRadius;
const bl = cssObj.borderBottomLeftRadius;

// each values above contains two values like "40px 40px"
// they are the horizontal and vertical values
// we need to store them in horizontal and vertical variable

let h = [tl, tr, br, bl].map(v => v.split(" ")[0]);
let v = [tl, tr, br, bl].map(v => v.split(" ")[1] || v.split(" ")[0]);

let fullRadius = `${h.join(" ")} / ${v.join(" ")}`;

textObj.innerHTML = fullRadius;

const copyFunction = async () => {
    try {
        await navigator.clipboard.writeText(fullRadius);
        console.log('Content copied to clipboard');
    } catch(err) {
        console.err('Failed to copy', err);
    }
}