var auto = new SequelizeAuto('MEGACASTING', 'adminmegacasting', 't4tX38CwrHQJbDWkl2qr', {
    host: 'megacasting.database.windows.net',
    dialect: 'mssql',
    dialectOptions: {
        encrypt: true,    
        },
    directory: './models', // prevents the program from writing to disk
    port: '',
    
})

