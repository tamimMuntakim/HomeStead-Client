import { TbFaceIdError } from "react-icons/tb";
import { Link } from 'react-router';
import { IoArrowBackCircleSharp } from "react-icons/io5";

const ErrorPage = () => {

    return (
        <div className='w-11/12 md:container mx-auto min-h-screen'>
            <div className="translate-y-1/2 md:translate-y-1/3 bg-base-200 rounded-2xl w-full md:w-[40%] mx-auto flex flex-col justify-center items-center py-8 px-4 md:px-8 shadow-md shadow-red-100 text-center">
                <div className='bg-red-500 rounded-xl shadow-md shadow-red-200'><TbFaceIdError className='text-white w-[50px] md:w-[150px] h-auto' /></div>
                <span className='text-lg md:text-2xl font-bold text-red-500 mt-4 mb-2 md:mt-8 md:mb-4'>404 - page not found</span>
                <span className='font-bold'>Oops! Something went wrong....</span>
                <Link to="/"><button className="btn rounded-4xl btn-accent font-bold px-4 mt-4 md:px-8 px-4 mt-4 md:mt-8 text-white"><IoArrowBackCircleSharp className='w-[25px] md:w-[30px] h-auto' />Back to Home</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;