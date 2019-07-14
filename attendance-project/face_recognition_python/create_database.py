import sqlite3

conn = sqlite3.connect('database.db')

c = conn.cursor()

sql = """
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id integer unique primary key autoincrement,
    student_id text,
    name text
);
"""

c.executescript(sql)

conn.commit()

conn.close()

