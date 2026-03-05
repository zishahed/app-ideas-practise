const element = document.getElementById("shape");
let textObj = document.getElementById("text-field");
const sliders = ["htl", "htr", "hbr", "hbl", "vtl", "vtr", "vbr", "vbl"];

// Need all four radius
function updateBorderRadius() {
    const [htl, htr, hbr, hbl, vtl, vtr, vbr, vbl] = sliders.map(id =>
        document.getElementById(`${id}Slider`).value
    );
    const fullRadius = `${htl}% ${htr}% ${hbr}% ${hbl}% / ${vtl}% ${vtr}% ${vbr}% ${vbl}%`;
    shape.style.borderRadius = fullRadius;
    textObj.innerHTML = fullRadius;
}

sliders.forEach(id => {
    document.getElementById(`${id}Slider`).addEventListener("input", updateBorderRadius);
});

const copyFunction = async () => {
    try {
        copyText = textObj.innerHTML;
        await navigator.clipboard.writeText(copyText);
        console.log('Content copied to clipboard');
    } catch (err) {
        console.error('Failed to copy', err);
    }
}

updateBorderRadius();