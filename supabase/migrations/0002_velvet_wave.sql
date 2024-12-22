-- Drop existing policies
DROP POLICY IF EXISTS "Users can read students" ON students;
DROP POLICY IF EXISTS "Users can insert students" ON students;

-- Create new policies
CREATE POLICY "Enable read access for authenticated users"
ON students FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert access for authenticated users"
ON students FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users"
ON students FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete access for authenticated users"
ON students FOR DELETE
TO authenticated
USING (true);