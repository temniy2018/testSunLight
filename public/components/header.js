import React from 'react';
import Grid from '@material-ui/core/Grid';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import s from '../styles/header.module.css';

class Header extends React.Component {
    render() {
        return (
            <div style={{paddingTop: '15px'}}>
                <Grid container justify="flex-end">
                    <NotificationsNoneIcon style={{color: '#fff'}} fontSize="large" />
                    <div className={s.separator} />
                    <div className={s.account}>
                        <AccountCircleIcon fontSize="large" className={s.accountIcon} />
                        <span className={s.accountName}>{this.props.name}</span>
                    </div>    
                </Grid>
                <div>
                    <h3 className={s.text}>Личный профиль</h3>
                    <p className={s.text}>Главная/Личный профиль</p>
                </div>
            </div>
        )
    }
}

export default Header;