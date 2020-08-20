/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { ReactComponent as HeartIcon } from "./asssets/heartbeat.svg";
import { ReactComponent as ClipBoard } from "./asssets/clipboard.svg";
import { ReactComponent as Desktop } from "./asssets/desktop.svg";
import { ReactComponent as DownArrow } from "./asssets/down-arrow.svg";
import { ReactComponent as Send } from "./asssets/send.svg";
import { ReactComponent as Sort } from "./asssets/sort.svg";
import { CSSTransition } from "react-transition-group";

function App() {
  return (
    <NavBar>
      <NavItem icon={<HeartIcon />} />
      <NavItem icon={<ClipBoard />} />
      <NavItem icon={<Desktop />} />
      <NavItem icon={<DownArrow />}>
        <Dropdown></Dropdown>
      </NavItem>
    </NavBar>
  );
}
function NavBar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item">
      <a className="icon-button" href="#" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

function Dropdown(props) {
  const [activeMenu, setActiveMenu] = useState("menu");
  const [height, setHeight] = useState(null);

  function calcHeight(el) {
    const heightis = el.offsetHeight;
    setHeight(heightis);
  }
  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: height }}>
      <CSSTransition
        in={activeMenu === "menu"}
        timeout={500}
        classNames={"menu-primary"}
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem>My profile</DropdownItem>
          <DropdownItem
            leftIcon={<Send />}
            rightIcon={<Sort />}
            goToMenu={"settings"}
          >
            Files
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames={"menu-secondary"}
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu={"menu"}>Back</DropdownItem>
          <DropdownItem leftIcon={<Send />} rightIcon={<Sort />}>
            Files
          </DropdownItem>
          <DropdownItem rightIcon={<Sort />} />
          <DropdownItem rightIcon={<Sort />} />
          <DropdownItem rightIcon={<Sort />} />
          <DropdownItem rightIcon={<Sort />} />
          <DropdownItem rightIcon={<Sort />} />
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;
