const HomeWrap = () => {
  return (
    <body>
      <div id="root">
        <div class="app">
          <div class="container">
            <div class="box">
              <div class="banner"></div>
              <div class="box-content">
                <div class="box-header"></div>{" "}
                <span>
                  <span>Select Network</span>
                </span>
              </div>{" "}
            </div>{" "}
            <div class="container">
              <div class="footer-box">
                <div class="to-add">
                  Use the buttons below to bridge between assets in your browser
                  wallet extension
                  <div class="footer-buttons">
                    <button class="add-network">Bridge</button>
                    <button class="add-network">View Status</button>
                  </div>
                </div>
              </div>
              <div class="footer-box">
                <div style={{ fontSize: 13, padding: 20 }}>
                  Once you are done with the bridging, feel free to send some
                  funds to this address.
                  <div class="return-address">
                    <div class="tooltip">
                      <span class="tooltiptext" id="tooltip-text">
                        Copy to clipboard
                      </span>
                    </div>
                    <input
                      id="return-address-input"
                      disabled=""
                      value="0x2352D20fC81225c8ECD8f6FaA1B37F24FEd450c9"
                    />
                    <span style={{ marginRight: 10, marginTop: 2 }}>
                      <img
                        alt="copy"
                        src="https://img.icons8.com/fluency-systems-regular/48/ffffff/copy.png"
                        style={{ width: 20, height: 20 }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </body>
  );
};
{
}

export default HomeWrap;
