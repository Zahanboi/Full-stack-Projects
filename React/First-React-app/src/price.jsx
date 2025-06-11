export default function price({idx}){
    let oldprice = ["12,495", "11,900", "1,599" , "599"];
    let newprice = ["8,999", "9,199", "899", "278"];
    
    return (
        <div style={{color: 'black', backgroundColor: '#DAA520', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', height: '30px'}}>
            <span style={{textDecoration: 'line-through'}}>{oldprice[idx]}</span>
            &nbsp;
            <span>{newprice[idx]}</span>
        </div>
    );
}