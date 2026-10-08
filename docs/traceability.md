# Traceability Matrix – inventory.js

Jälgitavusmaatriks seob iga esialgse nõude (REQ-01 kuni REQ-08) vastavate testijuhtumitega spetsifikatsioonist (`docs/test-cases.md`), testide nimedega koodifailis (`inventory.test.js`) ning jooksva täitmisstaatusega.

| Requirement | Type | Test cases | Test names in code | Status |
|---|---|---|---|---|
| **REQ-01** | functional | TC-01, TC-02 | `REQ-01 restock adds quantity to existing sku`<br>`REQ-01 restock adds unknown sku to stock`<br>`REQ-01 restock processes multiple deliveries correctly` | PASS |
| **REQ-02** | functional | TC-03 | `REQ-02 restock returns a new object, original unchanged` | PASS |
| **REQ-03** | functional | TC-04 | `REQ-03 restock throws on qty 0`<br>`REQ-03 restock throws on negative qty`<br>`REQ-03 restock throws on non-integer qty`<br>`REQ-03 restock accepts positive boundary qty 1` | PASS |
| **REQ-04** | functional | TC-05, TC-06, TC-07 | `REQ-04 pick reduces quantity on valid input`<br>`REQ-04 pick returns a new object, original unchanged`<br>`REQ-04 pick throws on unknown sku`<br>`REQ-04 pick throws when qty > available stock`<br>`REQ-04 pick throws on invalid qty (0, negative, non-integer)` | PASS |
| **REQ-05** | functional | TC-08 | `REQ-05 findDuplicateSkus returns each duplicate sku once`<br>`REQ-05 findDuplicateSkus returns empty array when no duplicates exist`<br>`REQ-05 findDuplicateSkus returns empty array for empty items list` | PASS |
| **REQ-06** | performance | TC-09 | `REQ-06 findDuplicateSkus handles 20 000 items under 100 ms` | FAIL (630 ms) → fixed (Set) → PASS (3.8 ms) |
| **REQ-07** | security | TC-10, TC-11 | `REQ-07 rejects sku %j (%s)` (7 testiparameetrit: XSS, pikkus >20, tühikud jne)<br>`REQ-07 accepts valid boundary skus (1 to 20 chars, letters, digits, dash)` | PASS |
| **REQ-08** | reliability | TC-12 | `REQ-08 failed restock leaves original stock unchanged`<br>`REQ-08 failed pick leaves original stock unchanged` | PASS |

---

### Uncovered requirements:
**None.** Kõik 8 nõuet on kaetud vähemalt ühe (või mitme) automatiseeritud testiga koodis. Testide koguarv on 27, harude katvus 100 %, ridade katvus 100 %.
