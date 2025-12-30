# ts-vue-todo-ch1

Vue 3 + TypeScript 기반 Todo 앱  
1주 완주 챌린지 (개인)

## Project Goal

- Vue 3 Composition API 흐름 익히기
- TypeScript 기반 데이터 구조 설계 연습
- 단계별 기능 구현을 통한 Todo 앱 완주

## 기술 스택

- Vue 3
- TypeScript
- Vite
- npm
- Tailwind CSS (v4)

## 진행 방식

기능 단위로 브랜치를 분리하여 단계적으로 구현합니다.

- feat/1-define-todo-structure
- feat/2-render-todo-list
- feat/3-add-remove-todo
- feat/4-toggle-todo-complete
- feat/5-add-router(optional)

## Features (WIP)

- [ ] Todo 추가 / 삭제
- [ ] 완료 여부 토글
- [ ] 완료 / 미완료 개수 표시
- [ ] Router를 이용한 페이지 분리
- [ ] Tailwind CSS를 활용한 기본 스타일링

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
```
