import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { StyledLogo, StyledNavBarLink } from "./styles";

export const NavBar = () => {
  return (
    <Navbar
      shouldHideOnScroll
      className="fixed backdrop-blur-sm data-[menu-open=true]:backdrop-blur-sm"
    >
      <NavbarBrand>
        <StyledLogo to="/">TFM</StyledLogo>
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem>
          <StyledNavBarLink to="/data/Dashboard">Dashboard</StyledNavBarLink>
        </NavbarItem>
        <NavbarItem>
          <StyledNavBarLink to="/data/Catalog">Catalog</StyledNavBarLink>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
