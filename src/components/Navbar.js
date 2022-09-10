import { NavLink } from "react-router-dom";

const Navbar = ({
  handleConnectMetamask,
  connectedAddrValue,
  userAccountAddress,
}) => {
  console.log(connectedAddrValue, "user", userAccountAddress);
  return (
    <div class="container-fluid border-bottom">
      <nav class="container position-relative navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" title="" href="/#/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="primary"
            class="bi bi-stars"
            viewBox="0 0 16 16"
          >
            <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
          </svg>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="py-2 border-top d-lg-none"></div>
          <ul id="top-menu" class="nav navbar-nav ml-auto nav-bar-lowered-text">
            <li
              id="menu-item-13 ml-1"
              class="my-auto pr-2 menu-item menu-item-type-post_type menu-item-object-page menu-item-13"
              style={{ paddingRight: 30 }}
            >
              <a href="#/">Home</a>
            </li>
            <li
              id="menu-item-16609"
              class="my-auto pr-3 menu-item menu-item-type-custom menu-item-object-custom menu-item-16609"
              style={{ paddingRight: 50 }}
            >
              <a rel="noopener" href="/#/bridge">
                Bridge
              </a>
            </li>

            <li
              id="menu-item-16954"
              class="menu-item menu-item-type-post_type menu-item-object-page menu-item-16954"
              style={{ paddingRight: 50 }}
            >
              <a href="/#/limitorders">Gasless Limit Orders</a>
            </li>
          </ul>{" "}
          <ul class="navbar-nav d-none d-lg-block ">
            <li class="nav-item dropdown">
              <a
                class="btn border-0 nav-bar-lowered-search"
                style={{ fontSize: 20 }}
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fa fa-search"></i>
              </a>
              <div
                class="dropdown-menu dropdown-menu-right mt-3 p-3 shadow"
                aria-labelledby="navbarDropdown"
              >
                <form
                  class="form-inline my-2 my-lg-0"
                  role="search"
                  method="get"
                  action="/"
                >
                  <div class="input-group my-auto">
                    <input
                      type="search"
                      name="s"
                      class="form-control"
                      size="36"
                      placeholder="Search"
                      autocomplete="off"
                    />
                    <div class="input-group-append">
                      <button class="btn btn-search border-0" type="submit">
                        <i class="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
          </ul>
          <div class="my-3 p-3 shadow rounded d-lg-none">
            <form
              class="form-inline my-2 my-lg-0"
              role="search"
              method="get"
              action="/"
            >
              <div class="input-group my-auto w-100">
                <input
                  type="search"
                  name="s"
                  class="form-control"
                  size="36"
                  placeholder="Search"
                  autocomplete="off"
                />
                <div class="input-group-append">
                  <button class="btn btn-search border-0" type="submit">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
