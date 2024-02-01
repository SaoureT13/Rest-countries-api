export function Header() {
    return (
      <header className="header">
        <h1 className="logo">Where in the world</h1>
        <div className="theme">
          <input id="theme" type="checkbox" checked="" onChange="" />
          <label htmlFor="theme">Dark Mode</label>
        </div>
      </header>
    );
  }