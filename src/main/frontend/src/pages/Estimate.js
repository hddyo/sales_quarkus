import React, { useRef, useEffect } from "react"
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
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import AppBarMenu from '../components/AppBarMenu';
import { convertToNullableNumber } from '../utils/utils.js';

export default function Estimate() {

  const [open, setOpen] = React.useState(false);    // ダイアログ
  const [msg, setMsg] = React.useState({ "id": "000", "msg": "初期メッセージ" });     // メッセージ
  const [estimateNoValue, setEstimateNoValue] = React.useState("");                 // 見積番号
  const [customerNameValue, setcustomerNameValue] = React.useState("");             // 顧客名
  const [rowNo, setRowNo] = React.useState("1");                                    // 明細No
  const [itemCodeValue, setItemCodeValue] = React.useState("");                     // 商品コード
  const [itemNameValue, setItemNameValue] = React.useState("");                     // 商品名
  const [salesQuantityValue, setSalesQuantityValue] = React.useState("");           // 売上数量
  const [salesUnitValue, setSalesUnitValue] = React.useState("0");                  // 単位（選択値）
  const [salesPriceValue, setSalesPriceValue] = React.useState("");                 // 販売単価
  const [salesAmountValue, setSalesAmountValue] = React.useState("");               // 販売金額
  const [taxedUnitValue, setTaxedUnitValue] = React.useState("0");                  // 課税区分（選択値）
  const [salesQuantityValue2, setSalesQuantityValue2] = React.useState("");         // 仕入数量
  const [costPriceValue, setCostPriceValue] = React.useState("");                   // 販売原価
  const [costAmountValue, setCostAmountValue] = React.useState("");                 // 原価金額
  const [profitValue, setProfitValue] = React.useState("");                         // 粗利
  const [applyValue, setApplyValue] = React.useState("");                           // 適用
  const [deliveryDeadlineValue, setdeliveryDeadlineValue] = React.useState("0");    // 受渡期日（選択値）
  const [deliveryLocationValue, setDeliveryLocationValue] = React.useState("0");    // 受渡場所（選択値）
  const [estimateExpirationDateValue, setEstimateExpirationDateValue] = React.useState("0");    // 見積有効期限（選択値）
  const [paymentCriteriaValue, setPaymentCriteriaValue] = React.useState("0");    // 支払条件（選択値）
  const headerFormRef = useRef();   // ヘッダフォーム
  const detailFormRef = useRef();   // 明細フォーム

  // 顧客名
  const changeCustomerNameValue = (event) => { setcustomerNameValue(event.target.value) };
  // 明細No設定
  const handleChange = (event, newValue) => { setRowNo(newValue) };
  // 商品コード　イベント
  const changeItemCodeValue = (event) => { setItemCodeValue(event.target.value) };
  // 商品名　イベント
  const changeItemNameValue = (event) => { setItemNameValue(event.target.value) };
  // 数量　イベント
  const changeSalesQuantityValue = (event) => { setSalesQuantityValue(event.target.value) };
  // 売上数量フォーカスアウト　イベント
  const blurSalesQuantityValue = (event) => { setSalesQuantityValue2(event.target.value) };
  // 単位（選択値）イベント
  const changeSalesUnit = (event) => { setSalesUnitValue(event.target.value) };
  // 販売単価　イベント
  const changeSalesPriceValue = (event) => { setSalesPriceValue(event.target.value) };
  // 販売金額　イベント
  const changeSalesAmountValue = (event) => { setSalesAmountValue(event.target.value) };
  // 課税区分（選択値）イベント
  const changeTaxedUnitValue = (event) => { setTaxedUnitValue(event.target.value) };
  // 販売原価イベント
  const changeCostPriceValue = (event) => { setCostPriceValue(event.target.value) };
  // 原価金額イベント
  const changeCostAmountValue = (event) => { setCostAmountValue(event.target.value) };
  // 粗利イベント
  const changeProfitValue = (event) => { setProfitValue(event.target.value) };
  // 適用イベント
  const changeApplyValue = (event) => { setApplyValue(event.target.value) };
  // 受渡期日（選択値）イベント
  const changeDeliveryDeadlineValue = (event) => { setdeliveryDeadlineValue(event.target.value) };
  // 受渡場所（選択値）イベント
  const changeDeliveryLocationValue = (event) => { setDeliveryLocationValue(event.target.value) };
  // 見積有効期限（選択値）イベント
  const changeEstimateExpirationDateValue = (event) => { setEstimateExpirationDateValue(event.target.value) };
  // 支払条件（選択値）イベント
  const changePaymentCriteriaValue = (event) => { setPaymentCriteriaValue(event.target.value) };

  // 明細No　変更時
  useEffect(() => {
    // 明細データ取得
    axios.get('http://172.28.73.88:8080/api/estimate/detail', {
      params: {
        estimateNo: estimateNoValue, //見積番号
        rowNo: rowNo,  //明細No
      }
    })
      .then((response) => {
        //データ設定
        handleMeisai(response);
      })
      .catch((error) => {
        //errorHandler(error)
      });

  }, [rowNo]);

  // 明細取得
  const handleMeisai = (response) => {
    setItemCodeValue(response.data.itemCode);
    setItemNameValue(response.data.itemName);
  };

  // ダイアログオープン（ヘッダ登録後）
  const handleClickOpen = (response) => {
    setOpen(true);
    setMsg({ "id": "000", "msg": response.data.msg });
    setEstimateNoValue(response.data.estimateNo);
  };

  // ダイアログオープン（明細登録後）
  const handleClickOpenDetail = (response) => {
    setOpen(true);
    setMsg({ "id": "000", "msg": response.data.msg });
  };

  // ダイアログクローズ
  const handleClose = () => {
    setOpen(false);
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
  ];

  // エラーハンドラ
  const errorHandler = (error) => {
    if (error.response) {
      setMsg({ "id": "000", "msg": error.response.data.msg });
    } else {
      setMsg({ "id": "000", "msg": "データ送信に失敗しました。" });
    }
    setOpen(true);
  }

  // チェックパターン
  const EmailVaildPattern =
    "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$";

  // 見積登録ボタン
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formData = new FormData(headerFormRef.current);
    const values = Object.fromEntries(formData.entries());

    axios.post('http://172.28.73.88:8080/api/estimate/header', {
      estimateDate: values.estimateDate, //見積日時
      customerName: values.customerName,  //顧客名
      subject: values.subject,  //件名
      deliveryDeadline: values.deliveryDeadline,  //受渡期日
      deliveryLocation: values.deliveryLocation,  //受渡場所
      estimateExpirationDate: values.estimateExpirationDate,  //見積有効期限
      responsiblePerson: values.responsiblePerson,  //担当者
      paymentCriteria: values.paymentCriteria,  //支払条件
      overview: values.overview,  //適用
      estimateNo: estimateNoValue,   //見積番号
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

    // 明細フォーム
    const detailFormData = new FormData(detailFormRef.current);
    const detailFormValues = Object.fromEntries(detailFormData.entries());

    // ヘッダフォーム
    const formData = new FormData(headerFormRef.current);
    const formDataValues = Object.fromEntries(formData.entries());

    axios.post('http://172.28.73.88:8080/api/estimate/detail', {
      rowNo: rowNo, //行番号
      itemCode: detailFormValues.itemCode, //商品コード
      itemName: detailFormValues.itemName, //商品名
      salesQuantity: convertToNullableNumber(detailFormValues.salesQuantity), // 販売数量
      salesUnit: detailFormValues.salesUnit, // 販売単位
      salesPrice: convertToNullableNumber(detailFormValues.salesPrice), // 販売単価
      salesAmount: convertToNullableNumber(detailFormValues.salesAmount), // 販売金額
      costPrice: convertToNullableNumber(detailFormValues.costPrice), // 販売原価
      costAmount: convertToNullableNumber(detailFormValues.costAmount), // 原価金額
      profit: convertToNullableNumber(detailFormValues.profit), // 粗利
      taxedUnit: convertToNullableNumber(detailFormValues.taxedUnit), // 課税区分
      apply: detailFormValues.apply, // 適用
      estimateNo: formDataValues.estimateNo,  //見積番号
    })
      .then((response) => {
        handleClickOpenDetail(response);
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
            noValidate
            autoComplete="off"
            ref={headerFormRef}
          >
            <Box sx={{ display: "flex", justifyContent: "left", alignItems: "flex-start", height: 80, width: 1200, border: 0 }}>
              <Box sx={{ padding: 1, width: 200, border: 0 }} >
                <TextField id="estimateNoTxt" name="estimateNoTxt" label="見積番号" value={estimateNoValue} disabled={true} inputProps={{ maxLength: 10, size: 20 }} InputLabelProps={{ shrink: true }} sx={{ backgroundColor: 'silver' }} />
              </Box>
              <Box sx={{ padding: 1, width: 160, border: 0 }} >
                <TextField id="estimateDate" name="estimateDate" label="見積日時" type="date" InputLabelProps={{ shrink: true, required: true }} defaultValue="2020-10-11" />
              </Box>
              <Box sx={{ padding: 1, width: 400, border: 0 }} >
                <TextField id="customerName" name="customerName" label="顧客名" value={customerNameValue} inputProps={{ maxLength: 20, size: 40 }} InputLabelProps={{ shrink: true, required: true }} onChange={changeCustomerNameValue} />
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "left", alignItems: "flex-start", height: 80, width: 1200, border: 0 }}>
              <Box sx={{ padding: 1, width: 530, border: 0 }} >
                <TextField id="subject" name="subject" label="件名" inputProps={{ maxLength: 30, size: 60 }} InputLabelProps={{ shrink: true, required: true }} />
              </Box>
              <Box sx={{ padding: 1, width: 400, border: 0 }} >
                <TextField id="responsiblePerson" name="responsiblePerson" label="担当者" inputProps={{ maxLength: 20, size: 40 }} InputLabelProps={{ shrink: true, required: true }} /><br />
              </Box>

            </Box>
            <Box sx={{ display: "flex", justifyContent: "left", alignItems: "flex-start", height: 80, width: 1200, border: 0 }}>
              <Box sx={{ padding: 1, width: 120, border: 0 }} >
                <FormControl fullWidth>
                  <InputLabel id="deliveryDeadlineLabel">受渡期日</InputLabel>
                  <Select
                    labelId="deliveryDeadlineLabel"
                    id="deliveryDeadlineid"
                    name="deliveryDeadline"
                    value={deliveryDeadlineValue}
                    onChange={changeDeliveryDeadlineValue}
                  >
                    <MenuItem value={"0"}><em></em></MenuItem>
                    <MenuItem value={"1"}>別途お打ち合わせ</MenuItem>
                    <MenuItem value={"2"}>一週間</MenuItem>
                    <MenuItem value={"3"}>二週間</MenuItem>
                    <MenuItem value={"4"}>一カ月</MenuItem>
                    <MenuItem value={"5"}>二カ月</MenuItem>
                    <MenuItem value={"6"}>三カ月</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ padding: 1, width: 120, border: 0 }} >
                <FormControl fullWidth>
                  <InputLabel id="deliveryLocationLabel">受渡場所</InputLabel>
                  <Select
                    labelId="deliveryLocationLabel"
                    id="deliveryLocationId"
                    name="deliveryLocation"
                    value={deliveryLocationValue}
                    onChange={changeDeliveryLocationValue}
                  >
                    <MenuItem value={"0"}><em></em></MenuItem>
                    <MenuItem value={"1"}>貴社ご指定場所</MenuItem>
                    <MenuItem value={"2"}>貴社にて</MenuItem>
                    <MenuItem value={"3"}>弊社にて</MenuItem>
                    <MenuItem value={"4"}>別送</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ padding: 1, width: 120, border: 0 }} >
                <FormControl fullWidth>
                  <InputLabel id="estimateExpirationDateLabel">見積有効期限</InputLabel>
                  <Select
                    labelId="estimateExpirationDateLabel"
                    id="estimateExpirationDateId"
                    name="estimateExpirationDate"
                    value={estimateExpirationDateValue}
                    onChange={changeEstimateExpirationDateValue}
                  >
                    <MenuItem value={"0"}><em></em></MenuItem>
                    <MenuItem value={"1"}>一カ月</MenuItem>
                    <MenuItem value={"2"}>二カ月</MenuItem>
                    <MenuItem value={"3"}>三カ月</MenuItem>
                    <MenuItem value={"4"}>一週間</MenuItem>
                    <MenuItem value={"5"}>二週間</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ padding: 1, width: 120, border: 0 }} >
                <FormControl fullWidth>
                  <InputLabel id="paymentCriteriaLabel">支払条件</InputLabel>
                  <Select
                    labelId="paymentCriteriaLabel"
                    id="paymentCriteriaId"
                    name="paymentCriteria"
                    value={paymentCriteriaValue}
                    onChange={changePaymentCriteriaValue}
                  >
                    <MenuItem value={"0"}><em></em></MenuItem>
                    <MenuItem value={"1"}>従来通り</MenuItem>
                    <MenuItem value={"2"}>貴社ご規定通り</MenuItem>
                    <MenuItem value={"3"}>ご相談</MenuItem>
                    <MenuItem value={"4"}>現金にて</MenuItem>
                    <MenuItem value={"4"}>別途お打ち合わせ</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ padding: 1, width: 550, border: 0 }} >
                <TextField id="overview" name="overview" label="適用" inputProps={{ maxLength: 30, size: 60 }} InputLabelProps={{ shrink: true }} />
              </Box>
              <Box sx={{ padding: 1, width: 10, border: 0 }} >
                <TextField type="hidden" id="estimateNo" name="estimateNo" value={estimateNoValue} style={{ display: 'none' }} />
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "left", alignItems: "flex-start", height: 80, width: 1200, border: 0 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "200px" }}
              >
                見積登録
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion >
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
            sx={{ border: 0 }}
            ref={detailFormRef}
          >
            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 550, border: 0 }} >
              <TabContext value={rowNo}>
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={rowNo}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  sx={{ borderRight: 2, borderColor: 'divider' }}
                >
                  {tabs.map((tab, index) => (
                    <Tab key={index} label={tab.label} value={tab.value} />
                  ))}
                </Tabs>
                <TabPanel value={rowNo}>
                  <Box sx={{ display: "flex", justifyContent: "left", alignItems: "flex-start", height: 80, width: 1000, padding: 1, border: 0, borderColor: "blue" }}>
                    <Box sx={{ padding: 1, width: 120, border: 0 }} >
                      <TextField id="itemCode" name="itemCode" label="商品コード" value={itemCodeValue} inputProps={{ maxLength: 5, size: 10, pattern: "^[0-9A-Za-z]+$", title: "半角英数字で入力して下さい。" }} InputLabelProps={{ shrink: true, required: true }} onChange={changeItemCodeValue} />
                    </Box>
                    <Box sx={{ padding: 1, width: 750, border: 0 }} >
                      <TextField id="itemName" name="itemName" label="商品名" value={itemNameValue} inputProps={{ maxLength: 30, size: 60 }} InputLabelProps={{ shrink: true }} onChange={changeItemNameValue} />
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "left", alignItems: "flex-start", height: 80, width: 1000, padding: 1, border: 0, borderColor: "blue" }}>
                    <Box sx={{ padding: 1, width: 100, border: 0 }} >
                      <TextField id="salesQuantity" name="salesQuantity" label="数量" value={salesQuantityValue} inputProps={{ maxLength: 3, size: 5 }} InputLabelProps={{ shrink: true }} onChange={changeSalesQuantityValue} onBlur={blurSalesQuantityValue} />
                    </Box>
                    <Box sx={{ padding: 1, width: 150, border: 0 }} >
                      <FormControl fullWidth>
                        <InputLabel id="salesUnitlabel">単位</InputLabel>
                        <Select
                          labelId="salesUnitlabel"
                          id="salesUnitId"
                          name="salesUnit"
                          value={salesUnitValue}
                          onChange={changeSalesUnit}
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
                    </Box>
                    <Box sx={{ padding: 1, width: 100, border: 0 }} >
                      <TextField id="salesPrice" name="salesPrice" label="販売単価" value={salesPriceValue} inputProps={{ maxLength: 5, size: 5 }} InputLabelProps={{ shrink: true }} onChange={changeSalesPriceValue} />
                    </Box>
                    <Box sx={{ padding: 1, width: 200, border: 0 }} >
                      <TextField id="salesAmount" name="salesAmount" label="販売金額" value={salesAmountValue} inputProps={{ maxLength: 20, size: 20 }} InputLabelProps={{ shrink: true }} onChange={changeSalesAmountValue} />
                    </Box>
                    <Box sx={{ padding: 1, width: 150, border: 0 }} >
                      <FormControl fullWidth>
                        <InputLabel id="taxedUnitlabel">課税区分</InputLabel>
                        <Select
                          labelId="taxedUnitlabel"
                          id="taxedUnitId"
                          name="taxedUnit"
                          value={taxedUnitValue}
                          onChange={changeTaxedUnitValue}
                        >
                          <MenuItem value={"0"}><em></em></MenuItem>
                          <MenuItem value={"1"}>外税１０％</MenuItem>
                          <MenuItem value={"2"}>内税１０％</MenuItem>
                          <MenuItem value={"3"}>非課税</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "left", alignItems: "flex-start", height: 80, width: 1000, padding: 1, border: 0, borderColor: "blue" }}>
                    <Box sx={{ padding: 1, width: 100, border: 0 }} >
                      <TextField id="salesQuantity2" name="salesQuantity2" label="数量" value={salesQuantityValue2} disabled={true} inputProps={{ maxLength: 5, size: 5 }} InputLabelProps={{ shrink: true }} sx={{ backgroundColor: 'silver' }} />
                    </Box>
                    <Box sx={{ padding: 1, width: 150, border: 0 }} >
                      <FormControl fullWidth>
                        <InputLabel id="salesUnit2label">単位</InputLabel>
                        <Select
                          labelId="salesUnit2label"
                          id="salesUnit2Id"
                          name="salesUnit2"
                          value={salesUnitValue}
                          onChange={changeSalesUnit}
                          disabled={true}
                          sx={{ backgroundColor: 'silver' }}
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
                    </Box>
                    <Box sx={{ padding: 1, width: 100, border: 0 }} >
                      <TextField id="costPrice" name="costPrice" label="販売原価" value={costPriceValue} inputProps={{ maxLength: 5, size: 5 }} InputLabelProps={{ shrink: true, }} onChange={changeCostPriceValue} />
                    </Box>
                    <Box sx={{ padding: 1, width: 200, border: 0 }} >
                      <TextField id="costAmount" name="costAmount" label="原価金額" value={costAmountValue} inputProps={{ maxLength: 20, size: 20 }} InputLabelProps={{ shrink: true }} onChange={changeCostAmountValue} />
                    </Box>
                    <Box sx={{ padding: 1, width: 200, border: 0 }} >
                      <TextField id="profit" name="profit" label="粗利" value={profitValue} inputProps={{ maxLength: 20, size: 20 }} InputLabelProps={{ shrink: true }} onChange={changeProfitValue} />
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "left", alignItems: "flex-start", height: 80, width: 1000, padding: 1, border: 0, borderColor: "blue" }}>
                    <Box sx={{ padding: 1, width: 800, border: 0 }} >
                      <TextField id="apply" name="apply" label="適用" value={applyValue} inputProps={{ maxLength: 40, size: 80 }} InputLabelProps={{ shrink: true }} onChange={changeApplyValue} />
                    </Box>
                  </Box>
                </TabPanel >
              </TabContext >
            </Box>
            <Box
              sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 80, width: 1000, border: 0 }}
            >
              <Box sx={{ padding: 1, width: 100, border: 0 }} >
                税抜合計
              </Box>
              <Box sx={{ padding: 1, width: 100, border: 0 }} >
                消費税合計
              </Box>
              <Box sx={{ padding: 1, width: 100, border: 0 }} >
                税込合計
              </Box>
              <Box sx={{ padding: 1, width: 100, border: 0 }} >
                原価合計
              </Box>
              <Box sx={{ padding: 1, width: 100, border: 0 }} >
                粗利額合計
              </Box>
            </Box>
            <Box
              sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 80, width: 1000, border: 0 }}
            >
              <Box sx={{ padding: 1, width: 210, border: 0 }} >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, width: "200px", height: "40px" }}
                >
                  明細登録
                </Button>
              </Box>
              <Box sx={{ padding: 1, width: 210, border: 0 }} >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, width: "200px", height: "40px" }}
                >
                  明細追加
                </Button>
              </Box>
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
