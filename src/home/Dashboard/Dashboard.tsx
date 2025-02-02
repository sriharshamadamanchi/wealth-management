// Copyright © 2025 Sustains AI, All Rights Reserved
import React from "react";
import { makeStyles } from "tss-react/mui";
import { View } from "../../common/components";
import SideMenu from "../../common/components/SideMenu";
import { theme } from "../../common/theme";
import PortfolioGrid from "../Portfolio/PortfolioGrid";

const useStyles = makeStyles()(() => ({
  mainContainer: {
    display: "flex",
    flex: 1,
    width: "100vw",
    height: "100vh",
    backgroundColor: theme.colors.light.background
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
}))

export const Dashboard = () => {

  const { classes } = useStyles()

  return (
    <View className = {classes.mainContainer}>
      <View className = {classes.subContainer}>
        <SideMenu />
        <PortfolioGrid />
      </View>
    </View>
  )
}
