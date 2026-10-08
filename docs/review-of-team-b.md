# Peer Review Report – Team B (`testimine-team-b`)

**Ülevaataja**: Meeskond A (Alex Tarakanov & tiimikaaslane)  
**Ülevaadatav**: Meeskond B (`testimine-team-b`, haru `testing`)  
**Standard**: ISO/IEC/IEEE 29119-3 kontrollnimekiri  

---

## 1. Kontrollnimekiri

| Kood | Kontroll | Olek (OK / PUUDUB / EBASELGE) | Märkused ja tähelepanekud |
|---|---|---|---|
| **K1** | Iga testi nimi algab REQ-ID-ga ja ees on tüübi kommentaar | **OK** | Testide nimedes on korrektsed prefiksid nagu `REQ-01 ...` ja sektsioonide ees tüübikommentaarid `// functional`. |
| **K2** | Kõik neli tüüpi on olemas: functional, performance, security, regression/reliability | **OK** | Kõik neli peamist kategooriat on eraldi plokkidena esindatud. |
| **K3** | REQ-02 ja REQ-04 „originaal ei muutu“ on testitud (kutsu + kontrolli originaali) | **PUUDUB** | *Märkus 1:* REQ-04 puhul kontrollitakse ainult tagastatud uue objekti sisu, kuid puudub kontroll, et algne sisendobjekt `stock` jäi pärast `pick` operatsiooni muutmata (`expect(stock['A-1']).toBe(5)`). Mutatsioon M2 läbiks märkamatult! |
| **K4** | REQ-03 piirid: 0, 1, negatiivne, mittetäisarv | **EBASELGE** | *Märkus 2:* Testitud on `qty = 0` ja `qty = -1`, kuid puudub ujukomaarvu test (`qty = 2.5`), mis on nõuetes eraldi välja toodud. |
| **K5** | Tootlikkuse test mõõdab aega ja võrdleb arvuga; `findDuplicateSkus` on parandatud | **OK** | Mõõdetud `performance.now()` abil, parandatud $O(n)$ `Set` lahendusega (< 10 ms). |
| **K6** | Turvatestid: vähemalt 4 pahatahtlikku sisendit, kõik viskavad vea | **PUUDUB** | *Märkus 3:* Turvatestis on ainult 2 juhtu (tühi string ja pikk string). Puuduvad XSS süste `<script>alert(1)</script>` ja SQL süste `'; DROP TABLE stock; --` kontrollid. |
| **K7** | `npm run coverage`: Uncovered Line #s on tühi | **OK** | Käivitati kohalikult: laomooduli koodikatvus on 100 %, katmata read puuduvad. |
| **P1** | Testiplaanis on ulatus: mida testitakse JA mida mitte, põhjusega | **OK** | Ulatus on lahti kirjutatud ja skoopivälised komponendid (UI, DB) põhjendatud. |
| **P2** | Vähemalt 3 riski, igaühel tõenäosus ja mõju ja leevendav test | **OK** | Riskitabel sisaldab tõenäosusi ja mõjusid ning viiteid mutatsioonitestidele. |
| **P3** | Lõpetamiskriteerium on arvudes – mitte „piisavalt“ | **PUUDUB** | *Märkus 4:* Dokumendis `docs/test-plan.md` oli kirjas „kõik kriitilised testid peavad töötama“, mis pole mõõdetav. Tuleb asendada konkreetsete arvudega: „100 % teste läbitud, harude katvus $\ge$ 90 %, REQ-06 aeg < 100 ms“. |
| **T1** | Igal testijuhtumil on REQ-ID ja viide testi nimele koodis | **OK** | Testijuhtumite tabelis on viited koodi nimedele olemas. |
| **T2** | Oodatav tulemus on konkreetne – PASS/FAIL otsustatav ilma autorilt küsimata | **PUUDUB** | *Märkus 5:* TC-04 oodatav tulemus ütleb vaid „viskab vea“, kuid ei täpsusta veateate sisu. Täpsustada: viskab vea teatega `'qty must be a positive whole number'`. |
| **T3** | Käivitasin nende testid ja ühe testijuhtumi sammud ise: sain / ei saanud | **OK** | Kloonisime repo harust `testing` ja käivitasime `npx jest inventory` – testid käivitusid korrektselt. |
| **J1** | Jälgitavusmaatriksis on kõik 8 nõuet, ükski ilma testita | **OK** | Kõik nõuded REQ-01 kuni REQ-08 on maatriksis kaetud. |
| **J2** | Katmata nõue (kui on) on plaanis riskina või ulatusest väljas põhjendusega | **OK** | Katmata nõudeid ei esinenud. |
| **G1** | PR kirjeldus ütleb, kuidas käivitada, ja arvud (testid, katvus, ms) on kirjas | **PUUDUB** | *Märkus 6:* Pull Requesti kirjelduses puudusid konkreetsed jõudlusmõõtmiste arvud enne ja pärast parandust (nt „enne 1077 ms, pärast 5 ms“). |

---

## 2. GitHub PR-i ülevaatuse märkused (kopeeritud PR kommentaaridesse)

1. **K3 (Kriitiline)**: `REQ-04` algse laoseisu muutumatuse kontroll puudub. Mutatsioon M2 (`stock[sku] = stock[sku] - qty`) läheks sellest testikomplektist läbi ilma veata. Palun lisage kontroll, mis verifitseerib algse `stock` objekti väärtuse pärast `pick` väljakutset.
2. **K4**: `REQ-03` piirväärtustes puudub ujukomaarvu kontroll (`qty = 2.5`). Lisage test, mis kinnitab, et komakohaga arv viskab vea.
3. **K6**: Turvatestides on testitud vaid 2 sisendit. Standard nõuab vähemalt 4 pahatahtlikku sisendit, sh HTML script-tagi (`<script>`) ja SQL süstet.
4. **P3**: `docs/test-plan.md` lõpetamiskriteeriumis asendage abstraktne fraas „piisavalt testitud“ mõõdetavate numbriliste kriteeriumitega (100 % pass, harude katvus $\ge$ 90 %, REQ-06 < 100 ms).
5. **T2**: Testijuhtumis `TC-04` asendage oodatav tulemus „viskab vea“ konkreetse oodatava veatekstiga `'qty must be a positive whole number'`.
6. **G1**: PR kirjelduses lisage sektsiooni `## Numbers` reaalsed mõõtmistulemused: testide arv, branch coverage protsent ja REQ-06 täitmisaeg millisekundites.

---

## 3. Positiivne tagasiside (mis oli nende töös hästi)
1. Koodi refaktoreerimine $O(n)$ `Set`-põhiseks oli teostatud puhtalt ja efektiivselt, viies käitusaja üle 1000 ms-lt alla 5 ms.
2. Jälgitavusmaatriks `docs/traceability.md` oli hästi struktureeritud ja selgelt loetav, seostades nõuded otse testidega.
3. Testide ülesehitus ja koodistiil oli viisakas, selgete kirjelduste ja loogilise jaotusega.
