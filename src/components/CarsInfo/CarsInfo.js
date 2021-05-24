import React, {useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import yellow from '@material-ui/core/colors/yellow';
import {createMuiTheme, makeStyles, ThemeProvider} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {getCars, getCarsByRegion, getCarsByYear, getCarsByYearAndRegion} from "../../actions/carActions";
import {Box, Grid, InputBase, TableCell, TableRow, TextField, withStyles} from "@material-ui/core";
import {getRegions} from "../../actions/regionsActions";
import {blue} from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#073b5b',
            '&:focus': {
                backgroundColor: "#073b5b",
            }
        },
        secondary: {
            main: yellow['50'],
        },
        action: {
            focus: '#073b5b',

        }
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #484850",
        borderRadius: "5px",
        outline: "none"
    },
    overrides: {
        Mui: {


            '&$focused': {
                backgroundColor: 'red',
                "& .MuiOutlinedInput-notchedOutline":
                    {
                        backgroundColor: "blue",
                        border: "1px solid #484850",
                        borderRadius: "5px 5px 0 0"
                    },

            },

            focused: {
                "&.MuiOutlinedInput-notchedOutline":
                    {
                        backgroundColor: "blue"
                    },
                backgroundColor: yellow['50'],
                '&$focus': {
                    backgroundColor: 'red',
                },
            },
        },
        MuiSelect: {
            select: {
                // backgroundColor: yellow['50'],

                "&:focus": {
                    backgroundColor: yellow['50'],
                    // "&:focus": {
                    //     backgroundColor: yellow['100'],

                    //
                    // },
                    "&$selected": {
                        backgroundColor: "red",
                        "&:hover": {
                            backgroundColor: "green"
                        }
                    }
                },
                "&:not([multiple]) option": {
                    backgroundColor: yellow['50'],
                    "& li:hover": {
                        backgroundColor: "#212039"
                    },
                    "&:hover": {
                        backgroundColor: "white"
                    }
                },
            },

            MuiMenuItem: {
                root: {
                    fontSize: 12,
                },
            },

        }
    }
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
            flexDirection: 'column',
            // flexWrap: "nowrap",
            padding: "1px 0 0 1px",
            boxSizing: "border-box",
            boxShadow: "inset 0 0 0 1px #073b5b",
            justifyContent: 'flex-start'
        },
        tableHeader: {
            display: "flex",
            // padding: '10px 2px',
            fontSize: '10px',
            // border: none,
            // fontFamily: 'Verdana, sans-serif',
            border: '1px solid #337AB7',
            verticalAlign: 'top',
            color: '#FFF',
            background: '#073b5b',
            fontWeight: 'bold',
            boxShadow: "inset 0 0 0 1px #001F32",
            textTransform: 'uppercase',
            textAlign: 'center',
            [theme.breakpoints.down('xs')]: {
                display: "none",
            },

        },
        tableHeaderSpan: {
            display: "none",
            // flexDirection: 'row',
            // padding: '10px 20px',
            fontSize: '11px',
            // border: none,
            // fontFamily: 'Verdana, sans-serif',
            // border: '1px solid #337AB7',
            verticalAlign: 'top',
            textAlign: "center",
            color: '#FFF',
            background: '#073b5b',
            fontWeight: 'bold',
            boxShadow: "inset 0 0 0 1px #FFF",
            textTransform: 'uppercase',
            [theme.breakpoints.down('xs')]: {
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center'
            }
        },
        row: {
            display: "flex",
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column',
            }
        },
        headerField: {
            flex: "1 1 50px",
            border: "1px solid #FFF",
            margin: "-1px 0 0 -1px",
            boxSizing: "border-box",
            borderCollapse: 'collapse',
            padding: '10px 2px',
            "&:nth-child(1)": {
                minWidth: '40px',
            },
            "&:nth-child(2)": {
                flexBasis: '200px',
                minWidth: '150px'

            },
        },
        field: {
            display: "flex",
            flex: "1 1 50px",
            color: "black",
            border: "1px solid #073b5b",
            margin: "-1px 0 0 -1px",
            padding: '2px',
            boxSizing: "border-box",
            borderCollapse: 'collapse',
            textAlign: 'center',
            "&:nth-child(1)": {
                minWidth: '40px',
            },
            "&:nth-child(2)": {
                background: "rgba(9, 59, 91, .15)",
                flexBasis: '200px',
                minWidth: '150px',
                textAlign: 'left',
                [theme.breakpoints.down('xs')]: {
                    textAlign: 'center',
                    flexBasis: '50px',
                }
            },
            flexDirection: 'column',
            [theme.breakpoints.down('xs')]: {
                padding: '0',
            }
        },
        boldText: {
            fontWeight: "bold",
        },
        dropdownStyle: {
            backgroundColor: "red"
        },
        legend: {
            fontWeight:'bold',
            fontSize:12,
            listStyle: "inside",
            [theme.breakpoints.down('xs')]: {
                display: "none",
            }
        },
        legendItem: {
            margin: '2px auto',
            fontWeight:'normal',
        },
        rootMenuItem: {
            "&$selected": {
                backgroundColor: "red",
                "&:hover": {
                    backgroundColor: "green"
                }
            },
            '&:hover': {
                backgroundColor: 'blue'
            }
        }
        // select:{
        //
        // }
    }))
