-- Create posts table
CREATE TABLE posts (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Enable read access for all users" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON posts
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON posts
  FOR DELETE USING (true);

-- Insert sample data
INSERT INTO posts (title, content, author, views, created_at, updated_at) VALUES
('첫 번째 게시물', '환영합니다! 이것은 첫 번째 게시물입니다.', '관리자', 7, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
('두 번째 게시물', 'NextJS와 shadcn/ui로 만든 게시판입니다.', '사용자', 28, '2024-01-02 00:00:00', '2024-01-02 00:00:00');
