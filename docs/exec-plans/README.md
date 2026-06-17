# Exec Plans — 일급 아티팩트로서의 계획

계획은 일급 아티팩트다. 큰 작업은 먼저 여기에 계획을 적고 진행한다.

- `active/` — 진행 중인 계획. SessionStart 훅이 자동 주입한다.
- `completed/` — 완료된 계획(기록 보존).
- `tech-debt/` — 미뤄둔 기술 부채(나중에 `/cleanup` 으로 회수).

계획 파일은 `NNN-<kebab-title>.md` 로, 목표·단계·정의완료(DoD)·검증 방법을 담는다.
완료되면 `completed/` 로 옮긴다.
