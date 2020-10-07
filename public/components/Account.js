import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneIcon from '@material-ui/icons/Phone';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import s from '../styles/account.module.css';

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            name: 'Иванова Анна',
            isNameError: false,
            email: 'ivanova@mail.ru',
            isEmailError: false,
            num: '',
            isNumError: false,
            isConfirmOpen: false,
            isSuccessOpen: false,
        }
    }

    componentDidMount() {
        this.setState({
            name: localStorage.getItem('name') || 'Иванова Анна',
            email: localStorage.getItem('email') || 'ivanova@mail.ru',
            num: localStorage.getItem('num')
        })
    }

    handleChange(e) {
        const name = e.target.id;
        this.setState({[name]: e.target.value}, () => {
            if(name === 'name') {
                this.setState({isNameError: this.state.name && this.state.name.indexOf(' ') !== -1 ? false : true});
            }
            if(name === 'email') {
                const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                this.setState({isEmailError: this.state.email.match(reEmail) ? false : true});
            }
            if(name === 'num') {
                const reNum = /^\d[\d\(\)\ -]{4,14}\d$/;
                this.setState({isNumError: this.state.num.match(reNum) ? false : true});
            }
        });
    }

    openConfirm() {
        if(this.state.name && this.state.email 
            && this.state.num && !this.state.isEmailError 
            && !this.state.isNameError && !this.state.isNumError) {
                this.setState({isConfirmOpen: true})
            }
    }

    close() {
        this.setState({isSuccessOpen: false, isConfirmOpen: false});
    }

    async handleSubmit() {
        localStorage.setItem('name', this.state.name);
        localStorage.setItem('email', this.state.email);
        localStorage.setItem('num', this.state.num);
        this.setState({isSuccessOpen: true, isConfirmOpen: false});
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-token-access': 'random' },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                num: this.state.num
             })
        };
        fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
            .then(response => response.json())
        this.props.getName(this.state.name);
    }

    render() {
        return (
            <React.Fragment>
                <Grid container alignItems="center" justify="space-between" className={s.accountContainer}>
                    <div className={s.accountNameContainer}>
                        <AccountCircleIcon className={s.accountCircle} />
                        <span className={s.accountName}>{localStorage.getItem('name')}</span>
                    </div>
                    {!this.state.isEditing ? (
                    <span className={s.edit} onClick={() => this.setState({isEditing: true})}>
                        Редактировать<EditIcon style={{marginLeft: '10px'}}/>
                    </span>
                    ) : (
                    <span className={s.edit} onClick={() => this.setState({isEditing: false})}>
                        Закрыть<CloseIcon style={{marginLeft: '10px'}}/>
                    </span>
                    )}
                </Grid>

                {!this.state.isEditing ? (
                <div className={s.accountInfoContainer}>
                    <div className={s.accountInfoBlock}>
                        <AlternateEmailIcon fontSize="large" className={s.accountIcon}/>
                        <span className={s.accountInfoText}>{localStorage.getItem('email')}</span>
                    </div>
                    <hr />
                    <div className={s.accountInfoBlock}>
                        <PhoneIcon fontSize="large" className={s.accountIcon}/>
                        <span className={s.accountInfoText}>{localStorage.getItem('num') || 'Укажите номер телефона'}</span>
                    </div>
                </div>
                ) : (
                    <Grid container spacing={2} className={s.accountInfoContainer}>
                        <Grid item xs={4} justify="space-between" style={{display: 'flex'}}>
                            <div className={s.fieldBlock}>
                                <AssignmentIndIcon fontSize="large" className={s.accountIcon} />
                                <TextField
                                    id="name"
                                    label="Фамилия и имя"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    placeholder="Укажите Ваши фамилию и имя"
                                    defaultValue={this.state.name}
                                    className={s.field}
                                    InputProps={{className: s.fieldInput}}
                                    onChange={(e) => this.handleChange(e)}
                                    error={this.state.isNameError}
                                    helperText={this.state.isNameError ? 'Вы неверно указали имя' : null}
                                />
                            </div>
                            <div className={s.separator} />
                        </Grid>
                        <Grid item xs={4} justify="space-between" style={{display: 'flex'}}>
                            <div className={s.fieldBlock}>
                                <AlternateEmailIcon fontSize="large" className={s.accountIcon} />
                                <TextField
                                    id="email"
                                    label="E-mail"
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    placeholder="Укажите Ваш E-mail"
                                    defaultValue={this.state.email}
                                    className={s.field}
                                    InputProps={{className: s.fieldInput}}
                                    onChange={(e) => this.handleChange(e)}
                                    error={this.state.isEmailError}
                                    helperText={this.state.isEmailError ? 'Вы неверно указали E-mail' : null}
                                />
                            </div>
                            <div className={s.separator} />
                        </Grid>
                        <Grid item xs={4} className={s.fieldBlock}>
                            <PhoneIcon fontSize="large" className={s.accountIcon} />
                            <TextField
                                id="num"
                                label="Номер телефона"
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                placeholder="Укажите номер телефона"
                                defaultValue={this.state.num}
                                className={s.field}
                                InputProps={{className: s.fieldInput}}
                                onChange={(e) => this.handleChange(e)}
                                error={this.state.isNumError}
                                helperText={this.state.isNumError ? 'Вы неверно указали номер' : null}
                            />
                        </Grid>
                        <div className={s.buttonContainer}>
                                <Button variant="contained" className={s.button} onClick={() => this.openConfirm()}>Сохранить изменения</Button>
                        </div>
                    </Grid>
                )}
                <div className={s.confirmBg} style={this.state.isConfirmOpen || this.state.isSuccessOpen ? null : {display: 'none'}}>
                    {this.state.isConfirmOpen ? (
                        <div className={s.confirmBlock}>
                            <CloseIcon className={s.close} onClick={() => this.close()}/>
                            <h3>Сохранить изменения?</h3>
                            <div className={s.buttonContainer} style={{margin: '30px 0'}}>
                                    <Button variant="contained" className={s.button} onClick={() => this.handleSubmit()}>Сохранить</Button>
                            </div>
                            <div className={s.buttonContainer}>
                                    <Button variant="contained" className={s.button} onClick={() => this.close()}>Не сохранять</Button>
                            </div>
                        </div>
                    ) : null}
                    {this.state.isSuccessOpen ? (
                        <div className={s.confirmBlock}>
                            <h3>Данные успешно сохранены</h3>
                            <div className={s.buttonContainer}>
                                    <Button variant="contained" className={s.button} onClick={() => this.close()}>Хорошо</Button>
                            </div>
                    </div>
                    ) : null}
                </div>
            </React.Fragment>
        )
    }
}

export default Account;