
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';


const useTask = () => {
    const axiosPublic = useAxiosPublic();

    const {refetch, data: tasks = []} = useQuery({
      queryKey:["tasks"],
      queryFn: async ( ) => {
        const res = await axiosPublic.get("/tasks");
        return res.data;
      }

    })

    return [tasks,refetch];
};

export default useTask;