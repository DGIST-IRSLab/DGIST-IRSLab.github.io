# DGIST IRS Lab Website Development Guidelines

## ⚠️ 필수 협업 규칙 (Shared Repository Rules)

이 저장소는 DGIST Intelligent Radio Sensing Lab 연구실 구성원 및 다양한 환경에서 함께 작업하는 **공동 공유 저장소(Shared Repository)**입니다. 
작업 시 아래 규칙을 반드시 준수해야 합니다.

1. **작업 시작 전 원격 저장소 동기화 (Always Pull First)**:
   - 새로운 작업을 시작하거나 파일을 수정하기 전, **반드시 `git pull origin main`**을 실행하여 최신 커밋 상태를 로컬에 반영해야 합니다.
   - 항상 원격 브랜치와의 차이점 및 충돌(Conflict) 가능성을 사전에 확인합니다.

2. **충돌(Conflict) 방지 및 안전한 병합**:
   - 로컬에 작업 중인 변경 사항이 있을 때는 `git stash` 또는 적절한 브랜칭을 통해 안전하게 최신 원격 변경 사항과 통합합니다.
   - 충돌이 발생한 경우 임의로 코드를 덮어쓰지 말고, 충돌 영역을 신중히 확인한 후 해결합니다.

3. **빌드 검증 후 커밋/푸시**:
   - 코드 수정 완료 후 커밋하기 전에 반드시 `npm run build` (또는 TypeScript 컴파일)를 실행하여 빌드 에러가 없는지 확인합니다.
   - 커밋 메시지는 어떤 변경이 이루어졌는지 명확하고 직관적인 컨벤션(`feat:`, `style:`, `fix:`, `chore:` 등)으로 작성합니다.

---

## 🛠 프로젝트 개요 및 구조

- **Stack**: React 18, TypeScript, Vite
- **배포 환경**: GitHub Pages (`https://dgist-irslab.github.io/`)
- **주요 데이터 파일**:
  - `src/data/professorData.ts`: 연구책임자(P.I) 프로필, 학력/경력, 연구과제 등
  - `src/data/peopleData.ts`: 교수님, 연구원, 대학원생, 학부연구생, 알럼나이 멤버 데이터
  - `src/data/newsData.ts`: 연구실 소식 및 공지사항
  - `src/data/publicationsData.ts`: 논문 및 학술 발표 자료
  - `src/data/researchData.ts`: 핵심 연구 분야 소개
- **주요 에셋 디렉토리**:
  - `public/images/logopic/`: 연구실 및 기관 로고
  - `public/images/institution/`: 교수님 약력/학력 기관 로고
  - `public/images/teampic/`: 연구실 구성원 프로필 사진
