import { Link } from "react-router-dom";


const Banner = () => {
    return (
    <div className="w-full bg-gradient-to-r from-green-400 to-blue-500 ">
            <div className="flex mx-auto container pt-20">
            <div className="space-y-3">
            <h2 className="text-6xl">Taskly brings all your <br /> tasks, teammates, and <br /> tools together</h2>
            <p className="text-xl">Keep everything in the same place—even if your team isn’t.</p>
            <Link to='/dashboard'>
            <button className="btn bg-blue-500 hover:bg-purple-400 shadow-lg hover:shadow-lg border-0 rounded-md text-xl mt-3 text-textColor">Let’s Explore</button>
            </Link>
            </div>

         <div>
         <img src="https://i.ibb.co/JKgrCXC/Banner-image-small-3.png" alt="" width={500} />
         </div>
        </div>
    </div>
    );
};

export default Banner;