import "../styles/blank.css";
const Blank = ({times}) => {

    const boxes=Array(times).fill(0).map((_,i)=>{
        return <div key={i} className="outer">
                    <div className="inner" />
                </div>
    });

    return boxes;

};

export default Blank;