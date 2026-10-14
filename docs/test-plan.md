# Test Plan – inventory.js

## 1. Test item
`inventory.js`, commit [`c59955062b8733c9b7a3be84b2b435a6be2279cf`](https://github.com/ttvXdlex/Testimine/commit/c59955062b8733c9b7a3be84b2b435a6be2279cf) (ja haru [`testing`](https://github.com/ttvXdlex/Testimine/tree/testing)), mis sisaldab ülevaadatud laomooduli teostust (`inventory.js`) ja testikomplekti (`inventory.test.js`).

## 2. Scope
### In scope:
- **REQ-01**: `restock(stock, deliveries)` lisab tarnitud kogused olemasolevale laoseisule ning lisab uued, varem tundmatud SKU-d.
- **REQ-02**: `restock` tagastab alati uue objekti; algset laoseisu objekti ei muudeta (immutaablus).
- **REQ-03**: `restock`: tarnekogus `qty` peab olema rangelt positiivne täisarv (> 0), vigase sisendi korral visatakse viga.
- **REQ-04**: `pick(stock, sku, qty)` vähendab laoseisu kogust; tundmatu SKU või laoseisu ületava koguse korral viskab vea; tagastab uue objekti ja säilitab originaali.
- **REQ-05**: `findDuplicateSkus(items)` tagastab massiivi SKU-dest, mis esinevad sisendis rohkem kui ühe korra, iga duplikaat täpselt üks kord.
- **REQ-06**: `findDuplicateSkus`: jõudlusnõue – 20 000 elemendiga sisendi töötlemine alla 100 ms.
- **REQ-07**: `sku` valideerimine turvalisuse tagamiseks: lubatud vaid 1–20 tähemärki (tähed, numbrid, sidekriips). Ebasobivad ja süstimiskatsetega SKU-d lükatakse veaga tagasi.
- **REQ-08**: Töökindlus ja atomaarsus: vigase sisendi korral (nt osaliselt vigane tarnepakk) ei tohi olemasolev laoseis muutuda.

### Out of scope:
- Kasutajaliides (UI) ja veebiserveri API otspunktid (`server.js`, Playwright e2e testid) – antud etapis testitakse ainult äriloogika tuuma ühiktestidega.
- Püsiv andmebaasi salvestus (andmebaasi draiverid ja võrguliiklus) – funktsioonid töötlevad puhtalt mälupõhiseid JavaScripti objekte.

## 3. Risks
Tabel koondab kriitilised riskid, sh mutatsioonitestide (3.4) tulemused defektide varajaseks tabamiseks:

| Risk | Tõenäosus (L/M/H) | Mõju (L/M/H) | Leevendus (millised testid) |
|---|---|---|---|
| `findDuplicateSkus` on $O(n^2)$ – suure laoseisu korral jookseb raport või päring ajapiirangusse (timeout). | H | H | **REQ-06** jõudlustest (< 100 ms) ja koodi refaktoreerimine $O(n)$ `Set`-põhiseks. |
| Funktsioonid `restock` või `pick` muteerivad algset laoseisu objekti (mutatsioon M2: `stock[sku] = ...`), tekitades mujal süsteemis ettenägematuid kõrvalmõjusid. | M | H | **REQ-02** ja **REQ-04** immutaabluse testid (kontrollitakse, et originaalobjekti väärtused ei muutu ja viide on erinev). |
| Tarnete liitmisel olemasolevale laoseisule kirjutatakse varasem kogus üle viimase tarne väärtusega (mutatsioon M5: liitmise asemel asendatakse kogus väärtusega `d.qty`), tekitades laoseisu summeerimise vea ja laokao. | M | H | **REQ-01** testid, mis kontrollivad tarnete liitmist olemasolevale laoseisule (`REQ-01 restock adds quantity to existing sku` ning `REQ-01 restock processes multiple deliveries correctly`). |
| Piirväärtuste viga koguse kontrollil (mutatsioon M1: `<= 0` asemel `< 0`), mis lubaks nullkogusega või negatiivseid kandeid. | M | M | **REQ-03** ja **REQ-04** piirväärtustestid (`qty = 0`, `qty = -1`, `qty = 2.5`, `qty = 1`). |
| SKU valideerimise puudulikkus või regexi lõdvendamine (mutatsioon M3: `{1,20}` -> `{1,25}` või M6: `assertSku` vahelejätmine), lubades XSS / SQLi süste. | M | H | **REQ-07** turvatestid (`test.each`) pahatahtlike süstide, pikkuse ületamise ja erisümbolite vastu. |
| Kehtiva nimega SKU (nt `constructor`) satub konflikti JavaScripti `Object.prototype` päritud omadustega, rikkudes laoseisu arvestust või varjates puuduvat toodet. | M | H | **REQ-01** ja **REQ-04** objekti enda omaduste (`hasOwnProperty`) testid kehtiva SKU-ga `'constructor'`. |
| Osalise ebaõnnestumise korral jääb laoseis poolikult muudetud olekusse (andmete riknemine). | L | H | **REQ-08** töökindlustestid vigaste tarnete ja puuduliku laoseisu korraga testimisel. |

## 4. Approach
- **Testitüübid**: Funktsionaalsed testid (funktsionaalsus ja immutaablus), jõudlustestid (tootlikkus), turvatestid (sisendi valideerimine ja süsted), töökindlustestid ja regressioonitestid (mutatsioonikindlus).
- **Testimistase**: Ühiktestimine (Unit testing).
- **Meetodid**: Musta kasti meetod (nõuetest ja piirväärtustest lähtuvalt) kombineerituna valge kasti meetodiga koodikatvuse tagamiseks (harude katvus).
- **Tööriistad**: Jest v29 testiraamistik GitHub Codespaces / Node.js keskkonnas.

## 5. Exit criteria (mõõdetavad lõpetamiskriteeriumid)
- Kõik 8 nõuet (REQ-01 kuni REQ-08) on kaetud vähemalt ühe konkreetse testiga.
- Testide läbivus: 100 % (0 läbikukkunud testi, 29/29 läbitud).
- Harude katvus (Branch coverage): $\ge$ 90 % (saavutatud 100 %).
- Ridade katvus (Line coverage): $\ge$ 95 % (saavutatud 100 %).
- Jõudlusnõue REQ-06: 20 000 elemendi töötlemine alla 100 ms (saavutatud < 10 ms).
- Ülevaatus (Review): 0 lahendamata „High“ raskusastmega märkust GitHub PR-is.

## 6. Environment
- GitHub Codespaces / Windows 11 / macOS
- Node.js: v22.x / v24.x
- Jest: v29.7.0
- Repositoorium: `ttvXdlex/Testimine` (haru `testing`)

## 7. Roles
- **Testide autor ja arendaja**: Alex Tarakanov (Team F) – testide ja paranduste teostamine.
- **Dokumenteerija / Kvaliteedispetsialist**: Meeskonnakaaslane (Team F) – ISO/IEC/IEEE 29119-3 dokumentide koostamine ja kooskõlastamine.
- **Vastastikune ülevaataja**: Team E esindajad (Aleksei Dubtsak / `axlie-aleksei` jt) – koodi ja testide sõltumatu ülevaatus GitHub Pull Requestis (#2).
