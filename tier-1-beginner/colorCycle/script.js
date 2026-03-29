let selectedFormatValue = document.getElementById("colorFormat").value;
let selectedCode = document.getElementById("startcolor");
let selectedOrder = document.getElementById("stepValue");
let selectedInterval = document.getElementById("timeInterval");

const incrementBtn = document.getElementById("incBtn");
const decrementBtn = document.getElementById("decBtn");

let rate = 0;
let intervalRate = 0;

incrementBtn.addEventListener('click', () => { rate++; selectedOrder.textContent = rate; });
decrementBtn.addEventListener('click', () => { rate--; selectedOrder.textContent = rate; });

