import TopHeader from "./TopHeader/TopHeader"
import MainHeader from "./MainHeader/MainHeader"
import MainNav from "./MainNav/MainNav"
export default function HeaderComp() {
  return (
    <section className="header-container">
      <TopHeader />
      <div className="header-line"></div>
      <header>
        <MainHeader />
        <div className="header-line"></div>

        <MainNav />
      </header>
    </section>
  )
}
