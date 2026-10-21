# Automaattestimine: vahendid ja mõõtmised (Praktikum 3.1 & 3.2)

Käesolev projekt sisaldab kõiki praktilisi ülesandeid ja materjale kursuse „Tarkvarasüsteemide testimine“ teema 3 („Automaattestimine: 3.1 Testimisvahendid, 3.2 Mõõtmised“) sooritamiseks.

---

## Projekti struktuur

- `parking.js` – Parkimistasu arvutamise funktsioon (sisaldab parandatud vigu B-01 ja B-02).
- `parking.test.js` – Jesti testikomplekt (14 testijuhtumit PT-01 kuni PT-14).
- `manual-testing-log.md` – Käsitsi testimise logi (12 juhtumit, stopperi ajad ja vead).
- `comparison-table.md` – Testimisvahendite võrdluse tabel (Käsitsi vs Jest vs Playwright).
- `mutation-testing.md` – Mutatsioonitestimise tabel ja analüüs (M1–M6).
- `measurement-report.md` – Mõõtmise koondaruanne koos 5 nõutud järeldusega.
- `email-draft.md` – Täielik valmis e-kirja tekst esitamiseks aadressile `german.karin@ivkhk.ee`.
- `screenshots/` – Kõik nõutud ekraanipildid e-kirjale lisamiseks:
  - `punkt4-jest-enne-parandust-11passed-3failed.png`
  - `punkt5a-katvus-1-test-47pct.png`
  - `punkt5b-katvus-14-testi-100pct.png`
  - `punkt6-playwright-html-raport.png`

---

## Käivituskäsud

Testide käivitamine:
```bash
npm test
```

Katvuse (coverage) mõõtmine:
```bash
npx jest parking --coverage --collectCoverageFrom=parking.js
```

Kolm järjestikust käivitust koos ajamõõtmisega:
```bash
for i in 1 2 3; do npx jest parking 2>&1 | grep -E "Tests:|Time:"; done
```

---

## Git commit'ide ajalugu

1. `Add parking fee tests (14 cases, 2 bugs found)` (commit `1319584`)
2. `Fix B-01 hours calculation, B-02 resident discount after daily max` (commit `69e40cb`)
