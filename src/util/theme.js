export default {
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  formStyle: {
    form: {
      textAlign: 'center',
    },
    icon: {
      maxWidth: 50,
      margin: '20px auto',
    },
    pageTitle: {
      margin: '10px auto',
    },
    textField: {
      margin: '10px auto',
    },
    button: {
      margin: '20px auto',
    },
    customError: {
      color: '#ff0000',
      fontSize: '0.8rem',
      marginTop: 10,
    },
    invisibleSeparator: {
      border: 'none',
      margin: 4,
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: '20px',
    },
    card: {
      display: 'flex',
      marginBottom: 20,
    },
    cardContent: {
      width: '100%',
      flexDirection: 'column',
      padding: 25
    },
    cover: {
      minWidth: 200,
      objectFit: 'cover'
    },
    handle: {
      width: 60,
      height: 18,
      backgroundColor: '#3f50b5',
      marginBottom: 7
    },
    date: {
      height: 14,
      width: 100,
      backgroundColor: 'rgba(0,0,0,0.3)',
      marginBottom: 10
    },
    fullLine: {
      height: 15,
      width: '90%',
      marginBottom: 10,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    halfLine: {
      height: 15,
      width: '50%',
      marginBottom: 10,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        heigth: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        maxHeight: "200px",
        borderRadius: '50%',
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {

          verticalAlign: 'middle'
        },
        '& a': {
          color: '#3f50b5',
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0',
      },
    },
  }
}