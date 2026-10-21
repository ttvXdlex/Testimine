# Mutatsioonitabel (4.4)

Mutatsioonitestimine mõõdab testide tundlikkust ja kvaliteeti: teeme koodi tahtliku vea (mutatsiooni) ning vaatame, kas olemasolevad testid püüavad selle kinni (muutuvad punaseks).

| # | Muudatus parking.js-is | Mitu testi punaseks? | Kui 0 – mis test puudub? / Selgitus |
|---|---|:---:|---|
| **M1** | `RATE A: 2.0 → 2.5` | **4** | Läbi kukkusid PT-03 (16 min), PT-04 (60 min), PT-05 (61 min) ja PT-09 (120 min, elanik). |
| **M2** | `FREE_MINUTES 15 → 10` | **1** | Läbi kukkus PT-02 (15 min piirväärtus: sai tasuta 0 asemel tasulise 2.00 €). |
| **M3** | `DAILY_MAX B: 6.0 → 60.0` | **1** | Läbi kukkus PT-08 (600 min tsoonis B: sai 6.00 € asemel 10.00 €). |
| **M4** | kustuta rida `if (!RATE[zone]) throw …` | **1** | Läbi kukkus PT-10 (tundmatu tsoon C ei visanud enam oodatud `TypeError` erindit). |
| **M5** | `fee * 0.5 → fee * 0.4` | **3** | Läbi kukkusid kõik elaniku soodustusega testid: PT-09, PT-13 ja PT-14. |
| **M6** | `Math.round(fee * 100) / 100 → fee` | **0** | **Testides puudub juhtum, mis nõuaks murdosaliste sentide ümardamist.** Praeguste reeglite kohaselt (tariifid 2.00 € ja 1.00 € täistundide pealt ning 50% elaniku soodustus) on tulemus alati täisarv või 0.50 € kordne (nt 1.00, 2.00, 0.50, 6.00). Ükski arvutus ei tekita kolmandat komakohta (nt 1.255 €), mistõttu ümardusfunktsiooni eemaldamisel jäävad kõik 14 testi roheliseks. Selle mutatsiooni püüdmiseks peaks spetsifikatsioon sisaldama nt 15% soodustust või mitte-täisarvulist tunnitasu. |

**Kokkuvõte:**
- Tabatud mutatsioone: **5 / 6**
- Testide mutatsioonitundlikkus (mutation score): **83.3%**
