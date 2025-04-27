import '../../styles/pages/uploadLayout.css';
const UploadLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='upload__container'>
        <div>SideBar</div>
        <div>
            <div>BreadCrumbs</div>
            <div>{children}</div>
        </div>
    </div>
  )
}

export default UploadLayout