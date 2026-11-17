// 1. Hlavný objekt s indíciami
// Kľúče píš vždy MALÝMI PÍSMENAMI (bez ohľadu na to, ako ich človek napíše, kód si ich prevedie)
const indicie = {
    "kalendára": `
        <h3>Indícia pre 2.12.</h3>
        <p>ALASKA</p>
    `,
    
};

// 2. Objekt so synonymami
// Kľúč musí sedieť s kľúčom v objekte 'indicie'. Do hranatých zátvoriek píš alternatívy (v úvodzovkách).
const synonyma = {
    "snehuliak": ["snowman", "snehový muž", "snehovy muz", "olaf"],
    "vianoce": ["christmas", "xmas", "štedrý deň", "stedry den"]
};

// --- LOGIKA PREVODNÍKA A VYHĽADÁVANIA ---

const inputField = document.getElementById('codeInput');
const resultContainer = document.getElementById('result');

// Pomocná funkcia, ktorá prevedie text (aj synonymá) na hlavný kľúč
function najdiHlavnyKluc(vstup) {
    // 1. Zmení všetko na malé písmená a odstráni zbytočné medzery pred/za textom
    const cistyText = vstup.trim().toLowerCase();
    
    if (!cistyText) return null;

    // 2. Ak sa text priamo zhoduje s hlavným kľúčom v 'indicie', vráti ho
    if (indicie.hasOwnProperty(cistyText)) {
        return cistyText;
    }

    // 3. Ak nie, prejde všetky polia v objekte 'synonyma'
    for (const [hlavnyKluc, zoznamSynonym] of Object.entries(synonyma)) {
        // Prevedie aj synonymá na malé písmená (pre istotu, keby si ich v kóde napísal veľkým)
        const maleSynonyma = zoznamSynonym.map(slovo => slovo.trim().toLowerCase());
        
        if (maleSynonyma.includes(cistyText)) {
            return hlavnyKluc; // Našlo synonymum -> vráti hlavný kľúč (napr. "snehuliak")
        }
    }

    return null; // Nenašla sa žiadna zhoda
}

// Reakcia na písanie do inputu
inputField.addEventListener('input', function() {
    const najdenyKluc = najdiHlavnyKluc(this.value);

    if (najdenyKluc) {
        resultContainer.innerHTML = `<div class="clue-box">${indicie[najdenyKluc]}</div>`;
    } else {
        resultContainer.innerHTML = '';
    }
});
