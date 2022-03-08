import './ChartBar.css';

export const ChartBar = props => {
    let barFillHeight = "0%";

    if(props.maxValue > 0 ) {
        // this give us % of 0 and 100 in which bar will be filled
        barFillHeight = Math.round((props.value / props.maxValue) * 100) + "%"
    }

    return (
        <div className='chart-bar'>
            <div className='chart-bar__inner'> 
            {/* 
                Dynamic style, "style" is dynamic with expression "{}", but then it should get a js-object inside expression { {} <-- object } 
            */}
                <div className='chart-bar__fill' style={{height: barFillHeight}}></div>
            </div>
            <div className='chart-bar__label'>{props.label}</div>
        </div>
    )
}