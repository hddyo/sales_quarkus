import * as React from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AppBarMenu from '../components/AppBarMenu';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import axios from 'axios';

export default function Estimate() {

  // ダイアログ
  const [open, setOpen] = React.useState(false);
  // メッセージ
  const [msg, setMsg] = React.useState({ "id": "000", "msg": "初期メッセージ" });

  // ダイアログオープン
  const handleClickOpen = (response) => {
    setOpen(true);
    setMsg({ "id": "000", "msg": response.data.msg });
  };

  // ダイアログクローズ
  const handleClose = () => {
    setOpen(false);
  };

  // エラーハンドル
  const errorHandler = (error) => {
    if (error.response) {
      setMsg({ "id": "000", "msg": error.response.data.msg });
    } else {
      setMsg({ "id": "000", "msg": "データ送信に失敗しました。" });
    }
    setOpen(true);

  }

  // 見積登録ボタン
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios.post('http://localhost:8080/api/estimate', {
      estimateDate: data.get('estimateDate'), //見積日時
      customerName: data.get('customerName'),
      subject: data.get('subject'),
      deliveryDeadline: data.get('deliveryDeadline'),
      deliveryLocation: data.get('deliveryLocation'),
      estimateExpirationDate: data.get('estimateExpirationDate'),
      responsiblePerson: data.get('responsiblePerson'),
      paymentCriteria: data.get('paymentCriteria'),
      overview: data.get('overview'),
    })
      .then((response) => {
        handleClickOpen(response);
      })
      .catch((error) => {
        errorHandler(error)
      });
  }

  return (
    <>
      <AppBarMenu />
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>見積ヘッダ</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="estimateNo" name="estimateNo" label="見積番号" variant="standard" InputLabelProps={{ shrink: true, required: true }} />
            <TextField id="estimateDate" name="estimateDate" label="見積日時" type="date" variant="standard" InputLabelProps={{ shrink: true, required: true }} defaultValue="2020-10-11" />
            <TextField id="customerName" name="customerName" label="顧客名" variant="standard" InputLabelProps={{ shrink: true, required: true }} />
            <TextField id="subject" name="subject" label="件名" variant="standard" InputLabelProps={{ shrink: true, required: true }} /><br />
            <TextField id="deliveryDeadline" name="deliveryDeadline" label="受渡期日" variant="standard" InputLabelProps={{ shrink: true, required: true }} />
            <TextField id="deliveryLocation" name="deliveryLocation" label="受渡場所" variant="standard" InputLabelProps={{ shrink: true, required: true }} />
            <TextField id="estimateExpirationDate" name="estimateExpirationDate" label="見積有効期限" variant="standard" InputLabelProps={{ shrink: true, required: true }} />
            <TextField id="responsiblePerson" name="responsiblePerson" label="担当者" variant="standard" InputLabelProps={{ shrink: true, required: true }} /><br />
            <TextField id="paymentCriteria" name="paymentCriteria" label="支払条件" variant="standard" InputLabelProps={{ shrink: true, required: true }} />
            <TextField id="overview" name="overview" label="適用" variant="standard" InputLabelProps={{ shrink: true, required: true }} />
            <br />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              見積登録
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      <br />
      明細
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"メッセージ"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {msg.id}：{msg.msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
