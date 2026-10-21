# Vahendite võrdluse tabel (3.5)

Täidetud praktiliste tähelepanekute põhjal (mitte kopeeritud internetist):

| Kriteerium | Käsitsi (REPL + tabel) | Jest | Playwright |
|---|---|---|---|
| **Kiht** | Ühiktestimise kiht (üksiku funktsiooni kutsumine) | Ühiktestimise kiht (ühikud, moodulid, äriloogika funktsioonid) | UI / E2E kiht (brauser, lehe renderdus, kasutajateekonnad) |
| **Aeg 12–14 juhtumile** | ~6–7 minutit (inimese sisestuskiirus ja silmaga kontroll) | ~0.15–0.3 sekundit (käivitub millisekundites) | ~15–25 sekundit (avab brauseri, laeb DOM-i, klõpsab elementidel) |
| **Korratavus (sama tulemus 3×?)** | Ei ole garanteeritud. Inimene väsib, teeb trükivigu, võib sisestada vale argumendi või vaadata rea valesti. | 100% identne ja deterministlik igal käivitusel. | Kõrge korratavus, kuid võib esineda juhuslikku ebastabiilsust (flaky), kui võrk viivitab või animatsioon pole lõppenud. |
| **Tulemus kus? (jagatav?)** | Isiklikus märkmikus, terminali puhvris või käsitsi täidetud failis; ei ole automaatselt jagatav. | Konsooliraportina, JSON/JUnit formaadis, CI/CD logides; automaatselt jagatav meeskonnaga. | Interaktiivse HTML-raportina koos lehe ekraanipiltide, videote ja Network/Action trace-salvestustega. |
| **Mida ütleb, kui FAIL?** | Ei ütle midagi automaatselt. Testija peab ise märkama lahknevust oodatava ja saadud väärtuse vahel. | Näitab täpselt `Expected` ja `Received` väärtused, vea asukoha failis ja koodirea numbri. | Näitab brauseri vaadet vea hetkel, ebaõnnestunud selektorit ja sammu, miks element polnud nähtav või klikitav. |
| **Mis maksab (õppimine, hooldus)?** | Madal algne õppimiskulu, kuid üüratult kallis ajakulu ja hooldamatu pikas perspektiivis. | Madal/mõõdukas õppimiskulu (JavaScript, asserdid); minimaalne hoolduskulu, testid on väga kiired ja stabiilsed. | Suurem õppimiskulu (asünkroonsus, selektorid, ootamised); kõrgem hoolduskulu, kuna UI muutused nõuavad testide uuendamist. |
| **Millal kasutaksin?** | Uurivaks testimiseks (exploratory testing), uue idee kiireks proovimiseks REPL-is või visuaalse disaini hindamiseks. | Funktsioonide, arvutusvalemite, äriloogika ja andmetöötluse kontrollimiseks igal koodisalvestusel ja CI-s. | Kogu süsteemi kriitiliste kasutajateekondade (nt ostukorv, sisselogimine, maksmine) testimiseks enne toote väljalaset. |
