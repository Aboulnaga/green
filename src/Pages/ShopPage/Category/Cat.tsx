import { useParams } from "react-router-dom";
export default function Cat() {
  const cat = useParams();
  console.log(cat);
  //   console.log(props);
  return <div>{cat.cat}</div>;
}
