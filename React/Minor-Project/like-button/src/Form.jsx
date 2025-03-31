function Submitform(event) {
    event.preventDefault();
    console.log("form was submitted" , event);
    
    // const name = event.target.elements.name.value;
    // alert(`Hello ${name}`);
}



export default function Form() {
    return (
        <form onSubmit={Submitform}>
        <input type="text"  />
        <button type="submit">Submit</button>
        </form>
    )
}