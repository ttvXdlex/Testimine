# Test Completion Report – inventory.js

Käesolev lõpparuanne võtab kokku laomooduli `inventory.js` testimise, paranduste, koodikatvuse ja vastastikuse ülevaatuse tulemused vastavalt standardile ISO/IEC/IEEE 29119-3.

---

## 1. Summary
- **Testide koguarv**: 27
- **Läbitud (Passed)**: 27
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
Kõrvalekaldeid esialgsest plaanist ei esinenud. Kõik kaheksa nõuet (REQ-01 kuni REQ-08) kaeti täielikult ning teostati plaanitud turva- ja mutatsioonitestid.

---

## 3. Defects found

| ID | Description | Severity | Found by | Status |
|---|---|---|---|---|
| **D-01** | `findDuplicateSkus` kasutas kahte üksteise sees pesitsevat tsüklit ($O(n^2)$), mille tõttu 20 000 kirje töötlemine võttis üle 600 ms, rikkudes nõuet REQ-06 (< 100 ms). | High | REQ-06 jõudlustest | **Fixed** (optimeeritud `Set` andmestruktuuriga, tulemus ~4 ms) |
| **D-02** | Risk immutaabluse kadumisele funktsioonides `pick` ja `restock`, kui muudetakse otse algset `stock` objekti (mutatsioonid M2, M5). | Medium | REQ-02 ja REQ-04 immutaablustestid | **Covered & Verified** |

---

## 4. Review outcome
- **Saadud märkuste arv**: 6
- **Lahendatud**: 6
- **Mittenõustutud**: 0
- **Kõige olulisem ülevaatuse leid**:
  *Tagastatavate objektide immutaabluse range kontrollimine (REQ-02 ja REQ-04) hoiab ära kriitilised oleku rikkumise vead teistes süsteemi komponentides, mida tavalised funktsionaalsed testid ei pruugi tuvastada.*

---

## 5. Residual risks
- Käesolev testikomplekt katab äriloogika tuuma ühiktestide tasemel. Mooduli integreerimisel välise andmebaasi või veebiserveriga (`server.js`) on vajalik täiendav integratsiooni- ja koormustestimine võimalike võrgukatkestuste ja samaaegsete päringute (*concurrency*) käsitlemiseks.

---

## 6. Recommendation
**Release.** Laomooduli `inventory.js` kood vastab kõigile funktsionaalsetele, jõudluse, turvalisuse ja töökindluse nõuetele, testide läbivus on 100 % ning harude koodikatvus on 100 %.
