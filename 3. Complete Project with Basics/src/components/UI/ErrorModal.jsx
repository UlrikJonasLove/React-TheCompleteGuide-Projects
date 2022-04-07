import { Card } from "./Card";
import { Button } from "./Button";
import css from "./style/UI.module.css";

export const ErrorModal = (props) => {
  return (
    <>
      <div className={css.backdrop} onClick={props.onConfirm} />
      <Card className={css.modal}>
        <header className={css.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={css.content}>
          <p>{props.text}</p>
        </div>
        <footer className={css.actions}>
          <Button type="button" onClick={props.onConfirm}>
            {props.btnText}
          </Button>
        </footer>
      </Card>
    </>
  );
};
