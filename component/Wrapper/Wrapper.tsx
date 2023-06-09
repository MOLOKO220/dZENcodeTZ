import React from "react";
import NuvMenu from "component/NuvMenu/NuvMenu";
import style from "./Wrapper.module.scss";

export default function Wrapper({ children }: any) {
  return (
    <div className={style.Wrapper}>
      <NuvMenu />
      {children}
    </div>
  );
}
