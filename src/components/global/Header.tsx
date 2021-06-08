import { AppBar, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle, WbSunny, WbSunnyOutlined } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router';
import { UserApi } from '../../api';
import { ThemeName } from '../../models/user';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectUserLogged, selectUserTheme, setUserDetails, setUserTheme } from '../../store/userSlice';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    themeMargin: {
        marginRight: '20px',
    },
}));

export function Header(): JSX.Element {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const isLogged = useAppSelector(selectUserLogged);
    const theme = useAppSelector(selectUserTheme);

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleTheme = async (theme: ThemeName) => {
        await UserApi.UpdateTheme({ theme: theme });
        dispatch(setUserTheme(theme));
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function Logout() {
        setAnchorEl(null);
        localStorage.clear();
        dispatch(setUserDetails({ displayName: '', logged: false }));
        dispatch(setUserTheme('None'));
        history.push('/');
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Investager
                </Typography>
                {isLogged && (
                    <div>
                        {theme !== 'Light' && <IconButton
                            className={classes.themeMargin}
                            aria-label="theme"
                            onClick={() => handleTheme('Light')}
                        >
                            <WbSunny />
                        </IconButton>}

                        {theme === 'Light' && <IconButton
                            className={classes.themeMargin}
                            aria-label="theme"
                            onClick={() => handleTheme('Dark')}
                        >
                            <WbSunnyOutlined />
                        </IconButton>}

                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            getContentAnchorEl={null}
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'center',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={Logout}>Logout</MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}
