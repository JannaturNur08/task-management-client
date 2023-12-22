
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';


const useTask = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { refetch, data: myTasks = [] } = useQuery({
      queryKey: ["myTasks", user?.email],
      queryFn: async ( ) => {
        const res = await axiosPublic.get(`/myTasks?email=${user.email}`);
        return res.data;
      },

    });

    return [myTasks,refetch];
};

export default useTask;