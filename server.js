const express = require('express');
// const axios = require('axios');
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');
const app = express();
let data;
let regions;

async function run(statement, binds = [], opts = {}) {
    let connection;

    try {
        let sql, binds, options, result;

        connection = await oracledb.getConnection(
            {
                user: 'test',
                password: process.env.NODE_ORACLEDB_PASSWORD || 'test',
                connectString: "10.30.1.38/everest",
            }
        )
        result = await connection.execute(statement);

        // console.log(result.rows)
        console.log('Connection was successful!');
        return result
    } catch (e) {
        console.log(e);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

async function getCars() {
    return await data
}

async function getRegions() {
    return await regions
}

async function getCarsByYear(year) {
    const carsData = await data.rows.filter(function (item) {
        return item[0] == year
    })
    return {
        metaData: data.metaData,
        rows: carsData
    }
}

async function getCarsByRegion(region) {
    const carsData = await data.rows.filter(function (item) {
        return item[1] == region
    })
    return {
        metaData: data.metaData,
        rows: carsData
    }
}

async function getCarsByYearAndRegion(year, region) {
    if (year == 1 && region == 1) {
        return getCars()
    }
    if (year == 1 && region != 1) {
        return getCarsByRegion(region)
    }
    if (year != 1 && region == 1) {
        return await getCarsByYear(year)
    }
    else {
        const carsData = await data.rows.filter(function (item) {
            return item[0] == year && item[1] == region
        })
        return {
            metaData: data.metaData,
            rows: carsData
        }
    }
}

run("SELECT * FROM TYPES_OF_CARS order by YEAR, REGION").then(res => {
    const allRegions = res.rows.map((item) => item[1]).sort();
    data = res;
    regions = Array.from(new Set(allRegions))
//    console.log('regions', regions);
})

app.get('/api/cars', async function (req, res) {
    const data = await getCars();
    res.send(data);
})
app.get('/api/regions', async function (req, res) {
    const data = await getRegions();
    res.send(data);
})
app.get('/api/cars/year', async function (req, res) {
    // const data = await run(`SELECT * from TYPES_OF_CARS t WHERE t.YEAR = ${year} order by YEAR, REGION`)
    getCarsByYear(req.query.year).then(result => {
        res.send(result);
    })
})
app.get('/api/cars/region', async function (req, res) {
    // const data = await run(`SELECT * from TYPES_OF_CARS t WHERE t.YEAR = ${year} order by YEAR, REGION`)
    getCarsByRegion(req.query.region).then(result => {
        res.send(result);
    })
})
app.get('/api/cars/find', async function (req, res) {
    // const data = await run(`SELECT * from TYPES_OF_CARS t WHERE t.YEAR = ${year} order by YEAR, REGION`)
    getCarsByYearAndRegion(req.query.year, req.query.region).then(result => {
        res.send(result);
    })
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`${port} is the magic port`));