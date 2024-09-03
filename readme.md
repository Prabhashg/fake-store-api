# Fake Store Backend

### Steps to reproduce output

- add a .env file in root directory
- update .env file as below:

      PORT=8080                             // or anything of your choice
      CORS_ORIGIN="http://localhost:5173"   // origin of your frontend
      DB_USER="postgres"                    // DB Username 
      DB_PASSWORD="postgres"                // DB password
      DB_HOST="localhost"                   // DB host
      DB_PORT=5432                          // DB port
      DB_DATABASE="store"                  // Database name

- setup postgres
  - create a database by name "store"
  - Inside store database, create 2 tables: users and products
  - run following sql query to create the tables and define the schema:
 
        CREATE TABLE accounts (
          user_id SERIAL PRIMARY KEY, 
          name VARCHAR (255) NOT NULL, 
          email VARCHAR (255) UNIQUE NOT NULL, 
          password VARCHAR (255) NOT NULL, 
          created_at TIMESTAMP NOT NULL, 
          last_login TIMESTAMP
        );



        CREATE TABLE products ( 
           id SERIAL PRIMARY KEY,                             
           title VARCHAR (50) UNIQUE NOT NULL,                
           description VARCHAR (255) NOT NULL,                
           rating_rate SMALLINT NOT NULL,                     
           rating_count SMALLINT NOT NULL,                    
           price SMALLINT NOT NULL,                           
           image_url VARCHAR (512) NOT NULL,                  
           created_at TIMESTAMP NOT NULL,                     
           created_by VARCHAR (255) NOT NULL)                 
        );

- Run following commands in terminal :
  
      npm install
      npm run dev