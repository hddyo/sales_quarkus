import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {

  // ダイアログ
  const [open, setOpen] = React.useState(false);
  // エラーメッセージ
  const [error, setError] = React.useState({ id: '', msg: '' });

  const handleClickOpen = (data) => {
    //console.log(data.id);
    //console.log(data.msg);

    setOpen(true);
    setError(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 画面遷移
  let navigate = useNavigate();

  // ログインボタン押下
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      id: data.get('id'),
      password: data.get('password'),
    });

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: data.get('id'), password: data.get('password') })
    };

    let tmp = "";

    fetch('http://localhost:8080/api/login', requestOptions
    ).then((response) => {
      if (response.ok) {
        tmp = 'OK';
        return response.json();
      } else {
        tmp = 'NG';
        return response.json();
      }
    }).then((responsejson) => {
      console.log(tmp);
      if (tmp === 'OK') {
        navigate('/menu');
      } else {
        handleClickOpen(responsejson);
      }
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ログイン
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="ユーザID"
              name="id"
              autoComplete=""
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button variant="outlined" onClick={handleClickOpen}>
              Open alert dialog
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"エラーメッセージ"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {error.id}：{error.msg}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>閉じる</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}