import './index.scss';

type Props = {
    list?: any
}

const Percentage = (props: Props) => {
    let {list} = props;
    return (
        <ul className='percentage-bg'>
            {
                list.map((item: any, i: number) => {
                    return (
                        <li className={'color' + i} style={{width: item + '%'}}></li>
                    )
                })
            }
        </ul>
    )
}
export default Percentage;
