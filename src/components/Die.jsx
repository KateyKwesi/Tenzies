export default function Die(props) {
  return (
    <button onClick={props.click} className={props.class} key={props.id}>
      {props.value}
    </button>
  );
}
