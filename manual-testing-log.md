# Käsitsi käivitamise logi (Node REPL + tabel)

**Testija:** Õpilane  
**Kuupäev:** 21. oktoober 2026  
**Vahend:** Node.js v24.21.0 REPL (`node`)  
**Funktsioon:** `const { parkingFee } = require('./parking')`  

---

## 1. Testijuhtumid (12 juhtumit)

| TC | Sisend | Oodatav | Tegelik | PASS/FAIL | Märkus |
|---|---|---|---|---|---|
| **PT-01** | `parkingFee(0, 'A')` | `0` | `0` | **PASS** | Esimene tasuta minut (0 min) |
| **PT-02** | `parkingFee(15, 'A')` | `0` | `0` | **PASS** | Tasuta piirväärtus (15 min) |
| **PT-03** | `parkingFee(16, 'A')` | `2.00` | `2` | **PASS** | Esimene tasuline minut (16 min = 1 h, tsoon A) |
| **PT-04** | `parkingFee(60, 'A')` | `2.00` | `2` | **PASS** | Täistund (60 min = 1 h, tsoon A) |
| **PT-05** | `parkingFee(61, 'A')` | `4.00` | `2` | **FAIL** | 61 min on 2 alustatud tundi (viga B-01: kood lahutas ekslikult 15 tasuta minutit enne tundide arvutamist) |
| **PT-06** | `parkingFee(120, 'B')` | `2.00` | `2` | **PASS** | Tsoon B tariif (120 min = 2 h × 1.00 €) |
| **PT-07** | `parkingFee(600, 'A')` | `12.00` | `12` | **PASS** | Tsooni A päevamaksimum (10 h × 2 € = 20 € -> 12 €) |
| **PT-08** | `parkingFee(600, 'B')` | `6.00` | `6` | **PASS** | Tsooni B päevamaksimum (10 h × 1 € = 10 € -> 6 €) |
| **PT-09** | `parkingFee(120, 'A', { resident: true })` | `2.00` | `2` | **PASS** | Elaniku soodustus 50% (2 h × 2 € = 4 € -> 2 €) |
| **PT-10** | `parkingFee(30, 'C')` | `TypeError` | `TypeError: unknown zone` | **PASS** | Tundmatu tsoon C viskab erindi |
| **PT-11** | `parkingFee(-1, 'A')` | `TypeError` | `TypeError: invalid minutes` | **PASS** | Negatiivne minutiarv viskab erindi |
| **PT-12** | `parkingFee('30', 'A')` | `TypeError` | `TypeError: invalid minutes` | **PASS** | Sõne numbri asemel viskab erindi |

---

## 2. Ajamõõtmine (Stopper)

- **1. kord:** **7 minutit 14 sekundit**  
  *Eksimusi tabeli täitmisel:* 1 (PT-05 juures sisestasin tabelisse algselt ekslikult oodatavaks 2, kuna ei lugenud spetsifikatsiooni süvenenult, vaid uskusin koodi väljundit; parandatud spetsifikatsiooni järgi oodatavaks 4.00).
- **2. kord:** **6 minutit 28 sekundit**  
  *Eksimusi tabeli täitmisel:* 0.

### Tähelepanek
Käsitsi testimine nõuab iga kord REPL-is käskude uuesti sisestamist, tulemuste silmaga võrdlemist ja tabelisse kandmist. Pärast iga koodimuudatust kulub taas 6–7 minutit ning esineb oht teha inimlikke trükivigu.
