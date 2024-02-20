import './index.scss'

type Props = {
    nodeName?: string;
    level?: number
}

const SelectNode = function(props: Props) {
	let {nodeName, level} = props;
	return (
		<div className="node-name">
            <div className={'circle color'+level}><span></span></div>
            { nodeName }
        </div>
	)
}

export default SelectNode
