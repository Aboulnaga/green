export default function CountrySelectBTN() {
  return (
    <div>
      <div className="countery">
        <select name="coumntry" id="">
          <option value="egy">Egypt</option>
          <option value="usa">USA</option>
          <option value="jap">Japan</option>
          <option value="fr">France</option>
          <option value="eng">England</option>
        </select>
      </div>
      <div className="states">
        <select name="states" id="">
          <option value="alex">alex</option>
          <option value="cairo">Cairo</option>
          <option value="sharkya">Sharkya</option>
          <option value="mansoura">Mansoura</option>
          <option value="readsea">Read Sea</option>
        </select>
      </div>
    </div>
  );
}
