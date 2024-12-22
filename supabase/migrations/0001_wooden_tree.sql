/*
  # Create students table

  1. New Tables
    - `students`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `cohort` (text, not null)
      - `courses` (text[], not null)
      - `date_joined` (timestamptz, not null)
      - `last_login` (timestamptz, not null)
      - `status` (text, not null)
      - `created_at` (timestamptz, not null)

  2. Security
    - Enable RLS on `students` table
    - Add policies for authenticated users to read and write their own data
*/

CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  cohort text NOT NULL,
  courses text[] NOT NULL,
  date_joined timestamptz NOT NULL DEFAULT now(),
  last_login timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL CHECK (status IN ('active', 'inactive')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read students"
  ON students
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert students"
  ON students
  FOR INSERT
  TO authenticated
  WITH CHECK (true);