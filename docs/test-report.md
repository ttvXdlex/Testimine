# Test Completion Report – inventory.js

Käesolev lõpparuanne võtab kokku laomooduli `inventory.js` testimise, paranduste, koodikatvuse ja vastastikuse ülevaatuse tulemused vastavalt standardile ISO/IEC/IEEE 29119-3.

---

## 1. Summary
- **Testide koguarv**: 29
- **Läbitud (Passed)**: 29
- **Läbikukkunud (Failed)**: 0
- **Koodikatvus**:
  - Statements: **100 %**
  - Branches: **100 %**
  - Functions: **100 %**
  - Lines: **100 %**
  - Katmata read (*Uncovered Lines*): **puuduvad**
- **Tootlikkuse test REQ-06**:
  - Enne parandust: **630.7 ms** (algne $O(n^2)$ kahe tsükliga implementatsioon)
  - Pärast parandust: **3.8 ms** (optimeeritud $O(n)$ `Set` implementatsioon)

---

## 2. Deviations from plan
Kõrvalekaldeid esialgsest plaanist ei esinenud. Kõik kaheksa nõuet (REQ-01 kuni REQ-08) kaeti täielikult ning teostati plaanitud turva-, jõudluse ja mutatsioonitestid.

---

## 3. Defects found

| ID | Description | Severity | Found by | Status |
|---|---|---|---|---|
| **D-01** | `findDuplicateSkus` kasutas kahte üksteise sees pesitsevat tsüklit ($O(n^2)$), mille tõttu 20 000 kirje töötlemine võttis üle 600 ms, rikkudes nõuet REQ-06 (< 100 ms). | High | REQ-06 jõudlustest | **Fixed** (optimeeritud `Set` andmestruktuuriga, tulemus ~4 ms) |
| **D-02** | Päritud `Object.prototype` omadust `constructor` käsitleti laoseisuna. Sisendil `restock({}, [{ sku: 'constructor', qty: 1 }])` ei tagastatud kogust 1 ning `pick({}, 'constructor', 1)` ei visanud nõutud viga `'unknown sku'`. Tõendid: `restock` liitis arvu funktsiooniga stringiks ja `pick` kasutas operaatorit `in`, mis tagastab prototüübi omaduste puhul `true`. | High | Koodi vastastikune ülevaatus (Peer review märkus K2) | **Fixed** (asendatud `Object.prototype.hasOwnProperty.call` kontrollidega funktsioonides `restock` ja `pick`, kaetud testidega) |

---

## 4. Review outcome
Vastastikuse ülevaatuse teostas Team E ([ülevaatus GitHub PR #2-s](https://github.com/ttvXdlex/Testimine/pull/2#pullrequestreview-5453493498), retsensent `axlie-aleksei`).

- **Saadud märkuste arv**: 6 ülevaatusmärkust (K2, P1 x 2, P2, J2, T3) + 1 PR kirjelduse märkus (G1).
- **Lahendatud**: Kõik 7 märkust on edukalt lahendatud:
  1. **K2**: Parandatud kehtiva SKU `'constructor'` käsitlemine funktsioonides `restock` ja `pick` (`hasOwnProperty` abil) ning lisatud vastavad testid REQ-01 ja REQ-04 plokkidesse.
  2. **P1 (koodiversioon)**: `docs/test-plan.md` jaotises 1 viidatud koodiversioon parandatud commit'i lingiks [`c599550`](https://github.com/ttvXdlex/Testimine/commit/c59955062b8733c9b7a3be84b2b435a6be2279cf) ja harule `testing`.
  3. **P2 (mutatsioon M5)**: M5 risk on testiplaanis eraldatud iseseisvaks koguste summeerimise veaks koos viitega REQ-01 testidele.
  4. **J2 (defekt D-02)**: D-02 kirje asendatud tegeliku tuvastatud defektiga (`constructor` käitumine) koos konkreetsete tõendite ja fikseerimise staatusega; riskid viidud eraldi jaotisse.
  5. **P1 (rollid)**: Testiplaanis uuendatud osalejad Team F (töö autor) ja Team E (retsenseeriv paar).
  6. **T3 (ülevaatuse ajalugu)**: Testiaruanne on viidud täielikku kooskõlla PR #2 tegeliku ülevaatusajalooga ja lisatud otselink retsensiooni arutelule.
  7. **G1 (PR kirjeldus)**: Pull Requesti kirjeldus on täiendatud mõõdetud arvude (testid, katvus, REQ-06 aeg) ja käivituskäskudega.
- **Mittenõustutud**: 0
- **Kõige olulisem ülevaatuse leid**:
  *Objekti prototüübi omaduste (`constructor`) eraldamine tegelikest laokirjetest (`hasOwnProperty` abil) ning tagastatavate objektide range immutaabluse tagamine.*

---

## 5. Residual risks
- **Immutaabluse säilimine**: Algse laoseisuobjekti muteerimise risk (mutatsioonid M2, M5) on maandatud ja kaetud range immutaabluse kontrolliga testides REQ-02 ja REQ-04 (kontrollitakse, et algse objekti viide ja väärtused ei muutu).
- **Välised integratsioonid**: Käesolev testikomplekt katab äriloogika tuuma ühiktestide tasemel. Mooduli integreerimisel välise andmebaasi või veebiserveriga (`server.js`) on vajalik täiendav integratsiooni- ja koormustestimine võimalike võrgukatkestuste ja samaaegsete päringute (*concurrency*) käsitlemiseks.

---

## 6. Recommendation
**Release.** Laomooduli `inventory.js` kood vastab kõigile funktsionaalsetele, jõudluse, turvalisuse ja töökindluse nõuetele, testide läbivus on 100 % (29/29) ning harude koodikatvus on 100 %.
