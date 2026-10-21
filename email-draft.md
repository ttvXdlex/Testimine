# E-kirja mustand (Valmis saatmiseks õpetajale)

**Saaja:** `german.karin@ivkhk.ee`  
**Teema:** `Automaattestimine – <Nimi 1>, <Nimi 2>`  

---

Tere!

Saadame oma automaattestimise praktikumi („3.1 Testimisvahendid automaattestimiseks · 3.2 Mõõtmised tarkvara testimises“) tulemused ja aruande.

Kõik 9 nõutud punkti on esitatud allpool kirja sisus ning manustena.

---

### 1. Repositoorium ja commit'id
- **Repositooriumi link:** `https://github.com/ttvXdlex/Testimine`
- **Nõutud commit'id repos:**
  1. `1319584 Add parking fee tests (14 cases, 2 bugs found)`
  2. `69e40cb Fix B-01 hours calculation, B-02 resident discount after daily max`

---

### 2. Manus: `parking.test.js`
- Lisatud kirjale failina `parking.test.js` (sisaldab kõiki 14 nõutud testijuhtumit PT-01 kuni PT-14, k.a veatestimised `toThrow(TypeError)`).

---

### 3. Käsitsi käivitamise logi (12 rida, stopperi ajad)

| TC | Sisend | Oodatav | Tegelik | PASS/FAIL | Märkus |
|---|---|---|---|:---:|---|
| **PT-01** | `parkingFee(0, 'A')` | `0` | `0` | **PASS** | Esimene tasuta minut (0 min) |
| **PT-02** | `parkingFee(15, 'A')` | `0` | `0` | **PASS** | Tasuta piirväärtus (15 min) |
| **PT-03** | `parkingFee(16, 'A')` | `2.00` | `2` | **PASS** | Esimene tasuline minut (16 min = 1 h, tsoon A) |
| **PT-04** | `parkingFee(60, 'A')` | `2.00` | `2` | **PASS** | Täistund (60 min = 1 h, tsoon A) |
| **PT-05** | `parkingFee(61, 'A')` | `4.00` | `2` | **FAIL** | 61 min on 2 alustatud tundi (kood lahutas ekslikult 15 tasuta minutit) |
| **PT-06** | `parkingFee(120, 'B')` | `2.00` | `2` | **PASS** | Tsoon B tariif (120 min = 2 h × 1.00 €) |
| **PT-07** | `parkingFee(600, 'A')` | `12.00` | `12` | **PASS** | Tsooni A päevamaksimum (10 h × 2 € = 20 € -> 12 €) |
| **PT-08** | `parkingFee(600, 'B')` | `6.00` | `6` | **PASS** | Tsooni B päevamaksimum (10 h × 1 € = 10 € -> 6 €) |
| **PT-09** | `parkingFee(120, 'A', { resident: true })` | `2.00` | `2` | **PASS** | Elaniku soodustus 50% (2 h × 2 € = 4 € -> 2 €) |
| **PT-10** | `parkingFee(30, 'C')` | `TypeError` | `TypeError: unknown zone` | **PASS** | Tundmatu tsoon C viskab erindi |
| **PT-11** | `parkingFee(-1, 'A')` | `TypeError` | `TypeError: invalid minutes` | **PASS** | Negatiivne minutiarv viskab erindi |
| **PT-12** | `parkingFee('30', 'A')` | `TypeError` | `TypeError: invalid minutes` | **PASS** | Sõne numbri asemel viskab erindi |

- **Aeg 12 juhtumile (1. kord):** 7 minutit 14 sekundit (eksimusi tabeli täitmisel: 1, sisestatud oodatav enne reegli täpset lugemist)
- **Aeg 12 juhtumile (2. kord):** 6 minutit 28 sekundit (eksimusi tabeli täitmisel: 0)

---

### 4. Ekraanipilt: `npx jest parking` ENNE parandust (11 passed, 3 failed)
- Manuses fail: `punkt4-jest-enne-parandust-11passed-3failed.png`
- *Tulemus:* 11 passed, 3 failed (PT-05, PT-13 ja PT-14). Leitud vead B-01 ja B-02.

---

### 5. Ekraanipildid: Katvus ühe testiga (47 %) ja 14 testiga (100 %)
- Manuses fail: `punkt5a-katvus-1-test-47pct.png` (katvus 47.05 %, katmata read 22, 25, 30–38)
- Manuses fail: `punkt5b-katvus-14-testi-100pct.png` (katvus 100 %, 100 % harud, 11 passed, 3 failed)

---

### 6. Ekraanipilt: Playwrighti HTML-raport (demo käivitus)
- Manuses fail: `punkt6-playwright-html-raport.png` (UI-testide raport portil 9323, shop.ui.spec.ts, kestus 23.5 s)

---

### 7. Vahendite võrdluse tabel (ptk 3.5)

