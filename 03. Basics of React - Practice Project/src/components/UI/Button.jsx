import css from "./style/UI.module.css";

export const Button = props => {
  return (
    <button
      className={css.button}
      type={props.type || "button"}
      onClick={props.onClick}>
      {props.children}
    </button>
  );
};
