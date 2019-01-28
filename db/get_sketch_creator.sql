SELECT u.username FROM 
code_along_sketches as s
INNER JOIN code_along_users as u ON s.creator_id = u.id
WHERE u.username IN ($1) 
AND WHERE s.sketch_name = $2
