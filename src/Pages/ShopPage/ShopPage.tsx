import { Link } from "react-router-dom";
import useQueryCurrentUser from "../../Hooks/useQueryCurrentUser";
import { db } from "../../Config/FireBaseConfig";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
export default function ShopPage() {
  const { data: currentUser } = useQueryCurrentUser();

  const handlebtn = async (e: any) => {
    e.preventDefault();

    const docRef = doc(db, "users", currentUser?.user_id as string);
    const docSnap = await getDoc(docRef);
    onSnapshot(docRef, doc => {
      console.log("Current data: ", doc.data());
    });
    const data = docSnap.data();
    console.log(docSnap.id);

    console.log(data);

    // console.log(docSnap.data());
  };
  const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
    { id: 4, name: "Product 4", price: 40 },
    { id: 5, name: "Product 5", price: 50 },
    { id: 6, name: "Product 6", price: 60 },
    { id: 7, name: "Product 7", price: 70 },
    { id: 8, name: "Product 8", price: 80 },
    { id: 9, name: "Product 9", price: 90 },
    { id: 10, name: "Product 10", price: 100 },
  ];

  const renderProducts = () => {
    return products.map(product => (
      <div key={product.id}>
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        <button>Add to cart</button> /{" "}
        <Link to={`/shop/${product.id}`}>View Details</Link>
      </div>
    ));
  };
  return (
    <div className="shop">
      <h2>Shop Page</h2>
      <button onClick={handlebtn}>get billing info</button>
      <div className="products">{renderProducts()}</div>
    </div>
  );
}
