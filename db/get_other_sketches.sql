SELECT u.username, s.sketch_name, s.id FROM 
code_along_sketches as s
INNER JOIN code_along_users as u ON s.creator_id = u.id
WHERE u.username NOT IN ($1)
