import "../index.scss";

const Weibridged = () => {
  return (
    <div className="container py-5 app-market">
      <div class="alert alert-secondary" role="alert">
        <b>
          The following Github repo includes backend Golang scripts to help
          contracts read and write to each other on different blockchains.
        </b>
        <br></br>
        <br></br>
        <p>
          1. Owner adds 1000 wei [ETH] (or another token) to another side of a
          bridge<br></br>
          2. User requests to bridge 1000 wei by paying 1003 wei (3 wei covers
          the 0.3% fee)<br></br>
          3. After deposit is made, user is added to the user bridge queue
          <br></br>
          4. Owner detects user in queue<br></br>
          5. Locally store user in queue with Golang variable Assume bridge will
          not go down with the stored address removed from queue.
          <br></br>6. Dequeue to remove user from the queue.<br></br>
          7. Unlock the added wei [ETH] (or another token) to the user locally
          stored, then remove user locally.<br></br>
        </p>
        <div className="align-middle text-center ">
          <a
            className="link-secondary"
            href="https://github.com/WeiBridged/BridgeCommunication"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              class="bi bi-github"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
        </div>
      </div>{" "}
    </div>
  );
};

export default Weibridged;
