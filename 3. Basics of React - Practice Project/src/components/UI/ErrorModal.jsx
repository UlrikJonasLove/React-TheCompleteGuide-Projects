import ReactDom from 'react-dom'
import { Card } from "./Card";
import { Button } from "./Button";
import css from "./style/UI.module.css";

const Backdrop = props => {
  return <div className={css.backdrop} onClick={props.onConfirm} />
}

const ModalOverlay = props => {
  return (
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
  )
}

export const ErrorModal = (props) => {
  return (
    <>
      {ReactDom.createPortal(<Backdrop onConfirm={props.onConfirm} />, 
        document.getElementById("backdrop-root"))}
        
      {ReactDom.createPortal(<ModalOverlay title={props.title} text={props.text} onConfirm={props.onConfirm} btnText={props.btnText}/>, 
        document.getElementById("overlay-root"))}
    </>
  );
};
