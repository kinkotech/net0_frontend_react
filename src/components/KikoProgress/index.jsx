import './index.scss';

const KikoProgress = function({name, percent, value, color}) {
    return (
		<div className='kiko-progress d-flex'>
            <div className='kiko-progress-name flex-1'>{name}</div>
            <div className='kiko-progress-line'>
				<div className='kiko-progress-line-con' style={{width: percent+'%',background: color}}></div>
			</div>
            <div className='kiko-progress-value flex-1'>{value}</div>
        </div>
	)
}

export default KikoProgress;