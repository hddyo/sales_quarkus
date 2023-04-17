import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Link from '@mui/material/Link';
import { Link as RouterLink } from "react-router-dom";

export default function AppBarMenu() {

  const [state, setState] = React.useState({
    open: false,
  });

  const [data, setData] = React.useState([]);

  const menuTitle = [
    { key: '1', name: '見積' },
    { key: '2', name: '売上' },
    { key: '3', name: '発注' },
    { key: '4', name: 'マスタ' },
  ];

  const getSubMenuTitle = (keyValue) => {

    switch (keyValue) {
      case '1':
        return Array.of(
          { key: '1', name: '見積登録', link: '/estimate' },
          { key: '2', name: '見積検索', link: '/' },
        );
      case '2':
        return Array.of(
          { key: '1', name: '顧客マスタ', link: '/menu' },
          { key: '2', name: 'hoge', link: '/' },
        );
      case '3':
        return Array.of(
          { key: '1', name: '顧客マスタ', link: '/' },
          { key: '2', name: 'hogeeee', link: '/' },
        );
      default:
        return Array.of(
          { key: '1', name: '顧客マスタ', link: '/' },
          { key: '2', name: 'hogeeee', link: '/' },
        );
    }
  }

  const toggleDrawerOn = (flag, keyValue) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ open: flag });
    setData(getSubMenuTitle(keyValue));

  }

  const toggleDrawerOff = (flag) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ open: flag });

  }

  const list = (menu) => (
    <Box
      sx={{ width: 'auto' }}
      role="presentation"
      onClick={toggleDrawerOff(false)}
      onKeyDown={toggleDrawerOff(false)}
    >
      <List>
        {data.map((json, index) => (
          <ListItem key={json.key} disablePadding>
            <Link component={RouterLink} to={json.link}>
              <ListItemButton>
                <ListItemIcon>
                  <ArrowRightIcon fontSize='large' />
                </ListItemIcon>
                <ListItemText primary={json.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))
        }
      </List>
      <Divider />
    </Box >
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {menuTitle.map((menu) => (
              < React.Fragment key={menu.key} >
                <Button onClick={toggleDrawerOn(true, menu.key)} variant="contained" color="success">{menu.key}：{menu.name}</Button>
                <Drawer
                  anchor='top'
                  open={state.open}
                  onClose={toggleDrawerOff(false)}
                >
                  {list()}
                </Drawer>
              </React.Fragment>
            ))
            }
          </Toolbar>
        </AppBar>
      </Box >
    </>
  );
}
