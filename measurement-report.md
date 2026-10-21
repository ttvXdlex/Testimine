# Mõõtmise aruanne – parking.js

**Paar:** Aleksei & Kaaslane  
**Kuupäev:** 21. oktoober 2026  
**Viimane commit:** `69e40cb` (Fix B-01 hours calculation, B-02 resident discount after daily max)  
**Lähtekoodi repositoorium:** Automaattestimise praktikum  

---

## Mõõtmiste koondtabel

| Mõõdik | Enne (1 test) | Pärast (14 testi) | Pärast parandust | Allikas |
|---|:---:|:---:|:---:|---|
| **Teste** | 1 | 14 | 14 | `Tests: ... total` |
| **PASS / FAIL** | 1 / 0 | 11 / 3 | 14 / 0 | `Tests: ... passed, failed` |
| **Katvus (read / harud)** | 47.05 % / 46.15 % | 100 % / 100 % | 100 % / 100 % | Jest coverage tabel |
| **Kestus automaat** | 0.20 s | 0.16 s | 0.18 s | `Time:` väljundist |
| **Kestus käsitsi (12 juhtumit)** | 7 min 14 s (1. kord) / 6 min 28 s (2. kord) | – | – | Stopper |
| **Eksimusi käsitsi tabelis** | 1 | – | – | Käsitsi käivitamise logi |
| **Defekte leitud** | 0 | 2 (B-01, B-02) | 0 avatud | Punased testid (`Expected` / `Received`) |
| **Mutatsioone tabatud** | – | – | 5 / 6 | Ptk 4.4 mutatsioonitabel |

---

## Leitud defektide kirjeldus

1. **Defekt B-01 (Tundide arvutamine):**
   - *Kirjeldus:* Funktsioonis arvutati alustatud tunde valemiga `Math.ceil((minutes - 15) / 60)`. Spetsifikatsioon nõuab aga tasulise aja saabumisel kogu parkimise aja alustatud tundide maksustamist: `Math.ceil(minutes / 60)`.
   - *Mõju testidele:* Juhtumid PT-05 (61 min tsoon A) ja PT-13 (61 min tsoon B elanik) andsid oodatud 4.00 € ja 1.00 € asemel vastavalt 2.00 € ja 0.50 €.
2. **Defekt B-02 (Elaniku soodustuse järjekord):**
   - *Kirjeldus:* Elaniku soodustus (50%) rakendati koodis enne päevamaksimumi piiri kontrollimist. Spetsifikatsioon sätestab selgelt: *"50 % off the final price (after the daily maximum)"*.
   - *Mõju testidele:* Juhtum PT-14 (600 min tsoon A elanik) arvutas esmalt 20 € × 0.5 = 10 € ja piiras päevamaksimumiga 12 € (tulemus 10 €), kuigi õige järjekord on esmalt piirata 20 € -> 12 € ning seejärel rakendada 50% soodustus -> 6.00 €.

---

## Järeldused (5 lauset)

1. **Käsitsi vs automaat:** 12 juhtumi käsitsi läbimine võttis esimesel korral 7 minutit 14 sekundit ja tõi kaasa 1 märkimisvea, samas kui Jest käivitas 14 testi 0.18 sekundiga täieliku deterministlikkusega.
2. **Katvuse analüüs:** 47 % katvus ühe testiga paljastas koheselt testimata koodilõigud (uncovered lines 22, 25, 30–38), kuid 100 % katvus täiskomplektiga tõestas, et kõrge katvusprotsent ei taga koodi korrektsust, kuna 3 testi kukkusid äriloogika vigade tõttu läbi.
3. **Mutatsioonitestimine:** Mutatsioonitestis tabati 5 mutatsiooni 6-st, kusjuures mutatsioon M6 (ümarduse eemaldamine) jäi ainsana tabamata, sest praeguste reeglitega arvutatud tasud on alati täpsed (täisarv või pool eurot) ega tekita ümardamist vajavaid murdosalisi sente.
4. **Vahendi valik:** Antud parkimistasu arvutaja funktsiooni jaoks on optimaalseim tööriist Jest, sest see testib äriloogikat otse ühiktesti kihil millisekundite jooksul, integreerub sujuvalt CI/CD ahelasse ega vaja kulukat brauseri käivitamist.
5. **Edasised sammud testimises:** Järgmise sammuna tuleks seadistada automaatne testimine GitHub Actions CI-sse igale kooditõukele (push), viia läbi koormustestimine (nt k6-ga API kihil) ning lisada piirväärtuste testid võimalike uute tariifide ümarduskäitumise katmiseks.
