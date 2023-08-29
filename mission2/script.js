const counters = [0, 0, 0, 0, 0, 0];
const harga = [10000,5000,3000,10000,7500,15000]
const produk = ["Keju","Hotdog","Cupcake","Borgar","Pissa","Spaget"]
var barang = [0,0,0,0,0,0];
var pajak = 0;
var total = 0;
var final = 0;

function increment(index) {
    counters[index]++;
    updateDisplay(index);
}

function decrement(index) {
    if (counters[index] > 0) {
        counters[index]--;
        updateDisplay(index);
    }
}

function updateDisplay(index) {
    const counterValue = document.getElementById(`counterValue${index}`);
    counterValue.textContent = counters[index];
}

cartButton.addEventListener("click", () => {
    addToCart();
    
    updateCounterDisplay();
    const line = "--------------------------------"
    slideEffect.style.display = "block"; // Show the slide effect
    setTimeout(() => {
        slideEffect.style.transform = "translateX(-50%) translateY(50%)"; // Slide in from bottom
    }, 10); // Small delay to ensure proper animation
});

function closeSlideEffect() {
    slideEffect.style.transform = "translateX(-50%) translateY(100%)"; // Slide out to bottom
    setTimeout(() => {
        slideEffect.style.display = "none"; // Hide the slide effect
    }, 500); // Delay to match transition time
}

function addToCart(){
    barang[0] = counters[0] * 10000;
    barang[1] = counters[1] * 5000;
    barang[2] = counters[2] * 3000;
    barang[3] = counters[3] * 10000;
    barang[4] = counters[4] * 7500;
    barang[5] = counters[5] * 15000;

    total = barang[0] + barang[1]+ barang[2] + barang[3] + barang[4] + barang[5];
    pajak = 0.1 * total;

    final = pajak + total;
    
}

function updateCounterDisplay() {
    const innerRectangle = document.querySelector(".inner-rectangle");
    const line = document.createElement("pre");
    const line2 = document.createElement("pre");
    const pjk = document.createElement("pre");
    const ttl = document.createElement("pre");
    const fnl = document.createElement("pre");
    innerRectangle.innerHTML = ""; // Clear the inner rectangle

    for (let i = 0; i < counters.length; i++) {
        if (counters[i] >= 1) { // Only show items with counter >= 1
            const itemCounterElement = document.createElement("pre");
            itemCounterElement.textContent = `> ${produk[i]} <  ${counters[i]} x ${harga[i]} \t\t\t= ${barang[i]}`;
            itemCounterElement.setAttribute("style","color:#695e5d;")
            innerRectangle.appendChild(itemCounterElement);
        }
    }
    line.textContent = '---------------------------------------------------------------'
    innerRectangle.appendChild(line);
    ttl.textContent = `Total \t\t\t\t\t= ${total}`
    innerRectangle.appendChild(ttl);
    pjk.textContent = `Pajak \t\t\t\t\t= ${pajak}`
    innerRectangle.appendChild(pjk);
    line2.textContent = '---------------------------------------------------------------'
    innerRectangle.appendChild(line2);
    fnl.textContent = `Final \t\t\t\t\t= ${final}`
    innerRectangle.appendChild(fnl);
}

// Call this function whenever counter values change
