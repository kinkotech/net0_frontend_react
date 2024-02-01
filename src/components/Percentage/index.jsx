import './index.scss';

const Percentage = ({list}) => {
    console.log(list)
    return (
        <ul className='percentage-bg'>
            {
                list.map((item, i) => {
                    return (
                        <li className={'color' + i} style={{width: item + '%'}}></li>
                    )
                })
            }
        </ul>
    )
}
export default Percentage;
