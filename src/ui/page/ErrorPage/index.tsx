import TopNavbar from "../../component/TopNavbar";

export default function Error () {

  return (
    <>
      <TopNavbar/>
      <div className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
        <img
          className="vw-100"
          src="https://tailwindflex.com/storage/thumbnails/minimal-404-page/thumb_u.min.webp?v=1"
        />
      </div>
    </>
  )

}