"use client";
import { WorkService } from "@/services/work/work.service";
import { useInfiniteQuery } from "react-query";
import { IFilterInput } from "../filter/Filter.interface";

export const useGallery = (slug: string, filters: IFilterInput) => {
  
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["get works by workType", slug, filters],
      queryFn: async ({ pageParam = 1 }) => {
        
        const workData = await WorkService.getWorksWithPagination(
          slug,
          filters,
          pageParam
        );
        
        return workData;
      },
      // getNextPageParam: (lastPage) => lastPage?.data.pages?.pageParam + 1,
    });

  return { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage };
};
