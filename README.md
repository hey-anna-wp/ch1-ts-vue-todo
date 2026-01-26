# ts-vue-todo-ch1

Vue 3 + TypeScript 기반 Todo 앱  
2주 완주 챌린지 (개인)

## Overview

Vue 3 Composition API와 TypeScript를 활용해  
**기본적인 Todo 앱을 단계적으로 설계·구현하는 개인 MVP 프로젝트**입니다.

기능 단위 브랜치 전략을 사용하여  
데이터 구조 → 렌더링 → 기능 추가 → UX 개선 순으로 점진적으로 확장했습니다.

## Demo

- Live: https://ch1-ts-vue-todo.vercel.app
- Preview: (GIF / 스크린샷 추가 예정)

## Project Goal

- Vue 3 Composition API 흐름 익히기
- TypeScript 기반 데이터 구조 설계 연습
- 기능 단위 브랜치 분리 및 단계적 구현
- Todo 앱 MVP 완주

## 기술 스택

- Vue 3
- TypeScript
- Vite
- npm
- Vue Router
- Tailwind CSS (v4)

## 진행 방식

기능 단위로 브랜치를 분리하여 단계적으로 구현합니다.

- 완료 브랜치
  - feat/1-define-todo-structure
  - feat/3-render-todo-list
  - feat/5-6-add-remove-toggle-todo
- 예정 브랜치(Planned)
  - feat/7-add-todo-page
  - feat/8-persist-todo-localstorage
  - feat/9-fab-add-button

## Features (Done)

- [x] Todo 추가 / 삭제
- [x] 완료 여부 토글
- [x] 완료 / 미완료 개수 표시
- [x] Tailwind CSS 기반 UI 구성

## Next (Planned)

- [x] localStorage를 이용한 데이터 유지 (새로고침 유지)
- [ ] Router 기반 신규 페이지 추가
- [ ] Header / Footer UI 보완 및 헤더 메뉴 추가
- [ ] Todo 추가 버튼 UX 개선 (FAB 형태 고려)
- [ ] Todo 리스트 UX 개선
  - 할 일 표시: 한 줄 말줄임(ellipsis)
  - 전체 보기: hover/tooltip으로 전체 텍스트 확인
  - 입력 제한: 최대 50자
  - (선택) 정렬(최신순/오래된순)
  - 할 일이 많아질 경우 페이지네이션 또는 무한 스크롤(선택)
- [ ] Todo 날짜 기능 추가
  - 날짜 선택 입력 (Date Picker)
  - 날짜(일자)별 컬러 마커 표시(팔레트 방식)

## Pages (Planned)

### Home (Main)

- 미완료/완료 Todo를 한 화면에서 관리
- 완료된 할 일은 목록에서 제거하지 않고 "완료" 상태로 표시
- Todo 날짜를 간략히 표시 (YYYY-MM-DD)
- 제목이 길 경우: 한 줄 말줄임 + hover/tooltip로 전체 확인

#### 날짜별 컬러 마커(팔레트) 아이디어

- 각 Todo는 선택한 날짜(일자)를 기준으로 “컬러 마커”를 가짐
- 1일 → 색상 1, 2일 → 색상 2 … 24일 → 색상 24
- 25일 → 다시 색상 1로 순환 (24일 단위 순환)
- TodoItem 앞에 작은 점/클립/바 형태로 표시해
  “언제 해야 하는 할 일인지”를 시각적으로 빠르게 인지

### History (Trash)

- 삭제된 Todo를 모아보는 휴지통 페이지
- 기능 범위:
  - 복구 (Rollback)
  - 삭제 (확인 후 진행)
- 자동 삭제 정책은 이번 MVP 범위에서는 제외

## Folder Structure

```txt
src/
┣ assets/
┣ components/ # 재사용 UI 컴포넌트
┣ views/ # 라우트 단위 페이지
┣ router/ # Vue Router 설정
┣ types/ # TypeScript 타입 정의
┣ composables/ # 공통 로직 (hooks)
┣ utils/ # localStorage, 날짜 유틸
```

## Environment

### Node / nvm

- Node.js: **v22.19.0**
- nvm: **v0.40.3**
- nvm을 사용하여 프로젝트별 Node 버전 관리

## Setup & Install Log

### 기본 설치

```bash
# Node 설치 (nvm 사용)
nvm install 24        # Node 설치
nvm use 24            # Node 사용
echo "24" > .nvmrc    # 프로젝트 Node 버전 고정

# Vue 프로젝트 생성
npm create vue@latest

# 프로젝트 초기 실행
npm install # 의존성 설치
npm run format # 포맷 설정 실행
npm run dev # 개발 서버 실행
```

### 추가 설치

```bash
# Tailwind CSS (Vite 플러그인 방식)
npm install tailwindcss @tailwindcss/vite

# 컴포넌트 자동 import 플러그인
npm i unplugin-vue-components -D

# Prettier + Tailwind 정렬 플러그인
npm i -D prettier-plugin-tailwindcss

# SVG를 Vue 컴포넌트로 사용하기 위한 Vite 플러그인
npm i vite-svg-loader

# Toast / Snackbar UI
npm install vue-sonner
```

---

## Credits / Assets

- **Icons**: Lucide (SVG) via [Iconify](https://icon-sets.iconify.design/lucide/)