| Kriteerium | Käsitsi (REPL + tabel) | Jest | Playwright |
|---|---|---|---|
| **Kiht** | Ühik (üksik funktsioon) | Ühik (äriloogika funktsioonid, moodulid) | UI / E2E (brauser, lehe renderdus, kasutajateekonnad) |
| **Aeg 12–14 juhtumile** | ~6–7 minutit (inimese kiirus) | ~0.15–0.3 sekundit (käivitub millisekundites) | ~15–25 sekundit (avab brauseri, laeb DOM-i, klikib) |
| **Korratavus (sama tulemus 3×?)** | Ei ole garanteeritud (inimlik väsimus, trükivead) | 100% identne igal käivitusel | Kõrge korratavus, kuid võib olla veidi flaky (võrguviivitus, animatsioonid) |
| **Tulemus kus? (jagatav?)** | Isiklikus märkmikus / terminalis; raske jagada | Konsooliraportina, JSON/JUnit formaadis, CI/CD-s; kergesti jagatav | Interaktiivne HTML-raport ekraanipiltide ja trace-salvestustega |
| **Mida ütleb, kui FAIL?** | Ei ütle automaatselt midagi; testija peab ise viga otsima | Näitab täpselt `Expected` ja `Received`, rea numbri ja stack trace'i | Näitab veaaegset ekraanipilti, DOM-i olekut ja sammu trace'i |
| **Mis maksab (õppimine, hooldus)?** | Madal õppimiskulu, kuid korduvkasutamisel tohutu ajakulu | Madal/keskmine õppimiskulu; väga madal hoolduskulu | Kõrgem õppimiskulu; nõuab hooldust UI-muudatuste korral |
| **Millal kasutaksin?** | Uurivaks testimiseks, prototüüpimisel ja disaini hindamisel | Funktsioonide, valemite ja äriloogika testimisel igal koodisalvestusel | Kriitiliste kasutajateekondade (nt ostu sooritamine) kontrollimisel enne väljalaset |

---

### 8. Mutatsioonitabel (ptk 4.4)

| # | Muudatus parking.js-is | Mitu testi punaseks? | Kui 0 – mis test puudub? / Selgitus |
|---|---|:---:|---|
| **M1** | `RATE A: 2.0 → 2.5` | **4** | Läbi kukkusid PT-03, PT-04, PT-05 ja PT-09. |
| **M2** | `FREE_MINUTES 15 → 10` | **1** | Läbi kukkus PT-02 (15 min tasuta piirväärtus). |
| **M3** | `DAILY_MAX B: 6.0 → 60.0` | **1** | Läbi kukkus PT-08 (tsooni B päevamaksimum). |
| **M4** | kustuta rida `if (!RATE[zone]) throw …` | **1** | Läbi kukkus PT-10 (tundmatu tsoon C ei visanud viga). |
| **M5** | `fee * 0.5 → fee * 0.4` | **3** | Läbi kukkusid kõik elaniku soodustusega testid: PT-09, PT-13 ja PT-14. |
| **M6** | `Math.round(fee * 100) / 100 → fee` | **0** | **Testides puudub juhtum, mis nõuaks murdosaliste sentide ümardamist.** Praeguste tariifide (2 € ja 1 €) ning 50% soodustuse juures on tasu alati täisarv või 0.50 € kordne, mistõttu ümardamist tegelikult ei toimu. Mutatsiooni püüdmiseks peaks olema murdarvuline tariif või soodustus (nt 15% või 33%). |

- **Tabatud mutatsioone:** 5 / 6 (tundlikkus 83.3%)

---

### 9. Manus: Mõõtmise aruanne (tabel ja 5 järeldust)
- Lisatud manusena fail `measurement-report.md`.
- **Koondtabel:**

| Mõõdik | Enne (1 test) | Pärast (14 testi) | Pärast parandust | Allikas |
|---|:---:|:---:|:---:|---|
| **Teste** | 1 | 14 | 14 | `Tests: ... total` |
| **PASS / FAIL** | 1 / 0 | 11 / 3 | 14 / 0 | `Tests:` |
| **Katvus read / harud** | 47.05 % / 46.15 % | 100 % / 100 % | 100 % / 100 % | Coverage tabel |
| **Kestus automaat** | 0.20 s | 0.16 s | 0.18 s | `Time:` |
| **Kestus käsitsi (12 juhtumit)** | 7 min 14 s (1. kord) / 6 min 28 s (2. kord) | – | – | Stopper |
| **Eksimusi käsitsi tabelis** | 1 | – | – | Käsitsi logi |
| **Defekte leitud** | 0 | 2 (B-01, B-02) | 0 avatud | Punased testid |
| **Mutatsioone tabatud** | – | – | 5 / 6 | Ptk 4.4 |

- **5 Järeldust:**
  1. **Käsitsi vs automaat:** Käsitsi testimisele kulus 12 juhtumiga üle 7 minuti ja tekkis 1 eksimus tabeli täitmisel, samas kui Jest läbis 14 testi 0.18 sekundiga ja garanteeritud korratavusega.
  2. **Katvuse piirangud:** 47 % katvus näitas selgelt katmata ridu (veatöötlus ja tasu arvutamine), kuid 100 % katvus näitas vaid seda, mis koodiridu läbiti, mitte aga koodi korrektsust, sest 3 testi kukkusid loogikavigade tõttu läbi.
  3. **Mutatsioonitestimine:** Mutatsioonitestides jäi tabamata vaid M6 (ümarduse eemaldamine), kuna reeglite kohaselt on tariifid ja soodustused sellised, et murdosalisi sente ei teki; selle katmiseks oleks vaja spetsifikatsiooni täiendada murdarvulise tariifi või teise soodustusmääraga.
  4. **Tööriista valik:** Parkimistasu arvutamise funktsiooni jaoks on parim vahend Jest, kuna ühiktesti kiht on ülikiire (ms), deterministlik, integreerub CI-sse ning annab vea korral täpse koodirea ja oodatava/saadud väärtuse.
  5. **Edasised sammud:** Järgmisena tuleks siduda testid GitHub Actions CI-ga, et testid jookseksid automaatselt igal push'il, ning mõõta testide stabiilsust ja käivitusaega pikema aja vältel.

---

Lugupidamisega,  
<Nimi 1>, <Nimi 2>
