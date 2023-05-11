import * as React from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabContext, TabPanel } from '@mui/lab';
import { FormControl, InputLabel, Select, MenuItem, getNativeSelectUtilityClasses } from '@mui/material';
import AppBarMenu from '../components/AppBarMenu';
import axios from 'axios';
import { convertToNullableNumber } from '../utils/utils.js';


export default function Estimate() {

  // ダイアログ
  const [open, setOpen] = React.useState(false);
  // メッセージ
  const [msg, setMsg] = React.useState({ "id": "000", "msg": "初期メッセージ" });
  // 明細No
  const [value, setValue] = React.useState("1")
  // 単位（select）
  const [salesUnitValue, setSalesUnitValue] = React.useState("0");

  const selectHandleChange = (event) => {
    setSalesUnitValue(event.target.value);
  };

  // ダイアログオープン
  const handleClickOpen = (response) => {
    setOpen(true);
    setMsg({ "id": "000", "msg": response.data.msg });
  };

  // ダイアログクローズ
  const handleClose = () => {
    setOpen(false);
  };

  // 明細No設定
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 明細数を元に配列を作成する関数を作成する
  // それを呼び出して下記を取得する
  const tabs = [
    { "value": "1", "label": "明細１" },
    { "value": "2", "label": "明細２" },
    { "value": "3", "label": "明細３" },
    { "value": "4", "label": "明細４" },
    { "value": "5", "label": "明細５" },
    { "value": "6", "label": "明細６" },
    { "value": "7", "label": "明細７" },
    { "value": "8", "label": "明細８" },
    { "value": "9", "label": "明細９" },
    { "value": "10", "label": "明細１０" },
    { "value": "11", "label": "明細１１" },
    { "value": "12", "label": "明細１２" },
    { "value": "13", "label": "明細１３" },
    { "value": "14", "label": "明細１４" },
    { "value": "15", "label": "明細１５" },
  ];

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

    axios.post('http://172.28.73.88:8080/api/estimate/header', {
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

  // 明細登録ボタン
  const handleDetailSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);


    const aaa = data.get('customerName');

    axios.post('http://172.28.73.88:8080/api/estimate/detail', {
      rowNo: data.get('rowNo'), //行番号
      itemCode: data.get('itemCode'), //商品コード
      itemName: data.get('itemName'), //商品名
      salesQuantity: convertToNullableNumber(data.get('salesQuantity')), // 販売数量
      salesUnit: data.get('salesUnit'), // 販売単位
      salesPrice: convertToNullableNumber(data.get('salesPrice')), // 販売単価
      salesAmount: convertToNullableNumber(data.get('salesAmount')), // 販売金額
      costPrice: convertToNullableNumber(data.get('costPrice')), // 販売原価
      costAmount: convertToNullableNumber(data.get('costAmount')), // 原価金額
      profit: convertToNullableNumber(data.get('profit')), // 粗利
      taxedUnit: data.get('taxedUnit'), // 課税区分
      apply: data.get('apply'), // 適用
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
      <Accordion defaultExpanded={true}>
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
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "200px" }}
            >
              見積登録
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>見積明細</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="form"
            onSubmit={handleDetailSubmit}
            sx={{ border: 10 }}
          >
            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 600, border: 5 }} >
              <TabContext value={value}>
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                  {tabs.map((tab, index) => (
                    <Tab key={index} label={tab.label} value={tab.value} />
                  ))}
                </Tabs>
                <TabPanel value={value}>
                  <Box sx={{ display: "flex", justifyContent: "left", alignItems: "flex-start", height: 80, width: 1000, padding: 2, border: 1, borderColor: "blue" }}>
                    <Box sx={{ padding: 2 }} >
                      <TextField id="itemCode" name="itemCode" label="商品コード" inputProps={{ maxLength: 5, size: 10 }} InputLabelProps={{ shrink: true, required: true }} />
                    </Box>
                    <Box sx={{ padding: 2 }} >
                      <TextField id="itemName" name="itemName" label="商品名" inputProps={{ maxLength: 20, size: 40 }} InputLabelProps={{ shrink: true, required: true }} />
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "left", alignItems: "flex-start", height: 80, width: 1000, padding: 2, border: 1, borderColor: "blue" }}>
                    <Box sx={{ padding: 2 }} >
                      <TextField id="salesQuantity" name="salesQuantity" label="数量" inputProps={{ maxLength: 5, size: 5 }} InputLabelProps={{ shrink: true, required: true }} />
                    </Box>
                    <Box sx={{ padding: 2 }} >
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">単位</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="salesUnit"
                          value={salesUnitValue}
                          onChange={selectHandleChange}
                        >
                          <MenuItem value={"0"}><em></em></MenuItem>
                          <MenuItem value={"1"}>式</MenuItem>
                          <MenuItem value={"2"}>個</MenuItem>
                          <MenuItem value={"3"}>台</MenuItem>
                          <MenuItem value={"4"}>箱</MenuItem>
                          <MenuItem value={"5"}>セット</MenuItem>
                          <MenuItem value={"6"}>枚</MenuItem>
                          <MenuItem value={"7"}>本</MenuItem>
                          <MenuItem value={"8"}>基</MenuItem>
                          <MenuItem value={"9"}>冊</MenuItem>
                          <MenuItem value={"10"}>ケース</MenuItem>
                          <MenuItem value={"11"}>ｋｇ</MenuItem>
                          <MenuItem value={"12"}>ｍ</MenuItem>
                        </Select>
                      </FormControl>
                      {/* <TextField id="salesUnit" name="salesUnit" label="単位" inputProps={{ maxLength: 5, size: 5 }} InputLabelProps={{ shrink: true, required: true }} /> */}
                    </Box>
                    <Box sx={{ padding: 2 }} >
                      <TextField id="salesPrice" name="salesPrice" label="販売単価" inputProps={{ maxLength: 5, size: 5 }} InputLabelProps={{ shrink: true, required: true }} />
                    </Box>
                    <Box sx={{ padding: 2 }} >
                      <TextField id="salesAmount" name="salesAmount" label="販売金額" inputProps={{ maxLength: 5, size: 5 }} InputLabelProps={{ shrink: true, required: true }} />
                    </Box>
                    <Box sx={{ padding: 2 }} >
                      <TextField id="taxedUnit" name="taxedUnit" label="課税区分" inputProps={{ maxLength: 5, size: 5 }} InputLabelProps={{ shrink: true, required: true }} />
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "left", alignItems: "flex-start", height: 80, width: 1000, padding: 2, border: 1, borderColor: "blue" }}>
                    <Box sx={{ padding: 2 }} >
                      <TextField id="salesQuantity2" name="salesQuantity2" label="数量" disabled={true} inputProps={{ maxLength: 5, size: 5 }} InputLabelProps={{ shrink: true, required: true }} />
                    </Box>
                    <Box sx={{ padding: 2 }} >
                      <TextField id="salesUnit2" name="salesUnit2" label="単位" inputProps={{ maxLength: 5, size: 5 }} InputLabelProps={{ shrink: true, required: true }} />
                    </Box>
                    <Box sx={{ padding: 2 }} >
                      <TextField id="costPrice" name="costPrice" label="販売原価" inputProps={{ maxLength: 5, size: 5 }} InputLabelProps={{ shrink: true, required: true }} />
                    </Box>
                    <Box sx={{ padding: 2 }} >
                      <TextField id="costAmount" name="costAmount" label="原価金額" inputProps={{ maxLength: 5, size: 5 }} InputLabelProps={{ shrink: true, required: true }} />
                    </Box>
                    <Box sx={{ padding: 2 }} >
                      <TextField id="profit" name="profit" label="粗利" inputProps={{ maxLength: 5, size: 5 }} InputLabelProps={{ shrink: true, required: true }} />
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "left", alignItems: "flex-start", width: 1000, padding: 2, border: 1, borderColor: "blue" }}>
                    <Box sx={{ padding: 2 }} >
                      <TextField id="apply" name="apply" label="適用" inputProps={{ maxLength: 60, size: 60 }} InputLabelProps={{ shrink: true, required: true }} />
                    </Box>
                  </Box>
                </TabPanel >
              </TabContext >
            </Box>
            <Box
              sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 100, border: 1 }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "200px", height: "40px" }}
              >
                明細登録
              </Button>
              <TextField type="hidden" id="rowNo" name="rowNo" value={value} style={{ display: 'none' }} />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion >
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
