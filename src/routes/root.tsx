import { Outlet } from "react-router-dom";
import { Button } from "primereact/button";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="...">01</div>
          <div className="...">02</div>
          <div className="...">03</div>
          <div className="col-span-2 ...">04</div>
          <div className="...">05</div>
          <div className="...">06</div>
          <div className="col-span-2 ...">07</div>
        </div>
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <Button type="submit">New</Button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <a href={`/contacts/1`}>Your Name</a>
            </li>
            <li>
              <a href={`/contacts/2`}>Your Friend</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
