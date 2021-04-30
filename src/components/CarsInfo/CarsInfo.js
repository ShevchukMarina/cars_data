import React, {useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import yellow from '@material-ui/core/colors/yellow';
import {createMuiTheme, makeStyles, ThemeProvider} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {getCars, getCarsByRegion, getCarsByYear, getCarsByYearAndRegion} from "../../actions/carActions";
import {Box, Grid, TableCell, TableRow, TextField, withStyles} from "@material-ui/core";
import {getRegions} from "../../actions/regionsActions";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#073b5b',
        },
        secondary: {
            main: yellow['50'],
        },
    },
});
const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        grid: {
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: 'flex-start'
        },
        field: {
            flex: "1 1 auto",
            color: "black"
            // width:'100px'
        },
        respTab: {
            // display: 'flex',
            borderRadius: '5px',
            fontWeight: 'normal',
            border: 'none',
            borderCollapse: 'collapse',
            width: '100%',
            maxWidth: '100%',
        },
        respTabTd: {
            padding: '10px 20px',
            fontSize: '13px',
            // border: none,
            fontFamily: 'Verdana, sans-serif',
            border: '1px solid #073b5b',
            verticalAlign: 'top',
            [theme.breakpoints.down('md')]: {
                margin: '0 1px  1px  0',
                paddingTop: '35px',
                position: 'relative',
                width: ' 50 %'
            },
            [theme.breakpoints.down('sm')]: {
                width: ' 100 %'
            }
        },
        respTabTh: {
            padding: '10px 20px',
            fontSize: '13px',
            // border: none,
            fontFamily: 'Verdana, sans-serif',
            // border: '1px solid #337AB7',
            verticalAlign: 'top',
            color: '#FFF',
            background: '#073b5b',
            fontWeight: 'bold',
            border: '1px solid #1a4a73',
            textTransform: 'uppercase',
            textAlign: 'center',
        },
// respTaTr:nth-child(even) {
//     background: #edf7ff;
// }
        respTabTdSpan: {
            background: '#073b5b',
            color: '#FFF',
            display: 'none',
            fontSize: '11px',
            fontWeight: 'bold',
            fontFamily: 'Verdana, sans-serif',
            textTransform: 'uppercase',
            padding: '5px 10px',
            position: 'absolute',
            top: 0,
            left: 0,
            [theme.breakpoints.down('md')]: {
                display: 'block',
            }
        },
        respTabThead: {
            [theme.breakpoints.down('md')]: {
                display: 'none',
            }
        },
        respTabTr: {
            [theme.breakpoints.down('md')]: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom: '30px',
            }
        },
    }))
