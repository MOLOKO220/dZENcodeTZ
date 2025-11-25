import style from "./Wrapper.module.scss";

import NuvMenu from "component/NuvMenu/NuvMenu";

export default function Wrapper({ children }: any) {
  return (
    <div className={style.Wrapper}>
      <NuvMenu />
      {children}
    </div>
  );
}
