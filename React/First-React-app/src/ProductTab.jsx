import Product from './Product';
// let styles = {paddingTop: '200px'};


function ProductTab() {
    return (
      <div className='product-tab' >
        <Product idxs = {0} idx2 ={0} />
        <Product idxs = {1} idx2 ={0} />
        <Product idxs = {2} idx2 ={0} />
        <Product idxs = {3} idx2 ={0} />
      </div>
    );
  };

  export default ProductTab;