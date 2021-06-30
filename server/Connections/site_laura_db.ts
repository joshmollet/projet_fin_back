import * as mariadb from 'mariadb'

export function connect()
{
    return mariadb.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'site_laura'
        });
}