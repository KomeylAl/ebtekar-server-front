import NavBar from "./NavBar"

const Sidebar = () => {
    return (
        <div className='
          hidden w-80 h-full 
          lg:flex flex-col items-center justify-between 
          bg-amber-600 p-8 fixed top-0 right-0'>
            <div className='w-full flex flex-col items-start gap-10'>
                <h1 className='text-white text-2xl font-bold text-right'>ابتکار صنعت</h1>
                <NavBar />
            </div>
            <p className='text-gray-200'>
                ebtekar-admin
            </p>
        </div>
    )
}

export default Sidebar