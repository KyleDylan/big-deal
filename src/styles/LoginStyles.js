const styles = theme => ({
    login: {
        display: 'block',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
        boxShadow: '4px 4px 8px rgba(0,0,0, 0.7)'
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: '#4b6cb7'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    submit: {
        marginTop: theme.spacing(3),
        marginBottom: '15px',
        width: '35%',
        display: 'block',
        margin: 'auto',
        backgroundColor: '#1f3d82',
        color: 'rgb(227, 230, 236)',
        fontWeight: 600,
        fontSize: '18px',
        '&:hover': {
            backgroundColor: '#1c3673',
            boxShadow: '5px 5px 8px rgba(0,0,0, 0.8)',
            color: 'white'
        }
    }
});

export default styles;