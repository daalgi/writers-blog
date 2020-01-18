import React, { useState, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
    AppBar, Toolbar, Drawer, CssBaseline,
    MenuList, MenuItem,
    IconButton, Typography, Hidden
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Menu } from '@material-ui/icons'


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        // Appbar from the drawer to the end of the screen
        /*[theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },*/
        // Appbar at the top
        zIndex: theme.zIndex.drawer + 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    nested: {
        paddingLeft: theme.spacing(4)
    },
}))

const Layout = props => {
    const { container, location: { pathname }, children, writers } = props
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false)


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const drawer = (
        <div>
            <Hidden smDown>
                <div className={classes.toolbar} />
            </Hidden>
            <MenuList>
                <MenuItem component={Link} to="/" selected={'/' === pathname}>
                    Home
                </MenuItem>
                <MenuItem component={Link} to="/writers" selected={'/writers' === pathname}>
                    Writers
                </MenuItem>
                <MenuList>
                    {writers.map(({ id, name }) => {
                        const to = `/writers/${id}`
                        return <MenuItem
                            className={classes.nested}
                            key={id}
                            component={Link}
                            to={to}
                            selected={to === pathname}
                        >
                            {name}
                        </MenuItem>
                    })}
                </MenuList>
            </MenuList>
        </div>
    )

    return (
        <Fragment>
            <CssBaseline />
            <div className={classes.root}>

                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Writers Blog
                        </Typography>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {children}
                </main>
            </div>
        </Fragment>
    )
}

export default withRouter(Layout)