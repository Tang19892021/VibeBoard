# VibeBoard - 게시판 사이트

Next.js, TypeScript, shadcn/ui, 그리고 Supabase로 만든 현대적인 게시판 애플리케이션입니다.

## 기술 스택

- **Frontend**: Next.js 16, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **ORM**: Drizzle ORM

## 시작하기

### 1. Supabase 설정

1. [Supabase](https://supabase.com)에 가입하고 새 프로젝트를 생성합니다.
2. 프로젝트의 **Settings → API**에서 다음 정보를 복사합니다:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. 데이터베이스 테이블 생성

Supabase SQL Editor에서 다음 SQL을 실행합니다:

```sql
CREATE TABLE posts (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RLS(Row Level Security) 정책 설정
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON posts
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON posts
  FOR DELETE USING (true);
```

### 3. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 개발 서버 실행

```bash
npm install
npm run dev
```

[http://localhost:3001](http://localhost:3001)에서 애플리케이션을 볼 수 있습니다.

## 주요 기능

- ✨ 게시물 목록 조회
- ✍️ 새 게시물 작성
- 👁️ 게시물 상세 조회 (조회수 자동 증가)
- ✏️ 게시물 수정
- 🗑️ 게시물 삭제

## 프로젝트 구조

```
src/
├── app/                 # Next.js App Router
├── components/          # React 컴포넌트
├── lib/                # 유틸리티 및 클라이언트
│  ├── supabase.ts      # Supabase 클라이언트
│  └── storage.ts       # 데이터베이스 작업
└── types/              # TypeScript 타입
```

## 배포

Vercel에 배포하려면:

1. 이 저장소를 GitHub에 푸시합니다.
2. [Vercel](https://vercel.com)에서 새 프로젝트를 생성합니다.
3. 환경 변수를 설정합니다.
4. 배포합니다.

## 라이선스

MIT
