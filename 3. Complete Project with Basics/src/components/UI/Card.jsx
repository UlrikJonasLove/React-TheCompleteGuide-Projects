import css from './style/UI.module.css';

export const Card = props => {
return <div className={`${css.card} ${props.className}` }>{props.children}</div>
};