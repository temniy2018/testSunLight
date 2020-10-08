import React from 'react';
import Grid from '@material-ui/core/Grid';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import s from '../styles/header.module.css';

class Header extends React.Component {
    render() {
        return (
            <div className={s.headerDiv}>
                <Grid container justify="flex-end" alignItems="center">
                    <NotificationsNoneIcon className={s.notificationIcon} />
                    <div className={s.separator} />
                    <div className={s.account}>
                        <img src="/img/accountIcon.png" className={s.accountIcon} />
                        <span className={s.accountName}>{this.props.name}</span>
                    </div>    
                </Grid>
                <div>
                    <h3 className={s.headerText}>Личный профиль</h3>
                    <p className={s.text}>Главная/Личный профиль</p>
                </div>
            </div>
        )
    }
}

export default Header;