;
const tableHeader = ["РІК", "РЕГІОН", "ЛЕГКОВИЙ", "ВАНТАЖНИЙ", "АВТОБУС", "ПРИЧІП", "НАПІВПРИЧІП", "МОТОЦИКЛ", "МОПЕД", "ТРИЦИКЛ", "КВАДРОЦИКЛ", "ТРОЛЕЙБУС", "ТРАМВАЙ", "МОТОПРИЧІП"]
const tableHeaderShort = ["Рік", "Регіон", "л-й", "в-й", "а-с", "п-п", "н-п", "м-л", "м-д", "т-л", "к-л", "т-с", "т-й", "м-п"]

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
                        MenuProps={{classes: {option: classes.dropdownStyle}}}
                    >
                        {years.map((item, index) =>
                            <option key={item[index]} value={item}
                                    className={classes.rootMenuItem}>{item}</option>
                        )}
                        <option value={1} className={classes.boldText}>{yearFrom}-{yearTo}</option>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">Регіон</InputLabel>
                    <Select
                        native
                        value={region}
                        onChange={changeRegion}
                        label="Регіон"
                        className={classes.select}
                        inputProps={{
                            name: 'region',
                            id: 'outlined-age-native-simple',
                        }}
                    >
                        {regions && regions.map((item, index) =>
                            <option key={regions[index]} value={item}>{item}</option>
                        )}
                        <option value={1} className={classes.boldText}>ВCІ РЕГІОНИ</option>
                    </Select>
                </FormControl>
                <div className={classes.grid}>

                    <div className={classes.tableHeader}>
                        {tableHeaderShort.map((item, index) =>
                            <div className={classes.headerField} key={tableHeader[index]}>
                                {item}
                            </div>)}
                    </div>
                    {cars && cars.metaData !== undefined && cars.rows.map((item, index) =>
                        <>
                            {/*<div className={classes.tableHeader}>*/}
                            {/*    {tableHeader.map((item, index) =>*/}
                            {/*        <div className={classes.headerField} key={tableHeader[index]}>*/}
                            {/*            {item}*/}
                            {/*        </div>)}*/}
                            {/*</div>*/}
                            <div className={classes.row}>
                                {cars.metaData.map((itemRow, indexRow) =>
                                    // <Box item key={cars[index]} className={classes.root}>
                                    <div className={classes.field}>
                                        <span className={classes.tableHeaderSpan}>
                                            {tableHeader[indexRow]}
                                        </span>
                                        {cars.rows[index] != undefined ? cars.rows[index][indexRow] : null}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
                <ul className={classes.legend}>Умовні позначення:
                    <li className={classes.legendItem}>л-й - легковий;</li>
                    <li className={classes.legendItem}>в-й - вантажний;</li>
                    <li className={classes.legendItem}>а-с - автобус;</li>
                    <li className={classes.legendItem}>п-п - причіп;</li>
                    <li className={classes.legendItem}>н-п - напівпричіп;</li>
                    <li className={classes.legendItem}>м-л - мотоцикл;</li>
                    <li className={classes.legendItem}>м-д - мопед;</li>
                    <li className={classes.legendItem}>т-л - трицикл;</li>
                    <li className={classes.legendItem}>к-л - квадроцикл;</li>
                    <li className={classes.legendItem}>т-с - тролейбус;</li>
                    <li className={classes.legendItem}>т-й - трамвай;</li>
                    <li className={classes.legendItem}>м-п - мотопричіп;</li>
                </ul>
            </ThemeProvider>
        </Container>
    )
}