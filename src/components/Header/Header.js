import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";

const useStyles = makeStyles({
    container: {
        padding: 0
    },
    root: {
        width: '100%',
        display: "flex",
        flexDirection: "column",
        // flexGrow: 1,
        backgroundColor: '#073b5b',
        color: "white",
        textAlign: "center",
        fontSize: 20
    },
    headerTop: {
        backgroundColor: '#073b5b',
        textAlign: "center",
        fontSize: 20
    },
    buttonItem: {
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-between",
        backgroundColor: '#073b5b'
    },
    button: {
        display: "flex",
        alignItems: "flex-end"
    },
    title: {
        flexGrow: 1,
    },
    card: {
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    media: {
        height: 80,
        width: 80,
        borderRadius: '50%'
    },
    login: {
        display: 'flex',
        alignItems: 'baseline'
    },
    but: {
        fontSize: 18,
        color: teal['50']
    },
    img: {

        width: 38
    },
    menu: {
        backgroundColor: '#073b5b',
        color: teal['50']
    },
    icon: {
        marginRight: 3
    },
    header: {
        margin: "3px 0",
        padding: "10px 0 20px 0"
    },
    subheader: {
        margin: "3px 0",
        fontSize: 12
    }
});

export default function Header() {
    const classes = useStyles()

    return (
        <div title="Головна сторінка" className={classes.root}>
            <div className={classes.containerImg}>
                <img src="/static/img/trezub.png" className={classes.img} alt="Головна сторінка"/>
            </div>
            <h2 className={classes.header}>Дані щодо кількоті зареєстрованих машин</h2>
            {/*<p className={classes.subheader}>Робоче місце оператора call-центру</p>*/}
        </div>
    )
}