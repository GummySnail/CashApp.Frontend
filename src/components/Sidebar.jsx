import React, {useMemo, useState} from 'react';
import {Box, Button, styled, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import GridViewIcon from '@mui/icons-material/GridView';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {
    const CustomButton = useMemo(() => styled(Button)({
            "&:hover": {
                background: "#334252",
            },
            "&:focus": {
                background: "#7CC0EA",
            }
    }), []);
    
    return (
        <Box sx={{ maxWidth: "330px", height: '100vh', bgcolor: 'primary.main'}}>
            <Box
                sx={{
                    bgcolor: "#365466",
                    display: 'flex',
                    height: '120px',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Typography>
                    <span className="cash">Cash</span><span className="app">App</span>
                </Typography>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: 'column',
                gap: "2rem",
                mt: 5,
            }}>
                <CustomButton
                    size="large"
                    component={NavLink}
                    to="/"
                    startIcon={<GridViewIcon style={{ color: '#FFFFFF', fontSize: 30}}/>}
                >
                    <Typography sx={{
                        color: '#FFFFFF',
                        fontSize: 24,
                        textTransform: 'none'
                    }}>Dashboard</Typography>
                </CustomButton>
                <CustomButton
                    size="large"
                    startIcon={<AnalyticsIcon style={{ color: '#FFFFFF', fontSize: 30}}/>}
                >
                    <Typography sx={{
                        color: '#FFFFFF',
                        fontSize: 24,
                        textTransform: 'none'
                    }}>Statistics</Typography>
                </CustomButton>
                <CustomButton
                    size="large"
                    startIcon={<AccountBalanceWalletIcon style={{ color: '#FFFFFF', fontSize: 30}}/>}>
                    <Typography sx={{
                        color: '#FFFFFF',
                        fontSize: 24,
                        textTransform: 'none'
                    }}>My Wallet</Typography>
                </CustomButton>
                <CustomButton
                    size="large"
                    startIcon={<PersonIcon style={{ color: '#FFFFFF', fontSize: 30}}/>}>
                    <Typography sx={{
                        color: '#FFFFFF',
                        fontSize: 24,
                        textTransform: 'none'
                    }}>Account</Typography>
                </CustomButton>
                <CustomButton
                    size="large"
                    startIcon={<SettingsIcon style={{ color: '#FFFFFF', fontSize: 30}}/>}>
                    <Typography sx={{
                        color: '#FFFFFF',
                        fontSize: 24,
                        textTransform: 'none'
                    }}>Settings</Typography>
                </CustomButton>
                <CustomButton
                    size="large"
                    startIcon={<LogoutIcon style={{ color: '#FFFFFF', fontSize: 30}}/>}>
                    <Typography sx={{
                        color: '#FFFFFF',
                        fontSize: 24,
                        textTransform: 'none'
                    }}>Logout</Typography>
                </CustomButton>
            </Box>
        </Box>
    )
}
export default Sidebar;