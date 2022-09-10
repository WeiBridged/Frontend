import "../index.scss";

const Footer = () => {
  return (
    <div className="container py-5 app-market">
      <div class="alert alert-secondary" role="alert">
        <div className="row p-1">
          <label>From</label>
          <input
            class="sc-bGbJRg iBXRhG"
            inputmode="decimal"
            title="Token Amount"
            autocomplete="off"
            autocorrect="off"
            type="text"
            pattern="^[0-9]*[.,]?[0-9]*$"
            placeholder="0.0"
            minlength="1"
            maxlength="79"
            spellcheck="false"
          />{" "}
          <div className="col">
            {" "}
            <label for="cars">Coin/Token</label>
          </div>
          <div className="col">
            {" "}
            <label for="cars">Network/Chain</label>
          </div>
        </div>
      </div>{" "}
      <div class="alert alert-secondary" role="alert">
        <div className="row p-1">
          <label>To</label>
          <input
            class="sc-bGbJRg iBXRhG"
            inputmode="decimal"
            title="Token Amount"
            autocomplete="off"
            autocorrect="off"
            type="text"
            pattern="^[0-9]*[.,]?[0-9]*$"
            placeholder="0.0"
            minlength="1"
            maxlength="79"
            spellcheck="false"
          />{" "}
          <div className="col">
            {" "}
            <label for="cars">Coin/Token</label>
          </div>
          <div className="col">
            {" "}
            <label for="cars">Network/Chain</label>
          </div>
        </div>
      </div>{" "}
      <div class="alert alert-secondary" role="alert">
        CGAIINLIINK Should be an error box, if u are on wrong network etc then
        should say here Here u can have a thing that Here u can have a thing
        that Here u can have a thing that Here u can have a thing that Here u
        can have a thing that Here u can have a thing that Here u can have a
        thing that Here u can have a thing that Here u can have a thing that
      </div>{" "}
    </div>
  );
};

export default Footer;