;

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export default function CarsInfo() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [year, setYear] = useState('1');
    const [prevYear, setPrevYear] = useState(year);
    const [region, setRegion] = useState('1');
    const [prevRegion, setPrevRegion] = useState(region);
    // console.log('year', year);
    // console.log('prevYear', prevYear);
    const yearFrom = 2013;
    const yearTo = 2020;

    function getYears(from, to) {
        let arr = [];
        for (let i = from; i <= to; i++) {
            arr.push(i);
        }
        return arr;
    }

    const years = getYears(yearFrom, yearTo);
    const {
        pendingCars,
        pendingCarsByYear,
        pendingCarsByYearAndRegion,
        pendingRegions,
        cars,
        regions
    } = useSelector(state => ({
        pendingCars: state.cars.pendingCars,
        pendingCarsByYear: state.cars.pendingCarsByYear,
        pendingCarsByYearAndRegion: state.cars.pendingCarsByYearAndRegion,
        pendingRegions: state.regions.pendingRegions,
        cars: state.cars.cars,
        regions: state.regions.regions
    }))
    const changeCarsByYear = (e) => {
        // console.log(event.target.value);
        setYear(e.target.value)
    };
    const changeRegion = (e) => {
        setRegion(e.target.value)
    }
    useEffect(() => {
        if (!cars && !regions) {
            dispatch(getCars());
            dispatch(getRegions())
        }
        // if (year != 1 && region != 1 && prevYear != year || year != 1 && region != 1 && prevRegion != region) {
        if (prevYear != year || prevRegion != region) {
            console.log('year', year);
            console.log('region', region);
            dispatch(getCarsByYearAndRegion(
                {
                    'year': year,
                    'region': region
                }))
            if (prevYear != year) setPrevYear(year);
            if (prevRegion != region) setPrevRegion(region);
        }

        // if (year == 1 && prevYear != year || region == 1 && prevRegion != region) {
        //     console.log('year', year);
        //     console.log('region', region);
        //     console.log('prevYear', prevYear);
        //     console.log('prevRegion', prevRegion);
        //     if (prevRegion != region) {
        //         console.log('оилрдлд');
        //         dispatch(getCarsByRegion({
        //             'region': region
        //         }))
        //     }
        //     if (prevYear != year) {
        //         dispatch(getCarsByYear({
        //             'year': year,
        //         }))
        //     }
        //
        //     if (prevYear != year) setPrevYear(year);
        //     if (prevRegion != region) setPrevRegion(region);
        // }
        // if (year == 1 && region == 1 &&  prevYear != year || prevRegion != region) {
        //     console.log('year', year);
        //     console.log('region', region);
        //     console.log('prevYear', prevYear);
        //     console.log('prevRegion', prevRegion);
        //     dispatch(getCars())
        //     if (prevYear != year) setPrevYear(year);
        //     if (prevRegion != region) setPrevRegion(region);
        // }

    }, [pendingCars, pendingCarsByYear, pendingRegions, pendingCarsByYearAndRegion, cars, regions, dispatch, prevYear, year, region, prevRegion])


    return (
        <Container>
            <ThemeProvider theme={theme}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">Рік</InputLabel>
                    <Select
                        native
                        value={year}
                        onChange={changeCarsByYear}
                        label="Рік"
                        inputProps={{
                            name: 'year',
                            id: 'outlined-age-native-simple',
                        }}
                    >
                        {years.map((item, index) =>
                            <option key={item[index]} value={item}>{item}</option>
                        )}
                        <option value={1}>{yearFrom}-{yearTo}</option>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">Регіон</InputLabel>
                    <Select
                        native
                        value={region}
                        onChange={changeRegion}
                        label="Регіон"
                        inputProps={{
                            name: 'region',
                            id: 'outlined-age-native-simple',
                        }}
                    >
                        {regions && regions.map((item, index) =>
                            <option key={regions[index]} value={item}>{item}</option>
                        )}
                        <option value={1}>Всі регіони</option>
                    </Select>
                </FormControl>
                <div className={classes.grid}>
                    {cars && cars.metaData !== undefined && cars.rows.map((item, index) =>
                        <div className={classes.row}>
                           {cars.rows.map((itemRow, indexRow) =>
                                // <Box item key={cars[index]} className={classes.root}>
                                <div className={classes.field}>
                                    {cars.rows != undefined && cars.rows[indexRow] != undefined ? cars.rows[index][indexRow] : null}
                                </div>
                            )

                            }</div>
)}
                </div>

                <table className={classes.respTab}>
                    <thead className={classes.respTabThead}>
                    <tr>
                        {cars && cars.metaData !== undefined && cars.metaData.map((item, index) =>
                            <th className={classes.respTabTh} key={cars[index]}>
                                {item.name}
                            </th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {cars && cars.metaData !== undefined && cars.rows !== undefined && cars.rows.map((item, index) =>
                        <tr>{cars.metaData.map((itemRow, indexRow) =>
                            <td className={classes.respTabTd}>
                                <span className={classes.respTabTdSpan}
                                      value={item.name}>{cars.metaData[indexRow].name}</span>
                                {cars.rows[index] != undefined ? cars.rows[index][indexRow] : null}
                            </td>)}
                        </tr>)}
                    </tbody>
                </table>
            </ThemeProvider>
        </Container>
    )
}