function InstallDB(request, response, pool) {
        let result = "", query = "SELECT * FROM pg_database where datname = 'xyblog'";
        pool.query(query, (error, results) => {
                if (error) {
                        console.log(error);
                        result = "I'm sorry. I failed you<br>" + error
                        response.send(result);
                        return;
                }
                if (results.rows.length == 0) {
                        result += "Database doesn't exist. Creating ....<br>"
                        query = "CREATE DATABASE xyblog";
                        pool.query(query, (error, results) => {
                                if (error) {
                                        console.log(error);
                                        result += "Failed to create database" + error;
                                        response.send(result);
                                        return;
                                }
                                result += "Created database<br>";
                        })
                } else {
                        result += "Database exists<br>";
                }
                query = "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, displayName TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL)";
                pool.query(query, (error, results) => {
                        if (error) {
                                console.log(error);
                                result += "Failed to create table users" + error;
                                response.send(result);
                                return;
                        }
                        result += "Created table users<br>";
                        query = "CREATE TABLE IF NOT EXISTS posts (id SERIAL PRIMARY KEY, title TEXT, body TEXT, author INT, createdTS TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, modifiedTS TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)";
                        pool.query(query, (error, results) => {
                                if (error) {
                                        console.log(error);
                                        result += "failed to create table posts" + error;
                                        response.send(result);
                                        return;
                                }
                                result += "Created table posts<br>"
                                query = "CREATE TABLE IF NOT EXISTS tags (id SERIAL PRIMARY KEY, name TEXT, description TEXT)";
                                pool.query(query, (error, results) => {
                                        if (error) {
                                                console.log(error);
                                                result += "failed to create table tags" + error;
                                                response.send(result);
                                                return;
                                        }
                                        result += "Created table tags<br>"
                                        query = "CREATE TABLE IF NOT EXISTS postTags (tag_id INT, post_id INT)";
                                        pool.query(query, (error, results) => {
                                                if (error) {
                                                        console.log(error);
                                                        result += "failed to create table postTags" + error;
                                                        response.send(result);
                                                        return;
                                                }
                                                result += "Created table postTags<br>"
                                                response.send(result);
                                        });
                                });
                        });
                });
        });
}

module.exports = InstallDB;